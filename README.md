# Sinauline
Educational Riddles Bot on Line Chat

## Live
[![button](https://scdn.line-apps.com/n/line_add_friends/btn/en.png)](https://line.me/R/ti/p/%40qyy2931z)


## Node
Node [`v8.1.2+`][2] or higher

## Framework and Libraries
This Project is build using :
- Koa ([github][1])
- LineSDK ([github][4])
- Knex ([github][6])
- Postgres ([github][7], [postgres][8])

## Styleguide
[JavaScript Standard Style][5].

## General Setup

Make sure you are running at least Node v8.1.2 and NPM 4. [`nodemon`][3] is optional but recommended for hot reload on your local dev machine.

Get started by 
1. Running `npm install`.
2. Prepare your .env file (copy `.example.env` to `.env`)
3. Update database structure to the latest migration by running `knex migrate:latest`. Don't forget to install knex globally
4. Seed some questions by running `knex seed:run`
5. Then `node index.js` and voila!

[1]: https://github.com/koajs
[2]: https://nodejs.org/en/
[3]: https://nodemon.io/
[4]: https://github.com/line/line-bot-sdk-nodejs
[5]: http://standardjs.com
[6]: http://knexjs.org/
[7]: https://github.com/brianc/node-postgres
[8]: https://www.postgresql.org/
