import { useReducer } from 'react'

const productsReducer = (state, { type, payload }) => {
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
    case 'ADD':
      return {
        ...state,
        userProducts: [...state.userProducts, payload]
      }
    default:
      return state
  }
}

const updateHomeState = ({ partner = {}, products }, dispatch) => {
  const partnerData =
    partner && partner.name
      ? { partnerProducts: partner.products, partnerName: partner.name }
      : {}

  const payload = {
    userProducts: products,
    ...partnerData
  }

  dispatch({ type: 'SET_UPDATED', payload })
}

const productsInitialState = {
  userProducts: [],
  partnerProducts: [],
  partnerName: 'Presentes dele(a)'
}

export const useHomeFlow = () => {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState)
  const setState = userData => updateHomeState(userData, dispatch)
  return [state, setState, dispatch]
}
