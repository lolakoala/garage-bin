const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

//end point to get all items
//end point to get single item
//end point to add item
//end point to modify item

app.listen(app.get('port'), () => {
  console.log(`Garage Bin is running on ${app.get('port')}.`);
});

module.exports = app;
