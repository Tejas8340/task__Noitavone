const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://Tejas:Tejas%401137@cluster0.1d3gnzo.mongodb.net/mern', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String // Remove email field
});

const User = mongoose.model('User', userSchema);

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

app.use(bodyParser.json());

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle ticket creation
app.post('/create-ticket', upload.single('attachment'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const attachment = req.file ? req.file.path : null; // Save file path or null if no attachment
    const newTicket = new Ticket({ title, description, attachment });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/update-ticket/:id', upload.single('attachment'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const attachment = req.file ? req.file.path : null; // Save file path or null if no attachment
    const ticketId = req.params.id;

    // Find the ticket by ID and update its fields
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { title, description, attachment }, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket updated successfully', ticket: updatedTicket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateAuthToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to generate JWT token
function generateAuthToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, 'c12a5eb7312e2de4b7a07c456536cf6c28b1d5fb5c731305db05123f8d5aeec8', { expiresIn: '1h' });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
