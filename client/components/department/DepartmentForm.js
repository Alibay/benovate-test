import React, { Component } from 'react';
import { addDepartment, editDepartment, loadDepartment } from '../../actions/departmentActions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import validateForm from '../../validations/department';
import classNames from 'classnames';

class DepartmentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            isLoading: false,
            errors: {}
        };
    }

    componentWillMount() {
        if (this.props.isEdit) {
            this.props.loadDepartment(this.props.departmentId)
                .then(res => {
                    this.setState({
                        name: res.data.name
                    })
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

            if (this.props.isEdit) {
                var model = {
                    id: this.props.departmentId,
                    name: this.state.name
                };

                this.props.editDepartment(model)
                    .then(res => this.context.router.push('/'))
                    .catch(err => {
                        this.setState({ errors: err.response.data.errors, isLoading: false });
                    });
            } else {
                this.props.addDepartment(this.state.name)
                    .then(res => this.context.router.push('/'))
                    .catch(err => {
                        this.setState({ errors: err.response.data.errors, isLoading: false });
                    });
            }

        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    cancel(e) {
        e.stopPropagation();
        e.preventDefault();
        browserHistory.push('/');
    }

    render() {
        return (
            <form role="form" onSubmit={::this.onSubmit}>
                <div className={classNames('form-group', { 'has-error': this.state.errors['name']})}>
                    <label>Name</label>
                    <input className="form-control" name="name" required placeholder="Please enter name" value={this.state.name} onChange={::this.onChange}/>
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

DepartmentForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect( null, { addDepartment, editDepartment, loadDepartment })(DepartmentForm);
