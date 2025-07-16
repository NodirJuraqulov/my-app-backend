import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import userRoutes from "./routes/user.routes";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRoutes);

app.get("/hello", (req, res) => {
  res.send("Hello from Swagger API!");
});

// app.get("/user/:id", (req, res) => {
//   const {id} = req.params;
//   const user  = users.find(item => item.id===id)
// // joi
//   if(!user){
//     return res.status(404).json({
//       message:"User not found"
//     })
//   }

//   res.json({
//     success:true,
//     data:user,
//     message:''
//   });
// });

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  // Hozircha faqat test uchun oddiy javob qaytaramiz
  res.status(200).json({
    id,
    name,
    email,
    message: "User updated"
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  // Test uchun oddiy javob
  res.status(200).json({
    id,
    message: `User with ID ${id} deleted`
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger is running at http://localhost:${PORT}/api-docs`);
});
