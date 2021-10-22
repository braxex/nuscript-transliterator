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
          const transliteratedItem = await engHandler(item)
          return transliteratedItem.nuskript
        }),
      )
      const transliteratedItem = transliteratedSplitItem.join('')
      return transliteratedItem
    }
    return item
  }
  // if item does not contain a non-word character, transliterate
  const transliteratedItem = await engHandler(item)
  return transliteratedItem.nuskript
}

const parHandler = async input => {
  const inputArray = input.trim().split(' ')
  const transliteratedArray = await Promise.all(inputArray.map(x => transliterateItem(x)))
  return transliteratedArray.join(' ')
}

export default parHandler
