const createError = require('http-errors');
const express = require('express');
const router = express.Router();

const laptops = require('../modules/laptops');
const url = require('url');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Laptops' });
});


router.get('/laptops', (request, response, next) => {
  let get_params = url.parse(request.url, true).query; 
  console.log('got into laptops');
  if (Object.keys(get_params).length == 0) {
    console.log('no params'); 
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(laptops.list()));
  }
  else { 
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key]; console.log('params ' + value);
    let result = laptops.query_by_arg(key, value); if (result) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    } else { next(createError(404)); }
  }
}); 

router.get('/laptops/team', (request, response, next) => {
  let get_params = url.parse(request.url, true).query; 
  console.log('got into laptops team');
  
  if (Object.keys(get_params).length == 0) {
    console.log('no params'); 
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(laptops.team()));
  }
  else { 
    let key = Object.keys(get_params)[0];
    console.log("First key is: " + key);
    let value = request.query[key]; console.log('params ' + value);
    let result = laptops.query_by_arg(key, value); if (result) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    } else { next(createError(404)); }
  }
});


router.get('/laptops/:location', (request, response, next) => {
  const param = request.params.location;
  console.log('got into laptops/:location ' + param);
  const result = laptops.query_by_arg( "location", param); 
  
  if (result) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  }
  else { next(createError(404)); }
});


module.exports = router;
