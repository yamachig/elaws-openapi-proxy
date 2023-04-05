import express, { json, urlencoded } from "express";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";

export const app = express();

app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import openapiSpec from "./openapi.json";

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, { swaggerUrl: "/openapi.json" }),
);

RegisterRoutes(app);

app.get("/openapi.json", (_, res) => {
    res.type(".json");
    res.send(JSON.stringify(openapiSpec, undefined, 2));
});
