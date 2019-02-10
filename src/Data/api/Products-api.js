import * as axios from 'axios';
import { onResponseProductList } from "./../actions/products-actions";

import { onAddedProuct, onEditedProducts, onDeleteProducts } from "../actions/products-actions";
import {onResponseErrorRequest, onResponseSuccessRequest} from "../actions/general-actions";



export function onLoadProducts() {
    return ( dispatch ) => {
        axios.get('/api/products')
            .then(response => {
                dispatch(onResponseProductList({data: response.data, status: response.status }));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function AddProduct(data) {
    return ( dispatch ) => {
        axios.post('/api/products', data)
            .then(response => {
                dispatch(onAddedProuct({data: response.data, status: response.status }));
                dispatch(onLoadProducts());
                dispatch(onResponseSuccessRequest('Product success added'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function EditProduct(data) {
    return ( dispatch ) => {
        axios.put(`/api/products/${data.id}`, data)
            .then(response => {
                dispatch(onEditedProducts({data: response.data, status: response.status }));
                dispatch(onLoadProducts());
                dispatch(onResponseSuccessRequest('Product success edited'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function DeleteProducts(id) {
    return ( dispatch ) => {
        axios.delete(`/api/products/${id}`)
            .then(response => {
                dispatch(onDeleteProducts({data: response.data, status: response.status }));
                dispatch(onLoadProducts());
                dispatch(onResponseSuccessRequest('Customer success deleted'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}
