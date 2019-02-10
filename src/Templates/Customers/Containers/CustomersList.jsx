import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Modal, Alert } from 'react-bootstrap';

import { onLoadCustomers, AddCustomers, DeleteCustomer, EditCustomers } from './../../../Data/api/Customers-api';
import { getRandomInt } from './../../../Utilits/Utilits';

import CustomerTable from './../Components/CustomerTable'
import AlertNotice from './../../AlertNotifer/AlertNotifer'




class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerModal: false,
            EditCustomer: false,
            DeleteCustomer: false,
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            customerId: 0,
        }
    }
    componentDidMount() {
        this.props.onLoadPage();
    }

    onInputChange = (e) => {
        let el = e.target;

       this.setState({[el.name]: el.value})
    };

    onPhoneInput = (e) => {
        if(e.target.validity.valid){
            this.setState({customerPhone: e.target.value})
        }
    };

    resetState = () => {
        this.setState({
            customerModal: false,
            EditCustomer: false,
            DeleteCustomer: false,
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            customerId: 0,
        })
    };

    onSubmitForm = () => {
      let {customerName, customerAddress, customerPhone, customerId} = this.state;

      if(customerName.length > 0 && customerAddress.length > 0 && customerPhone.length > 0){

          if(this.state.EditCustomer){
              this.props.onEditCustomer({
                  name: customerName,
                  address: customerAddress,
                  phone: customerPhone,
                  id: customerId
              });
          } else {
              this.props.onAddCustomer({
                  name: customerName,
                  address: customerAddress,
                  phone: customerPhone,
              });
          }

          this.handleClose();
          this.resetState();
      } else {
          alert('Please fill in all fields.')
      }
    };

    handleClose = (type) => {
        this.setState({ [type]: false });
    };

    handleShow = () => {
        this.setState({ customerModal: true });
    };

    handleShowDeleteModal = (id, name) => {
        this.setState({
            customerId: id,
            customerName: name,
            DeleteCustomer: true
        });
    };

    handleShowEditModal = (customerData) => {
        this.setState({
            customerModal: true,
            EditCustomer: true,
            customerName: customerData.name,
            customerAddress: customerData.address,
            customerPhone: customerData.phone,
            customerId: customerData.id,
        });
    };

    acceptDeleteCustomer = () => {
        this.resetState();
        this.props.onDeleteCustomer(this.state.customerId);
    };

    get modalTitle (){
        return this.state.EditCustomer ? `Edit customer ${this.state.customerName}?` : 'Add customer';
    }


    render() {
        let { CustomersList } = this.props;
            return (
                <div>
                    <Helmet>
                        <title>Customers List</title>
                    </Helmet>

                    <div className="page-header">
                        <h1>Customers List <Button variant="light" onClick={this.handleShow}>Create</Button></h1>
                    </div>

                    <AlertNotice/>

                    <CustomerTable
                        list={CustomersList.list}
                        isFetching={CustomersList.isFetching}
                        showEditModal={this.handleShowEditModal}
                        showDeleteModal={this.handleShowDeleteModal}
                    />


                    <Modal
                        show={this.state.customerModal}
                        onHide={()=> this.handleClose('customerModal')}
                        onExited={this.resetState}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.modalTitle}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <input
                                placeholder="Name"
                                type="text"
                                name="customerName"
                                value={this.state.customerName}
                                onChange={this.onInputChange}
                            />
                            <input
                                placeholder="Address"
                                type="text"
                                name="customerAddress"
                                value={this.state.customerAddress}
                                onChange={this.onInputChange}
                            />
                            <input
                                placeholder="Phone"
                                type="text"
                                name="customerPhone"
                                pattern="[0-9]*"
                                value={this.state.customerPhone}
                                onChange={this.onPhoneInput}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.handleClose('customerModal')}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onSubmitForm}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.DeleteCustomer} onHide={()=>this.handleClose('DeleteCustomer')}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete customer {this.state.customerName}?</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Button
                                onClick={()=>this.handleClose('DeleteCustomer')}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.acceptDeleteCustomer}
                                variant="primary"
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>



                </div>
            );
    }
}


const mapDispatchToProps = (dispatch) => ({
    onLoadPage: () => dispatch(onLoadCustomers()),
    onAddCustomer: (data) => dispatch(AddCustomers(data)),
    onEditCustomer: (data) => dispatch(EditCustomers(data)),
    onDeleteCustomer: (id) => dispatch(DeleteCustomer(id)),
});

function mapStateToProps(state) {
    return {
        CustomersList: state.Customers.customersList,
        CustomerStatus: state.Customers.customerStatus,
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(CustomersList);
