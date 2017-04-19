import React from 'react'
import PropTypes from 'prop-types'

import FormBuilderQuestion from './FormBuilderQuestion/containers/FormBuilderQuestionContainer'

export const FormBuilder = (props) => (
  <div className="form-builder">
    Form Builder 
    <FormBuilderQuestion></FormBuilderQuestion>
  </div>
)

FormBuilder.propTypes = {
  counter     : PropTypes.number.isRequired,
  doubleAsync : PropTypes.func.isRequired,
  increment   : PropTypes.func.isRequired
}

export default FormBuilder
