import { disallowedIpaChars, ipaChars } from './sourceTargetMaps'

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

const transliterateToNs = formattedArray => {
  // TODO: for each character:
  // TODO: handle digraphs
  // TODO: handle all 1:1 replacement
  // TODO: handle schwas
  // return formattedArray.map(i => ipaToNuskript[i])
}

//
//
//

const transliterator = async (inputString, source) => {
  const formattedInputString = formatSourceString(inputString)
  let responseString

  if (source === 'eng') {
    // await fetchIpa()
    // sourceText = response
    // responseString = 'api response string'
  } else responseString = formattedInputString

  console.log('rs:', responseString)

  const formattedResponseArray = removeDisallowedCharacters(responseString.split(''))
  console.log('fra:', formattedResponseArray)

  const transliteratedArray = transliterateToNs(formattedResponseArray)
  console.log('ta:', transliteratedArray)

  const transliteratedString = transliteratedArray.join('')
  console.log('ts:', transliteratedString)

  return transliteratedString
}

export default transliterator
