import { dbSqlite } from "./database/drizzle/db";
import type { User } from "lucia";

declare global {
  namespace Vike {
    interface PageContext {
      user?: User;
    }
  }
}

declare global {
  namespace Vike {
    interface PageContext {
      db: ReturnType<typeof dbSqlite>;
    }
  }
}

export {};
