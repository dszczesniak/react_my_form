import React, { Component } from 'react';
import style from './home.css';
import FirstForm from '../Forms/firstForm';
import ChildForm from '../Forms/childForm';
import { connect } from 'react-redux';
import { addFirstComponent, sortFormsForDisplay } from '../../actions';

class Home extends Component {
    

    state = {
        array: []
      }

    pushUsedToTable = (item) => {
        this.setState( (state) => {
            state.array = state.array.concat([item]);
        });
    }

    addChild = () => {
        var actualProp = this.props.forms;
        this.props.dispatch(addFirstComponent(actualProp));
    }

    componentWillMount(){
        this.props.dispatch(sortFormsForDisplay(this.props.forms));
    }

    heyhey = () => {
        this.props.dispatch(sortFormsForDisplay(this.props.forms));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>App main components ! </h1>
                {
                    this.props.forms != null ? 

                        this.props.forms.map((item, id) => (
                            item.level === 0 ?
                            <FirstForm
                            key={id} 
                            id={item.id} 
                            idParent={item.idParent}
                            level={item.level}
                            allForms={this.props.forms}
                            tree={item.tree}
                            dataform={item.dataForm}
                            />
                            :
                            <ChildForm
                            key={id}
                            id={item.id}
                            idParent={item.idParent}
                            level={item.level}
                            allForms={this.props.forms}
                            tree={item.tree}
                            />

                        )): null
                }
                <button className={style.button} onClick={this.addChild}>Add Input</button>
                <button className={style.button} onClick={this.heyhey}>refresh</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        forms: state.forms,
        sortForms: state.sortForms
    }
}

export default connect(mapStateToProps)(Home)