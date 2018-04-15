import style from './childForm.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm, addDataToForm, addChildToTree } from '../../actions';

class ChildForm extends Component {

    state = {
        data: {
            question: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.question : ""}`,
            type: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.type : 'radio'}`,
            condition: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.condition : "==="}`,

            answer: '',
            conditionAnswer: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.conditionAnswer :
                this.props.forms[this.props.idParent].dataForm.type === 'radio' ? 'yes' :
                    this.props.forms[this.props.idParent].dataForm.type === 'text' ? '' : ''
                }`
        }
    }



    handleInput = (event, name) => {
        const newData = {
            ...this.state.data
        }
        newData[name] = event.target.value;

        this.setState({
            data: newData
        })
        this.props.dispatch(addDataToForm(newData, this.props.id))
    }

    genChildForm = () =>{
        var oldProps = this.props.forms;
        this.props.dispatch(addChildComponent(oldProps, this.props, this.state.data.type));
        this.props.dispatch(addChildToTree(this.props));
    }

    deleteForm = (props) => {
        this.props.dispatch(deleteForm(this.props));
    }

    render() {
        return (
            <div className={style.formDiv2}>
                <div>
                    {
                        this.props.forms[this.props.idParent] ? this.props.forms[this.props.idParent].dataForm.type === 'number' ?
                            <div>Condition
                                <select 
                                    style={{width: "50%", height:"35px"}}
                                    value={this.state.data.condition}
                                    onChange={(event) => this.handleInput(event, 'condition')}>
                                    <option value="===">Equals</option>
                                    <option value=">">Greater than</option>
                                    <option value="<">Less than</option>
                                </select>
                                <input
                                    style={{width: "32%", height:"35px"}}
                                    type="number"
                                    value={this.state.data.conditionAnswer}
                                    onChange={(event) => this.handleInput(event, 'conditionAnswer')}
                                />
                            </div>

                        : this.props.forms[this.props.idParent].dataForm.type === 'text' ?

                                <div>Condition
                                    <select
                                        style={{width: "50%", height:"35px"}}
                                        value={this.state.data.condition}
                                        onChange={(event) => this.handleInput(event, 'condition')}>
                                        <option value="===">Equals</option>
                                    </select>
                                    <input
                                        style={{width: "32%", height:"35px"}}
                                        type="text"
                                        value={this.state.data.conditionAnswer}
                                        onChange={(event) => this.handleInput(event, 'conditionAnswer')}
                                    />
                                </div>

                        : //By default
                                <div>Condition
                                    <select
                                    style={{width: "50%", height:"35px"}}
                                        value={this.state.data.condition}
                                        onChange={(event) => this.handleInput(event, 'condition')}>
                                        <option value="===">Equals</option>
                                    </select>
                                    <select
                                        style={{width: "31%", height:"35px"}}
                                        value={this.state.data.conditionAnswer}
                                        onChange={(event) => this.handleInput(event, 'conditionAnswer')}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            : null
                    }

                </div>


                Question:
                <input
                    style={{width:"84%", marginLeft:"11px", height:"35px"}}
                    type="text"
                    value={this.state.data.question}
                    onChange={(event) => this.handleInput(event, 'question')}
                ></input>
                <br />
                <div>Type:
                    <select
                        style={{width:"84%", marginLeft:"40px", height:"35px"}}
                        value={this.state.data.type}
                        onChange={(event) => this.handleInput(event, 'type')}>
                        <option value="radio">Yes/No</option>
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                    </select>
                </div><br />
                <div className={style.buttons}>
                    <button onClick={()=> this.genChildForm()}>Add Sub-Input</button>
                    <div className={style.divider}></div>
                    <button onClick={()=> this.deleteForm()}>Delete</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps)(ChildForm);