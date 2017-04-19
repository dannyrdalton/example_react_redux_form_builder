export function addInput() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_INPUT',
      payload: getState().formBuilder
    }) 
  }
}

export const actions = {
  addInput
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  'ADD_INPUT': (state, action) => {
    var questions = action.payload.questions;
    questions.push({});

    console.log('adding input!');

    return Object.assign({}, state, {
      questions: questions
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  questions: []
}
export default function formBuilderReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
