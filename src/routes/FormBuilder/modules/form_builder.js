import { combineReducers } from 'redux'
import { ACTION_TYPES } from '../config/form_builder_config'

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
const QUESTIONS_BY_ID_ACTION_HANDLERS = {
  [ACTION_TYPES.ADD_INPUT]: (state, action) => {
    //refactor into another function
    return {
      ...state,
      [action.id]: {
        id: action.id,
        parentId: undefined,
        children: []
      }
    }
  },
  [ACTION_TYPES.ADD_SUB_INPUT]: (state, action) => {
    console.log('adding sub input')
    console.log('action', action)

    var newQuestion = {
      id: action.question.id + action.question.children.length,
      parentId: action.question.id,
      children: []
    }

    action.question.children.push(newQuestion)

    console.log(action.question)

    return {
      ...state,
      [action.question.id]: action.question,
      [newQuestion.id]: newQuestion
    }
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

//would be in a Question model normally
// function populateChildQuestions(question, questionsById) {
//   question.children = []

//   question.childIds.forEach(id => {
//     question.children.push(questionsById[id])
//   })
// }

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
