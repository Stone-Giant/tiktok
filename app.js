const express = require("express");
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))

// routing functions...
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/video.routes'));
app.use(require('./routes/upload.routes'));

app.get("/",(req,res) => {
    connection.query('SELECT * from users LIMIT 1', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        connection.end();
    });
});


app.listen(5000, () => {
    console.log('Server is running at port 5000');
});