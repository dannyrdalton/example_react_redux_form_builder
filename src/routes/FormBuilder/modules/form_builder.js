import { combineReducers } from 'redux'
import { ACTION_TYPES, QUESTION_TYPES, QUESTION_CONDITIONS } from '../config/form_builder_config'

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
    question: question,
    id: question.id + question.children.length
  }
}

export function deleteInput(question) {
  return {
    type: ACTION_TYPES.DELETE_INPUT,
    questionId: question.id
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

export function onConditionChange(question, inputValue) {
  return {
    type: ACTION_TYPES.ON_CONDITION_CHANGE,
    question: question,
    conditionId: inputValue
  }
}

export function onConditionValueChange(question, inputValue) {
  return {
    type: ACTION_TYPES.ON_CONDITION_VALUE_CHANGE,
    question: question,
    conditionValue: inputValue
  }
}

export const actions = {
  addInput
}

// ------------------------------------
// Action Handler Helpers
// ------------------------------------

function recursiveDeleteInput(state, action) {
  var questionToDelete = state[action.questionId],
      childIds = questionToDelete.childIds

  let  {[questionToDelete.id]: deleted, ...newState} = state;

  console.log('childIds is', childIds)

  if (!childIds.length) {
    return newState
  }

  childIds.forEach(id => {
    action.questionId = id;
    newState = recursiveDeleteInput(state, action)
  })

  return newState;
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
        childIds: [],
        type: QUESTION_TYPES.NUMBER
      }
    }
  },
  [ACTION_TYPES.ADD_SUB_INPUT]: (state, action) => {

    var newQuestion = {
      id: action.id,
      parentId: action.question.id,
      childIds: [],
      type: QUESTION_TYPES.TEXT,
      condition: QUESTION_CONDITIONS.EQUALS
    }

    action.question.childIds.push(newQuestion.id)
    // action.question.children.push(newQuestion)

    return {
      ...state,
      [action.question.id]: action.question,
      [newQuestion.id]: newQuestion
    }
  },
  [ACTION_TYPES.DELETE_INPUT]: (state, action) => {
    console.log('deleting input')
    return recursiveDeleteInput(state, action)

    // var questionToDelete = state[action.questionId],
    //     childIds = questionToDelete.childIds

    // let  {[questionToDelete.id]: deleted, ...newState} = state;

    // return newState
  },
  [ACTION_TYPES.ON_TEXT_CHANGE]: (state, action) => {
    action.question.text = action.text

    return {
      ...state,
      [action.question.id]: action.question
    }
  },
  [ACTION_TYPES.ON_TYPE_CHANGE]: (state, action) => {
    action.question.type = QUESTION_TYPES[action.typeId]

    return {
      ...state,
      [action.question.id]: action.question
    }
  },
  [ACTION_TYPES.ON_CONDITION_CHANGE]: (state, action) => {
    action.question.condition = QUESTION_CONDITIONS[action.conditionId]

    console.log(action.question)

    return {
      ...state,
      [action.question.id]: action.question
    }
  },
  [ACTION_TYPES.ON_CONDITION_VALUE_CHANGE]: (state, action) => {
    console.log('on condition value change')

    action.question.conditionValue = action.conditionValue;

    return {
      ...state,
      [action.question.id]: action.question
    }
  }
}

function getParentQuestion(question, state) {
  console.log('question parent is', state.byId[question.parentId])

  return state.byId[question.parentId]
}

function getChildQuestions(question, state) {
  var childQuestion;

  if (!question.childIds) {
    return []
  }

  return question.childIds.map(id => {
    childQuestion = state.byId[id]

    return {
      ...childQuestion,
      parent: question,
      children: getChildQuestions(childQuestion, state)
    }
  })
}

export function getQuestionsList(state) {
  var questionList = [],
      question,
      populatedQuestion;

  state.allIds.forEach(id => {
    question = state.byId[id]

    if (!question.parentId) {
      populatedQuestion = {
        ...question,
        parent: getParentQuestion(question, state),
        children: getChildQuestions(question, state)
      }

      questionList.push(populatedQuestion)
    }
  })

  // populatedQuestions.forEach(question => {
  //   if (!question.parentId) {
  //     questionList.push(question)
  //   }
  // })

  console.log('question list is', questionList)

  return questionList
}

const ALL_QUESTION_IDS_ACTION_HANDLERS = {
  [ACTION_TYPES.ADD_INPUT]: (state, action) => {
    return [...state, action.id]
  },
  [ACTION_TYPES.ADD_SUB_INPUT]: (state, action) => {
    return [...state, action.id]
  },
  [ACTION_TYPES.DELETE_INPUT]: (state, action) => {
    return state.filter(id => id !== action.questionId)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

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
