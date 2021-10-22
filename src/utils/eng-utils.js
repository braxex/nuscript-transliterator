import fetchWordData from './wordsApi'
import { ipaHandler } from './ipa-utils'
import { getRedisEntry, setRedisEntry } from './redis-utils'

const allowCacheFetching = false
const allowCacheSetting = true

const sanitizationRegex = new RegExp(`[^\\w]|[\\d]`, 'gi')

const sanitizeEnglish = string => {
  return string.replace(sanitizationRegex, '').toLowerCase()
}

const checkCache = async entry => getRedisEntry(entry)

const engHandler = async input => {
  let output
  const sanitizedInput = sanitizeEnglish(input)

  // check cache for existing transliteration
  const existingCacheEntry = await checkCache(sanitizedInput)
  if (!existingCacheEntry) {
    const apiResponse = await fetchWordData(sanitizedInput)
    // if there's an error or the word is not found
    if (apiResponse.message || !apiResponse.pronunciation) {
      apiResponse.nuskript = <span>error</span>
      output = apiResponse
    } // if the api messed up and didn't provide ipa
    else if (Object.keys(apiResponse.pronunciation).length === 0) {
      apiResponse.nuskript = <span>error</span>
      output = apiResponse
    }
    // if everything's ok
    else {
      const transliteration = await ipaHandler(
        apiResponse.pronunciation
          ? apiResponse.pronunciation.all || apiResponse.pronunciation
          : null,
      )
      apiResponse.nuskript = transliteration
      // cache api response and transliteration
      if (allowCacheSetting) {
        await setRedisEntry(sanitizedInput, JSON.stringify(apiResponse))
      }
      apiResponse.success = true
      output = apiResponse
    }
  } // use prior existing transliteration
  else {
    const cachedTransliteration = JSON.parse(existingCacheEntry)
    cachedTransliteration.success = true
    output = cachedTransliteration
  }
  return output
}

export default engHandler
