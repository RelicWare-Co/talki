import "dotenv/config";
import { Lucia, type Register } from "lucia";
import { GitHub } from "arctic";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import type { dbSqlite } from "../database/drizzle/db";
import { sessionTable, userTable } from "../database/drizzle/schema/lucia-auth";



export function initializeLucia(db: ReturnType<typeof dbSqlite>) {
  /**
   * Database setup
   *
   * @link {@see https://lucia-auth.com/database/#database-setup}
   **/
  const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

  /**
   * Initialize Lucia
   *
   * @link {@see https://lucia-auth.com/getting-started/#initialize-lucia}
   */
  return new Lucia(adapter, {
    /**
     * Lucia Configuration
     *
     * @link {@see https://lucia-auth.com/basics/configuration}
     */
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        username: attributes.username,
      };
    },
  });
}

/**
 * Initialize OAuth provider
 *
 * @link {@see https://lucia-auth.com/guides/oauth/basics#initialize-oauth-provider}
 */
export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID as string,
  process.env.GITHUB_CLIENT_SECRET as string,
  null,
);

/**
 * Define user attributes
 *
 * @link {@see https://lucia-auth.com/basics/users#define-user-attributes}
 */
declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

declare global {
  namespace Universal {
    interface Context {
      lucia: Register["Lucia"];
      db: ReturnType<typeof dbSqlite>;
    }
  }
}

export interface DatabaseUser {
  id: string;
  username: string;
  password?: string | null;
}

export interface DatabaseOAuthAccount {
  providerId: string;
  providerUserId: string;
  userId: string;
}

export interface GitHubUser {
  id: number;
  login: string; // username
}
