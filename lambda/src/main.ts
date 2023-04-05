import { app } from "elaws-openapi-proxy-server/build/app";
import serverless from "serverless-http";

export const lambdaHandler = serverless(app);
