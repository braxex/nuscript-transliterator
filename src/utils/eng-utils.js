import fetchWordData from './wordsApi'
import { ipaHandler } from './ipa-utils'

const sanitizationRegex = new RegExp(`[^\\w]|[\\d]`, 'gi')

const sanitizeEnglish = string => {
  return string.replace(sanitizationRegex, '').toLowerCase()
}

// TODO: MAKE THIS CHECK REAL
const checkCache = async () => false

const engHandler = async input => {
  let output
  const sanitizedInput = sanitizeEnglish(input)

  // if word does not exist in cache, call api before transliteration
  // const wordExistsInCache = checkCache(sanitizedInput)
  const wordExistsInCache = false
  if (!wordExistsInCache) {
    const apiResponse = await fetchWordData(sanitizedInput)
    // if there's an API error or the word is not found
    if (apiResponse.message || !apiResponse.pronunciation) {
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
      apiResponse.success = true
      output = apiResponse
      // TODO: SET API RESPONSE AND TRANSLITERATION IN CACHE
    }
  } else {
    // TODO: SKIP API CALL & USE CACHED TRANSLITERATION INSTEAD
  }
  return output
}

export default engHandler
