const reducer = (state, action) => {
  const defaultState = {
    playing: null,
    ...state
  }

  switch (action.type) {
    case 'SET_FAVOURITE':
      return {
        ...defaultState,
        myList: [...defaultState.myList, action.payload]
      }
    case 'DELETE_FAVOURITE':
      return {
        ...defaultState,
        myList: defaultState.myList.filter(
          item => item.id !== action.payload
        )
      }
    case 'LOGIN_REQUEST':
      return {
        ...defaultState,
        user: action.payload
      }
    case 'LOGOUT_REQUEST':
      return {
        ...defaultState,
        user: action.payload
      }
    case 'REGISTER_REQUEST':
      return {
        ...defaultState,
        user: action.payload
      }
    case 'GET_VIDEO_SOURCE':
      return {
        ...defaultState,
        playing:
          defaultState.trends.find(
            item => item.id === Number(action.payload)
          ) ||
          defaultState.originals.find(
            item => item.id === Number(action.payload)
          ) ||
          false
      }
    default:
      return defaultState
  }
}

export default reducer
