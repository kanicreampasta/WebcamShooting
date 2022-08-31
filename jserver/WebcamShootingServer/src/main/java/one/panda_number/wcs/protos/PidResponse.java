// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game.proto

package one.panda_number.wcs.protos;

/**
 * Protobuf type {@code webcamshooting.PidResponse}
 */
public final class PidResponse extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:webcamshooting.PidResponse)
    PidResponseOrBuilder {
private static final long serialVersionUID = 0L;
  // Use PidResponse.newBuilder() to construct.
  private PidResponse(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private PidResponse() {
    pid_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new PidResponse();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private PidResponse(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
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
      this.unknownFields = unknownFields.build();
      makeExtensionsImmutable();
    }
  }
  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PidResponse_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PidResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            one.panda_number.wcs.protos.PidResponse.class, one.panda_number.wcs.protos.PidResponse.Builder.class);
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
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof one.panda_number.wcs.protos.PidResponse)) {
      return super.equals(obj);
    }
    one.panda_number.wcs.protos.PidResponse other = (one.panda_number.wcs.protos.PidResponse) obj;

    if (!getPid()
        .equals(other.getPid())) return false;
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
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PidResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PidResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.PidResponse parseFrom(
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
  public static Builder newBuilder(one.panda_number.wcs.protos.PidResponse prototype) {
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
   * Protobuf type {@code webcamshooting.PidResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:webcamshooting.PidResponse)
      one.panda_number.wcs.protos.PidResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PidResponse_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PidResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              one.panda_number.wcs.protos.PidResponse.class, one.panda_number.wcs.protos.PidResponse.Builder.class);
    }

    // Construct using one.panda_number.wcs.protos.PidResponse.newBuilder()
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
      }
    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      pid_ = "";

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_PidResponse_descriptor;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PidResponse getDefaultInstanceForType() {
      return one.panda_number.wcs.protos.PidResponse.getDefaultInstance();
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PidResponse build() {
      one.panda_number.wcs.protos.PidResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.PidResponse buildPartial() {
      one.panda_number.wcs.protos.PidResponse result = new one.panda_number.wcs.protos.PidResponse(this);
      result.pid_ = pid_;
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
      if (other instanceof one.panda_number.wcs.protos.PidResponse) {
        return mergeFrom((one.panda_number.wcs.protos.PidResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(one.panda_number.wcs.protos.PidResponse other) {
      if (other == one.panda_number.wcs.protos.PidResponse.getDefaultInstance()) return this;
      if (!other.getPid().isEmpty()) {
        pid_ = other.pid_;
        onChanged();
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
      one.panda_number.wcs.protos.PidResponse parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (one.panda_number.wcs.protos.PidResponse) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

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


    // @@protoc_insertion_point(builder_scope:webcamshooting.PidResponse)
  }

  // @@protoc_insertion_point(class_scope:webcamshooting.PidResponse)
  private static final one.panda_number.wcs.protos.PidResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new one.panda_number.wcs.protos.PidResponse();
  }

  public static one.panda_number.wcs.protos.PidResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<PidResponse>
      PARSER = new com.google.protobuf.AbstractParser<PidResponse>() {
    @java.lang.Override
    public PidResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new PidResponse(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<PidResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<PidResponse> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public one.panda_number.wcs.protos.PidResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

