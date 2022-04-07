var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.resolve(__dirname, '..');
var AuthService = require(path.resolve(appDir, 'services/AuthService'));
var ResponseBuilder = require(path.resolve(appDir, 'utils/ResponseBuilder'));

router.post('/check', async function(req, res, next) {
  try{
    let authObj = req.body;
    console.log(authObj);
    let tmp = await AuthService.check(authObj);
    let response = ResponseBuilder.success(200, `Authorization checked`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});
router.post('/signup', async function(req, res, next) {
  try{
    let user = req.body;
    let tmp = await AuthService.signup(user);
    let response = ResponseBuilder.success(200, `Signup successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});
router.post('/login', async function(req, res, next) {
  try{
    let user = req.body;
    let tmp = await AuthService.login(user);
    let response = ResponseBuilder.success(200, `Login successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

router.get('/user', async function(req, res, next) {
  try{
    let userTokenId = req.userTokenId;
    let tmp = await AuthService.findUserWithUserTokenId(userTokenId);
    let response = ResponseBuilder.success(200, `Get user with userTokenId successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

router.delete('/logout', async function(req, res, next) {
  try{
    let userTokenId = req.userTokenId;
    let tmp = await AuthService.logout(userTokenId);
    let response = ResponseBuilder.success(200, `Logout successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

module.exports = router;
