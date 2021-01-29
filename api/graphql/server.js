const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const graphqlHTTP = require('koa-graphql')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { addResolversToSchema } = require('@graphql-tools/schema')
const { loadSchemaSync } = require('@graphql-tools/load')

const app = new Koa()
const router = new Router()

const { default: resolvers } = require('./resolvers')

const schema = loadSchemaSync(path.join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

router.all(
  '/graphql',
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
