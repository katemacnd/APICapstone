// https://developer.ebay.com/Devzone/finding/Concepts/FindingAPIGuide.html#usekeywords
/*jshint esversion: 6 */

$(document).ready(function () {
  'use strict';

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

  function watchForm() {
    $('#searchInput').click(event => {
      event.preventDefault();
      const searchTerms=($('#searchTerms').val());
        console.log(searchTerms);
      $('#searchBar').toggle('hidden');
      let appID = 'Katherin-APICapst-PRD-c82b90351-fbc84e5e';
      let url = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${appID}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=${searchTerms}`;
        console.log(url);
      fetch(url).then((response) => {
        let data = response.json();
        data.forEach((subData => {
          let pargraph = document.createElement('p');
          paragraph.innerText = subData.itemName;
      //     let image =
      //     let price =)

      }));
    });
  });
}

  function watchDrop() {
    $('.dropdownOptions').click(event => {
      event.preventDefault();
      const animalSelection=(event.target);
      const animalClicked=$(animalSelection).text();
      $('.dropBtn').hide();
      $('#neededAnimal').hide();
      $('#selectedAnimal').append(animalClicked + "?");
      $('#searchBar').toggle('hidden');
      $(watchForm);
      });
    }

 $(watchDrop);

});


// pseudocode untouched
  // unhide headline3
  // Fetch
    // Item Picture
    // Item name
    // Stars/Ratings
    // Top Comment
      // expand description functionality
    // link to the ebay page to purchase
  // new search button
