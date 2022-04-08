var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.resolve(__dirname, '..');
var MailService = require(path.resolve(appDir, 'services/MailService'));
var ResponseBuilder = require(path.resolve(appDir, 'utils/ResponseBuilder'));


router.post('/', async function(req, res, next) {
  try{
    let mail = req.body;
    console.log(mail);
    let tmp = await MailService.sendMail(mail);
    let response = ResponseBuilder.success(200, `Mail sent`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

module.exports = router;
