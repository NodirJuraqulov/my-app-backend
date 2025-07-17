import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // .env fayldan o‘qish

const app = express();
const PORT = process.env.PORT || 3000; // Railway uchun mos

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRoutes);

// Test endpoint
app.get("/hello", (req, res) => {
  res.send("Hello from Swagger API!");
});

// PUT - user update (test uchun)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  res.status(200).json({
    id,
    name,
    email,
    message: "User updated"
  });
});

// DELETE - user delete (test uchun)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    id,
    message: `User with ID ${id} deleted`
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
});
