import * as axios from 'axios';
import { onResponseCustomersList, onAddCustomer, onEditedCustomer, onDeleteCustomer } from "./../actions/customers-actions";
import {onResponseErrorRequest, onResponseSuccessRequest} from "../actions/general-actions";



export function onLoadCustomers() {
    return ( dispatch ) => {
        axios.get('/api/customers')
            .then(response => {
                dispatch(onResponseCustomersList({data: response.data, status: response.status }));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function AddCustomers(data) {
    return ( dispatch ) => {
        axios.post('/api/customers', data)
            .then(response => {
                dispatch(onAddCustomer({data: response.data, status: response.status }));
                dispatch(onLoadCustomers());
                dispatch(onResponseSuccessRequest('Customer success added'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function EditCustomers(data) {
    return ( dispatch ) => {
        axios.put(`/api/customers/${data.id}`, data)
            .then(response => {
                dispatch(onEditedCustomer({data: response.data, status: response.status }));
                dispatch(onLoadCustomers());
                dispatch(onResponseSuccessRequest('Customer success edited'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function DeleteCustomer(id) {
    return ( dispatch ) => {
        axios.delete(`/api/customers/${id}`)
            .then(response => {
                dispatch(onDeleteCustomer({data: response.data, status: response.status }));
                dispatch(onLoadCustomers());
                dispatch(onResponseSuccessRequest('Customer success deleted'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}
