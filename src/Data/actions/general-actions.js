import { ALERT_SUCCESS_RESPONSE, ALERT_CLOSE, ALERT_ERROR_RESPONSE } from './../constants/';


export function onResponseSuccessRequest(success) {
    return {
        type: ALERT_SUCCESS_RESPONSE,
        success
    };
}


export function onResponseErrorRequest(error) {
    return {
        type: ALERT_ERROR_RESPONSE,
        error
    };
}


export function onCloseAlert() {
    return {
        type: ALERT_CLOSE
    };
}


