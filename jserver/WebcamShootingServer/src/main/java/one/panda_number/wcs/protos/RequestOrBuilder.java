// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game.proto

package one.panda_number.wcs.protos;

public interface RequestOrBuilder extends
    // @@protoc_insertion_point(interface_extends:webcamshooting.Request)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>.webcamshooting.JoinRequest join_request = 1;</code>
   * @return Whether the joinRequest field is set.
   */
  boolean hasJoinRequest();
  /**
   * <code>.webcamshooting.JoinRequest join_request = 1;</code>
   * @return The joinRequest.
   */
  one.panda_number.wcs.protos.JoinRequest getJoinRequest();
  /**
   * <code>.webcamshooting.JoinRequest join_request = 1;</code>
   */
  one.panda_number.wcs.protos.JoinRequestOrBuilder getJoinRequestOrBuilder();

  /**
   * <code>.webcamshooting.ClientUpdate client_update = 2;</code>
   * @return Whether the clientUpdate field is set.
   */
  boolean hasClientUpdate();
  /**
   * <code>.webcamshooting.ClientUpdate client_update = 2;</code>
   * @return The clientUpdate.
   */
  one.panda_number.wcs.protos.ClientUpdate getClientUpdate();
  /**
   * <code>.webcamshooting.ClientUpdate client_update = 2;</code>
   */
  one.panda_number.wcs.protos.ClientUpdateOrBuilder getClientUpdateOrBuilder();

  /**
   * <code>.webcamshooting.DeadUpdate dead_update = 3;</code>
   * @return Whether the deadUpdate field is set.
   */
  boolean hasDeadUpdate();
  /**
   * <code>.webcamshooting.DeadUpdate dead_update = 3;</code>
   * @return The deadUpdate.
   */
  one.panda_number.wcs.protos.DeadUpdate getDeadUpdate();
  /**
   * <code>.webcamshooting.DeadUpdate dead_update = 3;</code>
   */
  one.panda_number.wcs.protos.DeadUpdateOrBuilder getDeadUpdateOrBuilder();

  /**
   * <code>.webcamshooting.RespawnRequest respawn_request = 4;</code>
   * @return Whether the respawnRequest field is set.
   */
  boolean hasRespawnRequest();
  /**
   * <code>.webcamshooting.RespawnRequest respawn_request = 4;</code>
   * @return The respawnRequest.
   */
  one.panda_number.wcs.protos.RespawnRequest getRespawnRequest();
  /**
   * <code>.webcamshooting.RespawnRequest respawn_request = 4;</code>
   */
  one.panda_number.wcs.protos.RespawnRequestOrBuilder getRespawnRequestOrBuilder();

  public one.panda_number.wcs.protos.Request.RequestOneofCase getRequestOneofCase();
}
