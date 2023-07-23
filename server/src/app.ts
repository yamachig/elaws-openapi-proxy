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

app.get("/openapi.json", (req, res) => {
    res.type(".json");
    res.send(JSON.stringify({
        ...openapiSpec,
        servers: [{ url: req.protocol + "://" + req.get("host") + (openapiSpec.servers[0]?.url ?? "") }],
    }, undefined, 2));
});
