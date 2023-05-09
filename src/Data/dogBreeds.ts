import { toTitleCase } from '../Utils/formatters'

const getDogBreeds = async () => {
  const url = 'https://dog.ceo/api/breeds/list/all'
  const response = await fetch(url, {})

  return response.json()
}

const getDogImageByBreed = async (path: string) => {
  const url = `https://dog.ceo/api/breed/${path}/images/random`
  const response = await fetch(url, {})
  const json = await response.json()
  return json
}

/**
 * Uses the dog breeds API to get a list of all available breeds.
 * Performs an additional call for each to get an img src url.
 * Generates and flattens an array of objects with both the img src
 * and the display name of each breed.
 */
const getDogInfo = async () => {
  const res = await getDogBreeds()
  const allBreedsResponse: { [key: string]: string[] } = Object.assign({}, res.message)

  const displayNames = {
    mexicanhairless: 'Mexican Hairless',
    stbernard: 'St. Bernard',
    germanshepherd: 'German Shepherd',
    kerryblue: 'Kerry Blue',
    germanlonghair: 'German Long Hair',
  }
  const awkwardNames = Object.keys(displayNames)

  const nested = Promise.all(
    Object.keys(allBreedsResponse).map(async key => {
      const primaryBreedArray = allBreedsResponse[key]

      if (primaryBreedArray.length >= 1) {
        const multiples = Promise.all(
          primaryBreedArray.map(async subBreed => {
            let subBreedName = subBreed
            if (awkwardNames.includes(subBreed)) {
              subBreedName = displayNames[subBreed as keyof typeof displayNames]
            }
            const imgSrc = await getDogImageByBreed(`${key}/${subBreed}`)
            return {
              imgSrc: imgSrc.message,
              display: toTitleCase(`${key} - ${subBreedName}`),
            }
          }),
        )
        return await multiples
      } else if (awkwardNames.includes(key)) {
        const imgSrc = await getDogImageByBreed(key)
        return {
          imgSrc: imgSrc.message,
          display: displayNames[key as keyof typeof displayNames],
        }
      } else {
        const imgSrc = await getDogImageByBreed(key)
        return {
          imgSrc: imgSrc.message,
          display: toTitleCase(key),
        }
      }
    }),
  )

  return (await nested).flat()
}

export { getDogInfo }
