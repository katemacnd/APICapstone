// https://developer.ebay.com/Devzone/finding/Concepts/FindingAPIGuide.html#usekeywords
/*jshint esversion: 6 */
$(document).ready(function() {
  'use strict';

  /// start ebay API

  function watchAnimalDrop() {
    $('.dropdownOptions').click(event => {
      event.preventDefault();
      document.getElementById('selectedAnimal').innerHTML = '';
      const animalSelection = (event.target);
      const animalClicked = $(animalSelection).text();
      $('#animalChoice').hide();
      $('#selectedAnimal').append('What do you need for your ' + animalClicked + '?');
      $('#animalSearchBar').show();
      watchAnimalSelection(animalClicked);
      document.getElementById('suppliesResults').innerHTML = '';
    });

    function watchAnimalSelection(animalClicked) {
      $('#suppliesSearchTerms').keypress(function(e) {
        if (e.which === 13) {
          event.preventDefault();
          const searchTerms = ($('#suppliesSearchTerms').val());
          let fullSearch = animalClicked + ' ' + searchTerms;
          let appID = 'Katherin-APICapst-PRD-c82b90351-fbc84e5e';
          let url = `https://cors-anywhere.herokuapp.com/http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${appID}&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&keywords=${fullSearch}`;
          getEbayItemInfo(url, handleData);
        }
      });
    }
  }

  function getEbayItemInfo(url, callback) {
    document.getElementById('suppliesResults').innerHTML = '';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 0) {
        alert('Sorry - The Internet Is Disconnected!');
      } else if (xhr.status === 200) {
        let parseXml;
        if (typeof window.DOMParser != 'undefined') {
          parseXml = function(xmlStr) {
            return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
          };
        } else if (typeof window.ActiveXObject != 'undefined' &&
          new window.ActiveXObject('Microsoft.XMLDOM')) {
          parseXml = function(xmlStr) {
            let xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = 'false';
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
          };
        } else {
          throw new Error('No XML parser found');
        }

        let data = xhr.responseText;
        let xmlDoc = parseXml(data);
        callback.apply(xmlDoc);
      }
    };
    xhr.send();
  }

  function handleData() {
    let xmlDoc = this;
    $('#finalScreen').show();
    $('.fa fa-search').hide();
    for (let i = 0; i < 15; i++) {
      let x = document.createElement('li');
      let picture = document.createElement('img');
      picture.src = xmlDoc.getElementsByTagName('galleryURL')[i].childNodes[0].nodeValue;
      if (picture.src === 'https://thumbs1.ebaystatic.com/pict/04040_0.jpg' || picture.src.trim() === '') {
        continue;
      } else {
        let title = document.createTextNode(xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);
        picture.setAttribute('alt', xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);
        let anchor = document.createElement('a');
        anchor.appendChild(picture);
        anchor.appendChild(title);
        anchor.href = xmlDoc.getElementsByTagName('viewItemURL')[i].childNodes[0].nodeValue;
        let externalLink = x.appendChild(anchor);
        $(externalLink).attr('target', '_blank');
        let price = document.createTextNode('$' + parseFloat(xmlDoc.getElementsByTagName('convertedCurrentPrice')[i].childNodes[0].nodeValue).toFixed(2));
        x.appendChild(price);
        document.getElementById('suppliesResults').appendChild(x);
      }
    }
  }

  function watchDropFromNav() {
    $('#suppliesUp').click(event => {
      event.preventDefault();
      $('#booksContent').hide();
      $('#suppliesContent').show();
      $('#animalChoice').show();
      $('#animalSearchBar').hide();
      document.getElementById('#suppliesResults').innerHTML = '';
      $(watchAnimalDrop);
      $(watchSearch);
    });
  }
  // end eBAY API
  // start Goodreads API

  function watchBook() {
    $('#bookSearchTerms').keypress(event => {
      if (event.which === 13) {
        event.preventDefault();
        document.getElementById('bookResults').innerHTML = '';
        const searchTerms = ($('#bookSearchTerms').val());
        let appID = 'CiGujFcIajhkPUPGHkeNg';
        let url = `https://cors-anywhere.herokuapp.com/http://www.goodreads.com/search/index.xml?q=${searchTerms}&key=${appID}`;
        getGoodreadsBookInfo(url, handleBookData);
        $('#bookResults').show();
      }
    });
  }

  function getGoodreadsBookInfo(url, handleBookData) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 0) {
        alert('Sorry - The Internet Is Disconnected!');
      }
      if (xhr.status === 200) {
        let parseXml;
        if (typeof window.DOMParser != 'undefined') {
          parseXml = function(xmlStr) {
            return (new window.DOMParser()).parseFromString(xmlStr, 'text/xml');
          };
        } else if (typeof window.ActiveXObject != 'undefined' &&
          new window.ActiveXObject('Microsoft.XMLDOM')) {
          parseXml = function(xmlStr) {
            let xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = 'false';
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
          };
        } else {
          throw new Error('No XML parser found');
        }
        let data = xhr.responseText;
        let xmlDoc = parseXml(data);
        handleBookData.apply(xmlDoc);
      }
    };
    xhr.send();
  }

  function handleBookData() {
    let xmlDoc = this;
    if (xmlDoc.getElementsByTagName('image_url').length === 0) {
      alert('no results!');
    } else {
      for (let i = 0; i < 15; i++) {
        let z = document.createElement('li');
        let picture = document.createElement('img');
        let imageSrc = xmlDoc.getElementsByTagName('image_url')[i].childNodes[0].nodeValue.trim();
        picture.src = imageSrc;
        if (imageSrc === 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png' || imageSrc === '') {
          continue;
        } else {
          picture.setAttribute('alt', xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);
          z.appendChild(picture);
          let anchor = document.createElement('a');
          let title = document.createTextNode(xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);
          anchor.appendChild(picture);
          let bestBook = xmlDoc.getElementsByTagName('best_book')[i];
          let bookID = bestBook.children[0].textContent;
          let url = `https://www.goodreads.com/book/show/${bookID}`;
          anchor.href = url;
          let externalLink = z.appendChild(anchor);
          $(externalLink).attr('target', '_blank');
          z.appendChild(title);
          anchor.appendChild(title);
          document.getElementById('bookResults').appendChild(z);
        }
        $(removeDuplicates);
      }
    }
  }

  function removeDuplicates() {
    let img = $('img');
    let used = {};
    img.each(function() {
      let src = $(this).attr('src');
      if (used[src]) $(this).parentElement.remove();
      used[src] = 1;
    });
  }

  function watchSearch() {
    $('#readUp').click(event => {
      event.preventDefault();
      $('#suppliesContent').hide();
      $('#booksContent').show();
      $('.eBay').show();
      $(watchBook);
      $(watchDropFromNav);
    });
  }

  /// end goodreads API
  // landing page start

  function watchInitial() {
    $('#supplies').click(event => {
      event.preventDefault();
      $(afterLanding);
      $('#suppliesContent').show();
    });

    $('#books').click(event => {
      event.preventDefault();
      $(afterLanding);
      $('#booksContent').show();
      $('#suppliesContent').hide();
    });

    function afterLanding() {
      $('#landingPage').hide();
      $('#secondaryPages').show();
      $('#navTop').show();
    }
  }

  $(watchAnimalDrop);
  $(watchBook);
  $(watchDropFromNav);
  $(watchSearch);
  $(watchInitial);

});
