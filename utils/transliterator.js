const targetMap = {
  en: 'ns',
  ipa: 'ns',
  ns: 'en',
}

export const transliterator = (sourceText, source) => {
  const target = targetMap[source]
  console.log('st: ', sourceText, '\ns: ', source, '\nt: ', target)
}
