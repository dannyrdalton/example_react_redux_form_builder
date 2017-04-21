import React from 'react'

import FormBuilderPreviewInput from './FormBuilderPreviewInput'

export const FormBuilderPreview = ({ questionList }) => (
  <div className='form-builder-prevew'>
    {questionList.map(question =>
      <FormBuilderPreviewInput key={question.id} question={question}/>
    )}
  </div>
)

export default FormBuilderPreview