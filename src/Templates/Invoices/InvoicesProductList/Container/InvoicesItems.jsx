import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

import {
    DeleteProductFromInvoice,
    SaveInvoiceData,
    onLoadInvoicesEditPage,
    AddProductInvoice,
    ChangeProductQuantity
} from "./../../../../Data/api/Invoices.api";
import { onChangeDiscount, totalCalculation } from "./../../../../Data/actions/invoices-actions";

import InvoicesProductsTable from "./../Component/InvocesProductsTable";
import AlertNotice from './../../../AlertNotifer/AlertNotifer';


class InvoicesItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: this.props.location.state.discount ? this.props.location.state.discount : 0,
            selectedCustomerOption: this.props.location.state.CustomerOption,
            selectedProductOption: {},
        }
    }

    componentDidMount() {
        this.props.onLoadPage(this.props.location.state.id);
    }


    onDiscountChange = (e) => {
        let el = e.target;
        this.setState({discount: el.value});
        this.props.changeDiscount(+el.value);
        this.props.onCalculateTotal()
    };


    ChangeCustomerSelect = (option) => {
        this.setState({ selectedCustomerOption: option });
    };

    ChangeProductSelect = (option) => {
        this.setState({ selectedProductOption: option });
    };

    AddProduct = () =>{
        this.props.onAddProduct(
            this.props.location.state.id,
            this.state.selectedProductOption,
            this.props.location.state.id
        );
    };

    saveList = () =>{
        this.props.onSaveInvoice({
                id: this.props.location.state.id,
                customer_id: this.props.location.state.CustomerOption.value,
                discount: this.state.discount,
                total: this.props.InvoicesItems.total
        });
    };

    render() {
        const { selectedCustomerOption, selectedProductOption } = this.state;
        let { InvoicesItems, InvoicesProducts } = this.props;
            return (
                <div>
                    <Helmet>
                        <title>Edit invoices</title>
                    </Helmet>

                    <div className="page-header">
                        <h1>Edit invoices</h1>
                    </div>


                    <div className="edit-form">
                        <div className="input-field">
                            <div className="input-field__label">
                                <label htmlFor="">Discount (%)</label>
                            </div>
                            <input
                                onChange={this.onDiscountChange}
                                value={this.state.discount}
                                type="number"
                            />
                        </div>

                        <Row>
                            <Col xs={3}>
                                <div className="input-field">
                                    <label htmlFor="">Customer</label>
                                    <Select
                                        value={selectedCustomerOption}
                                        onChange={this.ChangeCustomerSelect}
                                        options={InvoicesItems.customersOptions}
                                        isClearable={true}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row bsPrefix="row align-items-end">
                            <Col xs={3}>
                                <div className="input-field">
                                    <label htmlFor="">Add product</label>
                                    <Select
                                        value={selectedProductOption}
                                        onChange={this.ChangeProductSelect}
                                        options={InvoicesItems.productsOptions}
                                        isClearable={true}
                                    />

                                </div>
                            </Col>
                            <Col xs={3}>
                                <Button onClick={this.AddProduct} >Add</Button>
                            </Col>
                        </Row>
                    </div>

                    <AlertNotice/>

                    <InvoicesProductsTable
                        onChangeQuantity={this.props.onChangeQuantity}
                        deleteProduct={this.props.deleteProduct}
                        location={this.props.location}
                        list={InvoicesProducts.list}
                    />

                    <Row bsPrefix="row justify-content-between">
                        <Col xs={3}>
                            <h2>Total: {InvoicesItems.total}</h2>
                        </Col>
                        <Col xs={2}>
                            <div className="save-list-button" >
                                <button onClick={this.saveList}>Save list</button>
                            </div>
                        </Col>
                    </Row>


                </div>
            );

    }
}


const mapDispatchToProps = (dispatch) => ({
    onLoadPage: (id) => dispatch(onLoadInvoicesEditPage(id)),
    onSaveInvoice: (data) => dispatch(SaveInvoiceData(data)),
    onCalculateTotal: () => dispatch(totalCalculation()),
    onAddProduct: (id, product, invoice_id) => dispatch(AddProductInvoice(id, product,  invoice_id)),
    onChangeQuantity: (data, invoice_id) => dispatch(ChangeProductQuantity(data, invoice_id)),
    changeDiscount: (count) => dispatch(onChangeDiscount(count)),
    deleteProduct: (id, invoice_id) => dispatch(DeleteProductFromInvoice(id, invoice_id)),
});

function mapStateToProps(state) {
    return {
        InvoicesList: state.Invoices.invoicesList,
        InvoicesProducts: state.Invoices.invoiceProductList,
        InvoicesItems: state.Invoices.invoicesItems,
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(InvoicesItems);
