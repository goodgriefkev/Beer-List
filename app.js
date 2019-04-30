console.log('find some beer');
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
    url: queryURL
  }).then(
      (beerData) => {
        console.log(beerData.data);
          if (beerData.data == undefined) {
            $('<div>')
              .addClass('result')
              .html(`<h3>No results found</h3>`)
              .appendTo('#searchResults');
          } else {
            for (let i=0; i<beerData.data.length; i++) {
              // console.log(beerData.data[i].name);
              $('<div>')
                .addClass('result')
                .html(`<h3>${beerData.data[i].name}</h3>`)
                .appendTo('#searchResults');
    }}}
  )
};

const addToList = () => {
  $('')
}



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



$(()=>{

  const $btn = $('#search-btn');

  // $btn.on('click', (event) => {
    // console.log('search button clicked');
  $('form').on('submit', (event) => {
    // console.log($('#search-box').val());
    getBeer($('#search-box').val());
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
  });
});
