import fetchWordData from './api-utils'
import { ipaHandler } from './ipa-utils'
import { getRedisEntry, setRedisEntry } from './redis-utils'

const allowCacheFetching = true
const allowCacheSetting = true

const sanitizationRegex = new RegExp(`[^\\w]|[\\d]`, 'gi')

const sanitizeEnglish = string => {
  return string.replace(sanitizationRegex, '').toLowerCase()
}

const checkCache = async entry => (allowCacheFetching ? getRedisEntry(entry) : null)

const engHandler = async input => {
  let output
  const sanitizedInput = sanitizeEnglish(input)

  // check cache for existing transliteration
  const existingCacheEntry = await checkCache(sanitizedInput)
  // if cached response exists, use prior existing transliteration
  if (existingCacheEntry) {
    const cachedTransliteration = JSON.parse(existingCacheEntry)
    cachedTransliteration.success = true
    output = cachedTransliteration
  } else {
    // query words api
    const apiResponse = await fetchWordData(sanitizedInput)
    // if the word returned is an inexact match
    if (apiResponse.word && apiResponse.word !== sanitizedInput) {
      apiResponse.inexact = true
    }
    // if there's an error or the word is not found
    if (
      apiResponse.message ||
      !apiResponse.pronunciation ||
      Object.keys(apiResponse.pronunciation).length === 0
    ) {
      apiResponse.nuscript = sanitizedInput
      apiResponse.invalid = true
      output = apiResponse
    }
    // if everything's ok
    else {
      const transliteration = await ipaHandler(
        apiResponse.pronunciation
          ? apiResponse.pronunciation.all || apiResponse.pronunciation
          : null,
      )
      apiResponse.nuscript = transliteration
      // cache api response and transliteration
      if (allowCacheSetting) {
        await setRedisEntry(sanitizedInput, JSON.stringify(apiResponse))
      }
      apiResponse.success = true
      output = apiResponse
    }
  }
  return output
}

export default engHandler
