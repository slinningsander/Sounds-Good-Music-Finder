const initialState = {
  selectedTags: [],
}

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_TAGS':
      return {
        ...state,
        selectedTags: action.payload,
      }
    default:
      return state
  }
}

export default tagsReducer
