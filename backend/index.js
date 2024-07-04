const path = require('path');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const taskRoutes = require('./Routes/taskRoutes');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Welcome to the Server!');
});

app.get('/health', (req, res) => {
  res.json({
    service: 'Pro Manage App Server',
    status: 'Active',
    time: new Date(),
  });
});

app.use('/auth', userRoutes);
app.use('/task', taskRoutes);

const corsOptions = {
  origin: 'https://promanage-234k.onrender.com',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));



app.use(express.static(path.join(__dirname, "..", "frontend", 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"..","frontend", 'build', 'index.html'));
});

app.listen(port, (err) => {
  if (!err) {
    console.log('Server is Up & is Running on the port: ', port);
  } else {
    console.log('Error while connecting to server');
  }
});
