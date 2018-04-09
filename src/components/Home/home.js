import React, { Component } from 'react';
import style from './home.css';
import FirstForm from '../Forms/firstForm';
import { connect } from 'react-redux';
import { setCleanState, addFirstComponent } from '../../actions';

class Home extends Component {

    componentWillMount() {
        this.props.dispatch(setCleanState());
    }

    addChild = () => {
        var actualProp = this.props.forms;
        this.props.dispatch(addFirstComponent(actualProp));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>App main components ! </h1>
                {
                    this.props.forms != null ?
                        this.props.forms.map((item, id) => (
                            <FirstForm key={id} xx={id} />
                        )) : null
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