export const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_UPDATED':
      return { ...state, ...action.payload }
    case 'SET_NAME':
      return { ...state, partnerName: action.payload }
    case 'ADD':
      return {
        ...state,
        userProducts: [...state.userProducts, action.payload]
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
