import * as $protobuf from "protobufjs";
/** Namespace webcamshooting. */
export namespace webcamshooting {

    /** Properties of a Vector3. */
    interface IVector3 {

        /** Vector3 x */
        x?: (number|null);

        /** Vector3 y */
        y?: (number|null);

        /** Vector3 z */
        z?: (number|null);
    }

    /** Represents a Vector3. */
    class Vector3 implements IVector3 {

        /**
         * Constructs a new Vector3.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IVector3);

        /** Vector3 x. */
        public x: number;

        /** Vector3 y. */
        public y: number;

        /** Vector3 z. */
        public z: number;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vector3 instance
         */
        public static create(properties?: webcamshooting.IVector3): webcamshooting.Vector3;

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link webcamshooting.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link webcamshooting.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IVector3, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.Vector3;

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.Vector3;

        /**
         * Verifies a Vector3 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vector3
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.Vector3;

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @param message Vector3
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.Vector3, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vector3 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Vector3
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Damage. */
    interface IDamage {

        /** Damage pid */
        pid?: (string|null);

        /** Damage damage */
        damage?: (number|null);
    }

    /** Represents a Damage. */
    class Damage implements IDamage {

        /**
         * Constructs a new Damage.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IDamage);

        /** Damage pid. */
        public pid: string;

        /** Damage damage. */
        public damage: number;

        /**
         * Creates a new Damage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Damage instance
         */
        public static create(properties?: webcamshooting.IDamage): webcamshooting.Damage;

        /**
         * Encodes the specified Damage message. Does not implicitly {@link webcamshooting.Damage.verify|verify} messages.
         * @param message Damage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IDamage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Damage message, length delimited. Does not implicitly {@link webcamshooting.Damage.verify|verify} messages.
         * @param message Damage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IDamage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Damage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Damage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.Damage;

        /**
         * Decodes a Damage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Damage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.Damage;

        /**
         * Verifies a Damage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Damage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Damage
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.Damage;

        /**
         * Creates a plain object from a Damage message. Also converts values to other types if specified.
         * @param message Damage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.Damage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Damage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Damage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player position */
        position?: (webcamshooting.IVector3|null);

        /** Player velocity */
        velocity?: (webcamshooting.IVector3|null);

        /** Player yaw */
        yaw?: (number|null);

        /** Player pitch */
        pitch?: (number|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IPlayer);

        /** Player position. */
        public position?: (webcamshooting.IVector3|null);

        /** Player velocity. */
        public velocity?: (webcamshooting.IVector3|null);

        /** Player yaw. */
        public yaw: number;

        /** Player pitch. */
        public pitch: number;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: webcamshooting.IPlayer): webcamshooting.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link webcamshooting.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link webcamshooting.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Player
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a ClientUpdate. */
    interface IClientUpdate {

        /** ClientUpdate pid */
        pid?: (string|null);

        /** ClientUpdate player */
        player?: (webcamshooting.IPlayer|null);

        /** ClientUpdate fired */
        fired?: (boolean|null);

        /** ClientUpdate damages */
        damages?: (webcamshooting.IDamage[]|null);
    }

    /** Represents a ClientUpdate. */
    class ClientUpdate implements IClientUpdate {

        /**
         * Constructs a new ClientUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IClientUpdate);

        /** ClientUpdate pid. */
        public pid: string;

        /** ClientUpdate player. */
        public player?: (webcamshooting.IPlayer|null);

        /** ClientUpdate fired. */
        public fired: boolean;

        /** ClientUpdate damages. */
        public damages: webcamshooting.IDamage[];

        /**
         * Creates a new ClientUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientUpdate instance
         */
        public static create(properties?: webcamshooting.IClientUpdate): webcamshooting.ClientUpdate;

        /**
         * Encodes the specified ClientUpdate message. Does not implicitly {@link webcamshooting.ClientUpdate.verify|verify} messages.
         * @param message ClientUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IClientUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientUpdate message, length delimited. Does not implicitly {@link webcamshooting.ClientUpdate.verify|verify} messages.
         * @param message ClientUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IClientUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.ClientUpdate;

        /**
         * Decodes a ClientUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.ClientUpdate;

        /**
         * Verifies a ClientUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientUpdate
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.ClientUpdate;

        /**
         * Creates a plain object from a ClientUpdate message. Also converts values to other types if specified.
         * @param message ClientUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.ClientUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ClientUpdate
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a JoinRequest. */
    interface IJoinRequest {

