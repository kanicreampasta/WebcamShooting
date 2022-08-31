package one.panda_number.wcs;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws InterruptedException, IOException {
        int port = 8887; // 843 flash policy port
        try {
            port = Integer.parseInt(args[0]);
        } catch (Exception ex) {
        }
        GameServer s = new GameServer(port);
        s.start();
        System.out.println("ChatServer started on port: " + s.getPort());
    }
}
