// this will be deleted soon
import React from 'react'
import { QUESTION_TYPES_ARRAY } from '../config/form_builder_question_config'

import './FormBuilderQuestion.scss'

export const FormBuilderQuestions = ({ questions }) => (
  <div className='form-builder-questions'>
    {questions.map(question =>
      <div key={question.id} className='form-builder-question'>
        <div className='form-builder-question-inner'>
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
            <div className="btn btn-success" onClick={() => onAddSubInput(question)}>Add Sub-Input</div>
            <div className="btn btn-danger">Delete</div>
          </div>
        </div>
      </div>
    )}
  </div>
)