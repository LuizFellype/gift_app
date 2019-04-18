export const me = async () => {
  return {
    data: {
      user: {
        id: 'cjuki8zpa00420770ebvnfjt4',
        products: [
          {
            id: '1',
            productName: 'Meu PRODUTO 1',
            url: 'LOJA EXEMPLO'
          },
          {
            id: '2',
            productName: 'Meu PRODUTO 2',
            url: 'LOJA EXEMPLO 2'
          },
          {
            id: '3',
            productName: 'Meu PRODUTO 3',
            url: 'LOJA EXEMPLO 3'
          }
        ],
        partner: {
          id: 'partnerID',
          name: 'Joaozinho',
          products: [
            {
              id: '2',
              productName: 'PRODUTO 1',
              url: 'LOJA EXEMPLO'
            }
          ]
        }
      }
    }
  }
}
