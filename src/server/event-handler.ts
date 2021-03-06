import { RedisClient } from "redis";
import { Event, Handler } from "./events";
import { Token } from "./token";

export default class EventHandler {
  authTokens: Map<string, Token> = new Map();

  constructor(db: RedisClient) {}

  registerEvents(server: SocketIO.Server) {
    server.on(Event.Connection, (socket: SocketIO.Socket) => {
      socket.on(Event.TokenRequest, () => {
        this.onTokenRequest(socket);
      });
    });
  }

  isValidAuthToken(socket: SocketIO.Socket, token: Token): boolean {
    const t = this.authTokens.get(socket.id);
    return t.token === token.token && t.expires > Date.now() - 60 * 1000; // 1 minute
  }

  makeAuthToken(socket: SocketIO.Socket): string {
    let tokenStr = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 100; i++) {
      tokenStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const t = {
      token: tokenStr,
      expires: Date.now()
    };
    this.authTokens.set(socket.id, t);
    return tokenStr;
  }

  onTokenRequest(socket: SocketIO.Socket): boolean {
    // TODO(justiceo): Remove this client from all other rooms they may be in.
    socket.emit(Event.Token, this.makeAuthToken(socket));
    return true;
  }
}
