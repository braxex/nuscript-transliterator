export const ipaToNuskript = {}

export const oneToOneMap = {
  j: 'y',
  ʃ: 'ṣ',
  θ: 'þ',
  ʒ: 'ẓ',
  ɑ: 'ô',
  ɒ: 'ô',
  æ: 'â',
  ɛ: 'ê',
  ɪ: 'î',
  i: 'e',
  ʊ: 'ů',
  ʌ: 'û',
}

export const digraphMap = {
  dʒ: 'j',
  hw: 'w',
  tʃ: 'ṭ',
}

export const unchangedChars = [
  'b',
  'd',
  'f',
  'g',
  'ð',
  'g',
  'h',
  'k',
  'l',
  'm',
  'n',
  'ŋ',
  'p',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'z',
]

export const passThroughChars = ['x']

//TODO: check for others in eventual API-used IPA set
export const disallowedIpaChars = ['ː', 'ˈ', '.', 'ʔ']

export const ipaChars = 'æɑɒðəɛɜɪŋɔʃʊʌxʒʔθɹː.ˈ'
