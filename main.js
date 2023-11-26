const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const http = require('http');
const { json } = require('body-parser');
app.use(cors());
const upload = multer({ dest: 'uploaded -Images/' });

app.use(express.json()) // Use express.json() to parse JSON data

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'javadb',
  password: 'Softsol@321'
})






app.post('/createUser', (req, res) => {
  const {  firstName,lastName,password,mobileNo,company,companyEmail,country,state,postalCode,role,designation,experience,location,certificates,notification} = req.body

  const query = 'INSERT INTO userTable1 ( firstName,lastName,password,mobileNo,company,companyEmail,country,state,postalCode,role,designation,experience,location,certificates,notification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  connection.query(query, [ firstName,lastName,password,mobileNo,company,companyEmail,country,state,postalCode,role,designation,experience,location,certificates,notification], (err, results, fields) => {
    if (err) {
      console.log('Data Insertion Error', err)
      res.json({ status: false, message: 'Invalid Creadentials' });
      console.log('User Created');
    } else {
      res.json({ status: true, message: 'User Created Successfully' });
    }
  })
})


app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);

  connection.query('SELECT companyEmail, password FROM usertable1;', (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }

    const user = results.find(user => user.companyEmail === userName && user.password === password);

    if (user) {
      return res.json({ status: true, message: 'Login successful' });
    } else {
      return res.json({ status: false, message: 'Invalid Username or Password' });
    }
  });
});



//get Cart Data
app.post('/getUserDetails', (req, res) => {
  const { companyEmail } = req.body

  const query = 'SELECT * FROM usertable1 WHERE companyEmail = ?'

  connection.query(query, [companyEmail], (err, results) => {
    if (err) {
      res.json({ status: false, message: 'Unable to load the Cart' })
    } else {
      res.json(results)
    }
  })
})




const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})