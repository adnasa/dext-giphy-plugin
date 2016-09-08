const media = require('./utils/media')
const concatenate = require('./utils/concatenate')
const request = require('request')

const isDev = process.env.NODE_ENV === 'development'
const BASE_URL = 'http://api.giphy.com/v1/gifs/search'

// The public BETA KEY!!
// @see https://github.com/Giphy/GiphyAPI
const API_KEY = 'dc6zaTOxFJmzC'

module.exports = {
  keyword: 'giphy',
  // @TODO: Allow copy to clipboard on ENTER
  action: 'openurl',
  helper: {
    title: 'giphy',
    subtitle: 'Your wish is my command! start your wish with "giphy"',
  },
  execute: q => new Promise(resolve => {
    const items = []
    const headers = { 'Content-Type': 'application/json' }
    if (!q) {
      resolve({ items })
      return
    }

    const URL = `${BASE_URL}?q=${concatenate(q)}&api_key=${API_KEY}`
    request
      .get({ url: URL, headers, method: 'GET' }, (error, responseObj) => {
        if (error) {
          if (isDev)
            console.warn('GIPHY: There was an issue with the request')

          resolve({ items })
          return
        }

        const body = JSON.parse(responseObj.body)
        const mediaItems = body.data.map(media)

        if (isDev)
          console.info('GIPHY: Request has been successful')

        resolve({ items: mediaItems })
      })
  }),

  details: {
    type: 'html',
    render,
  },
}

function render ({
  context: {
    images: { downsized_medium: { url } },
  },
}) {
  return `<img src="${url}" />`
}
