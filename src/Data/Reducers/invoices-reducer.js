import { TAKE_INVOICES_LIST, ADD_INVOICE, CALCULATION_TOTAL, DELETE_INVOICE, ADD_PRODUCT_IN_INVOICE, TAKE_ALL_LISTS, CHANGE_PRODUCT_QUANTITY, CHANGE_DISCOUNT_COUNT } from './../constants/';
import { correctPrice, filterArr, filterProductsArr } from "./../../Utilits/Utilits";
import update from 'react-addons-update';


const initialState = {
    invoicesList: {
        isFetching: false,
        list: []
    },
    invoiceProductList: {
        isFetching: false,
        list: []
    },
    invoicesItems: {
        productsOptions: [],
        customersOptions: [],
        totalPrice: 0,
        discount: 0,
    }
};

export default function Invoices(state = initialState, action) {
    switch (action.type) {
        case TAKE_INVOICES_LIST:
            let filteredInvoices = filterArr(
                action.Data.Lists.customersList,
                action.Data.Lists.invoicesList,
                );
            return update(state, {
                invoicesList: {$merge: {
                        isFetching: true,
                        list: filteredInvoices
                    }}
            });

        case TAKE_ALL_LISTS:
            let customersOptions = [];
            let productsOptions = [];
            action.List.data.customersList.forEach(el=> customersOptions.push({
                value: el.id,
                label: el.name
            }));

            action.List.data.productsList.forEach(el=> productsOptions.push({
                value: el.id,
                label: el.name
            }));


            let invoicesProducts = filterProductsArr(
                action.List.data.productsList,
                action.List.data.invoicesList,
            );


            return update(state, {
                invoiceProductList: {$merge: {
                        isFetching: true,
                        list: invoicesProducts,
                    }
                },
                invoicesItems: {$merge: {
                        ...state.invoicesItems,
                        customersOptions: customersOptions,
                        productsOptions: productsOptions,

                    }}
            });

        case ADD_INVOICE:
            return state;

        case ADD_PRODUCT_IN_INVOICE:
            let product = state.invoiceProductList.list.filter(e=> e.id === action.data.value).pop();
            let newArr = update(state.invoicesList.list,
                {$push: [product]}
            );
            return update(state, {
                invoicesList: {$merge: {
                        isFetching: true,
                        list: newArr,
                    }}
            });

        case CALCULATION_TOTAL:
            let total = 0;
            state.invoiceProductList.list.forEach(el=> total += correctPrice(el.price) * el.quantity);
            return update(state, {
                invoicesItems: {$merge: {
                        ...state.invoicesItems,
                        total: correctPrice(total - (total * state.invoicesItems.discount / 100))
                    }}
            });

         case CHANGE_PRODUCT_QUANTITY:
             return state;

         case CHANGE_DISCOUNT_COUNT:
             return update(state, {
                 invoicesItems: {$merge: {
                         ...state.invoicesItems,
                         discount: action.count
                     }}
             });

        case DELETE_INVOICE:
            return state;



        default:
            return state;
    }
}