        /** JoinRequest name */
        name?: (string|null);
    }

    /** Represents a JoinRequest. */
    class JoinRequest implements IJoinRequest {

        /**
         * Constructs a new JoinRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IJoinRequest);

        /** JoinRequest name. */
        public name: string;

        /**
         * Creates a new JoinRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRequest instance
         */
        public static create(properties?: webcamshooting.IJoinRequest): webcamshooting.JoinRequest;

        /**
         * Encodes the specified JoinRequest message. Does not implicitly {@link webcamshooting.JoinRequest.verify|verify} messages.
         * @param message JoinRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IJoinRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRequest message, length delimited. Does not implicitly {@link webcamshooting.JoinRequest.verify|verify} messages.
         * @param message JoinRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IJoinRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.JoinRequest;

        /**
         * Decodes a JoinRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.JoinRequest;

        /**
         * Verifies a JoinRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRequest
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.JoinRequest;

        /**
         * Creates a plain object from a JoinRequest message. Also converts values to other types if specified.
         * @param message JoinRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.JoinRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for JoinRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Request. */
    interface IRequest {

        /** Request joinRequest */
        joinRequest?: (webcamshooting.IJoinRequest|null);

        /** Request clientUpdate */
        clientUpdate?: (webcamshooting.IClientUpdate|null);
    }

    /** Represents a Request. */
    class Request implements IRequest {

        /**
         * Constructs a new Request.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IRequest);

        /** Request joinRequest. */
        public joinRequest?: (webcamshooting.IJoinRequest|null);

        /** Request clientUpdate. */
        public clientUpdate?: (webcamshooting.IClientUpdate|null);

        /** Request requestOneof. */
        public requestOneof?: ("joinRequest"|"clientUpdate");

        /**
         * Creates a new Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Request instance
         */
        public static create(properties?: webcamshooting.IRequest): webcamshooting.Request;

        /**
         * Encodes the specified Request message. Does not implicitly {@link webcamshooting.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link webcamshooting.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.Request;

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.Request;

        /**
         * Verifies a Request message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Request
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.Request;

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @param message Request
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Request to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Request
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Response. */
    interface IResponse {

        /** Response pidResponse */
        pidResponse?: (webcamshooting.IPidResponse|null);

        /** Response updateResponse */
        updateResponse?: (webcamshooting.IUpdateResponse|null);
    }

    /** Represents a Response. */
    class Response implements IResponse {

        /**
         * Constructs a new Response.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IResponse);

        /** Response pidResponse. */
        public pidResponse?: (webcamshooting.IPidResponse|null);

        /** Response updateResponse. */
        public updateResponse?: (webcamshooting.IUpdateResponse|null);

        /** Response responseOneof. */
        public responseOneof?: ("pidResponse"|"updateResponse");

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: webcamshooting.IResponse): webcamshooting.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link webcamshooting.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link webcamshooting.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.Response;

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.Response;

        /**
         * Verifies a Response message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Response
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.Response;

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @param message Response
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Response to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Response
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PidResponse. */
    interface IPidResponse {

        /** PidResponse pid */
        pid?: (string|null);
    }

    /** Represents a PidResponse. */
    class PidResponse implements IPidResponse {

        /**
         * Constructs a new PidResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IPidResponse);

        /** PidResponse pid. */
        public pid: string;

        /**
         * Creates a new PidResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PidResponse instance
         */
        public static create(properties?: webcamshooting.IPidResponse): webcamshooting.PidResponse;

        /**
         * Encodes the specified PidResponse message. Does not implicitly {@link webcamshooting.PidResponse.verify|verify} messages.
         * @param message PidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IPidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PidResponse message, length delimited. Does not implicitly {@link webcamshooting.PidResponse.verify|verify} messages.
         * @param message PidResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IPidResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PidResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.PidResponse;

        /**
         * Decodes a PidResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.PidResponse;

        /**
         * Verifies a PidResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PidResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PidResponse
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.PidResponse;

        /**
         * Creates a plain object from a PidResponse message. Also converts values to other types if specified.
         * @param message PidResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.PidResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PidResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PidResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DamageResponse. */
    interface IDamageResponse {

        /** DamageResponse by */
        by?: (string|null);

        /** DamageResponse amount */
        amount?: (number|null);
    }

    /** Represents a DamageResponse. */
    class DamageResponse implements IDamageResponse {

        /**
         * Constructs a new DamageResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IDamageResponse);

        /** DamageResponse by. */
        public by: string;

