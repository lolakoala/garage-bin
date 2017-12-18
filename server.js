const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const checkParams = require('./checkParams.js');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/api/v1/garageItems', (request, response) => {
  database('garageItems').select()
    .then(items => {
      if (items.length) {
        return response.status(200).json(items);
      } else {
        return response.status(404).json({
          error: 'No items found.'
        });
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.get('/api/vi/garageItems/:id', (request, response) => {
  const { id } = request.params;
  database('garageItems').where('id', id).select()
    .then(items => {
      if (items.length) {
        return response.status(200).json(items);
      } else {
        return response.status(404).json({
          error: 'No items with that id found.'
        });
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/garageItems',
  (request, response, next) => { checkParams(['name', 'reasonForLingering', 'itemCleanliness'], request.body, response, next); },
  (request, response) => {
    const item = request.body;

    database('garageItems').insert(item, 'id')
      .then(items => {
        return response.status(201).json({ id: items[0] });
      })
      .catch(error => {
        return response.status(500).json({ error });
      });
  });

app.patch('/api/v1/garageItems/:id', (request, response) => {
  const { id } = request.params;
  const updatedItem = request.body;

  database('houses').where('id', id).update(updatedItem, '*')
    .then(results => {
      if (!results.length) {
        return response.status(404).json({ error: `Cannot find an item with the id of ${id}.` });
      }
      return response.sendStatus(204);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`Garage Bin is running on ${app.get('port')}.`);
});

module.exports = app;
