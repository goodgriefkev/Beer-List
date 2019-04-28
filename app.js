console.log('find some beer');

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';
const queryType = 'search?q='
let query = 'lager';
const apiKey = '&key=4ece60622e673c96654a9c304ae0b66d';

let queryURL = baseURL + queryType + query + apiKey;
console.log(queryURL);

// const getBeer = () => {
//   const beerData = $.ajax({
//     url: queryURL
//   }).then((beerData) => {
//     console.log(beerData);
//   }, (error) => {
//     console.log(error);
//   })
// };


$(()=>{

  // getBeer();

});
