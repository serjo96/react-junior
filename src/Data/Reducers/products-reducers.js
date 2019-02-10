import { TAKE_PRODUCTS_LIST, ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from './../constants/';

import update from 'react-addons-update';



const initialState = {
    productsList: {
        isFetching: false,
        list: [],
    },
    productsStatus: false
};

export default function Products(state = initialState, action) {
    switch (action.type) {
        case TAKE_PRODUCTS_LIST:
            return update(state, {
                productsList: {$merge: {
                        isFetching: true,
                        list: action.List.data
                    }}
            });

        case ADD_PRODUCT:
            return state;

        case EDIT_PRODUCT:
            return state;


        case DELETE_PRODUCT:
            return state;


        default:
            return state;
    }
}

