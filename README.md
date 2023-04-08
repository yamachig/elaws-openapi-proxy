# elaws-openapi-proxy

An OpenAPI proxy server for [e-LAWS API](https://elaws.e-gov.go.jp/apitop/) (the official API for Japanese laws data).

# How to use

## Option 1: Run locally

1. Prerequisites: [Node.js](https://nodejs.org/)
2. In the `./server` directory, run the following commands:
    - `npm install`
    - `npm start`
3. Then access http://localhost:3000/docs to open Swagger UI. You can obtain the OpenAPI spec at http://localhost:3000/openapi.json .


## Option 2: Deploy on AWS

Be aware that this option creates resources on AWS and may incur costs.

1. Prerequisites: [Node.js](https://nodejs.org/), [AWS CDK CLI](https://docs.aws.amazon.com/cdk/v2/guide/tools.html), and Active [AWS account](https://aws.amazon.com/).
2. In the `./cdk` directory, run the following commands:
    - `npm install`
    - `npm run deploy`
3. Then access \[ApiEndpoint\]/docs to open Swagger UI. You can obtain the OpenAPI spec at \[ApiEndpoint\]/openapi.json .


