const getHistory = async (chosenDate: Date) => {
  if (!process.env.REACT_APP_WIKIMEDIA_ACCESS_TOKEN || !process.env.REACT_APP_WIKIMEDIA_APP_NAME) {
    throw new Error(
      'Missing required tokens for Wikimedia API.  https://api.wikimedia.org/wiki/API_reference/Feed/On_this_day',
    )
  }
  const month = String(chosenDate.getMonth() + 1).padStart(2, '0')
  const day = String(chosenDate.getDate()).padStart(2, '0')
  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_WIKIMEDIA_ACCESS_TOKEN}`,
      'Api-User-Agent': process.env.REACT_APP_WIKIMEDIA_APP_NAME,
    },
  })

  return response.json()
}

export { getHistory }
