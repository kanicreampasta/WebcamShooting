// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game.proto

package one.panda_number.wcs.protos;

/**
 * Protobuf type {@code webcamshooting.PlayerUpdateResponse}
 */
public final class PlayerUpdateResponse extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:webcamshooting.PlayerUpdateResponse)
    PlayerUpdateResponseOrBuilder {
private static final long serialVersionUID = 0L;
  // Use PlayerUpdateResponse.newBuilder() to construct.
  private PlayerUpdateResponse(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private PlayerUpdateResponse() {
    pid_ = "";
    damages_ = java.util.Collections.emptyList();
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new PlayerUpdateResponse();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private PlayerUpdateResponse(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
    int mutable_bitField0_ = 0;
    com.google.protobuf.UnknownFieldSet.Builder unknownFields =
        com.google.protobuf.UnknownFieldSet.newBuilder();
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          case 10: {
            java.lang.String s = input.readStringRequireUtf8();

            pid_ = s;
            break;
          }
          case 18: {
            one.panda_number.wcs.protos.Player.Builder subBuilder = null;
            if (player_ != null) {
              subBuilder = player_.toBuilder();
            }
            player_ = input.readMessage(one.panda_number.wcs.protos.Player.parser(), extensionRegistry);
            if (subBuilder != null) {
              subBuilder.mergeFrom(player_);
              player_ = subBuilder.buildPartial();
            }

            break;
          }
          case 24: {

            dead_ = input.readBool();
            break;
          }
          case 48: {

            fired_ = input.readBool();
            break;
          }
          case 58: {
            if (!((mutable_bitField0_ & 0x00000001) != 0)) {
              damages_ = new java.util.ArrayList<one.panda_number.wcs.protos.DamageResponse>();
              mutable_bitField0_ |= 0x00000001;
            }
            damages_.add(
                input.readMessage(one.panda_number.wcs.protos.DamageResponse.parser(), extensionRegistry));
            break;
          }
          default: {
            if (!parseUnknownField(
                input, unknownFields, extensionRegistry, tag)) {
              done = true;
            }
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (com.google.protobuf.UninitializedMessageException e) {
      throw e.asInvalidProtocolBufferException().setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(
          e).setUnfinishedMessage(this);
    } finally {
      if (((mutable_bitField0_ & 0x00000001) != 0)) {
        damages_ = java.util.Collections.unmodifiableList(damages_);
      }
      this.unknownFields = unknownFields.build();
      makeExtensionsImmutable();
    }
  }
  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PlayerUpdateResponse_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PlayerUpdateResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            one.panda_number.wcs.protos.PlayerUpdateResponse.class, one.panda_number.wcs.protos.PlayerUpdateResponse.Builder.class);
  }

  public static final int PID_FIELD_NUMBER = 1;
  private volatile java.lang.Object pid_;
  /**
   * <code>string pid = 1;</code>
   * @return The pid.
   */
  @java.lang.Override
  public java.lang.String getPid() {
    java.lang.Object ref = pid_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      pid_ = s;
      return s;
    }
  }
  /**
   * <code>string pid = 1;</code>
   * @return The bytes for pid.
   */
  @java.lang.Override
  public com.google.protobuf.ByteString
      getPidBytes() {
    java.lang.Object ref = pid_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      pid_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  public static final int PLAYER_FIELD_NUMBER = 2;
  private one.panda_number.wcs.protos.Player player_;
  /**
   * <code>.webcamshooting.Player player = 2;</code>
   * @return Whether the player field is set.
   */
  @java.lang.Override
  public boolean hasPlayer() {
    return player_ != null;
  }
  /**
   * <code>.webcamshooting.Player player = 2;</code>
   * @return The player.
   */
  @java.lang.Override
  public one.panda_number.wcs.protos.Player getPlayer() {
    return player_ == null ? one.panda_number.wcs.protos.Player.getDefaultInstance() : player_;
  }
  /**
   * <code>.webcamshooting.Player player = 2;</code>
   */
  @java.lang.Override
  public one.panda_number.wcs.protos.PlayerOrBuilder getPlayerOrBuilder() {
    return getPlayer();
  }

  public static final int DEAD_FIELD_NUMBER = 3;
  private boolean dead_;
  /**
   * <code>bool dead = 3;</code>
   * @return The dead.
   */
  @java.lang.Override
  public boolean getDead() {
    return dead_;
  }

  public static final int FIRED_FIELD_NUMBER = 6;
  private boolean fired_;
  /**
   * <code>bool fired = 6;</code>
   * @return The fired.
   */
  @java.lang.Override
  public boolean getFired() {
    return fired_;
  }

  public static final int DAMAGES_FIELD_NUMBER = 7;
  private java.util.List<one.panda_number.wcs.protos.DamageResponse> damages_;
  /**
   * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
   */
  @java.lang.Override
  public java.util.List<one.panda_number.wcs.protos.DamageResponse> getDamagesList() {
    return damages_;
  }
  /**
   * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
   */
  @java.lang.Override
  public java.util.List<? extends one.panda_number.wcs.protos.DamageResponseOrBuilder> 
      getDamagesOrBuilderList() {
    return damages_;
  }
  /**
   * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
   */
  @java.lang.Override
  public int getDamagesCount() {
    return damages_.size();
  }
  /**
   * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
   */
  @java.lang.Override
  public one.panda_number.wcs.protos.DamageResponse getDamages(int index) {
    return damages_.get(index);
  }
  /**
   * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
   */
  @java.lang.Override
  public one.panda_number.wcs.protos.DamageResponseOrBuilder getDamagesOrBuilder(
      int index) {
    return damages_.get(index);
  }

  private byte memoizedIsInitialized = -1;
  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(pid_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, pid_);
    }
    if (player_ != null) {
      output.writeMessage(2, getPlayer());
    }
    if (dead_ != false) {
      output.writeBool(3, dead_);
    }
    if (fired_ != false) {
      output.writeBool(6, fired_);
    }
    for (int i = 0; i < damages_.size(); i++) {
      output.writeMessage(7, damages_.get(i));
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(pid_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, pid_);
    }
    if (player_ != null) {
      size += com.google.protobuf.CodedOutputStream
        .computeMessageSize(2, getPlayer());
    }
    if (dead_ != false) {
      size += com.google.protobuf.CodedOutputStream
        .computeBoolSize(3, dead_);
    }
    if (fired_ != false) {
      size += com.google.protobuf.CodedOutputStream
        .computeBoolSize(6, fired_);
    }
    for (int i = 0; i < damages_.size(); i++) {
      size += com.google.protobuf.CodedOutputStream
        .computeMessageSize(7, damages_.get(i));
    }
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof one.panda_number.wcs.protos.PlayerUpdateResponse)) {
      return super.equals(obj);
    }
    one.panda_number.wcs.protos.PlayerUpdateResponse other = (one.panda_number.wcs.protos.PlayerUpdateResponse) obj;

    if (!getPid()
        .equals(other.getPid())) return false;
    if (hasPlayer() != other.hasPlayer()) return false;
    if (hasPlayer()) {
      if (!getPlayer()
          .equals(other.getPlayer())) return false;
    }
    if (getDead()
        != other.getDead()) return false;
    if (getFired()
        != other.getFired()) return false;
    if (!getDamagesList()
        .equals(other.getDamagesList())) return false;
    if (!unknownFields.equals(other.unknownFields)) return false;
    return true;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + PID_FIELD_NUMBER;
    hash = (53 * hash) + getPid().hashCode();
    if (hasPlayer()) {
      hash = (37 * hash) + PLAYER_FIELD_NUMBER;
      hash = (53 * hash) + getPlayer().hashCode();
    }
    hash = (37 * hash) + DEAD_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashBoolean(
        getDead());
    hash = (37 * hash) + FIRED_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashBoolean(
        getFired());
    if (getDamagesCount() > 0) {
      hash = (37 * hash) + DAMAGES_FIELD_NUMBER;
      hash = (53 * hash) + getDamagesList().hashCode();
    }
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PlayerUpdateResponse parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(one.panda_number.wcs.protos.PlayerUpdateResponse prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code webcamshooting.PlayerUpdateResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:webcamshooting.PlayerUpdateResponse)
      one.panda_number.wcs.protos.PlayerUpdateResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PlayerUpdateResponse_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PlayerUpdateResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              one.panda_number.wcs.protos.PlayerUpdateResponse.class, one.panda_number.wcs.protos.PlayerUpdateResponse.Builder.class);
    }

    // Construct using one.panda_number.wcs.protos.PlayerUpdateResponse.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3
              .alwaysUseFieldBuilders) {
        getDamagesFieldBuilder();
      }
    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      pid_ = "";

      if (playerBuilder_ == null) {
        player_ = null;
      } else {
        player_ = null;
        playerBuilder_ = null;
      }
      dead_ = false;

      fired_ = false;

      if (damagesBuilder_ == null) {
        damages_ = java.util.Collections.emptyList();
        bitField0_ = (bitField0_ & ~0x00000001);
      } else {
        damagesBuilder_.clear();
      }
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PlayerUpdateResponse_descriptor;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PlayerUpdateResponse getDefaultInstanceForType() {
      return one.panda_number.wcs.protos.PlayerUpdateResponse.getDefaultInstance();
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PlayerUpdateResponse build() {
      one.panda_number.wcs.protos.PlayerUpdateResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PlayerUpdateResponse buildPartial() {
      one.panda_number.wcs.protos.PlayerUpdateResponse result = new one.panda_number.wcs.protos.PlayerUpdateResponse(this);
      int from_bitField0_ = bitField0_;
      result.pid_ = pid_;
      if (playerBuilder_ == null) {
        result.player_ = player_;
      } else {
        result.player_ = playerBuilder_.build();
      }
      result.dead_ = dead_;
      result.fired_ = fired_;
      if (damagesBuilder_ == null) {
        if (((bitField0_ & 0x00000001) != 0)) {
          damages_ = java.util.Collections.unmodifiableList(damages_);
          bitField0_ = (bitField0_ & ~0x00000001);
        }
        result.damages_ = damages_;
      } else {
        result.damages_ = damagesBuilder_.build();
      }
      onBuilt();
      return result;
    }

    @java.lang.Override
    public Builder clone() {
      return super.clone();
    }
    @java.lang.Override
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.setField(field, value);
    }
    @java.lang.Override
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return super.clearField(field);
    }
    @java.lang.Override
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return super.clearOneof(oneof);
    }
    @java.lang.Override
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, java.lang.Object value) {
      return super.setRepeatedField(field, index, value);
    }
    @java.lang.Override
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.addRepeatedField(field, value);
    }
    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof one.panda_number.wcs.protos.PlayerUpdateResponse) {
        return mergeFrom((one.panda_number.wcs.protos.PlayerUpdateResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(one.panda_number.wcs.protos.PlayerUpdateResponse other) {
      if (other == one.panda_number.wcs.protos.PlayerUpdateResponse.getDefaultInstance()) return this;
      if (!other.getPid().isEmpty()) {
        pid_ = other.pid_;
        onChanged();
      }
      if (other.hasPlayer()) {
        mergePlayer(other.getPlayer());
      }
      if (other.getDead() != false) {
        setDead(other.getDead());
      }
      if (other.getFired() != false) {
        setFired(other.getFired());
      }
      if (damagesBuilder_ == null) {
        if (!other.damages_.isEmpty()) {
          if (damages_.isEmpty()) {
            damages_ = other.damages_;
            bitField0_ = (bitField0_ & ~0x00000001);
          } else {
            ensureDamagesIsMutable();
            damages_.addAll(other.damages_);
          }
          onChanged();
        }
      } else {
        if (!other.damages_.isEmpty()) {
          if (damagesBuilder_.isEmpty()) {
            damagesBuilder_.dispose();
            damagesBuilder_ = null;
            damages_ = other.damages_;
            bitField0_ = (bitField0_ & ~0x00000001);
            damagesBuilder_ = 
              com.google.protobuf.GeneratedMessageV3.alwaysUseFieldBuilders ?
                 getDamagesFieldBuilder() : null;
          } else {
            damagesBuilder_.addAllMessages(other.damages_);
          }
        }
      }
      this.mergeUnknownFields(other.unknownFields);
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      one.panda_number.wcs.protos.PlayerUpdateResponse parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (one.panda_number.wcs.protos.PlayerUpdateResponse) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }
    private int bitField0_;

    private java.lang.Object pid_ = "";
    /**
     * <code>string pid = 1;</code>
     * @return The pid.
     */
    public java.lang.String getPid() {
      java.lang.Object ref = pid_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        pid_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string pid = 1;</code>
     * @return The bytes for pid.
     */
    public com.google.protobuf.ByteString
        getPidBytes() {
      java.lang.Object ref = pid_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        pid_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string pid = 1;</code>
     * @param value The pid to set.
     * @return This builder for chaining.
     */
    public Builder setPid(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      pid_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string pid = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearPid() {
      
      pid_ = getDefaultInstance().getPid();
      onChanged();
      return this;
    }
    /**
     * <code>string pid = 1;</code>
     * @param value The bytes for pid to set.
     * @return This builder for chaining.
     */
    public Builder setPidBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      pid_ = value;
      onChanged();
      return this;
    }

    private one.panda_number.wcs.protos.Player player_;
    private com.google.protobuf.SingleFieldBuilderV3<
        one.panda_number.wcs.protos.Player, one.panda_number.wcs.protos.Player.Builder, one.panda_number.wcs.protos.PlayerOrBuilder> playerBuilder_;
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     * @return Whether the player field is set.
     */
    public boolean hasPlayer() {
      return playerBuilder_ != null || player_ != null;
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     * @return The player.
     */
    public one.panda_number.wcs.protos.Player getPlayer() {
      if (playerBuilder_ == null) {
        return player_ == null ? one.panda_number.wcs.protos.Player.getDefaultInstance() : player_;
      } else {
        return playerBuilder_.getMessage();
      }
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public Builder setPlayer(one.panda_number.wcs.protos.Player value) {
      if (playerBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        player_ = value;
        onChanged();
      } else {
        playerBuilder_.setMessage(value);
      }

      return this;
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public Builder setPlayer(
        one.panda_number.wcs.protos.Player.Builder builderForValue) {
      if (playerBuilder_ == null) {
        player_ = builderForValue.build();
        onChanged();
      } else {
        playerBuilder_.setMessage(builderForValue.build());
      }

      return this;
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public Builder mergePlayer(one.panda_number.wcs.protos.Player value) {
      if (playerBuilder_ == null) {
        if (player_ != null) {
          player_ =
            one.panda_number.wcs.protos.Player.newBuilder(player_).mergeFrom(value).buildPartial();
        } else {
          player_ = value;
        }
        onChanged();
      } else {
        playerBuilder_.mergeFrom(value);
      }

      return this;
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public Builder clearPlayer() {
      if (playerBuilder_ == null) {
        player_ = null;
        onChanged();
      } else {
        player_ = null;
        playerBuilder_ = null;
      }

      return this;
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public one.panda_number.wcs.protos.Player.Builder getPlayerBuilder() {
      
      onChanged();
      return getPlayerFieldBuilder().getBuilder();
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    public one.panda_number.wcs.protos.PlayerOrBuilder getPlayerOrBuilder() {
      if (playerBuilder_ != null) {
        return playerBuilder_.getMessageOrBuilder();
      } else {
        return player_ == null ?
            one.panda_number.wcs.protos.Player.getDefaultInstance() : player_;
      }
    }
    /**
     * <code>.webcamshooting.Player player = 2;</code>
     */
    private com.google.protobuf.SingleFieldBuilderV3<
        one.panda_number.wcs.protos.Player, one.panda_number.wcs.protos.Player.Builder, one.panda_number.wcs.protos.PlayerOrBuilder> 
        getPlayerFieldBuilder() {
      if (playerBuilder_ == null) {
        playerBuilder_ = new com.google.protobuf.SingleFieldBuilderV3<
            one.panda_number.wcs.protos.Player, one.panda_number.wcs.protos.Player.Builder, one.panda_number.wcs.protos.PlayerOrBuilder>(
                getPlayer(),
                getParentForChildren(),
                isClean());
        player_ = null;
      }
      return playerBuilder_;
    }

    private boolean dead_ ;
    /**
     * <code>bool dead = 3;</code>
     * @return The dead.
     */
    @java.lang.Override
    public boolean getDead() {
      return dead_;
    }
    /**
     * <code>bool dead = 3;</code>
     * @param value The dead to set.
     * @return This builder for chaining.
     */
    public Builder setDead(boolean value) {
      
      dead_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>bool dead = 3;</code>
     * @return This builder for chaining.
     */
    public Builder clearDead() {
      
      dead_ = false;
      onChanged();
      return this;
    }

    private boolean fired_ ;
    /**
     * <code>bool fired = 6;</code>
     * @return The fired.
     */
    @java.lang.Override
    public boolean getFired() {
      return fired_;
    }
    /**
     * <code>bool fired = 6;</code>
     * @param value The fired to set.
     * @return This builder for chaining.
     */
    public Builder setFired(boolean value) {
      
      fired_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>bool fired = 6;</code>
     * @return This builder for chaining.
     */
    public Builder clearFired() {
      
      fired_ = false;
      onChanged();
      return this;
    }

    private java.util.List<one.panda_number.wcs.protos.DamageResponse> damages_ =
      java.util.Collections.emptyList();
    private void ensureDamagesIsMutable() {
      if (!((bitField0_ & 0x00000001) != 0)) {
        damages_ = new java.util.ArrayList<one.panda_number.wcs.protos.DamageResponse>(damages_);
        bitField0_ |= 0x00000001;
       }
    }

    private com.google.protobuf.RepeatedFieldBuilderV3<
        one.panda_number.wcs.protos.DamageResponse, one.panda_number.wcs.protos.DamageResponse.Builder, one.panda_number.wcs.protos.DamageResponseOrBuilder> damagesBuilder_;

    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public java.util.List<one.panda_number.wcs.protos.DamageResponse> getDamagesList() {
      if (damagesBuilder_ == null) {
        return java.util.Collections.unmodifiableList(damages_);
      } else {
        return damagesBuilder_.getMessageList();
      }
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public int getDamagesCount() {
      if (damagesBuilder_ == null) {
        return damages_.size();
      } else {
        return damagesBuilder_.getCount();
      }
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public one.panda_number.wcs.protos.DamageResponse getDamages(int index) {
      if (damagesBuilder_ == null) {
        return damages_.get(index);
      } else {
        return damagesBuilder_.getMessage(index);
      }
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder setDamages(
        int index, one.panda_number.wcs.protos.DamageResponse value) {
      if (damagesBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureDamagesIsMutable();
        damages_.set(index, value);
        onChanged();
      } else {
        damagesBuilder_.setMessage(index, value);
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder setDamages(
        int index, one.panda_number.wcs.protos.DamageResponse.Builder builderForValue) {
      if (damagesBuilder_ == null) {
        ensureDamagesIsMutable();
        damages_.set(index, builderForValue.build());
        onChanged();
      } else {
        damagesBuilder_.setMessage(index, builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder addDamages(one.panda_number.wcs.protos.DamageResponse value) {
      if (damagesBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureDamagesIsMutable();
        damages_.add(value);
        onChanged();
      } else {
        damagesBuilder_.addMessage(value);
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder addDamages(
        int index, one.panda_number.wcs.protos.DamageResponse value) {
      if (damagesBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        ensureDamagesIsMutable();
        damages_.add(index, value);
        onChanged();
      } else {
        damagesBuilder_.addMessage(index, value);
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder addDamages(
        one.panda_number.wcs.protos.DamageResponse.Builder builderForValue) {
      if (damagesBuilder_ == null) {
        ensureDamagesIsMutable();
        damages_.add(builderForValue.build());
        onChanged();
      } else {
        damagesBuilder_.addMessage(builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder addDamages(
        int index, one.panda_number.wcs.protos.DamageResponse.Builder builderForValue) {
      if (damagesBuilder_ == null) {
        ensureDamagesIsMutable();
        damages_.add(index, builderForValue.build());
        onChanged();
      } else {
        damagesBuilder_.addMessage(index, builderForValue.build());
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder addAllDamages(
        java.lang.Iterable<? extends one.panda_number.wcs.protos.DamageResponse> values) {
      if (damagesBuilder_ == null) {
        ensureDamagesIsMutable();
        com.google.protobuf.AbstractMessageLite.Builder.addAll(
            values, damages_);
        onChanged();
      } else {
        damagesBuilder_.addAllMessages(values);
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder clearDamages() {
      if (damagesBuilder_ == null) {
        damages_ = java.util.Collections.emptyList();
        bitField0_ = (bitField0_ & ~0x00000001);
        onChanged();
      } else {
        damagesBuilder_.clear();
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public Builder removeDamages(int index) {
      if (damagesBuilder_ == null) {
        ensureDamagesIsMutable();
        damages_.remove(index);
        onChanged();
      } else {
        damagesBuilder_.remove(index);
      }
      return this;
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public one.panda_number.wcs.protos.DamageResponse.Builder getDamagesBuilder(
        int index) {
      return getDamagesFieldBuilder().getBuilder(index);
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public one.panda_number.wcs.protos.DamageResponseOrBuilder getDamagesOrBuilder(
        int index) {
      if (damagesBuilder_ == null) {
        return damages_.get(index);  } else {
        return damagesBuilder_.getMessageOrBuilder(index);
      }
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public java.util.List<? extends one.panda_number.wcs.protos.DamageResponseOrBuilder> 
         getDamagesOrBuilderList() {
      if (damagesBuilder_ != null) {
        return damagesBuilder_.getMessageOrBuilderList();
      } else {
        return java.util.Collections.unmodifiableList(damages_);
      }
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public one.panda_number.wcs.protos.DamageResponse.Builder addDamagesBuilder() {
      return getDamagesFieldBuilder().addBuilder(
          one.panda_number.wcs.protos.DamageResponse.getDefaultInstance());
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public one.panda_number.wcs.protos.DamageResponse.Builder addDamagesBuilder(
        int index) {
      return getDamagesFieldBuilder().addBuilder(
          index, one.panda_number.wcs.protos.DamageResponse.getDefaultInstance());
    }
    /**
     * <code>repeated .webcamshooting.DamageResponse damages = 7;</code>
     */
    public java.util.List<one.panda_number.wcs.protos.DamageResponse.Builder> 
         getDamagesBuilderList() {
      return getDamagesFieldBuilder().getBuilderList();
    }
    private com.google.protobuf.RepeatedFieldBuilderV3<
        one.panda_number.wcs.protos.DamageResponse, one.panda_number.wcs.protos.DamageResponse.Builder, one.panda_number.wcs.protos.DamageResponseOrBuilder> 
        getDamagesFieldBuilder() {
      if (damagesBuilder_ == null) {
        damagesBuilder_ = new com.google.protobuf.RepeatedFieldBuilderV3<
            one.panda_number.wcs.protos.DamageResponse, one.panda_number.wcs.protos.DamageResponse.Builder, one.panda_number.wcs.protos.DamageResponseOrBuilder>(
                damages_,
                ((bitField0_ & 0x00000001) != 0),
                getParentForChildren(),
                isClean());
        damages_ = null;
      }
      return damagesBuilder_;
    }
    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFields(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }


    // @@protoc_insertion_point(builder_scope:webcamshooting.PlayerUpdateResponse)
  }

  // @@protoc_insertion_point(class_scope:webcamshooting.PlayerUpdateResponse)
  private static final one.panda_number.wcs.protos.PlayerUpdateResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new one.panda_number.wcs.protos.PlayerUpdateResponse();
  }

  public static one.panda_number.wcs.protos.PlayerUpdateResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<PlayerUpdateResponse>
      PARSER = new com.google.protobuf.AbstractParser<PlayerUpdateResponse>() {
    @java.lang.Override
    public PlayerUpdateResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new PlayerUpdateResponse(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<PlayerUpdateResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<PlayerUpdateResponse> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public one.panda_number.wcs.protos.PlayerUpdateResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

