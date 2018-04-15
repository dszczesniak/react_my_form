import React, { Component } from 'react';
import style from './home.css';
import FirstForm from '../Forms/firstForm';
import ChildForm from '../Forms/childForm';
import { connect } from 'react-redux';
import { addFirstComponent } from '../../actions';

class Home extends Component {

    addChild = () => {
        var actualProp = this.props.forms;
        this.props.dispatch(addFirstComponent(actualProp));
    }

    renderChilds = (childs) => {
        return (
          childs.map((child, id) => (
            <div key={id}>
                {this.props.forms[child] ?
                    <div>
                        <ChildForm
                            key={id}
                            id={this.props.forms[child].id}
                            idParent={this.props.forms[child].idParent}
                            level={this.props.forms[child].level}
                            allForms={this.props.forms}
                            childs={this.props.forms[child].childs}
                            history={this.props.forms[child].history} />

                            {this.props.forms[child].childs.length > 0 ?
                                this.renderChilds(this.props.forms[child].childs) 
                            :null}
                    </div>
                :null
               }
            </div>
          ))
        )}

    render() {
        console.log(this.props);
        return (
            <div>
                {
                    this.props.forms != null ?
                        this.props.forms.map((item, id) => (
                            item.level === 0 ?
                                <div key={id}>
                                    <FirstForm
                                        key={id}
                                        id={item.id}
                                        idParent={item.idParent}
                                        level={item.level}
                                        allForms={this.props.forms}
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