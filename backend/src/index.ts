import express from "express";
import userRoutes from "./api/routes/carRoutes";
import { openDb } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1", userRoutes);

openDb().then((db) => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, placa VARCHAR(7) NOT NULL UNIQUE,chassi VARCHAR(17) NOT NULL UNIQUE, renavam VARCHAR(11) NOT NULL UNIQUE, marca VARCHAR(50) NOT NULL, modelo VARCHAR(50) NOT NULL, ano INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app };
