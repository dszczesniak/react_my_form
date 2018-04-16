import React, { Component } from 'react';
import style from './export.css';
import { connect } from 'react-redux';


class Export extends Component {

    convertJSON = () => {
        var obj =  this.props.forms;
        var myJSON = JSON.stringify(obj);

        return (
            <span>{myJSON}</span>
        )
    }

    render() {
        var allForms = this.props.forms; 
        return (
            <div className={style.exportedData}>
                {this.convertJSON()}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        forms: state.forms
    }
}

export default connect(mapStateToProps)(Export)