import { dbSqlite } from "../db";
import { oauthAccountTable, userTable } from "../schema/lucia-auth";
import { and, eq } from "drizzle-orm";

export async function getExistingUser(db: ReturnType<typeof dbSqlite>, username: string) {
  return db.select().from(userTable).where(eq(userTable.username, username)).get();
}

export async function getExistingAccount(db: ReturnType<typeof dbSqlite>, providerId: string, providerUserId: number) {
  return db
    .select()
    .from(oauthAccountTable)
    .where(and(eq(oauthAccountTable.providerId, providerId), eq(oauthAccountTable.providerUserId, providerUserId)))
    .get();
}

export async function signupWithGithub(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  username: string,
  githubUserId: number,
) {
  return db.transaction(async (tx) => {
    await tx.insert(userTable).values({ id: userId, username: username });
    await tx.insert(oauthAccountTable).values({ providerId: "github", providerUserId: githubUserId, userId });
  });
}

export async function signupWithCredentials(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  username: string,
  passwordHash: string,
) {
  return db.insert(userTable).values({ id: userId, username, password: passwordHash }).run();
}
