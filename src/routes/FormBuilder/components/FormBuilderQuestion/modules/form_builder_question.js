export function onQuestionChange() {

}

export function onTypeChange() {
  
}

export function addSubInput(input, index) {
  return {
    type: 'ADD_SUB_INPUT',
    payload: {
      input: input,
      index: index
    }
  }
}

const ACTION_HANDLERS = {
  'ADD_SUB_INPUT': (state, action) => {
    var newState = state;

    // newState.questions[action.payload.index].inputs.push({})
    console.log('adding sub input!');

    return Object.assign({}, state, newState)
  }
}

export default function formBuilderQuestionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}