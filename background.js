let recordedTabId

chrome.contextMenus.onClicked.addListener((_item, tab) => {
  chrome.storage.local.get(["image_url"], items => {
    if (items && items.image_url) {
      const url = items.image_url

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        recordedTabId = tabs[0].id

        chrome.tabs.create({ url: url, index: tab.index + 1 })
      })
    } else {
      var errorMessage =
        "No image found! Please click on the image and try again. \n\nIf the problem persists, please report issue here: \nhttps://github.com/arafathusayn/Google-Full-Image-Opener/issues"

      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, {
          error: errorMessage,
        })
      })
    }
  })
})

chrome.tabs.onRemoved.addListener(removedTabId => {
  if (recordedTabId === removedTabId) {
    chrome.storage.local.remove(["image_url"])
  }
})

chrome.contextMenus.create({
  id: "show_image",
  title: "Open Image Link Now!",
  type: "normal",
  contexts: ["all"],
})
