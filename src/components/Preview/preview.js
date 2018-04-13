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

        this.props.dispatch(addDataToForm(newData, id))
    }


    render() {
        return (
            <div>
                <h1>Preview of the forms ! </h1>

                {
                    this.props.forms != null ?
                        this.props.forms.map((item, id) => (
                            item.level === 0 ?
                                <div className={style.baseDiv}>
                                    <p>{item.dataForm.question}</p>
                                    {
                                        item.dataForm.type === 'number' ?
                                            <input
                                                type="number"
                                                value={item.dataForm.answer || ''}
                                                onChange={(event) => this.handleInput(event, item.dataForm, item.id)} />

                                            : item.dataForm.type === 'text' ?
                                                <input
                                                    type="text"
                                                    value={item.dataForm.answer || ''}
                                                    onChange={(event) => this.handleInput(event, item.dataForm, item.id)} />

                                            : item.dataForm.type === 'radio' ?
                                                <div onChange={(event) => this.handleInput(event, item.dataForm, item.id)}>
                                                    <input type="radio" value="yes" name="choose" /> Yes
                                                <input type="radio" value="no" name="choose" /> No
                                            </div>
                                            : null
                                    }
                                </div>
                                : item.dataForm.condition === '===' ?
                                    this.props.forms[item.idParent].dataForm.answer === item.dataForm.answer ? <div>Udalo sie</div> : null : null
                                        
                                       

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