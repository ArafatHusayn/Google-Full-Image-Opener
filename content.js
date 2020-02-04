const setUrl = url => {
  chrome.storage.local.set({ image_url: url })
}

const parseImageURL = unparsedURL => {
  try {
    const url = decodeURIComponent(
      unparsedURL.replace(/http.*imgurl\=/, "").replace(/&imgrefurl.*/, "")
    )

    return url
  } catch (error) {
    window.console.error("[Google Image Opener] Error: ", error)
  }
}

const addListeners = () => {
  const googleImageElements = document.querySelectorAll('a[jsaction*="click"]')

  for (el of googleImageElements) {
    el.addEventListener("click", async event => {
      let url = ""

      if (event.target.tagName === "A" || event.target.tagName === "IMG") {
        url =
          event.target.tagName === "A"
            ? parseImageURL(event.target.href)
            : parseImageURL(event.target.closest("a").href)
      } else {
        return
      }

      if (url && url !== "") {
        setUrl(url)
      }
    })
  }
}

addListeners()

const observer = new MutationObserver(mutations => {
  addListeners()
})

const container = document.documentElement || document.body

const config = { childList: true, subtree: true }

observer.observe(container, config)

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request && request.error) {
    const id = setTimeout(() => {
      alert(request.error)

      window.console.log(request.error)

      clearTimeout(id)
    }, 200)
  }

  sendResponse(true)
})