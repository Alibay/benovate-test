import axios from 'axios';
import { DEPARTMENTS_LOADED, DEPARTMENT_DELETED } from './types';

export function loadDepartments( data ) {
    return dispatch => {
        return axios.get('/api/departments', data)
            .then(res => {
                dispatch({
                    type: DEPARTMENTS_LOADED,
                    data: res.data
                });
            });
    }
}

export function addDepartment (name) {
    return () => {
        return axios.post('/api/departments', { name });
    }
}

export function deleteDepartment (id) {
    return dispatch => {
        return axios.delete(`/api/departments/${id}`)
            .then(res => {
                dispatch({
                    type: DEPARTMENT_DELETED,
                    id
                });
            });
    }
}

export function editDepartment( data ) {
    return () => {
        return axios.put(`/api/departments/${data.id}`, data);
    }
}

export function loadDepartment( id ) {
    return () => {
        return axios.get(`/api/departments/${id}`);
    }
}
