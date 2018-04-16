import React, { Component } from 'react';
import style from './preview.css';
import { connect } from 'react-redux';
import { addDataToForm } from '../../actions';


class Preview extends Component {

    handleInput = (event, actualDataform, id) => {
        const newData = {}

        newData.answer = event.target.value;
        newData.question = actualDataform.question;
        newData.type = event.target.type;
        newData.conditionAnswer = actualDataform.conditionAnswer;
        newData.condition = actualDataform.condition

        this.props.dispatch(addDataToForm(newData, id))
    }

    generateParentForm = (item) => {
        return (
            <div className={style.baseDiv} style={{marginLeft:`${item.level*20}px`}} >
            <p>{item.dataForm.question}</p>
            {
                item.dataForm.type === 'number' ?
                    <input
                        style={{width:"170px", height:"25px", fontSize:"18px", paddingLeft:"8px"}}
                        type="number"
                        value={item.dataForm.answer || ''}
                        onChange={(event) => this.handleInput(event, item.dataForm, item.id)} 
                    />
                    : item.dataForm.type === 'text' ?
                        <input
                            style={{width:"170px", height:"25px", fontSize:"18px", paddingLeft:"8px"}}
                            type="text"
                            value={item.dataForm.answer || ''}
                            onChange={(event) => this.handleInput(event, item.dataForm, item.id)} 
                        />
                    : item.dataForm.type === 'radio' ?
                        <div className={style.radioCheck} onChange={(event) => this.handleInput(event, item.dataForm, item.id)}>
                            <input style={{width:"5%"}} type="radio" value="yes" id="yes" name="choose" />
                            <label for="yes">Yes</label>
                            <input style={{width:"5%"}} type="radio" value="no" id="no" name="choose" />
                            <label for="no">No</label>
                        </div>
                    : null
            }
        </div>
        )
    }

    generateChildForm = (item) => {
        return (
            <div>
                {item.isDisplayed = true}
                {item.dataForm.type === "radio" ?
                    <div className={style.childDiv} style={{ marginLeft: `${item.level * 20}px` }}><p>{item.dataForm.question}</p>
                        <div className={style.radioCheck} onChange={(event) => this.handleInput(event, item.dataForm, item.id)}>
                            <input style={{width:"5%"}} type="radio" value="yes" id="yes" name="choose" />
                            <label for="yes">Yes</label>
                            <input style={{width:"5%"}} type="radio" value="no" id="no" name="choose" />
                            <label for="no">No</label>
                        </div>
                    </div>
                    : item.dataForm.type === "text" ?
                        <div className={style.childDiv} style={{ marginLeft: `${item.level * 20}px` }}><p>{item.dataForm.question}</p>
                            <input
                                style={{ width: "170px", height: "25px", fontSize: "18px", paddingLeft: "8px" }}
                                type="text"
                                value={item.dataForm.answer || ''}
                                onChange={(event) => this.handleInput(event, item.dataForm, item.id)} />
                        </div>
                        : item.dataForm.type === "number" ?
                            <div className={style.childDiv} style={{ marginLeft: `${item.level * 20}px` }}>
                                <p>{item.dataForm.question}</p>
                                <input
                                    style={{ width: "170px", height: "25px", fontSize: "18px", paddingLeft: "8px" }}
                                    type="number"
                                    value={item.dataForm.answer || ''}
                                    onChange={(event) => this.handleInput(event, item.dataForm, item.id)} />
                            </div>
                        : null}
            </div>
        )
    }


    render() {
        const forms = this.props.forms;

        return (
            <div>
                {
                    forms != null ?
                        forms.map((item, id) => (
                            
                            item.level === 0 ? 
                                this.generateChildForm(item)
                            :forms[item.idParent].dataForm.type === "radio" | forms[item.idParent].dataForm.type === "text" ?
                                forms[item.idParent].dataForm.answer === item.dataForm.conditionAnswer & forms[item.idParent].isDisplayed ?
                                    this.generateChildForm(item)
                                :item.isDisplayed = false
                            :forms[item.idParent].dataForm.type === "number" ?
                                item.dataForm.condition === ">" ?
                                    forms[item.idParent].dataForm.answer > item.dataForm.conditionAnswer ?
                                        this.generateChildForm(item)
                                    :item.isDisplayed = false
                                :item.dataForm.condition === "<" ?
                                    forms[item.idParent].dataForm.answer < item.dataForm.conditionAnswer ?
                                        this.generateChildForm(item)
                                    :item.isDisplayed = false
                                :item.dataForm.condition === "===" ?
                                    forms[item.idParent].dataForm.answer === item.dataForm.conditionAnswer ?
                                        this.generateChildForm(item)
                                    :item.isDisplayed = false
                                :null
                            :null
                        )) : null
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps)(Preview)