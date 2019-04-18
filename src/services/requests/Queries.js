export const meQ = id => `
  {
    user(id: ${id}) {
      id
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
`
