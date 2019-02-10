import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import {onLoadProducts, AddProduct, DeleteProducts, EditProduct } from "./../../../Data/api/Products-api";

import ProductsTable from "./../Components/ProductsTable";
import AlertNotice from './../../AlertNotifer/AlertNotifer';




class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productModal: false,
            EditProduct: false,
            DeleteProduct: false,
            productName: '',
            productAddress: '',
            productPrice: '',
            productId: 0,
        }
    }
    
    componentDidMount() {
        this.props.onLoadPage();
    }

    onInputChange = (e) => {
        let el = e.target;
        if(el.value.length <= 5){
            this.setState({[el.name]: el.value})
        }
    };


    resetState = () => {
        this.setState({
            productModal: false,
            EditProduct: false,
            DeleteProduct: false,
            productName: '',
            productPrice: '',
            productId: 0,
        })
    };

    validateForm = () => {
        let { productName, productPrice } = this.state;
            if(/^\d{0,8}(\.\d{1,4})?$/.test(productPrice)) {
                if (productName.length > 0 && productPrice.length > 0) {
                    return true;
                } else {
                    alert('Please fill in all fields.');
                    return false;
                }
            } else{
                alert('Price must be only in numbers');
                return false;
            }
    };

    onSubmitForm = () => {
        let {productName, productPrice, productId} = this.state;

        if(this.validateForm()){

            if(this.state.EditProduct){
                this.props.onEditProduct({
                    name: productName,
                    price: productPrice,
                    id: productId
                });
            } else {
                this.props.onAddProduct({
                    name: productName,
                    price: productPrice
                });
            }

            this.handleClose();
            this.resetState();
        }
    };

    handleClose = (type) => {
        this.setState({ [type]: false });
    };

    handleShow = () => {
        this.setState({ productModal: true });
    };

    handleShowDeleteModal = (id, name) => {
        this.setState({
            productId: id,
            productName: name,
            DeleteProduct: true
        });
    };

    handleShowEditModal = (customerData) => {
        this.setState({
            productModal: true,
            EditProduct: true,
            productName: customerData.name,
            productPrice: customerData.price,
            productId: customerData.id,
        });
    };

    acceptDeleteProduct = () => {
        this.resetState();
        this.props.onDeleteProduct(this.state.productId);
    };

    get modalTitle (){
        return this.state.EditProduct ? `Edit product ${this.state.productName}?` : 'Add product';
    }


    render() {
        let { ProductsList } = this.props;
            return (
                <div>
                    <Helmet>
                        <title>Product List</title>
                    </Helmet>

                    <div className="page-header">
                        <h1>Products List <Button variant="light" onClick={this.handleShow}>Create</Button></h1>
                    </div>

                    <AlertNotice/>

                    <ProductsTable
                        list={ProductsList.list}
                        isFetching={ProductsList.isFetching}
                        showEditModal={this.handleShowEditModal}
                        showDeleteModal={this.handleShowDeleteModal}
                    />


                    <Modal
                        show={this.state.productModal}
                        onHide={()=> this.handleClose('productModal')}
                        onExited={this.resetState}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>{this.modalTitle}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <input
                                placeholder="Name"
                                type="text"
                                name="productName"
                                value={this.state.productName}
                                onChange={this.onInputChange}
                            />
                         
                            <input
                                placeholder="Price"
                                type="text"
                                name="productPrice"
                                value={this.state.productPrice}
                                onChange={this.onInputChange}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={()=>this.handleClose('productModal')}
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={this.onSubmitForm}
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.DeleteProduct} onHide={()=>this.handleClose('DeleteProduct')}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete product {this.state.productName}?</Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                            <Button
                                onClick={()=>this.handleClose('DeleteProduct')}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.acceptDeleteProduct}
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
    onLoadPage: () => dispatch(onLoadProducts()),
    onAddProduct: (data) => dispatch(AddProduct(data)),
    onEditProduct: (data) => dispatch(EditProduct(data)),
    onDeleteProduct: (id) => dispatch(DeleteProducts(id)),
});

function mapStateToProps(state) {
    return {
        ProductsList: state.Products.productsList,
        ProductsStatus: state.Products.productsStatus,
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(ProductsList);
