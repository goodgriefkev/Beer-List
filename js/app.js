// console.log('find some beer');

//open of on ready function
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
          $('#list').toggleClass('hidden');
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
                helper: 'clone',
                containment: '#columns',
                handle: 'h3'
              })
              .attr('id', 'draggable')
              .appendTo('#searchResults')
              .addClass('result')
              .append(`<h3 id=beerName>${beerData.data[i].name}</h3>`)
              .append(
                $('<div>')
                  .attr('id', 'detailsContainer')
                  .append(
                    $('<ul>')
                      .addClass('details')
                      .append(
                        $('<li>').addClass('.style').html(`style: ${beerData.data[i].style.name}`)
                      )
                      .append(
                        $('<li>').addClass('.abv').html(`abv: ${beerData.data[i].abv}`)
                      )
                      .append(
                        $('<li>').addClass('.ibu').html(`ibu: ${beerData.data[i].ibu}`)
                      )
                      .append(
                        $('<li>').addClass('.description').html(`description: ${beerData.data[i].style.description}`)
                      )
                  )
                )

            }

          }
          }
        )
};

  const $btn = $('#search-btn');
    // $btn.on('click', (event) => {
    // console.log('search button clicked');

  //queries API and displays results on page
  $('form').on('submit', (event) => {
    $('.result').remove();
    $('.returnMessage').remove();
    // console.log($('#search-box').val());
    getBeer($('#search-box').val());
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
  });

  //toggles details on/off
  $('#detailsButton').on('click', function() {
    $('.details').toggle('blind', 1000);
  });

  //allows user list to accept draggable elements
  //adds delete button to
  $('#list').droppable({
    accept: '.result',
    drop: (event, ui) => {
      // alert('dropped');
      // console.log(event.target);
      // console.log(event.target.children);
      let droppedResult = $(ui.draggable)
        .clone()
        .removeClass('result')
        .append(`<button class=deleteButton>Delete</button>`)
      $(event.target).append(droppedResult);
    }
  });

  //makes items added to user list sortable
  $('#list').sortable({
    axis: 'y',
    items: '> div'
  })

  //deletes a beer from user list - currently broken
  //console logs seem to show the right thing, but nothing is removed from page or dom
  const $parent = $(event.target).parent()
  $('#columns').on('click', '.deleteButton', function() {
    console.log(event.target);
    console.log($(event.target).parent());
    $parent.remove();
  });

  //shows/hides user list - currently broken
  // $('#list').click(function(){
  //   $('#list').toggle('blind', 250);
  // });

  $(function() {
    $(document).tooltip();
  });

//close of on ready function
});






// //attempts at code to show/hide beer details and delete/archive options
// //keep hitting walls//
//attempt one
// function hideShowDetails(event) {
//   const target = $(event.target);
//   if(target.is('h3')){
//     target.children().toggle();
//   }
// }
// $('#columns').on('click', function() {
//   hideShowDetails();
// });

//attempt 1.5 throws error
// function hideShowDetails(event) {
//   const target = $(event.target);
//   if(target.is('#detailsButton')){
//     target.children().toggle();
//   }
// }
// $('#columns').on('click', function() {
//   hideShowDetails();
// })

// //attempt two
// $('#columns').on('click', () {
//   console.log($(this).children());
//   console.log(event.target);
//   console.log(event.currentTarget);
//   $(this).find('ul').toggle();
//
// });

// //attempt three
// const showHideDetails = () => {
//   console.log(event.target);
//   $(event.target).toggle();
// };
//
// $('#columns').on('click', '.details', showHideDetails)
