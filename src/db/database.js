require("reflect-metadata");
const path = require("path");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");

dotenv.config();

const Database = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, "../entities/*.{js,ts}")],
  migrations: [path.join(__dirname, "migrations/*.js")],
});

module.exports = { Database };
