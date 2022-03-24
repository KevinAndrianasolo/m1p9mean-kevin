var express = require('express');
var router = express.Router();
const path = require('path');
var appDir = path.resolve(__dirname, '..');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(__dirname);
  console.log(appDir);
  let indexPath = path.resolve(appDir, "m1p9mean-kevin-client/dist/m1p9mean-kevin-client/index.html");
  res.sendFile(indexPath);
});

module.exports = router;
