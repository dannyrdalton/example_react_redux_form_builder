import { combineReducers } from 'redux'
import { ACTION_TYPES, QUESTION_TYPES } from '../config/form_builder_config'

let nextInputId = 0;

export function addInput() {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_TYPES.ADD_INPUT,
      id: (nextInputId++).toString()
    }) 
  }
}

export function addSubInput(question, index) {
  return {
    type: ACTION_TYPES.ADD_SUB_INPUT,
    question: question
  }
}

export function onTextChange(question, inputValue) {
  return {
    type: ACTION_TYPES.ON_TEXT_CHANGE,
    question: question,
    text: inputValue
  }
}

export function onTypeChange(question, inputValue) {
  return {
    type: ACTION_TYPES.ON_TYPE_CHANGE,
    question: question,
    typeId: inputValue
  }
}

export const actions = {
  addInput
}

// ------------------------------------
// Action Handlers
// ------------------------------------

//would only keep track of childIds at scale or takes too much memory

const QUESTIONS_BY_ID_ACTION_HANDLERS = {
  [ACTION_TYPES.ADD_INPUT]: (state, action) => {
    //refactor into another function
    return {
      ...state,
      [action.id]: {
        id: action.id,
        parentId: undefined,
        children: [],
        type: QUESTION_TYPES.TEXT
      }
    }
  },
  [ACTION_TYPES.ADD_SUB_INPUT]: (state, action) => {

    var newQuestion = {
      id: action.question.id + action.question.children.length,
      parentId: action.question.id,
      children: [],
      type: QUESTION_TYPES.TEXT
    }

    action.question.children.push(newQuestion)

    console.log(action.question)

    return {
      ...state,
      [action.question.id]: action.question,
      [newQuestion.id]: newQuestion
    }
  },
  [ACTION_TYPES.ON_TEXT_CHANGE]: (state, action) => {
    action.question.text = action.text

    return {
      ...state,
      [action.question.id]: action.question
    }
  },
  [ACTION_TYPES.ON_TYPE_CHANGE]: (state, action) => {
    action.question.type = QUESTION_TYPES[action.typeId];

    return {
      ...state,
      [action.question.id]: action.question
    }
  }
}

export function getQuestionsList(state) {
  var questionList = [],
      question;

  console.log('getQuestionsList', state)

  state.allIds.forEach(id => {
    question = state.byId[id]

    if (!question.parentId) {
      questionList.push(question)
    }
  })


  return questionList
}

const ALL_QUESTION_IDS_ACTION_HANDLERS = {
  [ACTION_TYPES.ADD_INPUT]: (state, action) => {
    return [...state, action.id]
  }, 
}

// ------------------------------------
// Reducer
// ------------------------------------
// reducers needed: questions reducer (for questions object), questionsList: (for questions array)

function questionsById(state = {}, action) {
  const handler = QUESTIONS_BY_ID_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

function allQuestionIds(state = [], action) {
  const handler = ALL_QUESTION_IDS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

const questions = combineReducers({
  byId: questionsById,
  allIds: allQuestionIds
})

const formBuilderReducer = combineReducers({
  questions
})

export default formBuilderReducer
