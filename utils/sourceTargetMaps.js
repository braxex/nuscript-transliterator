export const schwaReplacementMap = {
  b: 'b́',
  d: 'd́',
  f: 'f́',
  g: 'ǵ',
  h: 'h́',
  j: 'ȷ́',
  k: 'ḱ',
  l: 'ĺ',
  m: 'ḿ',
  n: 'ń',
  ŋ: 'ŋ́',
  p: 'ṕ',
  r: 'ŕ',
  s: 'ś',
  ṣ: 'ṣ́',
  þ: 'þ́',
  ð: 'ð́',
  t: 't́',
  ṭ: 'ṭ́',
  v: 'v́',
  w: 'ẃ',
  y: 'ý',
  z: 'ź',
  ẓ: 'ẓ́',
}

export const straightReplacementMap = {
  ɑ: 'ô',
  ɒ: 'ô',
  æ: 'â',
  ɛ: 'ê',
  ɜ: 'ə',
  ɪ: 'î',
  i: 'e',
  j: 'y',
  ɔ: 'a',
  ʃ: 'ṣ',
  θ: 'þ',
  ʊ: 'ů',
  ʌ: 'û',
  x: 'k',
  ʒ: 'ẓ',
}

export const digraphMap = {
  a: [
    {
      second: 'ɪ',
      output: 'i',
    },
    {
      second: 'ʊ',
      output: 'å',
    },
  ],
  ɒ: [
    {
      second: '̃',
      output: 'ô',
    },
  ],
  æ: [
    {
      second: '̃',
      output: 'ô',
    },
  ],
  d: [
    {
      second: 'ʒ',
      output: 'j',
    },
  ],
  e: [
    {
      second: 'ɪ',
      output: 'a',
    },
  ],
  h: [
    {
      second: 'w',
      output: 'w',
    },
  ],
  o: [
    {
      second: 'ʊ',
      output: 'o',
    },
  ],
  ɔ: [
    {
      second: 'ɪ',
      output: 'ø',
    },
    {
      second: 'r',
      output: 'o',
    },
  ],
  t: [
    {
      second: 'ʃ',
      output: 'ṭ',
    },
  ],
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

// TODO: check for others in eventual API-used IPA set
export const disallowedIpaChars = ['ː', 'ˈ', 'ˌ', '.', 'ʔ']

export const ipaChars = 'æɑɒðəɛɜɪŋɔʃʊʌxʒʔθɹʔː.ˈˌ'
