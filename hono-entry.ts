import "dotenv/config";

import {
  luciaAuthContextMiddleware,
  luciaAuthCookieMiddleware,
  luciaAuthLoginHandler,
  luciaAuthLogoutHandler,
  luciaAuthSignupHandler,
  luciaCsrfMiddleware,
  luciaDbMiddleware,
  luciaGithubCallbackHandler,
  luciaGithubLoginHandler,
} from "./server/lucia-auth-handlers";
import { vikeHandler } from "./server/vike-handler";
import { tsRestHandler } from "./server/ts-rest-handler";
import { Hono } from "hono";
import { createHandler, createMiddleware } from "@universal-middleware/hono";
import { dbMiddleware } from "./server/db-middleware";

const app = new Hono();

app.use(createMiddleware(dbMiddleware)());

app.use(createMiddleware(luciaDbMiddleware)());
app.use(createMiddleware(luciaCsrfMiddleware)());
app.use(createMiddleware(luciaAuthContextMiddleware)());
app.use(createMiddleware(luciaAuthCookieMiddleware)());

app.post("/api/signup", createHandler(luciaAuthSignupHandler)());
app.post("/api/login", createHandler(luciaAuthLoginHandler)());
app.post("/api/logout", createHandler(luciaAuthLogoutHandler)());
app.get("/api/login/github", createHandler(luciaGithubLoginHandler)());
app.get("/api/login/github/callback", createHandler(luciaGithubCallbackHandler)());

app.all("/api/*", createHandler(tsRestHandler)());

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", createHandler(vikeHandler)());

export default app;
