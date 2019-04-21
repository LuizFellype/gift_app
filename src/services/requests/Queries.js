export const meQ = () => `
  {
    user {
      name
      email
      recognizeId
      products {
        id
        productName
        url
      }
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
