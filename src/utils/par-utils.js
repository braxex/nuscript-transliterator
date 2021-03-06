import engHandler from './eng-utils'

const transliterateItem = async item => {
  // if complex item (contains any non-word characters)
  if (item.match(/\W/)) {
    // if item contains any word characters,
    // split that item on word boundary and remove extra spaces
    if (item.match(/\w/)) {
      const splitComplexItem = item.split(/\b/).filter(x => x !== ' ')
      const transliteratedSplitItem = await Promise.all(
        splitComplexItem.map(async x => {
          // if subitem does not contain any word characters
          if (!x.match(/\w/)) {
            return x
          }
          // if item does not contain a non-word character, transliterate
          const transliteratedRootItem = await engHandler(item)
          return transliteratedRootItem
        }),
      )
      // rejoin transliterated root item with the accompanying punctuation,
      // maintaining root-related metadata
      const rootItem = transliteratedSplitItem.filter(x => typeof x === 'object')[0]
      // get root item transliteration and replace the current split item array with it
      const rootItemTransliteration = rootItem.nuscript
      const rootItemIndex = transliteratedSplitItem.findIndex(x => typeof x === 'object')
      transliteratedSplitItem[rootItemIndex] = rootItemTransliteration
      // replace returned nuscript string with transliterated split item
      rootItem.nuscript = transliteratedSplitItem.join('')
      return rootItem
    }
    return item
  }
  // if item does not contain a non-word character, transliterate
  const transliteratedItem = await engHandler(item)
  return transliteratedItem
}

const parHandler = async input => {
  const inputArray = input.trim().split(' ')
  const transliteratedArray = await Promise.all(inputArray.map(x => transliterateItem(x)))
  const flags = {
    inexact: false,
    invalid: false,
  }
  const array = transliteratedArray.map((x, index) => {
    let output
    if (x.invalid) {
      output = `<span class="invalid">${inputArray[index]}</span>`
      flags.invalid = true
    } else if (x.inexact) {
      output = `<span class="inexact">${x.nuscript}</span>`
      flags.inexact = true
    } else {
      output = `<span>${x.nuscript}</span>`
    }
    return output
  })
  const output = {
    success: true,
    variant: 'longform',
    nuscript: array.join(' '),
    flags,
  }
  return output
}

export default parHandler
