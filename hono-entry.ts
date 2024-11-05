import "dotenv/config";

import {
	luciaAuthContextMiddleware,
	luciaAuthCookieMiddleware,
	luciaAuthLoginHandler,
	luciaAuthLogoutHandler,
	luciaAuthSignupHandler,
	luciaCsrfMiddleware,
	luciaDbMiddleware,
} from "./server/lucia-auth-handlers";
import { vikeHandler } from "./server/vike-handler";
import { tsRestHandler } from "./server/ts-rest-handler";
import { Hono } from "hono";
import { createHandler, createMiddleware } from "@universal-middleware/hono";
import { dbMiddleware } from "./server/db-middleware";
import { createBunWebSocket } from "hono/bun";

const { upgradeWebSocket, websocket } = createBunWebSocket();
const app = new Hono();

app.get(
	"ws",
	upgradeWebSocket((c) => {
		return {
			onMessage: (event) => {
				console.log(event.data)
			},
			onOpen: (_event, ws) => {
				ws.send("Hello, Client!");
				console.log("Message sent to client");
			},
		};
	}),
);

app.use(createMiddleware(dbMiddleware)());

app.use(createMiddleware(luciaDbMiddleware)());
app.use(createMiddleware(luciaCsrfMiddleware)());
app.use(createMiddleware(luciaAuthContextMiddleware)());
app.use(createMiddleware(luciaAuthCookieMiddleware)());

app.post("/api/signup", createHandler(luciaAuthSignupHandler)());
app.post("/api/login", createHandler(luciaAuthLoginHandler)());
app.post("/api/logout", createHandler(luciaAuthLogoutHandler)());

app.all("/api/*", createHandler(tsRestHandler)());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default {
	fetch: app.fetch,
	websocket
};
