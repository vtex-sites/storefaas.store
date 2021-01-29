const serverlessExpress = require('@vendia/serverless-express')

const app = require('./graphql/server')

exports.handler = async (event, context) => {
  event.requestContext = {
    stage: '$default',
    http: {
      method: event.httpMethod,
      path: event.path,
    },
  }
  event.version = '2.0'
  event.rawPath = event.path
  event.body = JSON.stringify(event.body)

  try {
    const server = serverlessExpress.createServer(app.callback())

    const { promise } = serverlessExpress.proxy(
      server,
      event,
      context,
      'PROMISE'
    )

    return await promise
  } catch (e) {
    console.log('ERROR', e)
  }
}
