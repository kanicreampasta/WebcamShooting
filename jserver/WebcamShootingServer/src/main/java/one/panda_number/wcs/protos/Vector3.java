// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game.proto

package one.panda_number.wcs.protos;

/**
 * Protobuf type {@code webcamshooting.Vector3}
 */
public final class Vector3 extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:webcamshooting.Vector3)
    Vector3OrBuilder {
private static final long serialVersionUID = 0L;
  // Use Vector3.newBuilder() to construct.
  private Vector3(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private Vector3() {
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new Vector3();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private Vector3(
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
          case 13: {

            x_ = input.readFloat();
            break;
          }
          case 21: {

            y_ = input.readFloat();
            break;
          }
          case 29: {

            z_ = input.readFloat();
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
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_Vector3_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_Vector3_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            one.panda_number.wcs.protos.Vector3.class, one.panda_number.wcs.protos.Vector3.Builder.class);
  }

  public static final int X_FIELD_NUMBER = 1;
  private float x_;
  /**
   * <code>float x = 1;</code>
   * @return The x.
   */
  @java.lang.Override
  public float getX() {
    return x_;
  }

  public static final int Y_FIELD_NUMBER = 2;
  private float y_;
  /**
   * <code>float y = 2;</code>
   * @return The y.
   */
  @java.lang.Override
  public float getY() {
    return y_;
  }

  public static final int Z_FIELD_NUMBER = 3;
  private float z_;
  /**
   * <code>float z = 3;</code>
   * @return The z.
   */
  @java.lang.Override
  public float getZ() {
    return z_;
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
    if (java.lang.Float.floatToRawIntBits(x_) != 0) {
      output.writeFloat(1, x_);
    }
    if (java.lang.Float.floatToRawIntBits(y_) != 0) {
      output.writeFloat(2, y_);
    }
    if (java.lang.Float.floatToRawIntBits(z_) != 0) {
      output.writeFloat(3, z_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (java.lang.Float.floatToRawIntBits(x_) != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeFloatSize(1, x_);
    }
    if (java.lang.Float.floatToRawIntBits(y_) != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeFloatSize(2, y_);
    }
    if (java.lang.Float.floatToRawIntBits(z_) != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeFloatSize(3, z_);
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
    if (!(obj instanceof one.panda_number.wcs.protos.Vector3)) {
      return super.equals(obj);
    }
    one.panda_number.wcs.protos.Vector3 other = (one.panda_number.wcs.protos.Vector3) obj;

    if (java.lang.Float.floatToIntBits(getX())
        != java.lang.Float.floatToIntBits(
            other.getX())) return false;
    if (java.lang.Float.floatToIntBits(getY())
        != java.lang.Float.floatToIntBits(
            other.getY())) return false;
    if (java.lang.Float.floatToIntBits(getZ())
        != java.lang.Float.floatToIntBits(
            other.getZ())) return false;
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
    hash = (37 * hash) + X_FIELD_NUMBER;
    hash = (53 * hash) + java.lang.Float.floatToIntBits(
        getX());
    hash = (37 * hash) + Y_FIELD_NUMBER;
    hash = (53 * hash) + java.lang.Float.floatToIntBits(
        getY());
    hash = (37 * hash) + Z_FIELD_NUMBER;
    hash = (53 * hash) + java.lang.Float.floatToIntBits(
        getZ());
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.Vector3 parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.Vector3 parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static one.panda_number.wcs.protos.Vector3 parseFrom(
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
  public static Builder newBuilder(one.panda_number.wcs.protos.Vector3 prototype) {
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
   * Protobuf type {@code webcamshooting.Vector3}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:webcamshooting.Vector3)
      one.panda_number.wcs.protos.Vector3OrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_Vector3_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_Vector3_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              one.panda_number.wcs.protos.Vector3.class, one.panda_number.wcs.protos.Vector3.Builder.class);
    }

    // Construct using one.panda_number.wcs.protos.Vector3.newBuilder()
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
      x_ = 0F;

      y_ = 0F;

      z_ = 0F;

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return one.panda_number.wcs.protos.GameProtos.internal_static_webcamshooting_Vector3_descriptor;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.Vector3 getDefaultInstanceForType() {
      return one.panda_number.wcs.protos.Vector3.getDefaultInstance();
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.Vector3 build() {
      one.panda_number.wcs.protos.Vector3 result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public one.panda_number.wcs.protos.Vector3 buildPartial() {
      one.panda_number.wcs.protos.Vector3 result = new one.panda_number.wcs.protos.Vector3(this);
      result.x_ = x_;
      result.y_ = y_;
      result.z_ = z_;
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
      if (other instanceof one.panda_number.wcs.protos.Vector3) {
        return mergeFrom((one.panda_number.wcs.protos.Vector3)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(one.panda_number.wcs.protos.Vector3 other) {
      if (other == one.panda_number.wcs.protos.Vector3.getDefaultInstance()) return this;
      if (other.getX() != 0F) {
        setX(other.getX());
      }
      if (other.getY() != 0F) {
        setY(other.getY());
      }
      if (other.getZ() != 0F) {
        setZ(other.getZ());
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
      one.panda_number.wcs.protos.Vector3 parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (one.panda_number.wcs.protos.Vector3) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private float x_ ;
    /**
     * <code>float x = 1;</code>
     * @return The x.
     */
    @java.lang.Override
    public float getX() {
      return x_;
    }
    /**
     * <code>float x = 1;</code>
     * @param value The x to set.
     * @return This builder for chaining.
     */
    public Builder setX(float value) {
      
      x_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>float x = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearX() {
      
      x_ = 0F;
      onChanged();
      return this;
    }

    private float y_ ;
    /**
     * <code>float y = 2;</code>
     * @return The y.
     */
    @java.lang.Override
    public float getY() {
      return y_;
    }
    /**
     * <code>float y = 2;</code>
     * @param value The y to set.
     * @return This builder for chaining.
     */
    public Builder setY(float value) {
      
      y_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>float y = 2;</code>
     * @return This builder for chaining.
     */
    public Builder clearY() {
      
      y_ = 0F;
      onChanged();
      return this;
    }

    private float z_ ;
    /**
     * <code>float z = 3;</code>
     * @return The z.
     */
    @java.lang.Override
    public float getZ() {
      return z_;
    }
    /**
     * <code>float z = 3;</code>
     * @param value The z to set.
     * @return This builder for chaining.
     */
    public Builder setZ(float value) {
      
      z_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>float z = 3;</code>
     * @return This builder for chaining.
     */
    public Builder clearZ() {
      
      z_ = 0F;
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


    // @@protoc_insertion_point(builder_scope:webcamshooting.Vector3)
  }

  // @@protoc_insertion_point(class_scope:webcamshooting.Vector3)
  private static final one.panda_number.wcs.protos.Vector3 DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new one.panda_number.wcs.protos.Vector3();
  }

  public static one.panda_number.wcs.protos.Vector3 getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<Vector3>
      PARSER = new com.google.protobuf.AbstractParser<Vector3>() {
    @java.lang.Override
    public Vector3 parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new Vector3(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<Vector3> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<Vector3> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public one.panda_number.wcs.protos.Vector3 getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

