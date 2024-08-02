const express = require('express');
const { auth } = require('./firebaseAdmin');
const { admin } = require('./firebaseAdmin');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza esto con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.get('/users', async (req, res) => {
  try {
    let listUsers = [];
    let pageToken;
    do {
      const listUsersResult = await auth.listUsers(1000, pageToken);
      listUsersResult.users.forEach((userRecord) => {
        listUsers.push(userRecord.toJSON());
      });
      pageToken = listUsersResult.pageToken;
    } while (pageToken);
    res.status(200).json(listUsers);
  } catch (error) {
    res.status(500).send('Error loading users: ' + error.message);
  }
});

app.delete('/users/:uid', async (req, res) => {
  const uid = req.params.uid;

  try {
    await auth.deleteUser(uid);
    res.status(200).send(`Successfully deleted user with UID: ${uid}`);
  } catch (error) {
    res.status(500).send(`Error deleting user: ${error.message}`);
  }
});

app.put('/updateEmail', async (req, res) => {
  console.log(req.body)
  const { uid, newEmail } = req.body;

  try {
    await admin.auth().updateUser(uid, { email: newEmail });
    res.status(200).send('Succesfully updated user email.');
  } catch (error) {
    res.status(400).send(`There was an error while tryng to update user email: ${error.message}`);
  }
});


app.listen(port, () => {
  console.log(`API for users running at: http://localhost:${port}`);
});
