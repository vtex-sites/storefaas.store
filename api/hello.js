exports.handler = async (event) => {
  let name = event.queryStringParameters.name
  if (event.queryStringParameters)
    name = 'World';

  return {
    statusCode: 200,
    body: `Hello ${name}`,
  };
};

