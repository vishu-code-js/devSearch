const express = require("express");
const connectDb = require("./config/dataBaseConnect");
const User = require("./models/user");

const app = express();

app.use(express.json());

// Creating a new user
app.post("/signup", async (req, res) => {
  // Here we are creating a new user instance using the data from the request body
  // This represents a single user document in the MongoDB collection
  const userData = new User(req.body);
  try {
    await userData.save();
    res.status(201).send("User created successfully");
  } catch(err) {
    res.status(500).send("Error creating user" + err.message);
  }
});

// Get the list of users
app.get('/list', async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});

// Get the specific user 
app.get('/user', async (req, res) => {
  try {
    console.log(req);
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      res.status(404).send("User not found");
    }
    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});

// Delete a user
// If we wanna delete the user data based on other params like email we can use deleteOne
app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.email;
    await User.findByIdAndDelete(userId);
    // await User.deleteOne(userId);
    await User.findOneAndDelete({ email: req.body.email });
    res.status(200).send("User deleted successfully");
  } catch {
    res.status(500).send("Error deleting a user");
  }
})

// Update a user
// If we wanna update the user data based on other params like email we can use findOneAndUpdate
app.patch('/user', async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedData = req.body;
    await User.findByIdAndUpdate(userId, updatedData,{
      runValidators:true
    });
    // await User.findOneAndUpdate({ email: userId }, updatedData);
    res.status(200).send("User updated successfully");
  }
  catch (err) {
    res.status(500).send("Error updating user" + err.message);
  }
});

connectDb()
  .then(() => {
    app.listen(3000, (req, res) => {
      console.log("App is listening to port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
