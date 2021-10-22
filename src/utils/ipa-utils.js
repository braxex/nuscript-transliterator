import {
  digraphReplacementMap,
  schwaReplacementMap,
  straightReplacementMap,
} from './replacementMaps'

const allowedIpaChars = 'æɑɒðəɛɜɪŋɔʃʊʌxʒʔθɹʧʔɡː.ˈˌ'
const sanitizationRegex = new RegExp(`[^${allowedIpaChars}\\w]|[\\d]`, 'gi')

const sanitizeIpa = string => {
  return string.replace(sanitizationRegex, '')
}

const removeDisallowedCharacters = array => {
  return array.filter(i => !['ː', 'ˈ', "'", 'ˌ', ',', '.', 'ʔ', '_'].includes(i))
}

const mapNonSchwaReplacements = (currentChar, currentIndex, array) => {
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

const mapSchwaReplacements = (currentChar, currentIndex, array) => {
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

export const transliterateIpa = ipaString => {
  const formattedArray = removeDisallowedCharacters(ipaString.split(''))
  // handle digraph and 1:1 char replacements
  const preSchwaArray = formattedArray
    .map(mapNonSchwaReplacements)
    .filter(i => typeof i !== 'undefined')
  // handle schwa replacements
  const finalArray = preSchwaArray.map(mapSchwaReplacements).filter(i => typeof i !== 'undefined')
  return finalArray.join('')
}

export const ipaHandler = async input => {
  const sanitizedInput = sanitizeIpa(input)
  return transliterateIpa(sanitizedInput)
}
