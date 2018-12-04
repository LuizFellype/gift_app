const MY_API_BABY = 'https://graphql-tutorial.herokuapp.com/'

export const request = async (queryObj, url = MY_API_BABY) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: queryObj
        }),
    })
    const body = await response.json()
    return body
}
