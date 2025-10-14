const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;



const allowedOrigins = [
  'https://write-flow-tawny.vercel.app', 
  'http://localhost:5173'                
];


const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));


app.use(express.json()); 



app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
  res.send('MarkItDown API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});