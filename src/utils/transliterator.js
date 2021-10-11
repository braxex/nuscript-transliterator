import fetchWordData from './wordsApi'
import {
  allowedIpaChars,
  digraphReplacementMap,
  disallowedIpaChars,
  schwaReplacementMap,
  straightReplacementMap,
} from './sourceTargetMaps'

// remove disallowed characters and lowercase prior to api call
const formatSourceString = (sourceString, source) => {
  const regex =
    source === 'eng'
      ? new RegExp(`[^\\w]|[\\d]`, 'gi')
      : new RegExp(`[^${allowedIpaChars}\\w]|[\\d]`, 'gi')
  return sourceString.replace(regex, '').toLowerCase()
}

// remove disallowed ipa characters prior to transliteration
const removeDisallowedCharacters = responseArray => {
  return responseArray.filter(i => !disallowedIpaChars.includes(i))
}

const handleNonSchwaReplacements = (currentChar, currentIndex, array) => {
  const followingChar = array[currentIndex + 1]
  // check if current char potentially begins a valid non-schwa digraph
  const leadCharDigraphOptions = digraphReplacementMap[currentChar] || []
  const foundDigraph = leadCharDigraphOptions.find(el => el.second === followingChar)
  let mappedChar = null
  // check if following char completes a valid non-schwa digraph
  if (foundDigraph) {
    mappedChar = foundDigraph.output
    if (!foundDigraph.retainSecond) {
      array.splice(followingChar, 1) /* remove next char in array */
    }
  } else {
    // if not non-schwa digraph, perform 1:1 replacement
    mappedChar = straightReplacementMap[currentChar]
  }
  return mappedChar || currentChar
}

const handleSchwaReplacements = (currentChar, currentIndex, array) => {
  const followingChar = array[currentIndex + 1]
  let mappedChar = null
  // check if current char is schwa
  if (currentChar === 'ə') {
    // if it is the last character, return apostrophe
    if (currentIndex === array.length - 1) {
      mappedChar = "'"
    } else if (schwaReplacementMap[followingChar]) {
      mappedChar = schwaReplacementMap[followingChar]
      array.splice(followingChar, 1) /* remove next char in array */
    }
  }
  return mappedChar || currentChar
}

const handleIpa = ipaString => {
  const formattedArray = removeDisallowedCharacters(ipaString.split(''))
  // handle digraph and 1:1 char replacements
  const preSchwaArray = formattedArray
    .map(handleNonSchwaReplacements)
    .filter(i => typeof i !== 'undefined')
  // handle schwa replacements
  const finalArray = preSchwaArray
    .map(handleSchwaReplacements)
    .filter(i => typeof i !== 'undefined')
  return finalArray.join('')
}

const transliterator = async (inputString, source) => {
  const formattedInputString = formatSourceString(inputString, source)
  let transliteratorResponse

  // handle english transliteration
  if (source === 'eng') {
    const apiResponse = await fetchWordData(formattedInputString)
    if (apiResponse.message || !apiResponse.pronunciation) {
      transliteratorResponse = apiResponse
    } else {
      apiResponse.nuskript = handleIpa(
        apiResponse.pronunciation
          ? apiResponse.pronunciation.all || apiResponse.pronunciation
          : null,
      )
      transliteratorResponse = apiResponse
    }
  } else {
    transliteratorResponse = { nuskript: handleIpa(formattedInputString) }
  }
  return { success: true, ...transliteratorResponse }
}

export default transliterator
