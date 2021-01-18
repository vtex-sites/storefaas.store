#!/usr/bin/env ts-node

import { APIGatewayEvent, Context } from 'aws-lambda';
import { Application, Request, Response } from 'express';
import { readdirSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

const port = process.env["LAMBDA_PORT"] || 8080;

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {

  const basePath: string = cwd();
  const endpoints: {[key: string]: ({}: APIGatewayEvent, {}: Context) => any} = {};

  console.log('\n Functions:');

  for (const item of readdirSync(`${basePath}/api`)) {
    let { handler } = await import(`${basePath}/api/${item}`);
    endpoints[path.parse(item).name] = handler;
  }

  console.log(endpoints);

  app.all('/*', async (req: Request, res: Response) => {
    const [ endpoint ] = req.params['0'].split('/');

    const lambdaEvent = {
      body: req.body,
      queryStringParameters: req.query,
      httpMethod: req.method,
      headers: req.headers,
      path: req.path,
      pathParameters: req.params
    }

    try {
      const { body, statusCode } = await endpoints[endpoint](
        lambdaEvent as APIGatewayEvent,
        {} as Context
      );
      res.status(statusCode).json(body);
    } catch(error) {
      res.status(400).json({error});
    }
  });

  app.listen(port, () => {
    console.log(`\n Server is listening on: http://localhost:${port}`);
  });

})();
