import React, { Component } from 'react';
import style from './firstForm.css';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm, addDataToForm, addChildToTree } from '../../actions';

class FirstForm extends Component {

    state = {
        data:{
            question: `${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.question : ""}`,
            type:`${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.type : 'radio'}`,
            answer:`${this.props.forms[this.props.id] ? this.props.forms[this.props.id].dataForm.answer : ''}`
        }
    }

    handleInput = (event, name) => {
        const newData = {
            ...this.state.data
        }
        newData[name] = event.target.value;

        this.setState({
            data:newData
        })
        this.props.dispatch(addDataToForm(newData, this.props.id))
    }


    genChildForm = () =>{
        this.props.dispatch(addChildComponent(this.props, this.state.data.type));
        this.props.dispatch(addChildToTree(this.props));
    }

    deleteForm = () => {
        this.props.dispatch(deleteForm(this.props));
    }

    render() {
        return (
            <div className={style.formDiv}>

                Question
                <input 
                    type="text"
                    value={ this.state.data.question }
                    onChange={(event)=>this.handleInput(event, 'question')}
                /><br/>
                <div>Type:
                    <select 
                    value={this.state.data.type}
                    onChange={(event)=>this.handleInput(event, 'type')}>
                        <option value="radio">Yes/No</option>
                        <option value="number">Number</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                <br />
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

export default connect(mapStateToProps)(FirstForm);