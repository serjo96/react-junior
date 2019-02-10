import { TAKE_PRODUCTS_LIST, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from './../constants/';


export function onResponseProductList(List) {
    return {
        type: TAKE_PRODUCTS_LIST,
        List
    };
}

export function onAddedProuct(data) {
    return {
        type: ADD_PRODUCT,
        data
    };
}

export function onEditedProducts(data) {
    return {
        type: EDIT_PRODUCT,
        data
    };
}


export function onDeleteProducts(data) {
    return {
        type: DELETE_PRODUCT,
        data
    };
}
