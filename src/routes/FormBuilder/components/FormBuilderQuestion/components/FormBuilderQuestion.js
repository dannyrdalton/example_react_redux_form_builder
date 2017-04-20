import React from 'react'
import { QUESTION_TYPES, QUESTION_TYPES_ARRAY } from '../config/form_builder_question_config'
// import PropTypes from 'prop-types'

import './FormBuilderQuestion.scss'

//currently only supports whole number answers

export const FormBuilderQuestion = ({ questions, onAddSubInput, onDeleteInput, onTextChange, onTypeChange, onConditionChange, onConditionValueChange }) => (
  <div className='form-builder-questions'>
    {questions.map((question, index) =>
      <div key={question.id} className='form-builder-question'>
        <div className='form-builder-question-inner'>
          {question.parentId &&
            <div className='form-builder-question-row'>
              <select value={question.condition.id} onChange={e => onConditionChange(question, e.target.value)}>
                {question.parent.type.conditions.map(condition =>
                  <option
                    key={condition.id}
                    label={condition.label}
                    value={condition.id}>
                  </option>
                )}
              </select>
              {question.parent.type.id === QUESTION_TYPES.TEXT.id &&
                <input type='text' onChange={e => onConditionValueChange(question, e.target.value)} />
              }
              {question.parent.type.id === QUESTION_TYPES.NUMBER.id &&
                <input type='number' onChange={e => onConditionValueChange(question, e.target.value)} />
              }
              {question.parent.type.id === QUESTION_TYPES.RADIO.id &&
                <select onChange={e => onConditionValueChange(question, e.target.value)}>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </select>
              }
            </div>
          }
          <div className='form-builder-question-row'>
            <div className='form-builder-question-label'>Question</div>
            <input type='text' onChange={e => onTextChange(question, e.target.value)}/>
          </div>
          <div className='form-builder-question-row'>
            <div className='form-builder-question-label'>Type</div>
            <select onChange={e => onTypeChange(question, e.target.value)} value={question.type.id}>
              {QUESTION_TYPES_ARRAY.map(type =>
                <option
                  key={type.id}
                  label={type.label}
                  value={type.id}>
                </option>
              )}
            </select>
          </div>
          <div className='form-builder-question-row'>
            <div className="btn btn-success" onClick={() => onAddSubInput(question)}>Add Sub-Input</div>
            <div className="btn btn-danger" onClick={() => onDeleteInput(question)}>Delete</div>
          </div>
        </div>
        <div className='form-builder-question-sub-inputs'>
          {question.children &&
           <FormBuilderQuestion
            questions={question.children}
            onAddSubInput={onAddSubInput}
            onDeleteInput={onDeleteInput}
            onTextChange={onTextChange}
            onTypeChange={onTypeChange}
            onConditionChange={onConditionChange}
            onConditionValueChange={onConditionValueChange}>
           </FormBuilderQuestion>}
        </div>
      </div>
    )}
  </div>
)

export default FormBuilderQuestion
