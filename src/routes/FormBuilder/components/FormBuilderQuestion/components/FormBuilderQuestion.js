import React from 'react'
import { QUESTION_TYPES_ARRAY } from '../config/form_builder_question_config'
// import PropTypes from 'prop-types'

import './FormBuilderQuestion.scss'

export const FormBuilderQuestion = ({ questions, onAddSubInput, onTextChange, onTypeChange }) => (
  <div className='form-builder-questions'>
    {questions.map((question, index) =>
      <div key={question.id} className='form-builder-question'>
        <div className='form-builder-question-inner'>
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
            <div className="btn btn-danger">Delete</div>
          </div>
        </div>
        <div className='form-builder-question-sub-inputs'>
          {question.children &&
           <FormBuilderQuestion
            questions={question.children}
            onAddSubInput={onAddSubInput}
            onTextChange={onTextChange}
            onTypeChange={onTypeChange}>
           </FormBuilderQuestion>}
        </div>
      </div>
    )}
  </div>
)

export default FormBuilderQuestion
