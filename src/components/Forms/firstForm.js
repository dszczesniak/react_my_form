import React from 'react';
import style from './firstForm.css';

const FirstForm = (props) => {


    return (
        <div className={style.formDiv}>
            Question: <input type="text"></input><br/>
             <div>Type:
                        <select value='1'>
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div><br/>
            <button>Add Sub-Input</button>
            <button>Delete</button>
            <p>NR: {props.xx}</p>
        </div>
    );
};

export default FirstForm;