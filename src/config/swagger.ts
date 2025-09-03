// swagger.ts - Updated configuration
import swaggerJsdoc from "swagger-jsdoc";
const path = require("path");

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
        url:
          process.env.NODE_ENV === "production"
            ? "https://gatherly-backend.vercel.app/api/v1"
            : "http://localhost:5000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            role: {
              type: "string",
              enum: ["SUPER_ADMIN", "ORGANIZER", "PARTICIPANT"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
            status: { type: "number" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Multiple path patterns to catch files in different environments
  apis: [
    // Development paths
    "./src/routes/*.ts",
    // Production paths
    "./dist/routes/*.js",
    path.join(__dirname, "routes/*.js"),
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "./src/routes/*.ts"),
  ],
};

console.log("Current directory:", __dirname);
console.log("Environment:", process.env.NODE_ENV);

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
