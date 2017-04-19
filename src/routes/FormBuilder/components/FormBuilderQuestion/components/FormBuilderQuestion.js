import React from 'react'
import { QUESTION_TYPES_ARRAY } from '../config/form_builder_question_config'
// import PropTypes from 'prop-types'

import './FormBuilderQuestion.scss'

const FormBuilderQuestionBase = ({ question, onAddSubInput }) => (
  <div className='form-builder-question-base'>
    <div className='form-builder-question-row'>
      <div className='form-builder-question-label'>Question</div>
      <input type='text'/>
    </div>
    <div className='form-builder-question-row'>
      <div className='form-builder-question-label'>Type</div>
      <select>
        {QUESTION_TYPES_ARRAY.map(type =>
          <option key={type.id}>{type.label}</option>
        )}
      </select>
    </div>
    <div className='form-builder-question-row'>
      <div className="btn btn-success" onClick={onAddSubInput}>Add Sub-Input</div>
      <div className="btn btn-danger">Delete</div>
    </div>
  </div>
)

export const FormBuilderQuestion = ({ questions, onAddSubInput, onQuestionChange, onTypeChange }) => (
  <div className='form-builder-questions'>
    {questions.map((question, index) =>
      <div key={question.id} className='form-builder-question'>
        <div className='form-builder-question-inner'>
          <div className='form-builder-question-row'>
            <div className='form-builder-question-label'>Question</div>
            <input type='text' onChange={e => onQuestionChange(e.target.value)}/>
          </div>
          <div className='form-builder-question-row'>
            <div className='form-builder-question-label'>Type</div>
            <select onChange={e => onTypeChange(e.target.value)}>
              {QUESTION_TYPES_ARRAY.map(type =>
                <option key={type.id}>{type.label}</option>
              )}
            </select>
          </div>
          <div className='form-builder-question-row'>
            <div className="btn btn-success" onClick={() => onAddSubInput(question, index)}>Add Sub-Input</div>
            <div className="btn btn-danger">Delete</div>
          </div>
        </div>
        <div className='form-builder-question-sub-inputs'>
          {question.inputs &&
           <FormBuilderQuestion
            questions={question.inputs}
            onAddSubInput={onAddSubInput}
            onQuestionChange={onQuestionChange}
            onTypeChange={onTypeChange}>
           </FormBuilderQuestion>}
        </div>
      </div>
    )}
  </div>
)

export default FormBuilderQuestion
