import React from 'react'
import PropTypes from 'prop-types'

import FormBuilderQuestion from './FormBuilderQuestion/containers/FormBuilderQuestionContainer'

export const FormBuilder = (props) => (
  <div className="form-builder">
    Form Builder 
    <div className="form-builder-questions">
      {props.formBuilder.questions.map((question, index) =>
        <FormBuilderQuestion key={index}></FormBuilderQuestion>
      )}
    </div>
    <div className="form-builder-buttons">
      <div className="btn btn-success" onClick={props.addInput}>Add Input</div> 
    </div>
  </div>
)

export default FormBuilder
