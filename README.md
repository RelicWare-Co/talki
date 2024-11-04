<!--bati:start section="document"-->

<!--bati:start section="intro"-->

Generated with [Bati](https://batijs.dev) ([version 301](https://www.npmjs.com/package/create-bati/v/0.0.301)) using this command:

```sh
bun create bati --react --mantine --lucia-auth --ts-rest --hono --drizzle --biome
```

<!--bati:start section="TOC"-->

## Contents

* [React](#react)

  * [`/pages/+config.ts`](#pagesconfigts)
  * [Routing](#routing)
  * [`/pages/_error/+Page.jsx`](#pages_errorpagejsx)
  * [`/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`](#pagesonpagetransitionstartts-and-pagesonpagetransitionendts)
  * [SSR](#ssr)
  * [HTML Streaming](#html-streaming)

* [Mantine](#mantine)

* [*Example: Lucia Auth with GitHub OAuth*](#example-lucia-auth-with-github-oauth)

* [*Drizzle*](#drizzle)

<!--bati:end section="TOC"-->

<!--bati:end section="intro"-->

<!--bati:start section="features"-->

<!--bati:start category="UI Framework" flag="react"-->

## React

This app is ready to start. It's powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).

### `/pages/+config.ts`

Such `+` files are [the interface](https://vike.dev/config) between Vike and your code. It defines:

* A default [`<Layout>` component](https://vike.dev/Layout) (that wraps your [`<Page>` components](https://vike.dev/Page)).
* A default [`title`](https://vike.dev/title).
* Global [`<head>` tags](https://vike.dev/head-tags).

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

* [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
* [Route Strings](https://vike.dev/route-string)
* [Route Functions](https://vike.dev/route-function)

### `/pages/_error/+Page.jsx`

The [error page](https://vike.dev/error-page) which is rendered when errors occur.

### `/pages/+onPageTransitionStart.ts` and `/pages/+onPageTransitionEnd.ts`

The [`onPageTransitionStart()` hook](https://vike.dev/onPageTransitionStart), together with [`onPageTransitionEnd()`](https://vike.dev/onPageTransitionEnd), enables you to implement page transition animations.

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all your pages or only for some pages.

### HTML Streaming

You can enable/disable [HTML streaming](https://vike.dev/stream) for all your pages, or only for some pages while still using it for others.

<!--bati:end category="UI Framework" flag="react"-->

<!--bati:start category="UI Component Libraries" flag="mantine"-->

## Mantine

This is a boilerplate for Mantine based on the [Getting Started](https://mantine.dev/docs/getting-started/) guide.

The following Packages are installed:

* `@mantine/hooks` Hooks for state and UI management
* `@mantine/core` Core components library: inputs, buttons, overlays, etc.

If you add more packages, make sure to update the `layouts/LayoutDefault.tsx` file to include the required CSSs.

The theme is defined in `layouts/theme.ts`.

<!--bati:end category="UI Component Libraries" flag="mantine"-->

<!--bati:start category="Auth" flag="lucia-auth"-->

## *Example: Lucia Auth with GitHub OAuth*

* Create a [GitHub OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Set the Authorization callback URL to `http://localhost:3000/api/login/github/callback`.
* Copy your `Client ID` and `Client Secret` then paste it in `.env` file like this:

```env
// .env
GITHUB_CLIENT_ID=<Client ID>
GITHUB_CLIENT_SECRET=<Client Secret>
```

* Read more [Lucia Auth: OAuth](https://lucia-auth.com/guides/oauth/)

> \[!NOTE]
> Username & Password signup route : `http://localhost:3000/api/signup`.\
> Username & Password login route : `http://localhost:3000/api/login`.\
> GitHub login route : `http://localhost:3000/api/login/github`.\
> Logout route : `http://localhost:3000/api/auth/logout`.

<!--bati:end category="Auth" flag="lucia-auth"-->

<!--bati:start category="Database" flag="drizzle"-->

## *Drizzle*

First, ensure that `DATABASE_URL` is configured in `.env` file, then create the database:

```bash
pnpm drizzle:generate # a script that executes drizzle-kit generate.
pnpm drizzle:migrate # a script that executes drizzle-kit migrate.
```

> \[!NOTE]
> The `drizzle-kit generate` command is used to generate SQL migration files based on your Drizzle schema.
>
> The `drizzle-kit migrate` command is used to apply the generated migrations to your database.

Read more on [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview)

<!--bati:end category="Database" flag="drizzle"-->

<!--bati:end section="features"-->

<!--bati:end section="document"-->
