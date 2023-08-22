const express = require('express');
const User = require('../models/signUpUser');
const path = require('path');

exports.getLoginPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','public','views','login.html'));
};

exports.postValidiateLogin = async (req,res,next) =>{
       const userValidiate = {
           email: req.body.email,
           password: req.body.password
       }

        
    
     await User.findAll({where :{ email : userValidiate.email}})
       
          .then((user) => {
                 
                if(user[0].email === userValidiate.email){
                      
                     return user[0].password;
                }
              
              
          })
            .then((password) => {
                  if(password === userValidiate.password){
                       res.send('You Successfully login');
                  }
                  else{
                    res.send('Wrong Password');
                  }
            })
         
           .catch(err => {
                res.status(404).send('User Not Found 404');
            

           })

};