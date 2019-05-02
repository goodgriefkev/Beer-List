console.log('find some beer');

//open of on ready
$(()=>{

// https://cors-anywhere.herokuapp.com/
const baseURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/';
const queryType = 'search?q='
let query = 'lager';
const apiKey = '&key=4ece60622e673c96654a9c304ae0b66d&format=json';



const getBeer = (userInput) => {
  let query = userInput
  // console.log(query);
  let queryURL = baseURL + queryType + query + apiKey;
  // console.log(queryURL);
  const beerData = $.ajax({
    url: queryURL})
      .then(
        (beerData) => {
        // console.log(beerData.data);
        if (beerData.data == undefined) {
          $('<div>')
            .addClass('result')
            .html(`<h3>No results found</h3>`)
            .appendTo('#searchResults');
        } else {
          $('<div>')
            .addClass('result')
            .html(`<h2>Search results for: "${query}"</h2>`)
            .appendTo('#searchResults')
          for (let i=0; i<beerData.data.length; i++) {
            // console.log(beerData.data[i].name);
            // console.log(beerData.data[i].style.name);
            // console.log(beerData.data[i].abv);
            // console.log(beerData.data[i].ibu);
            // console.log(beerData.data[i].style.description);
            $('<div>')
              .appendTo('#searchResults')
              // .attr('id', 'draggable')
              .addClass('result')
              .append(`<h3>${beerData.data[i].name}</h3>`)
              .append(
                $('<ul>')
                  .addClass('details')
                  .append(
                    $('<li>').addClass('.style').html(`${beerData.data[i].style.name}`)
                  )
                  .append(
                    $('<li>').addClass('.abv').html(`${beerData.data[i].abv}`)
                  )
                  .append(
                    $('<li>').addClass('.ibu').html(`${beerData.data[i].ibu}`)
                  )
                  .append(
                    $('<li>').addClass('.description').html(`${beerData.data[i].style.description}`)
                  )
              )
            }
          }
          }
        )
};



// // // this is trying to use CORS, but it kept throwing same error
// const getBeer = () => {
//   const beerData = $.ajax({
//     type: 'GET',
//     url: 'https://sandbox-api.brewerydb.com/v2/beers/?key=4ece60622e673c96654a9c304ae0b66d',
//     contentType: 'text/plain',
//     xhrFields: {
//       withCredentials: true
//     },
//     headers: {},
//     success: (beerData) => {
//       console.log(beerData);
//     },
//     error: (error) => {
//       console.log(error);
//     }
//   })
// };



  // $( "#draggable" ).draggable();

  const $btn = $('#search-btn');
    // $btn.on('click', (event) => {
    // console.log('search button clicked');

  //manages the search box, getting results and displaying them
  $('form').on('submit', (event) => {
    $('.result').remove();
    // console.log($('#search-box').val());
    getBeer($('#search-box').val());
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
  });

  //  // manages removing from search results and adding to saved list
  $('#searchResults').on('click', '.result', (event) => {
    console.log('clicked');
    console.log(event.target);
    console.log(event.currentTarget);
    $(event.currentTarget).remove().appendTo('#list');
    // $('<div>')
    //   .addClass('savedResult')
    //   .append($(event.target)
    //   .remove()).appendTo('#list');
  });

//close of on ready
});
