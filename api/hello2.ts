import { ApolloClient, ApolloLink } from '@apollo/client';

exports.handler = async (event: any) => {
  console.log(ApolloClient, ApolloLink);
  let name = event.queryStringParameters.name
  if (event.queryStringParameters)
    name = 'World';

  return {
    statusCode: 200,
    body: `Hello ${name}`,
  };
};


