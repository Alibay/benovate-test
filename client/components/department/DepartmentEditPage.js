import React, { Component } from 'react';
import DepartmentForm from './DepartmentForm';

export default class DepartmentEditPage extends Component {

    render() {
        return (
            <div>
                <DepartmentForm departmentId={this.props.location.query.departmentId} isEdit={true}/>
            </div>
        );
    }
}