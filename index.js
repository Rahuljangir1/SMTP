const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
  const { name, email} = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(409).send('Email already exists');
      return;
    }

    const newUser = new User({name, email });
    await newUser.save();

    res.status(201).send('we sent your password throgh email please check your Inbox');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});