import React from 'react'
import PropTypes from 'prop-types'

import FormBuilderQuestion from './FormBuilderQuestion/components/FormBuilderQuestion'
// import FormBuilderQuestions from './FormBuilderQuestion/components/FormBuilderQuestions'

console.log(FormBuilderQuestion)

export const FormBuilder = (props) => (
  <div className="form-builder">
    Form Builder 
    <FormBuilderQuestion
      questions={props.questionsList}
      onAddSubInput={props.addSubInput}
      onDeleteInput={props.deleteInput}
      onTextChange={props.onTextChange}
      onTypeChange={props.onTypeChange}
      onConditionChange={props.onConditionChange}
      onConditionValueChange={props.onConditionValueChange}>
    </FormBuilderQuestion>
    <div className="form-builder-buttons">
      <div className="btn btn-success" onClick={props.addInput}>Add Input</div> 
    </div>
  </div>
)

export default FormBuilder
