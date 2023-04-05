import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Swagger UI: http://localhost:${port}/docs`)
);
