import * as axios from 'axios/index';
import { onResponseInvoicesList, totalCalculation, onAddInvoice, onDeleteInvoice, onResponseEiditPageLists, onAddProductInvoice, onChangeQuantity } from "./../actions/invoices-actions";
import { onResponseSuccessRequest } from "./../actions/general-actions";
import {onResponseErrorRequest} from "../actions/general-actions";


export function onLoadInvoicesEditPage(id) {
    return ( dispatch ) => {
        axios.all([
            axios.get(`/api/invoices/${id}/items`),
            axios.get('/api/customers'),
            axios.get('/api/products')
            ])
            .then(axios.spread((invoices, customers, products) => {
                dispatch(onResponseEiditPageLists({
                        data: {
                            invoicesList: invoices.data,
                            customersList: customers.data,
                            productsList: products.data
                        }
                    }));
                dispatch(totalCalculation());
            }))
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}


export function onLoadInvoices() {
    return ( dispatch ) => {
        axios.all([
            axios.get('/api/invoices'),
            axios.get('/api/customers')
            ])
            .then(axios.spread((invoices, customers) => {
                dispatch(onResponseInvoicesList({
                    Lists: {
                        invoicesList: invoices.data,
                        customersList: customers.data,
                    }
                }));
            }))
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function AddInvoice(data) {
    return ( dispatch ) => {
        axios.post('/api/invoices', data)
            .then(response => {
                dispatch(onAddInvoice({data: response.data, status: response.status }));
                dispatch(onLoadInvoices());
                dispatch(onResponseSuccessRequest('Invoices success added'));
            })
            .catch(error => {
                console.error(error);
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function AddProductInvoice(id , product, invoice_id) {
    return ( dispatch ) => {
        axios.post(`/api/invoices/${id}/items`,
            {
                product_id: product.value,
                quantity: 1
            })
            .then(() => {
                dispatch(onAddProductInvoice(product));
                dispatch(onLoadInvoicesEditPage(invoice_id));
                dispatch(onResponseSuccessRequest('Product success added'));
            })
            .catch(error => {
                console.error(error);
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function SaveInvoiceData(data) {
    return ( dispatch ) => {
        axios.put(`/api/invoices/${data.id}`, data)
            .then(() => {
                dispatch(onLoadInvoices());
                dispatch(onResponseSuccessRequest('Invoice data success saved'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function DeleteInvoice(id) {
    return ( dispatch ) => {
        axios.delete(`/api/invoices/${id}`)
            .then(response => {
                dispatch(onDeleteInvoice({data: response.data, status: response.status }));
                dispatch(onLoadInvoices());
                dispatch(onResponseSuccessRequest('Invoice success deleted'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}

export function DeleteProductFromInvoice(id, invoice_id) {
    return ( dispatch ) => {
        axios.delete(`/api/invoices/${invoice_id}/items/${id}`)
            .then(() => {
                dispatch(onLoadInvoicesEditPage(invoice_id));
                dispatch(onResponseSuccessRequest('Product was success deleted from invoice list'));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}


export function ChangeProductQuantity(data, invoice_id) {
    return ( dispatch ) => {
        axios.put(`/api/invoices/${invoice_id}/items/${data.id}`, data)
            .then(response => {
                dispatch(onChangeQuantity({data: response.data, status: response.status }));
                dispatch(onLoadInvoicesEditPage(invoice_id));
            })
            .catch(error => {
                dispatch(onResponseErrorRequest(error));
            });
    };
}
