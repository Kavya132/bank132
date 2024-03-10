const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const devuser = require('./devusermodel');
const Account = require('./account'); // Import the Account model
const Deposit = require('./depositmodel');
const Withdrawl = require('./withdrawlmodel');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

mongoose.connect('mongodb+srv://admin:admin@cluster0.jvcybdx.mongodb.net/bank?retryWrites=true&w=majority&appName=Cluster0').then(
  () => console.log('Database connected')
);

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await devuser.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    // Send the token back to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User registration
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, mobile, role, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new devuser({ fullname, email, mobile, role, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new account
app.post('/new-account', async (req, res) => {
  try {
    const { fullname, email, aadharnumber, mobilenumber, initialBalance, address, role } = req.body;
    const newAccount = new Account({ fullname, email, aadharnumber, mobilenumber, initialBalance, address, role });
    await newAccount.save();
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Home route
app.get('/home', (req, res) => {
  const token = req.query.token;
  res.send(`Welcome to the home page! Your token is: ${token}`);
});

// Function to generate transaction ID
function generateTransactionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Deposit operation
app.post('/deposit', async (req, res) => {
  try {
    const { email, money } = req.body;
    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ message: 'Account not found' });

    let newMoney = parseInt(account.initialBalance) + parseInt(money);
    await account.updateOne({ initialBalance: newMoney });

    const deposit = new Deposit({ email, amount: money, time: new Date(), transactionId: generateTransactionId() });
    await deposit.save();

    res.status(200).json({ message: "Deposit successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Withdrawal operation
app.post('/withdrawl', async (req, res) => {
  try {
    const { email, money } = req.body;
    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ message: 'Account not found' });

    let newMoney = parseInt(account.initialBalance) - parseInt(money);
    if (newMoney < 0) return res.status(403).send("You don't have enough balance");

    await account.updateOne({ initialBalance: newMoney });

    const withdrawl = new Withdrawl({ email, amount: money, time: new Date(), transactionId: generateTransactionId() });
    await withdrawl.save();

    res.status(200).json({ message: "Withdrawal successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Check balance
app.post('/balance', async (req, res) => {
  try {
    const { email } = req.body;
    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json(account.initialBalance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get transactions
app.post('/transactions', async (req, res) => {
  try {
    const { email } = req.body;
    const transactions = await Deposit.find({ email });
    if (transactions.length > 0) {
      res.status(200).json(transactions);
    } else {
      res.status(404).json({ message: 'Transactions not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
