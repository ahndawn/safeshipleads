const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));