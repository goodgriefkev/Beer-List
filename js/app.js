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
            .addClass('returnMessage')
            .html(`<h2>No results found for: "${query}"</h2>`)
            .appendTo('#searchResults');
        } else {
          $('<div>')
            .addClass('returnMessage')
            .html(`<h2>Search results for: "${query}"</h2>`)
            .appendTo('#searchResults')
          for (let i=0; i<beerData.data.length; i++) {
            // console.log(beerData.data[i].name);
            // console.log(beerData.data[i].style.name);
            // console.log(beerData.data[i].abv);
            // console.log(beerData.data[i].ibu);
            // console.log(beerData.data[i].style.description);
            $('<div>')
              .draggable({
                cursor: 'move',
                // snap: true,
                // snapMode: 'inner',
                // snapTolerance: '30',
                helper: 'clone',
                containment: '#columns',
                handle: 'h3'
              })
              .attr('id', 'draggable')
              .appendTo('#searchResults')
              .addClass('result')
              .addClass('searched')
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




  const $btn = $('#search-btn');
    // $btn.on('click', (event) => {
    // console.log('search button clicked');

  //code block to query API and display results
  $('form').on('submit', (event) => {
    $('.result').remove();
    $('.returnMessage').remove();
    // console.log($('#search-box').val());
    getBeer($('#search-box').val());
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
  });

  //code block to make user list accept draggable elements
  $('#list').droppable({
    accept: '.searched',
    drop: (event, ui) => {
      // alert('dropped');
      // console.log(event.target);
      // console.log(event.target.children);
      let droppedResult = $(ui.draggable)
        .clone()
        .removeClass('searched')
        .addClass('saved');
      $(event.target).append(droppedResult);
      // console.log(event.target.children);
    }
  });

  //code block to show/hide beer details and delete/archive options
  // $('').click(toggleDetails() {
  //
  // })

  // //code block to show/hide user list
  // $('#list').click(hideList(){
  //   $('#list').toggle('blind', 250);
  // });

  //code block to make items added to user list sortable
  $('#list').sortable({
    axis: 'y',
    items: '> div'
  })

//close of on ready
});
