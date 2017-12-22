let items;

const isSelected = (item, value) => {
  if (item.itemCleanliness === value) {
    return 'selected';
  }
  return null;
}

const adjustItemsArray = (item, idName) => {
  const itemIndex = items.findIndex(thing => {
    return thing.id === item.id;
  });

  newCleanliness = $(`#${idName}-cleanliness-dropdown`).val();
  updatedItem = Object.assign({}, item, { itemCleanliness: newCleanliness });

  items.splice(itemIndex, 1, updatedItem);
}

const adjustCleanliness = (item, idName) => {
  adjustItemsArray(item, idName);

  fetch(`./api/v1/garageItems/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ itemCleanliness: newCleanliness }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .catch(error => { throw error; });
}

const hideItem = idName => {
  $(`#${idName}-expanded`).remove();
  $(`#${idName}`).removeClass('viewing');
}

const showItem = (item, idName) => {
  $(`#${idName}`).addClass('viewing');
  $(`#${idName}`).append(
    `<div class="expanded-item"
    id="${idName}-expanded">
    <p>Name: ${item.name}</p>
    <p>Reason for Lingering: ${item.reasonForLingering}</p>
    <p>To auomatically adjust the item's cleanliness, select a new option from the menu below.</p>
    <select id="${idName}-cleanliness-dropdown">
      <option value="Sparkling" ${isSelected(item, 'Sparkling')}>Sparkling</option>
      <option value="Dusty" ${isSelected(item, 'Dusty')}>Dusty</option>
      <option value="Rancid" ${isSelected(item, 'Rancid')}>Rancid</option>
    </select>
  </div>`
  );
  $(`#${idName}-cleanliness-dropdown`).change(() => { adjustCleanliness(item, idName); });
}

const expandItem = (event, item, idName) => {
  const cleanlinessOptions = ['Sparkling', 'Dusty', 'Rancid']
  if (cleanlinessOptions.find(option => option === event.target.value)) {
    return;
  }
  if ($(`#${idName}`).hasClass('viewing')) {
    hideItem(idName);
  } else {
    showItem(item, idName);
  }
}

const incrementCleanCount = item => {
  let currentCleanCount = parseInt($(`#${item.itemCleanliness}`).text());
  currentCleanCount++;
  $(`#${item.itemCleanliness}`).text(currentCleanCount);
}

const incrementTotal = () => {
  let currentTotal = parseInt($('#total').text());
  currentTotal++;
  $('#total').text(currentTotal);
}

const appendItem = item => {
  const idName = item.name.replace(/\s+/g, '-').toLowerCase();
  const itemWithId = Object.assign({ idName }, item);
  $('.item-names').append(`<p class="item-name"
    id=${idName}
    data-item=${itemWithId}>
      ${item.name}
    </p>`);
  $(`#${idName}`).click(() => { expandItem(event, item, idName); });
  incrementCleanCount(item);
  incrementTotal();
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

const showItemsList = () => {
  $('.view-items-button').addClass('active');
  $('.view-items-button').removeClass('inactive');
  $('.item-list').show(1000);
  $('.sort-items-button').show(1000);
  $('.garage-door').hide(1000);
  $('.view-items-button').text('Hide Garage Items');
}

const hideItemsList = () => {
  $('.view-items-button').addClass('inactive');
  $('.view-items-button').removeClass('active');
  $('.item-list').hide();
  $('.sort-items-button').hide();
  $('.garage-door').show();
  $('.view-items-button').text('View Garage Items');
}

const toggleItemsView = () => {
  if ($('.view-items-button').hasClass('inactive')) {
    showItemsList();
  } else {
    hideItemsList();
  }
}


fetch('./api/v1/garageItems')
  .then(res => res.json())
  .then(res => {
    items = res;
    if (items.length) {
      items.forEach(item => { appendItem(item); })
    }
  })
  .catch(error => { throw error; });

  $('#submit-form').click(addItem);
  $('#alphabetical').click(sortItems);
  $('#reverse-a').click(reverseItems);
  $('.view-items-button').click(toggleItemsView);
