/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const webcamshooting = $root.webcamshooting = (() => {

    /**
     * Namespace webcamshooting.
     * @exports webcamshooting
     * @namespace
     */
    const webcamshooting = {};

    webcamshooting.Vector3 = (function() {

        /**
         * Properties of a Vector3.
         * @memberof webcamshooting
         * @interface IVector3
         * @property {number|null} [x] Vector3 x
         * @property {number|null} [y] Vector3 y
         * @property {number|null} [z] Vector3 z
         */

        /**
         * Constructs a new Vector3.
         * @memberof webcamshooting
         * @classdesc Represents a Vector3.
         * @implements IVector3
         * @constructor
         * @param {webcamshooting.IVector3=} [properties] Properties to set
         */
        function Vector3(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector3 x.
         * @member {number} x
         * @memberof webcamshooting.Vector3
         * @instance
         */
        Vector3.prototype.x = 0;

        /**
         * Vector3 y.
         * @member {number} y
         * @memberof webcamshooting.Vector3
         * @instance
         */
        Vector3.prototype.y = 0;

        /**
         * Vector3 z.
         * @member {number} z
         * @memberof webcamshooting.Vector3
         * @instance
         */
        Vector3.prototype.z = 0;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @function create
         * @memberof webcamshooting.Vector3
         * @static
         * @param {webcamshooting.IVector3=} [properties] Properties to set
         * @returns {webcamshooting.Vector3} Vector3 instance
         */
        Vector3.create = function create(properties) {
            return new Vector3(properties);
        };

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link webcamshooting.Vector3.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.Vector3
         * @static
         * @param {webcamshooting.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            return writer;
        };

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link webcamshooting.Vector3.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.Vector3
         * @static
         * @param {webcamshooting.IVector3} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.Vector3();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.x = reader.float();
                        break;
                    }
                case 2: {
                        message.y = reader.float();
                        break;
                    }
                case 3: {
                        message.z = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.Vector3} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector3 message.
         * @function verify
         * @memberof webcamshooting.Vector3
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector3.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.Vector3
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.Vector3} Vector3
         */
        Vector3.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.Vector3)
                return object;
            let message = new $root.webcamshooting.Vector3();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.Vector3
         * @static
         * @param {webcamshooting.Vector3} message Vector3
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector3.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Vector3 to JSON.
         * @function toJSON
         * @memberof webcamshooting.Vector3
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector3.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Vector3
         * @function getTypeUrl
         * @memberof webcamshooting.Vector3
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Vector3.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.Vector3";
        };

        return Vector3;
    })();

    webcamshooting.Damage = (function() {

        /**
         * Properties of a Damage.
         * @memberof webcamshooting
         * @interface IDamage
         * @property {string|null} [pid] Damage pid
         * @property {number|null} [damage] Damage damage
         */

        /**
         * Constructs a new Damage.
         * @memberof webcamshooting
         * @classdesc Represents a Damage.
         * @implements IDamage
         * @constructor
         * @param {webcamshooting.IDamage=} [properties] Properties to set
         */
        function Damage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Damage pid.
         * @member {string} pid
         * @memberof webcamshooting.Damage
         * @instance
         */
        Damage.prototype.pid = "";

        /**
         * Damage damage.
         * @member {number} damage
         * @memberof webcamshooting.Damage
         * @instance
         */
        Damage.prototype.damage = 0;

        /**
         * Creates a new Damage instance using the specified properties.
         * @function create
         * @memberof webcamshooting.Damage
         * @static
         * @param {webcamshooting.IDamage=} [properties] Properties to set
         * @returns {webcamshooting.Damage} Damage instance
         */
        Damage.create = function create(properties) {
            return new Damage(properties);
        };

        /**
         * Encodes the specified Damage message. Does not implicitly {@link webcamshooting.Damage.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.Damage
         * @static
         * @param {webcamshooting.IDamage} message Damage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Damage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            if (message.damage != null && Object.hasOwnProperty.call(message, "damage"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.damage);
            return writer;
        };

        /**
         * Encodes the specified Damage message, length delimited. Does not implicitly {@link webcamshooting.Damage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.Damage
         * @static
         * @param {webcamshooting.IDamage} message Damage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Damage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Damage message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.Damage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.Damage} Damage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Damage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.Damage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pid = reader.string();
                        break;
                    }
                case 2: {
                        message.damage = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Damage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.Damage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.Damage} Damage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Damage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Damage message.
         * @function verify
         * @memberof webcamshooting.Damage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Damage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            if (message.damage != null && message.hasOwnProperty("damage"))
                if (typeof message.damage !== "number")
                    return "damage: number expected";
            return null;
        };

        /**
         * Creates a Damage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.Damage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.Damage} Damage
         */
        Damage.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.Damage)
                return object;
            let message = new $root.webcamshooting.Damage();
            if (object.pid != null)
                message.pid = String(object.pid);
            if (object.damage != null)
                message.damage = Number(object.damage);
            return message;
        };

        /**
         * Creates a plain object from a Damage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.Damage
         * @static
         * @param {webcamshooting.Damage} message Damage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Damage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.pid = "";
                object.damage = 0;
            }
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            if (message.damage != null && message.hasOwnProperty("damage"))
                object.damage = options.json && !isFinite(message.damage) ? String(message.damage) : message.damage;
            return object;
        };

        /**
         * Converts this Damage to JSON.
         * @function toJSON
         * @memberof webcamshooting.Damage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Damage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Damage
         * @function getTypeUrl
         * @memberof webcamshooting.Damage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Damage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.Damage";
        };

        return Damage;
    })();

    webcamshooting.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof webcamshooting
         * @interface IPlayer
         * @property {webcamshooting.IVector3|null} [position] Player position
         * @property {webcamshooting.IVector3|null} [velocity] Player velocity
         * @property {number|null} [yaw] Player yaw
         * @property {number|null} [pitch] Player pitch
         */

        /**
         * Constructs a new Player.
         * @memberof webcamshooting
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {webcamshooting.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player position.
         * @member {webcamshooting.IVector3|null|undefined} position
         * @memberof webcamshooting.Player
         * @instance
         */
        Player.prototype.position = null;

        /**
         * Player velocity.
         * @member {webcamshooting.IVector3|null|undefined} velocity
         * @memberof webcamshooting.Player
         * @instance
         */
        Player.prototype.velocity = null;

        /**
         * Player yaw.
         * @member {number} yaw
         * @memberof webcamshooting.Player
         * @instance
         */
        Player.prototype.yaw = 0;

        /**
         * Player pitch.
         * @member {number} pitch
         * @memberof webcamshooting.Player
         * @instance
         */
        Player.prototype.pitch = 0;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof webcamshooting.Player
         * @static
         * @param {webcamshooting.IPlayer=} [properties] Properties to set
         * @returns {webcamshooting.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link webcamshooting.Player.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.Player
         * @static
         * @param {webcamshooting.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.webcamshooting.Vector3.encode(message.position, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.velocity != null && Object.hasOwnProperty.call(message, "velocity"))
                $root.webcamshooting.Vector3.encode(message.velocity, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.yaw != null && Object.hasOwnProperty.call(message, "yaw"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.yaw);
            if (message.pitch != null && Object.hasOwnProperty.call(message, "pitch"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.pitch);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link webcamshooting.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.Player
         * @static
         * @param {webcamshooting.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.Player();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.position = $root.webcamshooting.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.velocity = $root.webcamshooting.Vector3.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.yaw = reader.float();
                        break;
                    }
                case 4: {
                        message.pitch = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof webcamshooting.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.webcamshooting.Vector3.verify(message.position);
                if (error)
                    return "position." + error;
            }
            if (message.velocity != null && message.hasOwnProperty("velocity")) {
                let error = $root.webcamshooting.Vector3.verify(message.velocity);
                if (error)
                    return "velocity." + error;
            }
            if (message.yaw != null && message.hasOwnProperty("yaw"))
                if (typeof message.yaw !== "number")
                    return "yaw: number expected";
            if (message.pitch != null && message.hasOwnProperty("pitch"))
                if (typeof message.pitch !== "number")
                    return "pitch: number expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.Player)
                return object;
            let message = new $root.webcamshooting.Player();
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".webcamshooting.Player.position: object expected");
                message.position = $root.webcamshooting.Vector3.fromObject(object.position);
            }
            if (object.velocity != null) {
                if (typeof object.velocity !== "object")
                    throw TypeError(".webcamshooting.Player.velocity: object expected");
                message.velocity = $root.webcamshooting.Vector3.fromObject(object.velocity);
            }
            if (object.yaw != null)
                message.yaw = Number(object.yaw);
            if (object.pitch != null)
                message.pitch = Number(object.pitch);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.Player
         * @static
         * @param {webcamshooting.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.position = null;
                object.velocity = null;
                object.yaw = 0;
                object.pitch = 0;
            }
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.webcamshooting.Vector3.toObject(message.position, options);
            if (message.velocity != null && message.hasOwnProperty("velocity"))
                object.velocity = $root.webcamshooting.Vector3.toObject(message.velocity, options);
            if (message.yaw != null && message.hasOwnProperty("yaw"))
                object.yaw = options.json && !isFinite(message.yaw) ? String(message.yaw) : message.yaw;
            if (message.pitch != null && message.hasOwnProperty("pitch"))
                object.pitch = options.json && !isFinite(message.pitch) ? String(message.pitch) : message.pitch;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof webcamshooting.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Player
         * @function getTypeUrl
         * @memberof webcamshooting.Player
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.Player";
        };

        return Player;
    })();

    webcamshooting.ClientUpdate = (function() {

        /**
         * Properties of a ClientUpdate.
         * @memberof webcamshooting
         * @interface IClientUpdate
         * @property {string|null} [pid] ClientUpdate pid
         * @property {webcamshooting.IPlayer|null} [player] ClientUpdate player
         * @property {boolean|null} [fired] ClientUpdate fired
         * @property {Array.<webcamshooting.IDamage>|null} [damages] ClientUpdate damages
         */

        /**
         * Constructs a new ClientUpdate.
         * @memberof webcamshooting
         * @classdesc Represents a ClientUpdate.
         * @implements IClientUpdate
         * @constructor
         * @param {webcamshooting.IClientUpdate=} [properties] Properties to set
         */
        function ClientUpdate(properties) {
            this.damages = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientUpdate pid.
         * @member {string} pid
         * @memberof webcamshooting.ClientUpdate
         * @instance
         */
        ClientUpdate.prototype.pid = "";

        /**
         * ClientUpdate player.
         * @member {webcamshooting.IPlayer|null|undefined} player
         * @memberof webcamshooting.ClientUpdate
         * @instance
         */
        ClientUpdate.prototype.player = null;

        /**
         * ClientUpdate fired.
         * @member {boolean} fired
         * @memberof webcamshooting.ClientUpdate
         * @instance
         */
        ClientUpdate.prototype.fired = false;

        /**
         * ClientUpdate damages.
         * @member {Array.<webcamshooting.IDamage>} damages
         * @memberof webcamshooting.ClientUpdate
         * @instance
         */
        ClientUpdate.prototype.damages = $util.emptyArray;

        /**
         * Creates a new ClientUpdate instance using the specified properties.
         * @function create
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {webcamshooting.IClientUpdate=} [properties] Properties to set
         * @returns {webcamshooting.ClientUpdate} ClientUpdate instance
         */
        ClientUpdate.create = function create(properties) {
            return new ClientUpdate(properties);
        };

        /**
         * Encodes the specified ClientUpdate message. Does not implicitly {@link webcamshooting.ClientUpdate.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {webcamshooting.IClientUpdate} message ClientUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                $root.webcamshooting.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.fired != null && Object.hasOwnProperty.call(message, "fired"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.fired);
            if (message.damages != null && message.damages.length)
                for (let i = 0; i < message.damages.length; ++i)
                    $root.webcamshooting.Damage.encode(message.damages[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientUpdate message, length delimited. Does not implicitly {@link webcamshooting.ClientUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {webcamshooting.IClientUpdate} message ClientUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.ClientUpdate} ClientUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.ClientUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pid = reader.string();
                        break;
                    }
                case 2: {
                        message.player = $root.webcamshooting.Player.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.fired = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.damages && message.damages.length))
                            message.damages = [];
                        message.damages.push($root.webcamshooting.Damage.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.ClientUpdate} ClientUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientUpdate message.
         * @function verify
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            if (message.player != null && message.hasOwnProperty("player")) {
                let error = $root.webcamshooting.Player.verify(message.player);
                if (error)
                    return "player." + error;
            }
            if (message.fired != null && message.hasOwnProperty("fired"))
                if (typeof message.fired !== "boolean")
                    return "fired: boolean expected";
            if (message.damages != null && message.hasOwnProperty("damages")) {
                if (!Array.isArray(message.damages))
                    return "damages: array expected";
                for (let i = 0; i < message.damages.length; ++i) {
                    let error = $root.webcamshooting.Damage.verify(message.damages[i]);
                    if (error)
                        return "damages." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClientUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.ClientUpdate} ClientUpdate
         */
        ClientUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.ClientUpdate)
                return object;
            let message = new $root.webcamshooting.ClientUpdate();
            if (object.pid != null)
                message.pid = String(object.pid);
            if (object.player != null) {
                if (typeof object.player !== "object")
                    throw TypeError(".webcamshooting.ClientUpdate.player: object expected");
                message.player = $root.webcamshooting.Player.fromObject(object.player);
            }
            if (object.fired != null)
                message.fired = Boolean(object.fired);
            if (object.damages) {
                if (!Array.isArray(object.damages))
                    throw TypeError(".webcamshooting.ClientUpdate.damages: array expected");
                message.damages = [];
                for (let i = 0; i < object.damages.length; ++i) {
                    if (typeof object.damages[i] !== "object")
                        throw TypeError(".webcamshooting.ClientUpdate.damages: object expected");
                    message.damages[i] = $root.webcamshooting.Damage.fromObject(object.damages[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {webcamshooting.ClientUpdate} message ClientUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.damages = [];
            if (options.defaults) {
                object.pid = "";
                object.player = null;
                object.fired = false;
            }
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = $root.webcamshooting.Player.toObject(message.player, options);
            if (message.fired != null && message.hasOwnProperty("fired"))
                object.fired = message.fired;
            if (message.damages && message.damages.length) {
                object.damages = [];
                for (let j = 0; j < message.damages.length; ++j)
                    object.damages[j] = $root.webcamshooting.Damage.toObject(message.damages[j], options);
            }
            return object;
        };

        /**
         * Converts this ClientUpdate to JSON.
         * @function toJSON
         * @memberof webcamshooting.ClientUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ClientUpdate
         * @function getTypeUrl
         * @memberof webcamshooting.ClientUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.ClientUpdate";
        };

        return ClientUpdate;
    })();

    webcamshooting.JoinRequest = (function() {

        /**
         * Properties of a JoinRequest.
         * @memberof webcamshooting
         * @interface IJoinRequest
         * @property {string|null} [name] JoinRequest name
         */

        /**
         * Constructs a new JoinRequest.
         * @memberof webcamshooting
         * @classdesc Represents a JoinRequest.
         * @implements IJoinRequest
         * @constructor
         * @param {webcamshooting.IJoinRequest=} [properties] Properties to set
         */
        function JoinRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * JoinRequest name.
         * @member {string} name
         * @memberof webcamshooting.JoinRequest
         * @instance
         */
        JoinRequest.prototype.name = "";

        /**
         * Creates a new JoinRequest instance using the specified properties.
         * @function create
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {webcamshooting.IJoinRequest=} [properties] Properties to set
         * @returns {webcamshooting.JoinRequest} JoinRequest instance
         */
        JoinRequest.create = function create(properties) {
            return new JoinRequest(properties);
        };

        /**
         * Encodes the specified JoinRequest message. Does not implicitly {@link webcamshooting.JoinRequest.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {webcamshooting.IJoinRequest} message JoinRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified JoinRequest message, length delimited. Does not implicitly {@link webcamshooting.JoinRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {webcamshooting.IJoinRequest} message JoinRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a JoinRequest message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.JoinRequest} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.JoinRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a JoinRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.JoinRequest} JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a JoinRequest message.
         * @function verify
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a JoinRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.JoinRequest} JoinRequest
         */
        JoinRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.JoinRequest)
                return object;
            let message = new $root.webcamshooting.JoinRequest();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a JoinRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {webcamshooting.JoinRequest} message JoinRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this JoinRequest to JSON.
         * @function toJSON
         * @memberof webcamshooting.JoinRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for JoinRequest
         * @function getTypeUrl
         * @memberof webcamshooting.JoinRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        JoinRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.JoinRequest";
        };

        return JoinRequest;
    })();

    webcamshooting.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof webcamshooting
         * @interface IRequest
         * @property {webcamshooting.IJoinRequest|null} [joinRequest] Request joinRequest
         * @property {webcamshooting.IClientUpdate|null} [clientUpdate] Request clientUpdate
         */

        /**
         * Constructs a new Request.
         * @memberof webcamshooting
         * @classdesc Represents a Request.
         * @implements IRequest
         * @constructor
         * @param {webcamshooting.IRequest=} [properties] Properties to set
         */
        function Request(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Request joinRequest.
         * @member {webcamshooting.IJoinRequest|null|undefined} joinRequest
         * @memberof webcamshooting.Request
         * @instance
         */
        Request.prototype.joinRequest = null;

        /**
         * Request clientUpdate.
         * @member {webcamshooting.IClientUpdate|null|undefined} clientUpdate
         * @memberof webcamshooting.Request
         * @instance
         */
        Request.prototype.clientUpdate = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Request requestOneof.
         * @member {"joinRequest"|"clientUpdate"|undefined} requestOneof
         * @memberof webcamshooting.Request
         * @instance
         */
        Object.defineProperty(Request.prototype, "requestOneof", {
            get: $util.oneOfGetter($oneOfFields = ["joinRequest", "clientUpdate"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Request instance using the specified properties.
         * @function create
         * @memberof webcamshooting.Request
         * @static
         * @param {webcamshooting.IRequest=} [properties] Properties to set
         * @returns {webcamshooting.Request} Request instance
         */
        Request.create = function create(properties) {
            return new Request(properties);
        };

        /**
         * Encodes the specified Request message. Does not implicitly {@link webcamshooting.Request.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.Request
         * @static
         * @param {webcamshooting.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.joinRequest != null && Object.hasOwnProperty.call(message, "joinRequest"))
                $root.webcamshooting.JoinRequest.encode(message.joinRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.clientUpdate != null && Object.hasOwnProperty.call(message, "clientUpdate"))
                $root.webcamshooting.ClientUpdate.encode(message.clientUpdate, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link webcamshooting.Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.Request
         * @static
         * @param {webcamshooting.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.Request();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.joinRequest = $root.webcamshooting.JoinRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.clientUpdate = $root.webcamshooting.ClientUpdate.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Request message.
         * @function verify
         * @memberof webcamshooting.Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.joinRequest != null && message.hasOwnProperty("joinRequest")) {
                properties.requestOneof = 1;
                {
                    let error = $root.webcamshooting.JoinRequest.verify(message.joinRequest);
                    if (error)
                        return "joinRequest." + error;
                }
            }
            if (message.clientUpdate != null && message.hasOwnProperty("clientUpdate")) {
                if (properties.requestOneof === 1)
                    return "requestOneof: multiple values";
                properties.requestOneof = 1;
                {
                    let error = $root.webcamshooting.ClientUpdate.verify(message.clientUpdate);
                    if (error)
                        return "clientUpdate." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.Request} Request
         */
        Request.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.Request)
                return object;
            let message = new $root.webcamshooting.Request();
            if (object.joinRequest != null) {
                if (typeof object.joinRequest !== "object")
                    throw TypeError(".webcamshooting.Request.joinRequest: object expected");
                message.joinRequest = $root.webcamshooting.JoinRequest.fromObject(object.joinRequest);
            }
            if (object.clientUpdate != null) {
                if (typeof object.clientUpdate !== "object")
                    throw TypeError(".webcamshooting.Request.clientUpdate: object expected");
                message.clientUpdate = $root.webcamshooting.ClientUpdate.fromObject(object.clientUpdate);
            }
            return message;
        };

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.Request
         * @static
         * @param {webcamshooting.Request} message Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.joinRequest != null && message.hasOwnProperty("joinRequest")) {
                object.joinRequest = $root.webcamshooting.JoinRequest.toObject(message.joinRequest, options);
                if (options.oneofs)
                    object.requestOneof = "joinRequest";
            }
            if (message.clientUpdate != null && message.hasOwnProperty("clientUpdate")) {
                object.clientUpdate = $root.webcamshooting.ClientUpdate.toObject(message.clientUpdate, options);
                if (options.oneofs)
                    object.requestOneof = "clientUpdate";
            }
            return object;
        };

        /**
         * Converts this Request to JSON.
         * @function toJSON
         * @memberof webcamshooting.Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Request
         * @function getTypeUrl
         * @memberof webcamshooting.Request
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.Request";
        };

        return Request;
    })();

    webcamshooting.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof webcamshooting
         * @interface IResponse
         * @property {webcamshooting.IPidResponse|null} [pidResponse] Response pidResponse
         * @property {webcamshooting.IUpdateResponse|null} [updateResponse] Response updateResponse
         */

        /**
         * Constructs a new Response.
         * @memberof webcamshooting
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {webcamshooting.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response pidResponse.
         * @member {webcamshooting.IPidResponse|null|undefined} pidResponse
         * @memberof webcamshooting.Response
         * @instance
         */
        Response.prototype.pidResponse = null;

        /**
         * Response updateResponse.
         * @member {webcamshooting.IUpdateResponse|null|undefined} updateResponse
         * @memberof webcamshooting.Response
         * @instance
         */
        Response.prototype.updateResponse = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * Response responseOneof.
         * @member {"pidResponse"|"updateResponse"|undefined} responseOneof
         * @memberof webcamshooting.Response
         * @instance
         */
        Object.defineProperty(Response.prototype, "responseOneof", {
            get: $util.oneOfGetter($oneOfFields = ["pidResponse", "updateResponse"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof webcamshooting.Response
         * @static
         * @param {webcamshooting.IResponse=} [properties] Properties to set
         * @returns {webcamshooting.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link webcamshooting.Response.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.Response
         * @static
         * @param {webcamshooting.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pidResponse != null && Object.hasOwnProperty.call(message, "pidResponse"))
                $root.webcamshooting.PidResponse.encode(message.pidResponse, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.updateResponse != null && Object.hasOwnProperty.call(message, "updateResponse"))
                $root.webcamshooting.UpdateResponse.encode(message.updateResponse, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link webcamshooting.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.Response
         * @static
         * @param {webcamshooting.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.Response();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pidResponse = $root.webcamshooting.PidResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.updateResponse = $root.webcamshooting.UpdateResponse.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof webcamshooting.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.pidResponse != null && message.hasOwnProperty("pidResponse")) {
                properties.responseOneof = 1;
                {
                    let error = $root.webcamshooting.PidResponse.verify(message.pidResponse);
                    if (error)
                        return "pidResponse." + error;
                }
            }
            if (message.updateResponse != null && message.hasOwnProperty("updateResponse")) {
                if (properties.responseOneof === 1)
                    return "responseOneof: multiple values";
                properties.responseOneof = 1;
                {
                    let error = $root.webcamshooting.UpdateResponse.verify(message.updateResponse);
                    if (error)
                        return "updateResponse." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.Response)
                return object;
            let message = new $root.webcamshooting.Response();
            if (object.pidResponse != null) {
                if (typeof object.pidResponse !== "object")
                    throw TypeError(".webcamshooting.Response.pidResponse: object expected");
                message.pidResponse = $root.webcamshooting.PidResponse.fromObject(object.pidResponse);
            }
            if (object.updateResponse != null) {
                if (typeof object.updateResponse !== "object")
                    throw TypeError(".webcamshooting.Response.updateResponse: object expected");
                message.updateResponse = $root.webcamshooting.UpdateResponse.fromObject(object.updateResponse);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.Response
         * @static
         * @param {webcamshooting.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.pidResponse != null && message.hasOwnProperty("pidResponse")) {
                object.pidResponse = $root.webcamshooting.PidResponse.toObject(message.pidResponse, options);
                if (options.oneofs)
                    object.responseOneof = "pidResponse";
            }
            if (message.updateResponse != null && message.hasOwnProperty("updateResponse")) {
                object.updateResponse = $root.webcamshooting.UpdateResponse.toObject(message.updateResponse, options);
                if (options.oneofs)
                    object.responseOneof = "updateResponse";
            }
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof webcamshooting.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Response
         * @function getTypeUrl
         * @memberof webcamshooting.Response
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.Response";
        };

        return Response;
    })();

    webcamshooting.PidResponse = (function() {

        /**
         * Properties of a PidResponse.
         * @memberof webcamshooting
         * @interface IPidResponse
         * @property {string|null} [pid] PidResponse pid
         */

        /**
         * Constructs a new PidResponse.
         * @memberof webcamshooting
         * @classdesc Represents a PidResponse.
         * @implements IPidResponse
         * @constructor
         * @param {webcamshooting.IPidResponse=} [properties] Properties to set
         */
        function PidResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PidResponse pid.
         * @member {string} pid
         * @memberof webcamshooting.PidResponse
         * @instance
         */
        PidResponse.prototype.pid = "";

        /**
         * Creates a new PidResponse instance using the specified properties.
         * @function create
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {webcamshooting.IPidResponse=} [properties] Properties to set
         * @returns {webcamshooting.PidResponse} PidResponse instance
         */
        PidResponse.create = function create(properties) {
            return new PidResponse(properties);
        };

        /**
         * Encodes the specified PidResponse message. Does not implicitly {@link webcamshooting.PidResponse.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {webcamshooting.IPidResponse} message PidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PidResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            return writer;
        };

        /**
         * Encodes the specified PidResponse message, length delimited. Does not implicitly {@link webcamshooting.PidResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {webcamshooting.IPidResponse} message PidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PidResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PidResponse message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.PidResponse} PidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PidResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.PidResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pid = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PidResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.PidResponse} PidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PidResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PidResponse message.
         * @function verify
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PidResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            return null;
        };

        /**
         * Creates a PidResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.PidResponse} PidResponse
         */
        PidResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.PidResponse)
                return object;
            let message = new $root.webcamshooting.PidResponse();
            if (object.pid != null)
                message.pid = String(object.pid);
            return message;
        };

        /**
         * Creates a plain object from a PidResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {webcamshooting.PidResponse} message PidResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PidResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.pid = "";
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            return object;
        };

        /**
         * Converts this PidResponse to JSON.
         * @function toJSON
         * @memberof webcamshooting.PidResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PidResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PidResponse
         * @function getTypeUrl
         * @memberof webcamshooting.PidResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PidResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.PidResponse";
        };

        return PidResponse;
    })();

    webcamshooting.DamageResponse = (function() {

        /**
         * Properties of a DamageResponse.
         * @memberof webcamshooting
         * @interface IDamageResponse
         * @property {string|null} [by] DamageResponse by
         * @property {number|null} [amount] DamageResponse amount
         */

        /**
         * Constructs a new DamageResponse.
         * @memberof webcamshooting
         * @classdesc Represents a DamageResponse.
         * @implements IDamageResponse
         * @constructor
         * @param {webcamshooting.IDamageResponse=} [properties] Properties to set
         */
        function DamageResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DamageResponse by.
         * @member {string} by
         * @memberof webcamshooting.DamageResponse
         * @instance
         */
        DamageResponse.prototype.by = "";

        /**
         * DamageResponse amount.
         * @member {number} amount
         * @memberof webcamshooting.DamageResponse
         * @instance
         */
        DamageResponse.prototype.amount = 0;

        /**
         * Creates a new DamageResponse instance using the specified properties.
         * @function create
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {webcamshooting.IDamageResponse=} [properties] Properties to set
         * @returns {webcamshooting.DamageResponse} DamageResponse instance
         */
        DamageResponse.create = function create(properties) {
            return new DamageResponse(properties);
        };

        /**
         * Encodes the specified DamageResponse message. Does not implicitly {@link webcamshooting.DamageResponse.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {webcamshooting.IDamageResponse} message DamageResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DamageResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.by != null && Object.hasOwnProperty.call(message, "by"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.by);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.amount);
            return writer;
        };

        /**
         * Encodes the specified DamageResponse message, length delimited. Does not implicitly {@link webcamshooting.DamageResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {webcamshooting.IDamageResponse} message DamageResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DamageResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DamageResponse message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.DamageResponse} DamageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DamageResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.DamageResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.by = reader.string();
                        break;
                    }
                case 2: {
                        message.amount = reader.float();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DamageResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.DamageResponse} DamageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DamageResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DamageResponse message.
         * @function verify
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DamageResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.by != null && message.hasOwnProperty("by"))
                if (!$util.isString(message.by))
                    return "by: string expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            return null;
        };

        /**
         * Creates a DamageResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.DamageResponse} DamageResponse
         */
        DamageResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.DamageResponse)
                return object;
            let message = new $root.webcamshooting.DamageResponse();
            if (object.by != null)
                message.by = String(object.by);
            if (object.amount != null)
                message.amount = Number(object.amount);
            return message;
        };

        /**
         * Creates a plain object from a DamageResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {webcamshooting.DamageResponse} message DamageResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DamageResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.by = "";
                object.amount = 0;
            }
            if (message.by != null && message.hasOwnProperty("by"))
                object.by = message.by;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            return object;
        };

        /**
         * Converts this DamageResponse to JSON.
         * @function toJSON
         * @memberof webcamshooting.DamageResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DamageResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DamageResponse
         * @function getTypeUrl
         * @memberof webcamshooting.DamageResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DamageResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.DamageResponse";
        };

        return DamageResponse;
    })();

    webcamshooting.PlayerUpdateResponse = (function() {

        /**
         * Properties of a PlayerUpdateResponse.
         * @memberof webcamshooting
         * @interface IPlayerUpdateResponse
         * @property {string|null} [pid] PlayerUpdateResponse pid
         * @property {webcamshooting.IPlayer|null} [player] PlayerUpdateResponse player
         * @property {boolean|null} [fired] PlayerUpdateResponse fired
         * @property {Array.<webcamshooting.IDamageResponse>|null} [damages] PlayerUpdateResponse damages
         */

        /**
         * Constructs a new PlayerUpdateResponse.
         * @memberof webcamshooting
         * @classdesc Represents a PlayerUpdateResponse.
         * @implements IPlayerUpdateResponse
         * @constructor
         * @param {webcamshooting.IPlayerUpdateResponse=} [properties] Properties to set
         */
        function PlayerUpdateResponse(properties) {
            this.damages = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerUpdateResponse pid.
         * @member {string} pid
         * @memberof webcamshooting.PlayerUpdateResponse
         * @instance
         */
        PlayerUpdateResponse.prototype.pid = "";

        /**
         * PlayerUpdateResponse player.
         * @member {webcamshooting.IPlayer|null|undefined} player
         * @memberof webcamshooting.PlayerUpdateResponse
         * @instance
         */
        PlayerUpdateResponse.prototype.player = null;

        /**
         * PlayerUpdateResponse fired.
         * @member {boolean} fired
         * @memberof webcamshooting.PlayerUpdateResponse
         * @instance
         */
        PlayerUpdateResponse.prototype.fired = false;

        /**
         * PlayerUpdateResponse damages.
         * @member {Array.<webcamshooting.IDamageResponse>} damages
         * @memberof webcamshooting.PlayerUpdateResponse
         * @instance
         */
        PlayerUpdateResponse.prototype.damages = $util.emptyArray;

        /**
         * Creates a new PlayerUpdateResponse instance using the specified properties.
         * @function create
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {webcamshooting.IPlayerUpdateResponse=} [properties] Properties to set
         * @returns {webcamshooting.PlayerUpdateResponse} PlayerUpdateResponse instance
         */
        PlayerUpdateResponse.create = function create(properties) {
            return new PlayerUpdateResponse(properties);
        };

        /**
         * Encodes the specified PlayerUpdateResponse message. Does not implicitly {@link webcamshooting.PlayerUpdateResponse.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {webcamshooting.IPlayerUpdateResponse} message PlayerUpdateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerUpdateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                $root.webcamshooting.Player.encode(message.player, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.fired != null && Object.hasOwnProperty.call(message, "fired"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.fired);
            if (message.damages != null && message.damages.length)
                for (let i = 0; i < message.damages.length; ++i)
                    $root.webcamshooting.DamageResponse.encode(message.damages[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PlayerUpdateResponse message, length delimited. Does not implicitly {@link webcamshooting.PlayerUpdateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {webcamshooting.IPlayerUpdateResponse} message PlayerUpdateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerUpdateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerUpdateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.PlayerUpdateResponse} PlayerUpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerUpdateResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.PlayerUpdateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.pid = reader.string();
                        break;
                    }
                case 2: {
                        message.player = $root.webcamshooting.Player.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.fired = reader.bool();
                        break;
                    }
                case 7: {
                        if (!(message.damages && message.damages.length))
                            message.damages = [];
                        message.damages.push($root.webcamshooting.DamageResponse.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PlayerUpdateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.PlayerUpdateResponse} PlayerUpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerUpdateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerUpdateResponse message.
         * @function verify
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerUpdateResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            if (message.player != null && message.hasOwnProperty("player")) {
                let error = $root.webcamshooting.Player.verify(message.player);
                if (error)
                    return "player." + error;
            }
            if (message.fired != null && message.hasOwnProperty("fired"))
                if (typeof message.fired !== "boolean")
                    return "fired: boolean expected";
            if (message.damages != null && message.hasOwnProperty("damages")) {
                if (!Array.isArray(message.damages))
                    return "damages: array expected";
                for (let i = 0; i < message.damages.length; ++i) {
                    let error = $root.webcamshooting.DamageResponse.verify(message.damages[i]);
                    if (error)
                        return "damages." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PlayerUpdateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.PlayerUpdateResponse} PlayerUpdateResponse
         */
        PlayerUpdateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.PlayerUpdateResponse)
                return object;
            let message = new $root.webcamshooting.PlayerUpdateResponse();
            if (object.pid != null)
                message.pid = String(object.pid);
            if (object.player != null) {
                if (typeof object.player !== "object")
                    throw TypeError(".webcamshooting.PlayerUpdateResponse.player: object expected");
                message.player = $root.webcamshooting.Player.fromObject(object.player);
            }
            if (object.fired != null)
                message.fired = Boolean(object.fired);
            if (object.damages) {
                if (!Array.isArray(object.damages))
                    throw TypeError(".webcamshooting.PlayerUpdateResponse.damages: array expected");
                message.damages = [];
                for (let i = 0; i < object.damages.length; ++i) {
                    if (typeof object.damages[i] !== "object")
                        throw TypeError(".webcamshooting.PlayerUpdateResponse.damages: object expected");
                    message.damages[i] = $root.webcamshooting.DamageResponse.fromObject(object.damages[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PlayerUpdateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {webcamshooting.PlayerUpdateResponse} message PlayerUpdateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerUpdateResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.damages = [];
            if (options.defaults) {
                object.pid = "";
                object.player = null;
                object.fired = false;
            }
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = $root.webcamshooting.Player.toObject(message.player, options);
            if (message.fired != null && message.hasOwnProperty("fired"))
                object.fired = message.fired;
            if (message.damages && message.damages.length) {
                object.damages = [];
                for (let j = 0; j < message.damages.length; ++j)
                    object.damages[j] = $root.webcamshooting.DamageResponse.toObject(message.damages[j], options);
            }
            return object;
        };

        /**
         * Converts this PlayerUpdateResponse to JSON.
         * @function toJSON
         * @memberof webcamshooting.PlayerUpdateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerUpdateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerUpdateResponse
         * @function getTypeUrl
         * @memberof webcamshooting.PlayerUpdateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerUpdateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.PlayerUpdateResponse";
        };

        return PlayerUpdateResponse;
    })();

    webcamshooting.UpdateResponse = (function() {

        /**
         * Properties of an UpdateResponse.
         * @memberof webcamshooting
         * @interface IUpdateResponse
         * @property {Array.<webcamshooting.IPlayerUpdateResponse>|null} [players] UpdateResponse players
         */

        /**
         * Constructs a new UpdateResponse.
         * @memberof webcamshooting
         * @classdesc Represents an UpdateResponse.
         * @implements IUpdateResponse
         * @constructor
         * @param {webcamshooting.IUpdateResponse=} [properties] Properties to set
         */
        function UpdateResponse(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateResponse players.
         * @member {Array.<webcamshooting.IPlayerUpdateResponse>} players
         * @memberof webcamshooting.UpdateResponse
         * @instance
         */
        UpdateResponse.prototype.players = $util.emptyArray;

        /**
         * Creates a new UpdateResponse instance using the specified properties.
         * @function create
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {webcamshooting.IUpdateResponse=} [properties] Properties to set
         * @returns {webcamshooting.UpdateResponse} UpdateResponse instance
         */
        UpdateResponse.create = function create(properties) {
            return new UpdateResponse(properties);
        };

        /**
         * Encodes the specified UpdateResponse message. Does not implicitly {@link webcamshooting.UpdateResponse.verify|verify} messages.
         * @function encode
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {webcamshooting.IUpdateResponse} message UpdateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.webcamshooting.PlayerUpdateResponse.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UpdateResponse message, length delimited. Does not implicitly {@link webcamshooting.UpdateResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {webcamshooting.IUpdateResponse} message UpdateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {webcamshooting.UpdateResponse} UpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.webcamshooting.UpdateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.webcamshooting.PlayerUpdateResponse.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {webcamshooting.UpdateResponse} UpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateResponse message.
         * @function verify
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.webcamshooting.PlayerUpdateResponse.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            return null;
        };

        /**
         * Creates an UpdateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {webcamshooting.UpdateResponse} UpdateResponse
         */
        UpdateResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.webcamshooting.UpdateResponse)
                return object;
            let message = new $root.webcamshooting.UpdateResponse();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".webcamshooting.UpdateResponse.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".webcamshooting.UpdateResponse.players: object expected");
                    message.players[i] = $root.webcamshooting.PlayerUpdateResponse.fromObject(object.players[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an UpdateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {webcamshooting.UpdateResponse} message UpdateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.webcamshooting.PlayerUpdateResponse.toObject(message.players[j], options);
            }
            return object;
        };

        /**
         * Converts this UpdateResponse to JSON.
         * @function toJSON
         * @memberof webcamshooting.UpdateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpdateResponse
         * @function getTypeUrl
         * @memberof webcamshooting.UpdateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpdateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/webcamshooting.UpdateResponse";
        };

        return UpdateResponse;
    })();

    return webcamshooting;
})();

export { $root as default };
