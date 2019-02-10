import update from 'react-addons-update';
import { ALERT_CLOSE, ALERT_SUCCESS_RESPONSE, ALERT_ERROR_RESPONSE } from "../constants";


const initialState = {
    Alert: {
        alertStatus: false,
        alertMessage: '',
        error: false,
        success: false,
    }
};

export default function General(state = initialState, action) {
    switch (action.type) {
        case ALERT_SUCCESS_RESPONSE:
            return update(state, {
                Alert: {$merge: {
                        alertStatus: true,
                        alertMessage: action.success + ' ʕ•ᴥ•ʔ',
                        success: true
                    }}
            });

        case ALERT_ERROR_RESPONSE:
                    return update(state, {
                        Alert: {$merge: {
                                alertStatus: true,
                                alertMessage: `There was ${action.error} ¯\\_(ツ)_/¯  Try again later.`,
                                error: true
                            }}
                    });


        case ALERT_CLOSE:
            return update(state, {
                Alert: {$merge: {
                        alertStatus: false,
                        alertMessage: '',
                        success: false,
                        error: false,
                    }}
            });


        default:
            return state;
    }
}

