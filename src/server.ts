import cors from "cors";
import morgan from "morgan";
import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./config/swagger.config";
import errorHandler from "./middlewares/errorHandler.middleware";

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

setupSwagger(app);

export default app;
