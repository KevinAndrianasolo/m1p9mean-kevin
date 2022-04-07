var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.resolve(__dirname, '..');
var ApiService = require(path.resolve(appDir, 'services/ApiService'));
var AuthService = require(path.resolve(appDir, 'services/AuthService'));
var ResponseBuilder = require(path.resolve(appDir, 'utils/ResponseBuilder'));


router.get('/:model', async function(req, res, next) {
  try{
    let model = req.params["model"];

    let tmp = await ApiService.findAll(model);
    let response = ResponseBuilder.success(200, `List of ${model}`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
  
});

router.get('/:model/:id', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let id = req.params["id"];

    let tmp = await ApiService.findById(model, id);
    let response = ResponseBuilder.success(200, `Details of ${model} with id : ${id}`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});
router.post('/:model/findOne', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let object = req.body;
    let userTokenId = req.userTokenId;
    if(userTokenId){
      let userId = await AuthService.findUserIdWithUserTokenId(userTokenId);
      object['userId'] = userId;
      console.log(object);
    } 
    
    let tmp =  await ApiService.findOne(model, object);
    let response = ResponseBuilder.success(200, `Search result of ${model}`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});
router.post('/:model/find', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let object = req.body;
    let userTokenId = req.userTokenId;
    if(userTokenId){
      let userId = await AuthService.findUserIdWithUserTokenId(userTokenId);
      object['userId'] = userId;
    } 
    
    console.log(object);

    let tmp =  await ApiService.find(model, object);
    let response = ResponseBuilder.success(200, `Search result of ${model}`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});
router.post('/:model/saveAll', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let tab = req.body;
    
    let userTokenId = req.userTokenId;
    if(userTokenId){
      let userId = await AuthService.findUserIdWithUserTokenId(userTokenId);
      for(let i=0;i<tab.length; i++){
        tab[i]['userId'] = userId;

      }
      console.log(tab);
    } 
    

    let tmp =  await ApiService.saveAll(model, tab);
    let response = ResponseBuilder.success(200, `Saving array of ${model} successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});
router.post('/:model', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let object = req.body;
    let userTokenId = req.userTokenId;
    if(userTokenId){
      let userId = await AuthService.findUserIdWithUserTokenId(userTokenId);
      object['userId'] = userId;
    } 
    console.log(object);

    let tmp =  await ApiService.save(model, object);
    let response = ResponseBuilder.success(200, `Saving ${model} successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});

router.put('/:model/:id', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let id = req.params["id"];
    let object = req.body;
    
    let tmp =  await ApiService.update(model, id, object);
    let response = ResponseBuilder.success(200, `Updating ${model} with id : ${id} successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});

router.delete('/:model/:id', async function(req, res, next) {
  try{
    let model = req.params["model"];
    let id = req.params["id"];

    
    let tmp =  await ApiService.deleteById(model, id);
    let response = ResponseBuilder.success(200, `Deleting ${model} with id : ${id} successful`, tmp);
    res.send(response);
  }
  catch(e){
    res.send(ResponseBuilder.error(500, e.message));
  }
});

module.exports = router;
