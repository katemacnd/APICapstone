// https://developer.ebay.com/Devzone/finding/Concepts/FindingAPIGuide.html#usekeywords
/*jshint esversion: 6 */

$(document).ready(function() {
  'use strict';

  /// ebay API
  function newSearch() {
    $('#newSearch').click(event => {
      event.preventDefault();
      console.log('new search!');
      $('#searchBar').toggle('hidden');
      $('#finalScreen').toggle('hidden');
      document.getElementById("results").innerHTML = "";
    });
  }

  function watchForm() {
    $('#searchInput').click(event => {
      event.preventDefault();
      const searchTerms = ($('#searchTerms').val());
      console.log(searchTerms);
      $('#searchBar').toggle('hidden');
      let appID = 'Katherin-APICapst-PRD-c82b90351-fbc84e5e';
      let url = `https://cors-anywhere.herokuapp.com/http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${appID}&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&keywords=${searchTerms}`;
      console.log(url);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {

          var parseXml;

          if (typeof window.DOMParser != "undefined") {
            parseXml = function(xmlStr) {
              return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
            };
          } else if (typeof window.ActiveXObject != "undefined" &&
            new window.ActiveXObject("Microsoft.XMLDOM")) {
            parseXml = function(xmlStr) {
              var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
              xmlDoc.async = "false";
              xmlDoc.loadXML(xmlStr);
              return xmlDoc;
            };
          } else {
            throw new Error("No XML parser found");
          }

          let data = xhr.responseText;
          console.log(data);
          var xmlDoc = parseXml(data);
          $('#finalScreen').toggle('hidden');
          for (let i = 0; i < 5; i++) {
            var x = document.createElement("P");
            // var picture = document.createTextNode(xmlDoc.getElementsByTagName("galleryURL")[i].childNodes[0].nodeValue);
            // x.createElement("div");
            // var picture1 = ("<img id='theImg' src=" + picture + "/>");
            var title = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
            x.appendChild(title);
            var price = document.createTextNode(xmlDoc.getElementsByTagName("convertedCurrentPrice")[i].childNodes[0].nodeValue);
            x.appendChild(price);
            document.getElementById("results").appendChild(x);
          }
        }
      };
      xhr.send();
      $(newSearch);
    });
  }

  function watchDrop() {
    $('.dropdownOptions').click(event => {
      event.preventDefault();
      const animalSelection = (event.target);
      const animalClicked = $(animalSelection).text();
      $('.dropBtn').hide();
      $('#neededAnimal').hide();
      $('#selectedAnimal').append(animalClicked + "?");
      $('#searchBar').toggle('hidden');
      $(watchForm);
    });
  }

  function watchDrop2() {
    $('#suppliesUp').click(event => {
      event.preventDefault();
      $('#lowerBar').toggle();
      $('#bookSearchTerms').toggle();
      $('#bookSearchTermsButton').toggle();
      $('#mainContent').toggle();
      $(watchDrop);
      $(watchSearch);
    });
  }

  $(watchDrop);

  // end eBAY API


  // start Goodreads API

  function newBookSearch() {
    $('#newBookSearch').click(event => {
      event.preventDefault();
      console.log('new search!');
      document.getElementById("bookResults").innerHTML = "";
      $('#newBookSearch').toggle('hidden');
      $('#bookSearchTerms').toggle('hidden');
    });
  }

  function watchBook() {
    $('#bookSearchTermsButton').click(event => {
      event.preventDefault();
      const searchTerms = ($('#bookSearchTerms').val());
      console.log(searchTerms);
      $('#bookSearchTerms').toggle('hidden');
      $('#newBookSearch').toggle('hidden');
      let appID = 'CiGujFcIajhkPUPGHkeNg';
      let url = `https://cors-anywhere.herokuapp.com/http://www.goodreads.com/book/title.xml?title=${searchTerms}&key=${appID}`;
      console.log(url);
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200) {

          var parseXml;

          if (typeof window.DOMParser != "undefined") {
            parseXml = function(xmlStr) {
              return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
            };
          } else if (typeof window.ActiveXObject != "undefined" &&
            new window.ActiveXObject("Microsoft.XMLDOM")) {
            parseXml = function(xmlStr) {
              var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
              xmlDoc.async = "false";
              xmlDoc.loadXML(xmlStr);
              return xmlDoc;
            };
          } else {
            throw new Error("No XML parser found");
          }

          let data = xhr.responseText;
          console.log(data);
          var xmlDoc = parseXml(data);
          for (let i = 0; i < 5; i++) {
            var z = document.createElement("P");
            var title = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
            z.appendChild(title);
            document.getElementById("bookResults").appendChild(z);
          }
        }
      };
      xhr.send();
      $(newBookSearch);
    });
  }

  function watchSearch() {
    $('#readUp').click(event => {
      event.preventDefault();
      $('#mainContent').hide();
      $('#lowerBar').toggle('hidden');
      $('.bookSearch').toggle('hidden');
      $('.eBay').toggle('hidden');
      $('#suppliesLowerBar').toggle('hidden');
      $('.mainSuppliesSearch').hide();
      $(watchBook);
      $(watchDrop2);
    });
  }

  $(watchSearch);


  /// clicking eBay lower nav button

});

/////// to-dos:
// enter key initiates search
// language = english
// remove duplicate listings
// add linebreaks to results information
// Display
  // Item Picture
  // Stars/Ratings
  // Top Comment
  // expand description functionality
  // link to the ebay page to purchase
// Close the dropdown menu if the user clicks outside of it
// add animal type to search
// while on goodreads page, make nav at bottom take back to the ebay API search page
