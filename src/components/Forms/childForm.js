import style from './forms.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm, addDataToForm } from '../../actions';

class ChildForm extends Component {

    state = {
        data: {
            question: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.question : ""}`,
            type: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.type : 'radio'}`,
            condition: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.condition : "==="}`,
            answer: `${this.props.forms[this.props.id]
                ?
                this.props.forms[this.props.idParent].dataForm.type === 'radio'
                    ?
                    this.props.forms[this.props.id].dataForm.answer || 'Yes'
                    :
                    this.props.forms[this.props.id].dataForm.answer || ''
                : ''}`
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

    genChildForm = (props) => {
        var oldProps = this.props.forms;
        this.props.dispatch(addChildComponent(oldProps, this.props));
    }

    deleteForm = (props) => {
        this.props.dispatch(deleteForm(this.props));
        console.log(this.props)
    }

    render() {
        return (
            <div className={style.formDiv}>
                <div>Condition:
                    <select
                        value={this.state.data.condition}
                        onChange={(event) => this.handleInput(event, 'condition')}>
                        <option value="===">Equals</option>
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                    </select>

                    {
                        this.props.forms[this.props.idParent].dataForm.type === 'number' ?
                            <input
                                type="number"
                                value={this.state.data.answer}
                                onChange={(event) => this.handleInput(event, 'answer')} />

                            : this.props.forms[this.props.idParent].dataForm.type === 'text' ?

                                <input
                                    type="text"
                                    value={this.state.data.answer}
                                    onChange={(event) => this.handleInput(event, 'answer')} />

                                : //By default
                                <select
                                    value={this.state.data.answer}
                                    onChange={(event) => this.handleInput(event, 'answer')}>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                    }

                </div>


                Question:
                <input
                    type="text"
                    value={this.state.data.question}
                    onChange={(event) => this.handleInput(event, 'question')}
                ></input>
                <br />
                <div>Type:
                    <select
                        value={this.state.data.type}
                        onChange={(event) => this.handleInput(event, 'type')}>
                        <option value="radio">Yes/No</option>
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                    </select>
                </div><br />
                <button onClick={() => this.genChildForm()}>Add Sub-Input</button>
                <button onClick={() => this.deleteForm()}>Delete</button>
                <p>ID: {this.props.id}</p>

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