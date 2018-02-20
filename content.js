function setUrl(url) {
  chrome.storage.local.set({'image_url': url}, function() {
    console.log('Image URL: ' + url + 'has been set for context menu.');
  });
}

function addListeners() {
  var googleImageElements = document.querySelectorAll('a.rg_l');

  for ( el of googleImageElements ) {
    el.addEventListener('click', event => {
      var url = '';
      if(event.target.tagName == 'A') {
        url = decodeURIComponent( event.target.href.replace(/http.*imgurl\=/, '').replace(/&imgrefurl.*/, '' ));
      } else if (event.target.tagName == 'IMG') {
        url = decodeURIComponent(event.target.parentElement.href.replace(/http.*imgurl\=/, '').replace(/&imgrefurl.*/, ''));
      } else {
        console.log(event.target);
      }
        setUrl(url);
    });
  }
}

addListeners();

var observer = new MutationObserver(function(mutations) {
  addListeners();
});

var container = document.documentElement || document.body;
var config = { childList: true, subtree: true };
observer.observe(container, config);