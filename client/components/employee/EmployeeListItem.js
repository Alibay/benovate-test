import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { deleteEmployee } from '../../actions/employeeActions';

class EmployeesListItem extends Component {

    deleteEmployee() {
        if (confirm('Do you sure that you want to delete?'))
            this.props.deleteEmployee(this.props.employee.id)
    }

    render() {
        return (
            <tr>
                <td width={50}>{this.props.employee.id}</td>
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.department.name}</td>
                <td width={50}>
                    <Link to={{ pathname: "edit-employee", query: { employeeId: this.props.employee.id }}}>
                        <i className="fa fa-pencil"></i>
                    </Link>&nbsp;
                    <span><i className="fa fa-trash" onClick={::this.deleteEmployee}></i></span>
                </td>
            </tr>
        );
    }
}

export default connect(null, { deleteEmployee })(EmployeesListItem);
