// https://developer.ebay.com/Devzone/finding/Concepts/FindingAPIGuide.html#usekeywords
/*jshint esversion: 6 */

$(document).ready(function () {
  'use strict';

// targetting specific element

  function watchForm() {
    $('#searchInput').click(event => {
      event.preventDefault();
      const searchTerms=($('#searchTerms').val());
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
                        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
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
              $('#results').toggle('hidden');

                var x = document.createElement("P");                                                               // Create a <p> element
                var t = document.createTextNode(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);    // Create a text node
                x.appendChild(t);                                                                                  // Append the text to <p>
                document.body.appendChild(x);                                                                       // Append <p> to <body>
          }
        };
      xhr.send();
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


// pseudocode untouched --
  // unhide headline3
  // Display
    // Item Picture
    // Item name
    // Stars/Ratings
    // Top Comment
      // expand description functionality
    // link to the ebay page to purchase
  // "new search" button
  // Close the dropdown menu if the user clicks outside of it
  // add music while you shop
