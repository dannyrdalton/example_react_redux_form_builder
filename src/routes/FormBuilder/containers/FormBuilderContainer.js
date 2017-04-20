import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  addInput,
  addSubInput,
  deleteInput,
  onTextChange,
  onTypeChange,
  onConditionChange,
  onConditionValueChange,
  getQuestionsList
} from '../modules/form_builder'

import FormBuilder from '../components/FormBuilder'

class FormBuilderContainer extends Component {
  render() {
    return <FormBuilder {...this.props} />
  }
}


const mapDispatchToProps = {
  addInput,
  addSubInput,
  deleteInput,
  onTextChange,
  onTypeChange,
  onConditionChange,
  onConditionValueChange
}

const mapStateToProps = (state) => ({
  questionsList: getQuestionsList(state.formBuilder.questions)
})

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilderContainer)
