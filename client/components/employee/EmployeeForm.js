import React, { Component } from 'react';
import { addEmployee, loadEmployee, editEmployee } from '../../actions/employeeActions';
import { loadDepartments, loadDepartment } from '../../actions/departmentActions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Typeahead } from 'react-bootstrap-typeahead';
import validateForm from '../../validations/employee';
import isObject from 'lodash/isObject';
import classNames from 'classnames';

class EmployeeForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            isLoading: false,
            errors: {},
            department: ''
        };
    }

    componentWillMount(){
        this.props.loadDepartments();

        if (this.props.isEdit) {
            this.props.loadEmployee(this.props.employeeId)
                .then((res) => {
                    this.setState({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName
                    });
                    this.props.loadDepartment(res.data.departmentId)
                        .then((res) => {
                            if (isObject(res.data)) {
                                this.setState({
                                    department: res.data
                                })
                            }
                        });
                });
        }
    }

    isValid(){
        const { errors, isValid } = validateForm(this.state);

        if (!isValid){
            this.setState({ errors });
        }

        return isValid;

        return true;
    }

    onSubmit(e){
        e.preventDefault();
        if (this.isValid()){
            this.setState({ errors: [], isLoading: true });

            var model = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                departmentId: this.state.department.id,
            };

            var methodName = '';
            if (this.props.isEdit) {
                model.id = this.props.employeeId;
                methodName = 'editEmployee'
            } else {
                methodName= 'addEmployee'
            }

            this.props[methodName](model)
                .then(res => this.context.router.push('/employees'))
                .catch(err => {
                    this.setState({ errors: err.response.data.errors, isLoading: false });
                });
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeDepartment(department) {
        this.setState({
            department: department[0]
        });
    }

    cancel(e) {
        e.stopPropagation();
        e.preventDefault();
        browserHistory.push('/employees');
    }

    render() {

        return (
            <form role="form" onSubmit={::this.onSubmit}>
                <div className={classNames('form-group', { 'has-error': this.state.errors['firstName']})}>
                    <label>First Name</label>
                    <input className="form-control" name="firstName" placeholder="Please enter first name" value={this.state.firstName} onChange={::this.onChange}/>
                </div>
                <div className={classNames('form-group', { 'has-error': this.state.errors['lastName']})}>
                    <label>Last Name</label>
                    <input className="form-control" name="lastName" placeholder="Please enter last name" value={this.state.lastName} onChange={::this.onChange}/>
                </div>
                <div className={classNames('form-group', { 'has-error': this.state.errors['department']})}>
                    <label>Department</label>
                    <Typeahead options={this.props.departments}
                               placeholder="Please enter department name"
                               labelKey="name"
                               value={this.state.department}
                               onChange={::this.onChangeDepartment}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <button type="submit" className="btn btn-primary">{this.props.isEdit ? 'Edit' : 'Add'}</button>&nbsp;
                            <button className="btn btn-default" onClick={::this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

EmployeeForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect( state => {
    return {
        departments: state.departments
    }
}, { addEmployee, editEmployee, loadDepartments, loadEmployee, loadDepartment })(EmployeeForm);
