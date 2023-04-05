import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigwv2 from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { parse } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";


export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const dotenv_path = path.join(__dirname, "../.env");
        const dotenv_variables = fs.existsSync(dotenv_path) ? parse(fs.readFileSync(dotenv_path)) : {};

        const namePrefix = props?.stackName ?? dotenv_variables.NAME_PREFIX ?? "elaws_openapi_proxy";
        const functionRole = new iam.Role(
            this,
            `${namePrefix}_function_role`,
            {
                assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName(
                        "service-role/AWSLambdaBasicExecutionRole"
                    ),
                ],
            }
        );

        const lambdaFunction = new lambda.DockerImageFunction(this, `${namePrefix}_function`, {
            code: lambda.DockerImageCode.fromImageAsset("../lambda"),
            memorySize: 256,
            timeout: cdk.Duration.seconds(20),
            role: functionRole,
            environment: { DEBUG: "" },
        });
        // lambdaFunction.addEnvironment("FUNCTION_ARN", lambdaFunction.functionArn);

        const integration = new HttpLambdaIntegration(`${namePrefix}_integration`, lambdaFunction);

        const api = new apigwv2.HttpApi(this, `${namePrefix}_api`);
        api.addRoutes({ path: "/{proxy+}", integration });
        // lambdaFunction.addEnvironment("API_ENDPOINT", api.apiEndpoint);

        new cdk.CfnOutput(this, "ApiEndpoint", {
            value: api.apiEndpoint,
        });
    }
}
