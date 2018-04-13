import React, { Component } from 'react';
import style from './forms.css';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm, addDataToForm } from '../../actions';

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
        var oldProps = this.props.forms;
        this.props.dispatch(addChildComponent(oldProps, this.props, this.state.data.type));
    }

    deleteForm = () =>{
        this.props.dispatch(deleteForm(this.props));
    }

    render() {
        return (
            <div className={style.formDiv}>
                Question: 
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
                <button onClick={()=> this.genChildForm()}>Add Sub-Input</button>
                <button onClick={()=> this.deleteForm()}>Delete</button>
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

export default connect(mapStateToProps)(FirstForm);