const admin = require('firebase-admin');
//This credentials shouldnt be here, it is just for the excercise, but since this is private data/credentials, it is not supposed to be inside of the source code, usually it would be in 
//a secret vault or enviroment variable
const serviceAccount = require('./secret.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = { auth, admin };
