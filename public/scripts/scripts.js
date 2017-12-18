// MAJOR: Users should be able to open and close a garage door to see or not see the list of items.
// MINOR: By default, the garage door is closed and the list is not visible.
// MINOR: When opened (by button or any click event you choose), the garage door should transition up and after a few seconds, the list of items should be fully visible and the garage door is gone.
// MAJOR: User should be able to see the details of a particular item by clicking its name on the list. The user should see the following:
// MINOR: The name of the particular garage item.
// MINOR: The reason it lingers.
// MINOR: A dropdown or other option to change the cleanliness of the item. When they change the cleanliness of the item, that change should be applied and persist on refresh.

//start JS
let items;

const appendItem = item => {
  $('.item-names').append(`<p class="item-name" data-item=${item}>${item.name}</p>`)
  let currentCleanCount = parseInt($(`#${item.itemCleanliness}`).text());
  currentCleanCount++;
  $(`#${item.itemCleanliness}`).text(currentCleanCount);
  let currentTotal = parseInt($('#total').text());
  currentTotal++;
  $('#total').text(currentTotal);
}

const addItem = () => {
  const item = {
    name: $('#name-field').val(),
    reasonForLingering: $('#reason-field').val(),
    itemCleanliness: $('#cleanliness-dropdown').val()
  };

  fetch('./api/v1/garageItems', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(() => {
    appendItem(item);
  })
  .catch(error => { throw error; });
}

const sortABC = () => {
  items.sort((a, b) => {
  var nameA = a.name.toUpperCase();
  var nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
}

const emptyVals = () => {
  $('.item-names').html('');
  $('#Rancid').text(0);
  $('#Sparkling').text(0);
  $('#Dusty').text(0);
  $('#total').text(0);
}

const sortItems = () => {
  sortABC();
  emptyVals();
  items.forEach(item => { appendItem(item); });
}

const reverseItems = () => {
  sortABC();
  items.reverse();
  emptyVals();
  items.forEach(item => { appendItem(item); });
}


fetch('./api/v1/garageItems')
  .then(res => res.json())
  .then(res => {
    items = res;
    items.forEach(item => { appendItem(item); })
  })
  .catch(error => { throw error; });

  $('#submit-form').click(addItem);
  $('#alphabetical').click(sortItems);
  $('#reverse-a').click(reverseItems);
