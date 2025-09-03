// import cors from "cors";
// import morgan from "morgan";
// import express from "express";
// import routes from "./routes";
// import cookieParser from "cookie-parser";
// import errorHandler from "./middlewares/errorHandler.middleware";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./config/swagger";

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       "https://gatherly-frontend-mu.vercel.app",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(morgan("dev"));

// // Route

// app.use("/api/v1", routes);

// // Swagger UI route (should be before error handler)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Health Check
// app.get("/check", (_req, res) => {
//   res.json({ status: "Running..." });
// });

// // Unhandle Error
// app.use(errorHandler);

// if (process.env.ENV === "development") {
//   app.listen(process.env.PORT, () =>
//     console.log(`Server running on http://localhost:${process.env.PORT}`)
//   );
// }

// export default app;

// import cors from "cors";
// import morgan from "morgan";
// import express from "express";
// import routes from "./routes";
// import cookieParser from "cookie-parser";
// import errorHandler from "./middlewares/errorHandler.middleware";
// import swaggerSpec from "./config/swagger";

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       "https://gatherly-frontend-mu.vercel.app",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(morgan("dev"));

// // Route
// app.use("/api/v1", routes);

// // Serve Swagger spec as JSON
// app.get("/api-docs.json", (_req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerSpec);
// });

// // Serve Swagger UI HTML
// app.get("/api-docs", (_req, res) => {
//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Gatherly API Documentation</title>
//       <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
//       <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@4.15.5/favicon-32x32.png" sizes="32x32" />
//       <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@4.15.5/favicon-16x16.png" sizes="16x16" />
//       <style>
//         html {
//           box-sizing: border-box;
//           overflow: -moz-scrollbars-vertical;
//           overflow-y: scroll;
//         }
//         *, *:before, *:after {
//           box-sizing: inherit;
//         }
//         body {
//           margin: 0;
//           background: #fafafa;
//         }
//       </style>
//     </head>
//     <body>
//       <div id="swagger-ui"></div>
//       <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js" charset="UTF-8"></script>
//       <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
//       <script>
//         window.onload = function() {
//           const ui = SwaggerUIBundle({
//             url: '/api-docs.json',
//             dom_id: '#swagger-ui',
//             deepLinking: true,
//             presets: [
//               SwaggerUIBundle.presets.apis,
//               SwaggerUIStandalonePreset
//             ],
//             plugins: [
//               SwaggerUIBundle.plugins.DownloadUrl
//             ],
//             layout: "StandaloneLayout"
//           });
//         };
//       </script>
//     </body>
//     </html>
//   `;
//   res.send(html);
// });

// // Health Check
// app.get("/check", (_req, res) => {
//   res.json({ status: "Running..." });
// });

// // Unhandle Error
// app.use(errorHandler);

// if (process.env.ENV === "development") {
//   app.listen(process.env.PORT, () =>
//     console.log(`Server running on http://localhost:${process.env.PORT}`)
//   );
// }

// export default app;


import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware";
import swaggerSpec from "./config/swagger";

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

// Serve Swagger spec as JSON
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Serve Swagger UI HTML
app.get("/api-docs", (_req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Gatherly API Documentation</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css" />
      <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@4.15.5/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@4.15.5/favicon-16x16.png" sizes="16x16" />
      <style>
        html {
          box-sizing: border-box;
          overflow: -moz-scrollbars-vertical;
          overflow-y: scroll;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
        body {
          margin: 0;
          background: #fafafa;
        }
        .swagger-ui .topbar {
          background-color: #4CAF50;
        }
        .swagger-ui .topbar .link {
          color: white;
        }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js" charset="UTF-8"></script>
      <script src="https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js" charset="UTF-8"></script>
      <script>
        window.onload = function() {
          const ui = SwaggerUIBundle({
            url: '/api-docs.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            plugins: [
              SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            validatorUrl: null,
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onComplete: function() {
              console.log('Swagger UI loaded successfully');
            },
            onFailure: function(error) {
              console.error('Swagger UI failed to load:', error);
            }
          });

          // Add some custom styling
          const style = document.createElement('style');
          style.textContent = \`
            .swagger-ui .info .title {
              color: #4CAF50;
            }
            .swagger-ui .scheme-container {
              background: #4CAF50;
              box-shadow: none;
            }
          \`;
          document.head.appendChild(style);
        };
      </script>
    </body>
    </html>
  `;
  res.send(html);
});

// Health Check
app.get("/check", (_req, res) => {
  res.json({ status: "Running...", timestamp: new Date().toISOString() });
});

// Debug route to check swagger spec
app.get("/debug/swagger", (_req, res) => {
  res.json({
    pathsCount: Object.keys(swaggerSpec.paths || {}).length,
    paths: Object.keys(swaggerSpec.paths || {}),
    info: swaggerSpec.info
  });
});

// Unhandle Error
app.use(errorHandler);

if (process.env.ENV === "development") {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on http://localhost:${process.env.PORT}`)
  );
}

export default app;