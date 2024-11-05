import type { dbSqlite } from "../db";
import { userTable } from "../schema/lucia-auth";
import { eq } from "drizzle-orm";

export async function getExistingUser(db: ReturnType<typeof dbSqlite>, username: string) {
  return db.select().from(userTable).where(eq(userTable.username, username)).get();
}

export async function signupWithCredentials(
  db: ReturnType<typeof dbSqlite>,
  userId: string,
  username: string,
  passwordHash: string,
) {
  return db.insert(userTable).values({ id: userId, username, password: passwordHash }).run();
}
