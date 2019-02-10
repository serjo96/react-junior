import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import CustomersList from "../Templates/Customers/Containers/CustomersList";
import ProductsList from "../Templates/Products/Containers/ProductsList";
import InvoicesList from "../Templates/Invoices/InvoicesList/Containers/InvoicesList";
import InvoicesItems from "../Templates/Invoices/InvoicesProductList/Container/InvoicesItems";




class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/customers" component={CustomersList} />
                <Route exact path="/products" component={ProductsList} />
                <Route exact path="/invoices" component={InvoicesList} />
                <Route exact path="/invoices/:id/edit" component={InvoicesItems} />

            </Switch>
        )
    }
}

export default Routes;
