import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { deleteDepartment } from '../../actions/departmentActions';

class DepartmentListItem extends Component {

    deleteDepartment(){
        if (confirm('Do you sure that you want to delete?'))
            this.props.deleteDepartment(this.props.department.id);
    }

    render() {

        const { props: { department } } = this;

        return (
            <tr>
                <td width={50}>{department.id}</td>
                <td>
                    <Link to={{ pathname: "view-department", query: { departmentId: department.id }}}>
                        {department.name}
                    </Link>
                </td>
                <td width={70} className="options">
                    <Link to={{ pathname: "edit-department", query: { departmentId: department.id }}}><i className="fa fa-pencil"></i></Link>&nbsp;
                    <span><i className="fa fa-trash" onClick={::this.deleteDepartment}></i></span>
                </td>
            </tr>
        );
    }
}

export default connect(null, { deleteDepartment })
(DepartmentListItem);
