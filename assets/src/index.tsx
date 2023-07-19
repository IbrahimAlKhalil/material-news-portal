import './index';
import './index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./pages/layout/app";

window.saharaData.fallbackImage = require('./images/fallback.png');

ReactDOM.render(<App/>, document.getElementById('app'));