const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')

export { toTitleCase }
