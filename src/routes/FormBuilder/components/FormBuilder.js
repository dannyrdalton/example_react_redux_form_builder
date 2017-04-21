import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'

import FormBuilderQuestion from './FormBuilderQuestion/components/FormBuilderQuestion'
import FormBuilderPreview from './FormBuilderPreview/FormBuilderPreview'
import { TABS_CONFIG } from '../config/form_builder_config'

import './FormBuilder.scss'

export const FormBuilder = (props) => (
  <div className="form-builder">
    Form Builder 
    <Tabs
      name={TABS_CONFIG.NAME}
      handleSelect={props.onSelectedTabChange}
      selectedTab={props.tabs[TABS_CONFIG.NAME]}>

      <div className='tab-links'>
        <TabLink to={TABS_CONFIG.TABS.CREATE.id}>Create</TabLink>
        <TabLink to={TABS_CONFIG.TABS.PREVIEW.id}>Preview</TabLink>
        <TabLink to={TABS_CONFIG.TABS.EXPORT.id}>Export</TabLink>
      </div>

      <div className='tabs-content'>
        <TabContent for={TABS_CONFIG.TABS.CREATE.id}>
          <FormBuilderQuestion
            questions={props.questionsList}
            onAddSubInput={props.addSubInput}
            onDeleteInput={props.deleteInput}
            onTextChange={props.onTextChange}
            onTypeChange={props.onTypeChange}
            onConditionChange={props.onConditionChange}
            onConditionValueChange={props.onConditionValueChange}/>
          <div className="form-builder-buttons">
            <div className="btn btn-success" onClick={props.addInput}>Add Input</div> 
          </div>
        </TabContent>
        <TabContent for={TABS_CONFIG.TABS.PREVIEW.id}>
          <FormBuilderPreview
            questionList={props.questionsList} />
        </TabContent>
        <TabContent for={TABS_CONFIG.TABS.EXPORT.id}>
          <textarea value={JSON.stringify(props.questionsList)} readOnly='true'></textarea>
        </TabContent>
      </div>
    </Tabs>
  </div>
)

export default FormBuilder
