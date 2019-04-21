export const meQ = id => `
  {
    user(id: ${id}) {
      id
      name
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
