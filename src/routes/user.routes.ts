import express from "express";
import { users } from "../data/users";

const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  res.json(users);
});

// GET /users/:id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
});

// POST /users
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: Date.now(),
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  user.name = name;
  user.email = email;

  res.json({ message: "User updated", user });
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users.splice(index, 1)[0];

  res.json({ message: "User deleted", deletedUser });
});

export default router;
