import { TAKE_INVOICES_LIST, ADD_INVOICE, CALCULATION_TOTAL, DELETE_INVOICE, TAKE_ALL_LISTS, ADD_PRODUCT_IN_INVOICE, CHANGE_PRODUCT_QUANTITY } from './../constants/';
import {CHANGE_DISCOUNT_COUNT} from "../constants";


export function onResponseEiditPageLists(List) {
    return {
        type: TAKE_ALL_LISTS,
        List
    };
}

export function onResponseInvoicesList(Data) {
    return {
        type: TAKE_INVOICES_LIST,
        Data
    };
}

export function onAddInvoice(data) {
    return {
        type: ADD_INVOICE,
        data
    };
}

export function onAddProductInvoice(data) {
    return {
        type: ADD_PRODUCT_IN_INVOICE,
        data
    };
}



export function onDeleteInvoice(data) {
    return {
        type: DELETE_INVOICE,
        data
    };
}

export function totalCalculation() {
    return {
        type: CALCULATION_TOTAL
    };
}


export function onChangeQuantity(price) {
    return {
        type: CHANGE_PRODUCT_QUANTITY,
        price
    };
}


export function onChangeDiscount(count) {
    return {
        type: CHANGE_DISCOUNT_COUNT,
        count
    };
}

