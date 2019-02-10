import { TAKE_CUSTOMERS_LIST, ADD_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER } from './../constants';

import update from 'react-addons-update';


const initialState = {
    customersList: {
        isFetching: false,
        list: []
    },
    customerStatus: false
};

export default function Customers(state = initialState, action) {
    switch (action.type) {
        case TAKE_CUSTOMERS_LIST:
            return update(state, {
                customersList: {$merge: {
                        isFetching: true,
                        list: action.List.data
                    }}
                });

        case ADD_CUSTOMER:
             return {...state, customerStatus: true};

        case EDIT_CUSTOMER:
             return state;


        case DELETE_CUSTOMER:
            return state;



        default:
            return state;
    }
}

