// MAJOR: Users should be able to open and close a garage door to see or not see the list of items.
// MINOR: By default, the garage door is closed and the list is not visible.
// MINOR: When opened (by button or any click event you choose), the garage door should transition up and after a few seconds, the list of items should be fully visible and the garage door is gone.
// MAJOR: Users should be able to add a new item to the list.
// MINOR: They should be able to include the name of the item.
// MINOR: They should be able to include the reason why that item lingers.
// MINOR: They should be able to select the cleanliness of the item in a dropdown.
// The list of items in the garage should show the following data:
// MAJOR: The list can sort items by item name alphabetically by ascending and descending order.
// MAJOR: User should be able to see the details of a particular item by clicking its name on the list. The user should see the following:
// MINOR: The name of the particular garage item.
// MINOR: The reason it lingers.
// MINOR: A dropdown or other option to change the cleanliness of the item. When they change the cleanliness of the item, that change should be applied and persist on refresh.
//


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

fetch('./api/v1/garageItems')
  .then(res => res.json())
  .then(res => {
    items = res;
    items.forEach(item => { appendItem(item); })
  })
  .catch(error => { throw error; });

  $('#submit-form').click(addItem);
