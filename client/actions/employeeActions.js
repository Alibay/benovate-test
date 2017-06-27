import axios from 'axios';
import { EMPLOYEES_LOADED, EMPLOYEE_ADDED, EMPLOYEE_DELETED } from './types';

export function loadEmployeesByDepartment( departmentId ) {
    return dispatch => {
        return axios.get(`/api/department/${departmentId}/employees`)
            .then(res => {
                dispatch({
                    type: EMPLOYEES_LOADED,
                    data: res.data
                });
            });
    }
}

export function loadEmployees( ) {
    return dispatch => {
        return axios.get('/api/employees')
            .then(res => {
                dispatch({
                    type: EMPLOYEES_LOADED,
                    data: res.data
                });
            });
    }
}

export function addEmployee (data) {
    return dispatch => {
        return axios.post('/api/employees', data)
            .then(res => {
                dispatch({
                    type: EMPLOYEE_ADDED,
                    data: res.data
                });
            });
    }
}

export function deleteEmployee (id) {
    return dispatch => {
        return axios.delete(`/api/employees/${id}`)
            .then(res => {
                dispatch({
                    type: EMPLOYEE_DELETED,
                    id
                });
            });
    }
}

export function loadEmployee( id ) {
    return () => {
        return axios.get(`/api/employees/${id}`);
    }
}

export function editEmployee (data) {
    return () => {
        return axios.put(`/api/employees/${data.id}`, data);
    }
}