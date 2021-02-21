import { ApolloClient, ApolloLink } from '@apollo/client';

exports.handler = async (event: any) => {
  let name = (event.queryStringParameters?.name) || 'World'

  return {
    statusCode: 200,
    body: `Hello ${name}`,
  };
};


