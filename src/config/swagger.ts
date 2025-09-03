import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gatherly API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "https://gatherly-backend.vercel.app",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to your route files where you use swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
