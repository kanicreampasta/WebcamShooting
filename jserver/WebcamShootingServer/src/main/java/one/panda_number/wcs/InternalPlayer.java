package one.panda_number.wcs;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class InternalPlayer {
    public InternalPlayer(String pid) {
        this.pid = pid;
        position = new float[]{0,0,0};
        velocity=new float[]{0,0,0};
        yaw=0;
        pitch=0;
        isDead=false;
        fireEvents=new HashSet<>();
        damageEvents=new ArrayList<>();
    }

    private String pid;
    private float[] position;
    private float[] velocity;
    private float yaw;
    private float pitch;

    private boolean isDead;

    private Set<String> fireEvents;
    private List<InternalDamage> damageEvents;

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public float[] getPosition() {
        return position;
    }

    public void setPosition(float[] position) {
        this.position = position;
    }

    public float[] getVelocity() {
        return velocity;
    }

    public void setVelocity(float[] velocity) {
        this.velocity = velocity;
    }

    public float getYaw() {
        return yaw;
    }

    public void setYaw(float yaw) {
        this.yaw = yaw;
    }

    public float getPitch() {
        return pitch;
    }

    public void setPitch(float pitch) {
        this.pitch = pitch;
    }

    public boolean isDead() {
        return isDead;
    }

    public void setDead(boolean dead) {
        isDead = dead;
    }

    public Set<String> getFireEvents() {
        return fireEvents;
    }

    public void setFireEvents(Set<String> fireEvents) {
        this.fireEvents = fireEvents;
    }

    public List<InternalDamage> getDamageEvents() {
        return damageEvents;
    }

    public void setDamageEvents(List<InternalDamage> damageEvents) {
        this.damageEvents = damageEvents;
    }
}
