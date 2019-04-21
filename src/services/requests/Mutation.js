export const loginM = ({ email, password }) => `
mutation{
  login(email: ${JSON.stringify(email)} password: ${JSON.stringify(password)}) {
    token
    user {
      id
      name
      email
      recognizeId
      products {
        id
        productName
        url
      }
      partner {
        recognizeId
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

export const singup = ({ name, email, password }) => `
mutation {
  signup(
    name: ${JSON.stringify(name)}
    email: ${JSON.stringify(email)}
    password: ${JSON.stringify(password)}
  ){
    id
    name
    email
  }
}
`

export const post = ({ name, placeReference }) => `
  mutation {
    post(
      productName: ${JSON.stringify(name)}
      url: ${JSON.stringify(placeReference)}
    ){
      id
      productName
      url
    }
  }
`

export const addPartnerM = recognizeId => `
  mutation {
    addPartner(recognizeId: ${recognizeId}){
      partner {
        name
        products {
          id
          productName
          url
        }
      }
    }
  }
`
