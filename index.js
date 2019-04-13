var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
const fs = require('fs');


const Pictures = [];
fs.readdir('./assets', (err, pics) => {
  pics.map(p => Pictures.push(p));
});
var router = Router()
router.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(Pictures))
})

router.get(`/:index`, function (req, res) {
  res.setHeader('Content-Type', 'image/jpg')
  var picNum = req.params.index;
  fs.readFile(`./assets/${picNum}.jpg`, (err, picture) => {
    res.end(picture)
  });

})


var server = http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res))
})

server.listen(3000)