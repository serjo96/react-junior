import { TAKE_CUSTOMERS_LIST, ADD_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER } from './../constants/';


export function onResponseCustomersList(List) {
    return {
        type: TAKE_CUSTOMERS_LIST,
        List
    };
}

export function onAddCustomer(data) {
    return {
        type: ADD_CUSTOMER,
        data
    };
}

export function onEditedCustomer(data) {
    return {
        type: EDIT_CUSTOMER,
        data
    };
}


export function onDeleteCustomer(data) {
    return {
        type: DELETE_CUSTOMER,
        data
    };
}

