// https://developer.ebay.com/Devzone/finding/Concepts/FindingAPIGuide.html#usekeywords
/*jshint esversion: 6 */
$(document).ready(function() {
  'use strict';
  /// ebay API

  function watchDrop() {
    $('.dropdownOptions').click(event => {
      event.preventDefault();
      const animalSelection = (event.target);
      const animalClicked = $(animalSelection).text();
      $('.dropBtn').hide();
      $('#neededAnimal').hide();
      $('#selectedAnimal').append(animalClicked + "?");
      $('#searchBar').show();
      watchForm(animalClicked);
    });

    function watchForm(animalClicked) {
      $('#searchInput').click(event => {
        event.preventDefault();
        const searchTerms = ($('#searchTerms').val());
        var fullSearch = animalClicked + " " + searchTerms;
        console.log(searchTerms);
        let appID = 'Katherin-APICapst-PRD-c82b90351-fbc84e5e';
        let url = `https://cors-anywhere.herokuapp.com/http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${appID}&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&keywords=${fullSearch}`;
        console.log(url);
        getEbayItemInfo(url, handleData);
        document.getElementById("results").innerHTML = "";
      });
    }
  }

  function getEbayItemInfo(url, callback) {
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
        var xmlDoc = parseXml(data);
        callback.apply(xmlDoc);
        console.log(data);
      }
    };
    xhr.send();
  }

  function handleData() {
    var xmlDoc = this;
    $('#finalScreen').show();
    $('.fa fa-search').hide();
    for (let i = 0; i < 9; i++) {
      var x = document.createElement("P");
      var picture = document.createElement('img');
      picture.src = xmlDoc.getElementsByTagName("galleryURL")[i].childNodes[0].nodeValue;
      if (picture.src === 'https://thumbs1.ebaystatic.com/pict/04040_0.jpg') {
        continue;
      } else {
      x.appendChild(picture);
      var anchor = document.createElement('a');
      var title = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
      anchor.appendChild(title);
      anchor.href = xmlDoc.getElementsByTagName("viewItemURL")[i].childNodes[0].nodeValue;
      var externalLink = x.appendChild(anchor);
      $(externalLink).attr("target", "_blank");
      var price = document.createTextNode('$' + xmlDoc.getElementsByTagName("convertedCurrentPrice")[i].childNodes[0].nodeValue);
      x.appendChild(price);
      document.getElementById("results").appendChild(x);
      }
    }
  }

  function watchDrop2() {
    $('#suppliesUp').click(event => {
      event.preventDefault();
      $('.bookSearch').hide();
      $('#bookSearchTerms').show();
      $('#bookSearchTermsButton').show();
      $('#readUp').show();
      $('#mainContent').show();
      $('#suppliesUp').hide();
      $(watchDrop);
      $(watchSearch);
    });
  }
  // end eBAY API
  // start Goodreads API

  function watchBook() {
    $('#bookSearchTermsButton').click(event => {
      event.preventDefault();
      document.getElementById("results").innerHTML = "";
      const searchTerms = ($('#bookSearchTerms').val());
      console.log(searchTerms);
      let appID = 'CiGujFcIajhkPUPGHkeNg';
      let url = `https://cors-anywhere.herokuapp.com/http://www.goodreads.com/book/title.xml?title=${searchTerms}&key=${appID}`;
      console.log(url);
      getGoodreadsBookInfo(url, handleBookData);
      $(watchBook);
    });
  }

  function getGoodreadsBookInfo(url, handleBookData) {
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
        var xmlDoc = parseXml(data);
        handleBookData.apply(xmlDoc);
        console.log(data);
      }
    };
    xhr.send();
  }

  function handleBookData() {
    var xmlDoc = this;
    for (let i = 0; i < 10; i++) {
      var z = document.createElement("P");
      var picture = document.createElement('img');
      picture.src = xmlDoc.getElementsByTagName("image_url")[i].childNodes[0].nodeValue;
      console.log(picture.src);
      if (picture.src === 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png') {
        continue;
      } else {
        z.appendChild(picture);
        var title = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
        z.appendChild(title);
        document.getElementById("bookResults").appendChild(z);
      }
    }
  }

function watchSearch() {
  $('#readUp').click(event => {
    event.preventDefault();
    $('#mainContent').hide();
    $('.bookSearch').show();
    $('.eBay').show();
    $('#suppliesUp').show();
    $('.mainSuppliesSearch').hide();
    $('#results').hide();
    $('#resultsText').hide();
    $('#newSearch').hide();
    $(watchBook);
    $(watchDrop2);
  });
}

/// end goodreads API

function watchInitial() {
  $('#supplies').click(event => {
    event.preventDefault();
    $(afterLanding);
  });
  $('#books').click(event => {
    event.preventDefault();
    $('#mainContent').hide();
    $('.mainSuppliesSearch').hide();
    $('#results').hide();
    $('#resultsText').hide();
    $('#newSearch').hide();
    $('.bookSearch').show();
    $('.eBay').show();
    $('#suppliesUp').show();
    $(afterLanding);
    $(watchBook);
    $(watchDrop2);
  });

  function afterLanding() {
    $('#landingPage').hide();
    $('#secondaryPages').show();
    $('#navTop').show();
  }
}
$(watchDrop);
$(watchSearch);
$(watchInitial);

});

/////// to-dos:
// clean names for variables & functions
// enter key initiates search
// why is second book result always from my local file???
// create nav bar
// pricing display to two decimal points
// Display
  // Stars/Ratings
  // Top Comment
  // expand description functionality
// Close the dropdown menu if the user clicks outside of it
