import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';

export default class EmployeeEditPage extends Component {

    render() {
        return (
            <div>
                <EmployeeForm isEdit={true} employeeId={this.props.location.query.employeeId}/>
            </div>
        );
    }
}