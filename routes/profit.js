var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.resolve(__dirname, '..');
var ProfitService = require(path.resolve(appDir, 'services/ProfitService'));
var ResponseBuilder = require(path.resolve(appDir, 'utils/ResponseBuilder'));


router.get('/', async function(req, res, next) {
  try{
    // Profit for E-Kaly
    let tmp = await ProfitService.findProfits();
    let response = ResponseBuilder.success(200, `E-Kaly profits`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

router.get('/:restaurantId', async function(req, res, next) {
  try{
    let restaurantId = req.params["restaurantId"];

    let tmp = await ProfitService.findProfitOf(restaurantId);
    let response = ResponseBuilder.success(200, `Profits of restaurant with id : ${restaurantId}`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});


module.exports = router;
