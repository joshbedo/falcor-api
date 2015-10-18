var falcor = require('falcor');
var FalcorServer = require('falcor-express');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// var TestRouter = <your router here>;

var model = new falcor.Model({
  cache: {
    todo: [
      {
        name: 'go grocery shopping',
        done: false
      },
      {
        name: 'do laundry',
        done: false
      }
    ]
  }
});

app.use(bodyParser.text({ type: 'text/*' }))
app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
  return model.asDataSource();
}));

app.use(express.static('.'));

var server = app.listen(9090, function(err) {
  if (err) return console.error(err);
  console.log('navigate to http://localhost:9090');
});
