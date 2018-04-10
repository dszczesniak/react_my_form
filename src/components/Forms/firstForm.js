import React, { Component } from 'react';
import style from './firstForm.css';
import { connect } from 'react-redux';
import { addChildComponent, deleteForm } from '../../actions';

class FirstForm extends Component {

    genChildForm = (props) =>{
        var oldProps = this.props.forms;
        this.props.dispatch(addChildComponent(oldProps, this.props));
    }

    deleteForm = (props) =>{
        this.props.dispatch(deleteForm(this.props));
        console.log(this.props)
    }

    render() {
        return (
            <div className={style.formDiv}>
                Question: <input type="text"></input><br />
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