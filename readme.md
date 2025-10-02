# 🚀 Node.js + MySQL with Docker Compose

## 📖 Introduction

This project use for take-home tech assignment issued by GovTech, write by Sy Dang Trung.
The application supports:

- Running with Docker Compose
- Automatically seeding data into the database before starting the app
- Persistent MySQL data storage using Docker volumes

Tech stack

- NodeJS (>= v20)
- ExpressJS
- MySQL
- TypeORM
- Jest (For unit test)

## 🏃‍♂️ How to Run with Docker

1. **Install prerequisites:**
   Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.
2. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
3. Change DB_HOST in .env
   - If you using MacOS/Windows, change DB_HOST from localhost to host.docker.internal
   - If you using Linux, you need to follow these step:
   Get IP of host
   ```
    ip addr show docker0
   ```
   Get the IP and change DB_HOST to from localhost to this IP
3. **Start the application:**
   ```bash
   docker compose up -d --build
   ```
4. The app and MySQL database will be available as defined in `docker-compose.yml`.

5. **Test the application:**
   - Open [http://localhost:4000](http://localhost:4000) in your browser or use API tools like Postman.

## Note: Because this repo using for testing, I will push .env file instead of .env.example

<!--
This section provides instructions for running the application locally without using Docker.
Follow the steps outlined below to set up and execute the project directly on your machine.
-->

### 🏃‍♂️ How to Run without Docker

1. **Install prerequisites:**

   - [Node.js](https://nodejs.org/) (v20 or higher recommended)
   - [MySQL](https://dev.mysql.com/downloads/mysql/) (ensure the server is running)

2. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up the database:**

   - Create a MySQL database matching the name in your `.env` file.
   - Run the seed scripts to populate initial data:
     ```bash
     npm run seed
     ```

5. **Start the application:**

   ```bash
   npm start
   ```

   The Node.js app will run on port `4000` by default.

6. **Test the application:**
   - Open [http://localhost:4000](http://localhost:4000) in your browser or use API tools like Postman.

**Note:** If you encounter connection issues, verify your MySQL server is running and the credentials in `.env` are correct.

#### 📂 Folder structure

```
.
├── docker-compose.yml     # Docker Compose setup for app and MySQL
├── .env                   # Environment variables for local/dev use
├── src/                   # Application source code
│   ├── server.js          # Entry point for start the Node.js app
│   ├── app.js             # Express JS app
│   ├── controller/        # Request handlers and controllers
│   ├── entities/          # Database schema definitions
│   ├── routes/            # API endpoint definitions
│   └── service/           # Business logic and service layer
|   └── db/                # Include json mock data, migration, seed & config for database
├── package.json           # Project metadata and npm scripts
├── README.md              # Project documentation and instructions
```

##### 🧪 Testing
I haved build 4 test suite, but it's only validation of unhappy case because I don't want to edit anything
````bash
    npm run test
````

Thanks for reviewing - Good luck!
