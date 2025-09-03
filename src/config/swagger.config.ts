import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gatherly",
      version: "1.0.0",
      description: "API documentation for authentication and user management",
    },
    servers: [
      {
        url: "https://gatherly-backend.vercel.app/", // ✅ fixed typo
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // ✅ works in dev + prod
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
