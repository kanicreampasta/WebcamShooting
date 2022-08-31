package one.panda_number.wcs;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import com.google.protobuf.InvalidProtocolBufferException;
import one.panda_number.wcs.protos.*;
import org.java_websocket.WebSocket;
import org.java_websocket.drafts.Draft;
import org.java_websocket.drafts.Draft_6455;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A simple WebSocketServer implementation. Keeps track of a "chatroom".
 */
public class GameServer extends WebSocketServer {

    private Map<String, InternalPlayer> playerList=new HashMap<>();
    private ReadWriteLock playerListLock = new ReentrantReadWriteLock();

    Logger logger = LoggerFactory.getLogger(GameServer.class);

    public GameServer(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
    }

    public GameServer(InetSocketAddress address) {
        super(address);
    }

    public GameServer(int port, Draft_6455 draft) {
        super(new InetSocketAddress(port), Collections.<Draft>singletonList(draft));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        System.out.println(
                conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        System.out.println(conn + " has left the room!");
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
//        broadcast(message);
//        System.out.println(conn + ": " + message);
        logger.warn("text ws message received (nop)");
    }

    @Override
    public void onMessage(WebSocket conn, ByteBuffer message) {
        byte[] bytes=message.array();

        try {
            var request = Request.parseFrom(bytes);
            switch (request.getRequestOneofCase()) {
                case JOIN_REQUEST -> handleJoinRequest(conn, request.getJoinRequest());
                case CLIENT_UPDATE -> handleClientUpdate(conn, request.getClientUpdate());
                case DEAD_UPDATE -> handleDeadUpdate(conn, request.getDeadUpdate());
                case RESPAWN_REQUEST -> handleRespawn(conn, request.getRespawnRequest());
            }
        } catch (InvalidProtocolBufferException e) {
            logger.info("invalid protocol format. closing connection.");
            conn.close();
        }
    }

    private void handleJoinRequest(WebSocket conn, JoinRequest req) {
        String username = req.getName();
        String pid = generatePid();

        Lock lock=  playerListLock.writeLock();
        try {
            lock.lock();
            playerList.put(pid, new InternalPlayer(pid));
        } finally {
            lock.unlock();
        }

        PidResponse pidRes = PidResponse.newBuilder().setPid(pid).build();
        Response res= Response.newBuilder().setPidResponse(pidRes).build();
        conn.send(res.toByteArray());
    }

    private void handleClientUpdate(WebSocket conn, ClientUpdate u) {
        String pid = u.getPid();

        // update data
        Lock  lock=playerListLock.writeLock();
        try {
            lock.lock();
            InternalPlayer pl = playerList.get(pid);
            pl.setPosition(toInternalVector3(u.getPlayer().getPosition()));
            pl.setVelocity(toInternalVector3(u.getPlayer().getVelocity()));
            pl.setYaw(u.getPlayer().getYaw());
            pl.setPitch(u.getPlayer().getPitch());

            if (u.getFired()) {
                playerList.forEach((otherPid, ip) -> {
                    if (!otherPid.equals(pid)) {
                        InternalPlayer other = playerList.get(otherPid);
                        if (other != null) {
                            other.getFireEvents().add(pid);
                        }
                    }
                });
            }

            u.getDamagesList().forEach(damage -> {
                InternalPlayer damagedPl = playerList.get(damage.getPid());
                if (damagedPl != null) {
                    damagedPl.getDamageEvents().add(new InternalDamage(pid, damage.getDamage()));
                }
            });
        } finally {
            lock.unlock();
        }

        // make response
        Response res = Response.newBuilder()
                .setUpdateResponse(
                        makeUpdateResponse(pid)
                ).build();
        conn.send(res.toByteArray());
    }

    private UpdateResponse makeUpdateResponse(String forPid) {
        Lock r = playerListLock.writeLock();
        try {
            r.lock();
            return UpdateResponse.newBuilder().addAllPlayers(
                playerList.values().stream().map(internalPlayer -> makePlayerResponseNoLock(forPid, internalPlayer)).toList()
            ).build();
        } finally {
            r.unlock();
        }
    }

    private PlayerUpdateResponse makePlayerResponseNoLock(String forPid, InternalPlayer pl) {
        Vector3 position=toProtoVector3(pl.getPosition());
        Vector3 velocity=toProtoVector3(pl.getVelocity());
        float yaw=pl.getYaw();
        float pitch=pl.getPitch();

        boolean fired = false;
        if (pl.getFireEvents().contains(forPid)) {
            fired = true;
            pl.getFireEvents().remove(forPid);
        }

        boolean dead = pl.isDead();

        var b = PlayerUpdateResponse.newBuilder()
                .setPlayer(Player.newBuilder()
                        .setPosition(position)
                        .setVelocity(velocity)
                        .setYaw(yaw)
                        .setPitch(pitch)
                        .build()
                )
                .setPid(pl.getPid())
                .setFired(fired);
        if (forPid.equals(pl.getPid())) {
            b.addAllDamages(
                    pl.getDamageEvents()
                            .stream()
                            .map(d ->
                                    DamageResponse
                                            .newBuilder()
                                            .setBy(d.damagedBy())
                                            .setAmount(d.amount())
                                            .build())
                            .toList()
            );
            pl.getDamageEvents().clear();
        }

        return b.build();
    }

    private void handleDeadUpdate(WebSocket conn, DeadUpdate u) {
        Lock l = playerListLock.writeLock();
        try {
            l.lock();
            InternalPlayer ip = playerList.get(u.getPid());
            if (ip != null) {
                ip.setDead(true);
            }
            logger.debug("player " + u.getPid() + " is dead");
        } finally {
            l.unlock();
        }
    }

    private void handleRespawn(WebSocket conn, RespawnRequest u) {
        Lock l = playerListLock.writeLock();
        try {
            l.lock();
            InternalPlayer ip = playerList.get(u.getPid());
            if (ip != null) {
                ip.setDead(false);
            }
            logger.debug("player " + u.getPid() + " respawned");
        } finally {
            l.unlock();
        }
    }

    private float[] toInternalVector3(Vector3 v3) {
        return new float[] {
                v3.getX(), v3.getY(), v3.getZ()
        };
    }

    private Vector3 toProtoVector3(float[] v) {
        return Vector3.newBuilder().setX(v[0]).setY(v[1]).setZ(v[2]).build();
    }

    private String generatePid() {
        return UUID.randomUUID().toString();
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        if (conn != null) {
            // some errors like port binding failed may not be assignable to a specific websocket
        }
    }

    @Override
    public void onStart() {
        System.out.println("Server started!");
        setConnectionLostTimeout(0);
        setConnectionLostTimeout(100);
    }

}