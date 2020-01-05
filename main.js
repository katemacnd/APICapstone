/*jshint esversion: 6 */

$(document).ready(function () {
  'use strict';
// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function myFunction() {
// document.getElementById("myDropdown").classList.toggle("show");
// }
//
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
// if (!event.target.matches('.dropbtn')) {
//   var dropdowns = document.getElementsByClassName("dropdown-content");
//   var i;
//   for (i = 0; i < dropdowns.length; i++) {
//     var openDropdown = dropdowns[i];
//     if (openDropdown.classList.contains('show')) {
//       openDropdown.classList.remove('show');
//     }
//   }
// }
// };

// watch form
function watchForm() {
  console.log("JavaScript Loaded!");

  $('.dropbtn').onclick(event => {
    event.preventDefault();
    // myFunction();
    console.log("Handler for .onclick() called.");
    // const searchTerm = $('#js-search-term').val();
    // const maxResults = $('#js-max-results').val();
    // getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);

});


// pseudocode untouched
  // onclick dropdown
  // hide headline1
  // unhide headline2
  // populate "my ____ Needs" with dropdown choice
  // create search bar line
  // create search button
  // onclick search button
  // hide headline2
  // unhide headline3
  // Fetch
    // Item Picture
    // Item name
    // Stars/Ratings
    // Top Comment
      // expand description functionality
    // link to the ebay page to purchase
  // new search button
