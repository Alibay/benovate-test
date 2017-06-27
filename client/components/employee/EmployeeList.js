import React, {Component} from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";
import EmployeeListItem from './EmployeeListItem';
import { loadEmployees } from '../../actions/employeeActions';
import {Link} from "react-router";

class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount(){
        this.props.loadEmployees();
    }

    render() {
        let context = "No Employees";
        if (this.props.employees.length > 0) {
            context = (
                <table className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline">
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.employees.map((employee, i) => <EmployeeListItem employee={employee} key={i} />)}
                    </tbody>
                </table>
            );
        }

        return (
            <div>
                <h1>Employee List
                    <Link to="/add-employee" className="btn btn-primary btn-outline pull-right" >
                        <i className="fa fa-plus"></i> Add employee
                    </Link>
                </h1>
                {context}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            employees: state.employees
        };
    },
    { loadEmployees }
)(EmployeeList);
