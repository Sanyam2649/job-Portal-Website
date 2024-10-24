const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const path = require('path');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Import routes
const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const jobRoute = require('./routes/jobsRoutes');

// MongoDB connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running....');
});
//api for job-route
app.use('/api', jobRoute);
app.use('/api',userRoute);
app.use('/api',authRoute);

// Error middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
