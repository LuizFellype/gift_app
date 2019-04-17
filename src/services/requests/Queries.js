export const meQ = id => `
  {
    user(id: ${id}) {
      id
      name
      email
    }
  }
`
