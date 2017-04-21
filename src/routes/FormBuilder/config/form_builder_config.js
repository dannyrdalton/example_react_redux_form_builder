export const ACTION_TYPES = {
  ADD_INPUT: 'ADD_INPUT',
  ADD_SUB_INPUT: 'ADD_SUB_INPUT',
  DELETE_INPUT: 'DELETE_INPUT',
  ON_TEXT_CHANGE: 'ON_TEXT_CHANGE',
  ON_TYPE_CHANGE: 'ON_TYPE_CHANGE',
  ON_CONDITION_CHANGE: 'ON_CONDITION_CHANGE',
  ON_CONDITION_VALUE_CHANGE: 'ON_CONDITION_VALUE_CHANGE',
  ON_SELECTED_TAB_CHANGE: 'ON_SELECTED_TAB_CHANGE'
}

export const TABS_CONFIG = {
  NAME: 'tabs-form-builder',
  TABS: {
    CREATE: {
      id: 'CREATE',
      label: 'create'
    },
    PREVIEW: {
      id: 'PREVIEW',
      label: 'Preview'
    },
    EXPORT: {
      id: 'EXPORT',
      label: 'Export'
    }
  }
}

export const QUESTION_CONDITIONS = {
  EQUALS: {
    id:'EQUALS',
    label: 'Equals'
  },
  GREATER_THAN: {
    id:'GREATER_THAN',
    label: 'Is Greater Than'
  },
  LESS_THAN: {
    id: 'LESS_THAN',
    label: 'Is Less Than'
  }
}

export const QUESTION_TYPES = {
  TEXT: {
    id: 'TEXT',
    label: 'Text',
    input: {
      type: 'text',
    },
    conditions: [QUESTION_CONDITIONS.EQUALS]
  },
  NUMBER: {
    id: 'NUMBER',
    label: 'Number',
    input: {
      type: 'number'
    },
    conditions: [
      QUESTION_CONDITIONS.EQUALS,
      QUESTION_CONDITIONS.GREATER_THAN,
      QUESTION_CONDITIONS.LESS_THAN
    ]
  },
  RADIO: {
    id: 'RADIO',
    label: 'Yes / No',
    input: {
      type: 'radio',
      values: [
        {
          id: 'YES',
          label: 'Yes'
        },
        {
          id: 'NO',
          label: 'No'
        }
      ]
    },
    conditions: [QUESTION_CONDITIONS.EQUALS]
  }
}

export const QUESTION_TYPES_ARRAY = [
  QUESTION_TYPES.TEXT,
  QUESTION_TYPES.NUMBER,
  QUESTION_TYPES.RADIO
]