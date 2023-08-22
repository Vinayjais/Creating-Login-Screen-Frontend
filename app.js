const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const signUpRouter = require('./routes/signUp');
const loginRouter = require('./routes/login');
// database 
const sequelize = require('./util/database');
const User = require('./models/signUpUser');

const port = 4000;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public','css')));
app.use(express.static(path.join(__dirname,'public','js')));
app.use(express.static(path.join(__dirname,'public','views')));

app.use(signUpRouter); 
app.use(loginRouter);

app.get('*' ,( req,res) => {
     res.send('Page Not Found 404');
});

sequelize.sync()
.then( () => {
    app.listen(port, ()=> {
        console.log(`Server Running on port : ${port}`);
    });
})
.catch(err => {
    console.log(err);
});
