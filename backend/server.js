const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const notes =  require('./data/data');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
app.use(cors());

const {notFound,errorHandler} = require('./middlewares/errorMiddleware');


dotenv.config();
connectDB();

app.use(express.json());

app.get('/', function(req, res){
res.send("Note Tracker");
 });

app.use("/api/users",userRoutes);
app.use("/api/notes",noteRoutes);




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log("server running"));