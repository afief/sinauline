const knex = require('knex')

const options = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB
  }
}

const client = knex(options)

client.on('query', (toSql) => {})

client.on('query-error', (err, toSql) => {
  if (process.env.NODE_ENV === 'development') {
    const queryString = `${toSql.sql} ${JSON.stringify(toSql.bindings)}`
    console.log('>> QUERYERROR: ', err)
    console.log(queryString)
  }
})

client.on('query-response', (result, toSql) => {
  if (process.env.NODE_ENV === 'development') {
    const queryString = `${toSql.sql} ${JSON.stringify(toSql.bindings)}`
    console.log('QUERYOK', result)
    console.log(queryString)
  }
})

module.exports = client
