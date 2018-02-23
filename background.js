chrome.contextMenus.onClicked.addListener(function(item, tab) {

  chrome.storage.local.get(['image_url'], function(items) {

    chrome.tabs.create({url: items.image_url, index: tab.index + 1});

  });

});

chrome.contextMenus.create({
  id: 'show_image',
  title: 'Open Image Link Now!',
  type: 'normal',
  contexts: ['all'],
});