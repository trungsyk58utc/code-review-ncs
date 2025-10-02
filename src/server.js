const app = require("./app");
const port = process.env.APP_PORT || 4000;
const { Database } = require("./db/database");

Database.initialize().then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
});