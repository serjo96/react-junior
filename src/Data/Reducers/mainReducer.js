import { combineReducers } from 'redux';
import Products from './../Reducers/products-reducers';
import Customers from './../Reducers/customers-reducer';
import Invoices from './../Reducers/invoices-reducer';
import General from './../Reducers/general-reducer';


export default combineReducers({
    Products,
    Customers,
    General,
    Invoices
});
