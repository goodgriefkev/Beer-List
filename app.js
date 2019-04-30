console.log('find some beer');
// https://cors-anywhere.herokuapp.com/
const baseURL = 'https://cors-anywhere.herokuapp.com/https://sandbox-api.brewerydb.com/v2/';
const queryType = 'search?q='
let query = 'lager';
const apiKey = '&key=4ece60622e673c96654a9c304ae0b66d&format=json';

let queryURL = baseURL + queryType + query + apiKey;
// console.log(queryURL);

const getBeer = () => {
  const beerData = $.ajax({
    url: queryURL
  }).then((beerData) => {
    console.log(beerData.data);
    for (let i=0; i<beerData.data.length; i++) {
      console.log(beerData.data[i].name);
      $('<div>').html(`
      <h3>${beerData.data[i].name}</h3>`).appendTo('#searchResults');
    }
  })
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



$(()=>{

  getBeer();

});
