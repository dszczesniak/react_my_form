import React, { Component } from 'react';
import style from './forms.css';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm, addDataToForm } from '../../actions';

class FirstForm extends Component {

    state = {
        data:{
            question: '',
            type:''
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

        // this.props.dispatch(addDataToForm({
        //     ...this.state.data
        // }))
    }

    
      
       
    


    genChildForm = () =>{
        var oldProps = this.props.forms;
        this.props.dispatch(addChildComponent(oldProps, this.props));
    }

    deleteForm = () =>{
        this.props.dispatch(deleteForm(this.props));
        console.log(this.props)
    }

    render() {
        console.log(this.props)
        return (
            <div className={style.formDiv}>
                Question: <input 
                            type="text"
                            value={this.state.data.question}
                            onChange={(event)=>this.handleInput(event, 'question')}
                            /><br/>
                <div>Type:
                    <select value='radio'>
                        <option val="radio">Yes/No</option>
                        <option val="number">Number</option>
                        <option val="text">Text</option>
                    </select>
                </div><br />
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