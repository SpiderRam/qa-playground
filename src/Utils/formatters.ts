const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

const toCamelCase = (str: string) => {
  return str
    .replace(/\s(.)/g, function (a) {
      return a.toUpperCase()
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, function (b) {
      return b.toLowerCase()
    })
}
export { toTitleCase, toCamelCase }
