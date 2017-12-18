let items;

fetch('./api/v1/garageItems')
  .then(res => res.json())
  .then(res => {
    items = res;
  })
  .then(() => console.log(items))
  .catch(error => { throw error; });

  
