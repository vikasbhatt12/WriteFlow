
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


const corsOptions = {
  
  origin: 'https://write-flow-tawny.vercel.app', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


app.use(express.json()); 
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch((err) => console.error('MongoDB connection error:', err));



app.get('/', (req, res) => {
  res.send('MarkItDown API is running!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});