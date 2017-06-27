import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';

import DepartmentList from './components/department/DepartmentList';
import DepartmentAddPage from './components/department/DepartmentForm';
import DepartmentEditPage from './components/department/DepartmentEditPage';
import DepartmentViewPage from './components/department/DepartmentViewPage';

import EmployeeList from './components/employee/EmployeeList';
import EmployeeAddPage from './components/employee/EmployeeAddPage';
import EmployeeEditPage from './components/employee/EmployeeEditPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={DepartmentList} />
      <Route path="/add-department" component={DepartmentAddPage} />
      <Route name="view-department" path="/view-department" component={DepartmentViewPage} />
      <Route name="edit-department" path="/edit-department" component={DepartmentEditPage} />

      <Route path="/employees" component={EmployeeList} />
      <Route path="/add-employee" component={EmployeeAddPage} />
      <Route name="edit-employee" path="/edit-employee" component={EmployeeEditPage} />
  </Route>
)
