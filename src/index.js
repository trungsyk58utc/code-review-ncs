const express = require('express')
const bodyParser = require('body-parser')
const { Database } = require('./db/database');
const dotenv = require('dotenv')
const studentRoutes = require('./routes/routes');
const app = express()

dotenv.config();
const port = process.env.APP_PORT;

Database.initialize().then(() => {
  console.log('Database connected')
  app.use(bodyParser.json({ type: 'application/*+json' }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true, limit: '30mb' }))

  app.use('/api', studentRoutes)
  
  app.listen(port, () => {
    console.log(`App is running on port ${port}`)
  })
}).catch((error) => console.log(error))