import { combineReducers } from 'redux'
import formBuilderQuestionReducer from '../components/FormBuilderQuestion/modules/form_builder_question'

export function addInput() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ADD_INPUT',
      payload: getState().formBuilder
    }) 
  }
}

export function addSubInput(question, index) {
  return {
    type: 'ADD_SUB_INPUT',
    payload: {
      question: question,
      index: index
    }
  }
}

export function onQuestionChange(value) {
  return {
    type: 'ON_QUESTION_CHANGE',
    payload: {
      value: value
    }
  }
}

export function onTypeChange(value) {
  return {
    type: 'ON_TYPE_CHANGE',
    payload: {
      value: value
    }
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
    var questions = action.payload.questions
    questions.push({
      id: questions.length + 1,
      inputs: []
    })

    console.log('adding input!')

    return Object.assign({}, state, {
      questions: questions
    })
  },
  'ADD_SUB_INPUT': (state, action) => {
    console.log('adding sub-input')

    var newState = state,
        question = action.payload.question,
        indexToModify = action.payload.index

    newState.questions[indexToModify].inputs.push({
      id: '' + question.id + (newState.questions[indexToModify].inputs.length + 1)
    })

    return Object.assign({}, newState)
  },
  'ON_QUESTION_CHANGE': (state, action) => {
    console.log('question change')
    console.log(action.payload.value)

    return state
  },
  'ON_TYPE_CHANGE': (state, action) => {
    console.log('type change')
    console.log(action.payload.value)

    return state
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
