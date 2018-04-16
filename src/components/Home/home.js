import React, { Component } from 'react';
import style from './home.css';
import FirstForm from '../Forms/firstForm';
import ChildForm from '../Forms/childForm';
import { connect } from 'react-redux';
import { addFirstComponent } from '../../actions';

class Home extends Component {

    addChild = () => {
        this.props.dispatch(addFirstComponent(this.props.forms));
    }

    renderChilds = (childs) => {
        const forms = this.props.forms;
        return (
            childs?
                childs.map((child, id) => (
                    <div key={id}>
                        {forms[child] ?
                            <div style={{marginLeft:"15px"}}>
                                <ChildForm
                                    key={id}
                                    id={forms[child].id}
                                    idParent={forms[child].idParent}
                                    level={forms[child].level}
                                    allForms={forms}
                                    childs={forms[child].childs}
                                    history={forms[child].history} />

                                    {forms[child].childs.length > 0 ?
                                        this.renderChilds(forms[child].childs) 
                                    :null}
                            </div>
                        :null}
                    </div>
                ))
          :null
        )}

    render() {
        const forms = this.props.forms;
        return (
            <div>
                {
                    forms != null ?
                        forms.map((item, id) => (
                            item.level === 0 ?
                                <div key={id}>
                                    <FirstForm
                                        key={id}
                                        id={item.id}
                                        idParent={item.idParent}
                                        level={item.level}
                                        allForms={forms}
                                        childs={item.childs}
                                        history={item.history}
                                        dataform={item.dataForm} />

                                    {this.renderChilds(item.childs)}
                                </div>
                            : null
                        ))
                    : null
                }
                <button className={style.button} onClick={this.addChild}>Add Input</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps)(Home)