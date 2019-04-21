export const productsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_UPDATED':
      const userDataVerification =
        (payload.userProducts || state.userProducts).length ===
        state.userProducts.length
      const partnerDataVerification =
        (payload.partnerProducts || state.partnerProducts).length ===
        state.partnerProducts.length

      if (userDataVerification && partnerDataVerification) {
        return state
      }
      return { ...state, ...payload }
    case 'SET_NAME':
      return { ...state, partnerName: payload }
    case 'ADD':
      return {
        ...state,
        userProducts: [...state.userProducts, payload]
      }
    default:
      return state
  }
}

export const productsInitialState = {
  userProducts: [],
  partnerProducts: [],
  partnerName: 'Presentes dele(a)'
}