        /** DamageResponse amount. */
        public amount: number;

        /**
         * Creates a new DamageResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DamageResponse instance
         */
        public static create(properties?: webcamshooting.IDamageResponse): webcamshooting.DamageResponse;

        /**
         * Encodes the specified DamageResponse message. Does not implicitly {@link webcamshooting.DamageResponse.verify|verify} messages.
         * @param message DamageResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IDamageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DamageResponse message, length delimited. Does not implicitly {@link webcamshooting.DamageResponse.verify|verify} messages.
         * @param message DamageResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IDamageResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DamageResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DamageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.DamageResponse;

        /**
         * Decodes a DamageResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DamageResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.DamageResponse;

        /**
         * Verifies a DamageResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DamageResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DamageResponse
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.DamageResponse;

        /**
         * Creates a plain object from a DamageResponse message. Also converts values to other types if specified.
         * @param message DamageResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.DamageResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DamageResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DamageResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerUpdateResponse. */
    interface IPlayerUpdateResponse {

        /** PlayerUpdateResponse pid */
        pid?: (string|null);

        /** PlayerUpdateResponse player */
        player?: (webcamshooting.IPlayer|null);

        /** PlayerUpdateResponse fired */
        fired?: (boolean|null);

        /** PlayerUpdateResponse damages */
        damages?: (webcamshooting.IDamageResponse[]|null);
    }

    /** Represents a PlayerUpdateResponse. */
    class PlayerUpdateResponse implements IPlayerUpdateResponse {

        /**
         * Constructs a new PlayerUpdateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IPlayerUpdateResponse);

        /** PlayerUpdateResponse pid. */
        public pid: string;

        /** PlayerUpdateResponse player. */
        public player?: (webcamshooting.IPlayer|null);

        /** PlayerUpdateResponse fired. */
        public fired: boolean;

        /** PlayerUpdateResponse damages. */
        public damages: webcamshooting.IDamageResponse[];

        /**
         * Creates a new PlayerUpdateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerUpdateResponse instance
         */
        public static create(properties?: webcamshooting.IPlayerUpdateResponse): webcamshooting.PlayerUpdateResponse;

        /**
         * Encodes the specified PlayerUpdateResponse message. Does not implicitly {@link webcamshooting.PlayerUpdateResponse.verify|verify} messages.
         * @param message PlayerUpdateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IPlayerUpdateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerUpdateResponse message, length delimited. Does not implicitly {@link webcamshooting.PlayerUpdateResponse.verify|verify} messages.
         * @param message PlayerUpdateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IPlayerUpdateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerUpdateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerUpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.PlayerUpdateResponse;

        /**
         * Decodes a PlayerUpdateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerUpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.PlayerUpdateResponse;

        /**
         * Verifies a PlayerUpdateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerUpdateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerUpdateResponse
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.PlayerUpdateResponse;

        /**
         * Creates a plain object from a PlayerUpdateResponse message. Also converts values to other types if specified.
         * @param message PlayerUpdateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.PlayerUpdateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerUpdateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerUpdateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of an UpdateResponse. */
    interface IUpdateResponse {

        /** UpdateResponse players */
        players?: (webcamshooting.IPlayerUpdateResponse[]|null);
    }

    /** Represents an UpdateResponse. */
    class UpdateResponse implements IUpdateResponse {

        /**
         * Constructs a new UpdateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: webcamshooting.IUpdateResponse);

        /** UpdateResponse players. */
        public players: webcamshooting.IPlayerUpdateResponse[];

        /**
         * Creates a new UpdateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateResponse instance
         */
        public static create(properties?: webcamshooting.IUpdateResponse): webcamshooting.UpdateResponse;

        /**
         * Encodes the specified UpdateResponse message. Does not implicitly {@link webcamshooting.UpdateResponse.verify|verify} messages.
         * @param message UpdateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: webcamshooting.IUpdateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateResponse message, length delimited. Does not implicitly {@link webcamshooting.UpdateResponse.verify|verify} messages.
         * @param message UpdateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: webcamshooting.IUpdateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): webcamshooting.UpdateResponse;

        /**
         * Decodes an UpdateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): webcamshooting.UpdateResponse;

        /**
         * Verifies an UpdateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateResponse
         */
        public static fromObject(object: { [k: string]: any }): webcamshooting.UpdateResponse;

        /**
         * Creates a plain object from an UpdateResponse message. Also converts values to other types if specified.
         * @param message UpdateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: webcamshooting.UpdateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UpdateResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
