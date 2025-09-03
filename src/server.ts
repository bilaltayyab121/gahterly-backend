import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware";
import swaggerSpec from "./config/swagger";
import swaggerUiDist from "swagger-ui-dist";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://gatherly-frontend-mu.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// Route

app.use("/api/v1", routes);

// Serve Swagger UI static files from swagger-ui-dist
const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();
app.use("/api-docs/assets", express.static(swaggerUiAssetPath));

// Serve custom Swagger HTML
app.get("/api-docs", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>API Documentation</title>
  <link rel="stylesheet" type="text/css" href="./assets/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="./assets/swagger-ui-bundle.js"></script>
  <script src="./assets/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: '/api-docs/swagger.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>
  `);
});

// Serve generated swagger spec
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Health Check
app.get("/check", (_req, res) => {
  res.json({ status: "Running..." });
});

// Unhandle Error
app.use(errorHandler);

if (process.env.ENV === "development") {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
}

export default app;
