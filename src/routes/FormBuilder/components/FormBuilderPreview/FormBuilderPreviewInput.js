import React from 'react'
import { QUESTION_TYPES } from '../../config/form_builder_config'

export const FormBuilderPreviewInput = ({ question }) => (
  <div className='form-builder-prevew-input'>
    <div className='form-builder-preview-input-label'>
      {question.text}
    </div>
    <div className='form-builder-preview-input-input'>
      {question.type.id !== QUESTION_TYPES.RADIO.id &&
        <input type={question.type.input.type} />
      }

      {question.type.id === QUESTION_TYPES.RADIO.id &&
        question.type.input.values.map(value =>
          <div key={value.id}>
            <input type={question.type.input.type} name={question.id} value={value.id} /> {value.label}
          </div>
        )
      }
    </div>
  </div>
)

export default FormBuilderPreviewInput