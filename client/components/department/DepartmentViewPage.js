import React, {Component} from "react";
import { loadDepartment } from "../../actions/departmentActions";
import {connect} from 'react-redux';

class DepartmentViewPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    componentWillMount() {
        this.props.loadDepartment(this.props.location.query.departmentId)
            .then((res) => {
                this.setState({
                    name: res.data.name
                });
                // console.log('view', res);
            });
    }

    render() {
        return (
            <div>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default connect(null, { loadDepartment })
(DepartmentViewPage);
