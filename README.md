# Para

REST API backend for **Para**, a digital game distribution platform with users, groups, games and items. Built with Node.js, Express and MongoDB (Mongoose). The Angular frontend lives in [ParaFront](https://github.com/Muszek1996/ParaFront).

## Features
- Users with `user` and `admin` roles; passwords hashed with bcrypt
- Login with HTTP Basic auth (`POST /api/users/auth`), which returns a JWT for later requests
- Admin-only user listing, lookup and deletion
- CRUD for games, groups and items, plus a `search` endpoint on each:
  - games: `title`, `description`, `dubbing`, `versionmin`/`versionmax`, `pricemin`/`pricemax`
  - items: `name`, `pricemin`/`pricemax`, `tradeable`
  - groups: `name`
- Users own games and item stacks (item + quantity); groups have an owner and members
- Mongoose validation errors returned as `400 {errors: [...]}`

## API
All routes are under `/api`:

| Resource | Routes |
|---|---|
| `/users` | `POST /` register, `POST /auth` login, `GET /me`, `PUT /` update self, `GET /`, `GET /:id`, `DELETE /:id` (admin) |
| `/games`, `/groups`, `/items` | `GET /`, `GET /search?...`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |

## Requirements
- Node.js
- MongoDB running locally (default URI `mongodb://localhost/ie2018-dev`)

## Setup
```bash
npm install
npm install jsonwebtoken   # used by src/services/jwt.js but missing from package.json
node src/index.js          # listens on http://localhost:80
```

Settings (port, IP, Mongo URI, JWT secret) are in `src/config.js`. Set your own `jwtSecret` there before running. The environment is chosen with `NODE_ENV` (default `development`). Port 80 may need elevated privileges, so change `port` if needed.

## Structure
```
src/index.js, app.js   entry point, HTTP server, Mongo connection
src/config.js          per-environment config
src/api/               routers, controllers and models for game, group, item, user
src/services/          express setup, passport (Basic + JWT), jwt, mongoose, response helpers
```
