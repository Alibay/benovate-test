import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DepartmentListItem from './DepartmentListItem';
import { loadDepartments } from '../../actions/departmentActions';
import { Link } from 'react-router';


class DepartmentList extends Component {

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillMount(){
        this.props.loadDepartments();
    }

    getContext() {
        let context;
        const props = this.props;
        const { departments } = props;
        if (departments.length) {
            context = (
                <table className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline">
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.departments.map((department, i) => <DepartmentListItem department={department} key={i} />)}
                    </tbody>
                </table>
            );
        } else {
            context = <h3>No departments</h3>
        }

        return context;
    }

    render() {
        return (
            <div>
                <h1>Department List
                    <Link to="/add-department" className="btn btn-primary btn-outline pull-right" >
                        <i className="fa fa-plus"></i> Add department
                    </Link>
                </h1>
                {this.getContext()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
          departments: state.departments
        };
    },
    { loadDepartments }
)(DepartmentList);
