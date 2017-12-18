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

fetch('./api/v1/garageItems')
  .then(res => res.json())
  .then(res => {
    items = res;
    items.forEach(item => { appendItem(item); })
  })
  .then(() => console.log(items))
  .catch(error => { throw error; });
