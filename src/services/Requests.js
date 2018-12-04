export const feed = (filterId) => `
query {
    feed(filterId: ${JSON.stringify(filterId)}) {
      id
      productName
      url
    }
  }
`

export const signIn = (loginObj) => `
mutation {
    login(
      email: ${JSON.stringify(loginObj.email)}
      password: ${JSON.stringify(loginObj.password)}
    ){
      token
      user {
        id
        name
        products {
          id
          productName
          url
        }
        partner {
          id
          name
          products {
            id
            productName
            url
          }
        }
      }
    }
  }
`

export const signUp = (signUp) => `
mutation {
    signup(
      name: ${JSON.stringify(signUp.name)}
      email: ${JSON.stringify(signUp.email)}
      password: ${JSON.stringify(signUp.password)}
    ) {
      token
      user {
        id
        name
        products {
          id
          productName
          url
        }
        partner {
          id
          name
          products {
            id
            productName
            url
          }
        }
      }
    }
  }
`