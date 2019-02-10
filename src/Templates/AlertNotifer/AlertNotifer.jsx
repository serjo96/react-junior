import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { onCloseAlert } from "./../../Data/actions/general-actions";


class AlertNotice extends Component {
    constructor(props) {
        super(props);
    }


    componentWillReceiveProps (nextProps){
        if (nextProps.AlertData.success) {
            setTimeout(()=>  this.props.onCloseAlert() ,2500)
        }
    }


    render() {
        let { AlertData } = this.props;
        return (
            <div>
               <Alert
                   onClose={this.props.onCloseAlert}
                   show={AlertData.alertStatus}
                   variant={AlertData.error ? 'danger' : 'success'}
                   dismissible
               >
                   {AlertData.alertMessage}
               </Alert>

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    onCloseAlert: () => dispatch(onCloseAlert()),

});

function mapStateToProps(state) {
    return {
        AlertData: state.General.Alert,
    };
}


export default  connect( mapStateToProps, mapDispatchToProps )(AlertNotice);
