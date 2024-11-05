import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';
import { userTable } from "./lucia-auth";


export const usersTable = sqliteTable('users_table', {
    id: text().primaryKey(),
    name: text().notNull(),
    nickname: text().notNull(),
    password: text().notNull(),
    isAlive: integer({ mode: 'boolean' }),
    created_at: integer({ mode: 'timestamp' }),
    status: text({ enum: ["offline", "online", "dnd", "idle"] }).default("offline"),
    bio: text(),
})

export const servers = sqliteTable('servers_table', {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    owner_id: text().notNull(),
})


// Relation between usersTable and servers
export const serverUsersRelation = relations(servers, ({ one }) => ({
    owner: one(usersTable, {
        fields: [servers.owner_id],
        references: [usersTable.id],
    }),
}));

export const usersServerRelations = relations(usersTable, ({ many }) => ({
    servers: many(servers)
}))

//------------


// ---- Relation between usersTable and servers, many to many (members)

export const server_memberships = sqliteTable('server_memberships', {
    id: integer().primaryKey({ autoIncrement: true }),
    server_id: integer().notNull().references(() => servers.id),
    user_id: text().notNull().references(() => userTable.id),
    joined_at: integer({ mode: 'timestamp' }),
}, (t) => ({
    pk: primaryKey({ columns: [t.server_id, t.user_id]}),
}),
    );

export const usersMembersRelation = relations(usersTable, ({ many }) => ({
    server_memberships: many(server_memberships)
}))

export const serversMembersRelation = relations(servers, ({ many }) => ({
    server_memberships: many(server_memberships)
}))

export const usersToServersMembersRelations = relations(server_memberships, ({ one }) => ({
    server: one(servers, {
        fields: [server_memberships.server_id],
        references: [servers.id],
    }),
    user: one(usersTable, {
        fields: [server_memberships.user_id],
        references: [usersTable.id],
    }),
}));


