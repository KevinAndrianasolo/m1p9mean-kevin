var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.resolve(__dirname, '..');
var ApiService = require(path.resolve(appDir, 'services/ApiService'));

router.get('/:model', async function(req, res, next) {
  let model = req.params["model"];

  let tmp = await ApiService.findAll(model);
  res.send(tmp);
});

router.get('/:model/:id', async function(req, res, next) {
  let model = req.params["model"];
  let id = req.params["id"];

  let tmp = await ApiService.findById(model, id);
  res.send(tmp);
});

router.post('/:model', async function(req, res, next) {
  let model = req.params["model"];
  let object = req.body;
  console.log(object);

  let tmp =  await ApiService.save(model, object);
  res.send(tmp);
});

router.put('/:model/:id', async function(req, res, next) {
  let model = req.params["model"];
  let id = req.params["id"];
  let object = req.body;
  
  let tmp =  await ApiService.update(model, id, object);
  res.send(tmp);
});

router.delete('/:model/:id', async function(req, res, next) {
  let model = req.params["model"];
  let id = req.params["id"];

  
  let tmp =  await ApiService.deleteById(model, id);
  res.send(tmp);
});

module.exports = router;
