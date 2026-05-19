const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');

const connectDB = require('./src/dbconnection/db');
const uploadImage = require('./src/service/ImageKitService');

const Router = require('./src/routes/route');
const http = require('http')
const { Server } = require('socket.io')

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
}
)
app.set("io", io);

io.on("connection", (socket) => {

  console.log("User Connected :", socket.id);
 
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });

});

connectDB();

const upload = multer({
  storage: multer.memoryStorage()
});

// app.use('/uploads', express.static('uploads'));

app.use('/', Router);
app.use('/api', Router);


// Upload Route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const result = await uploadImage(req.file.buffer);

    return res.status(201).json({
      message: 'File uploaded successfully',
      result: result
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Upload failed"
    });
  }
});


server.listen(
  5000, () => {
  console.log("Server is running on port 5000");
});
