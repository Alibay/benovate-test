import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
    let errors = {};

    if (Validator.isEmpty(data.name)){
        errors.name = 'Please enter name';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
