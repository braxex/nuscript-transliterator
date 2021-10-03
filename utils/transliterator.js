import {
  disallowedIpaChars,
  ipaChars,
  digraphMap,
  straightReplacementMap,
  schwaReplacementMap,
} from './sourceTargetMaps'

// remove disallowed characters and lowercase prior to api call
const formatSourceString = sourceString => {
  const regex = new RegExp(`[^${ipaChars}\\w]|[\\d]`, 'gi')
  return sourceString.replace(regex, '').toLowerCase()
}

const fetchIpa = () => {
  let response = ''
  try {
    // make ipa call
    // TODO: if word not found
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return response
}

// remove disallowed ipa characters prior to transliteration
const removeDisallowedCharacters = responseArray => {
  return responseArray.filter(i => !disallowedIpaChars.includes(i))
}

const handleNonSchwaReplacements = (currentChar, currentIndex, array) => {
  const followingChar = array[currentIndex + 1]
  // check if current char potentially begins a valid non-schwa digraph
  const leadCharDigraphOptions = digraphMap[currentChar] || []
  const foundDigraph = leadCharDigraphOptions.find(el => el.second === followingChar)
  let mappedChar = null
  // check if following char completes a valid non-schwa digraph
  if (foundDigraph) {
    mappedChar = foundDigraph.output
    array.splice(followingChar, 1) /* remove next char in array */
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

const transliterator = async (inputString, source) => {
  const formattedInputString = formatSourceString(inputString)
  let responseString

  if (source === 'eng') {
    // await fetchIpa()
    // sourceText = response
    // responseString = 'api response string'
  } else {
    responseString = formattedInputString
  }

  const formattedResponseArray = removeDisallowedCharacters(responseString.split(''))

  // handle digraph and 1:1 char replacements
  const preSchwaArray = formattedResponseArray
    .map(handleNonSchwaReplacements)
    .filter(i => typeof i !== 'undefined')

  // handle schwa replacements
  const finalArray = preSchwaArray
    .map(handleSchwaReplacements)
    .filter(i => typeof i !== 'undefined')

  return finalArray.join('')
}

export default transliterator
