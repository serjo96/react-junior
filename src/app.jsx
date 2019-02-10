import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'react-select/dist/react-select.css';
import './style.css';

import configureStore from './Data/store/configureStore';
import Main from "./Templates/Main/Main";

const store = configureStore();
render(
    <div>
        <Provider store={store}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </Provider>
    </div>,
    document.getElementById('app-root')
);
