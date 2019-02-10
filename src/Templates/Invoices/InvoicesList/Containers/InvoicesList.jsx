import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

import { onLoadInvoices, AddInvoice, EditInvoice, DeleteInvoice } from "../../../../Data/api/Invoices.api";
import { onLoadCustomers } from "../../../../Data/api/Customers-api";
import { convertArrayToSelectOptions } from "../../../../Utilits/Utilits";

import InvoicesTable from "../Componentns/InvoicesTable";
import AlertNotice from './../../../AlertNotifer/AlertNotifer';




class InvoicesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoicesModal: false,
            DeleteInvoices: false,
            discount: '',
            invoicesName: '',
            invoicesAddress: '',
            invoicesPrice: '',
            invoicesId: 0,
            selectedCustomerOption: {}
        }
    }

    componentDidMount() {
        this.props.onLoadPage();
        this.props.LoadCustomers();
    }

    onInputChange = (e) => {
        let el = e.target;
        this.setState({[el.name]: el.value})
    };


    resetState = () => {
        this.setState({
            invoicesModal: false,
            DeleteInvoices: false,
            discount: '',
            invoicesName: '',
            invoicesAddress: '',
            invoicesPrice: '',
            invoicesId: 0,
        })
    };

    ChangeCustomerSelect = (option) => {
        this.setState({ selectedCustomerOption: option });
    };

    onSubmitForm = () => {
        this.props.onAddInvoice({
            customer_id: this.state.selectedCustomerOption.value,
            discount: this.state.discount
        });

        this.resetState();
    };

    handleClose = (type) => {
        this.setState({ [type]: false });
    };

    handleShow = () => {
        this.setState({ invoicesModal: true });
    };

    handleShowDeleteModal = (id) => {
        this.setState({
            invoicesId: id,
            DeleteInvoices: true
        });
    };

    handleShowEditModal = (customerData) => {
        this.setState({
            invoicesModal: true,
            EditInvoices: true,
            invoicesName: customerData.name,
            invoicesPrice: customerData.price,
            invoicesId: customerData.id,
        });
    };

    acceptDeleteInvoices = () => {
        this.resetState();
        this.props.onDeleteInvoice(this.state.invoicesId);
    };

    get modalTitle (){
        return this.state.EditInvoices ? `Edit product ${this.state.invoicesName}?` : 'Add product';
    }


    render() {
        let { InvoicesList } = this.props;
        if(InvoicesList.isFetching){
            return (
                <div>
                    <Helmet>
                        <title>Invoices List</title>
                    </Helmet>

                    <div className="page-header">
                        <h1>Invoices List <Button variant="light" onClick={this.handleShow}>Create</Button></h1>
                    </div>

                    <AlertNotice/>

                    <InvoicesTable
                        list={InvoicesList.list}
                        showEditModal={this.handleShowEditModal}
                        showDeleteModal={this.handleShowDeleteModal}
                    />

                    <Modal
                        show={this.state.invoicesModal}
                        onHide={()=> this.handleClose('invoicesModal')}
                        onExited={this.resetState}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.modalTitle}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <label htmlFor="">Select Customer</label>
                            </div>

                            <Select
                                value={this.state.selectedCustomerOption}
                                onChange={this.ChangeCustomerSelect}
                                options={convertArrayToSelectOptions(this.props.CustomersList.list)}
                                isClearable={true}
                            />

                            <div>
                                <label htmlFor="">Discount: </label>
                            </div>
                            <input
                                    placeholder="Discount"
                                    type="number"
                                    min={0}
                                    name="discount"
                                    value={this.state.discount}
                                    onChange={this.onInputChange}
                            />


                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.handleClose('invoicesModal')}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onSubmitForm}>
                                Add invoice list
                            </Button>
                        </Modal.Footer>

                    </Modal>

                    <Modal show={this.state.DeleteInvoices} onHide={()=>this.handleClose('DeleteInvoices')}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete Invoice ?</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Button onClick={()=>this.handleClose('DeleteInvoices')} variant="secondary">Cancel</Button>
                            <Button onClick={this.acceptDeleteInvoices} variant="primary">Delete</Button>
                        </Modal.Footer>

                    </Modal>

                </div>
            );
        }
        return (
            <div>Loading...</div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    onLoadPage: () => dispatch(onLoadInvoices()),
    LoadCustomers: () => dispatch(onLoadCustomers()),
    onAddInvoice: (data) => dispatch(AddInvoice(data)),
    onDeleteInvoice: (id) => dispatch(DeleteInvoice(id)),
});

function mapStateToProps(state) {
    return {
        InvoicesList: state.Invoices.invoicesList,
        CustomersList: state.Customers.customersList,
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(InvoicesList);
