import '../css/normalize.css';
import '../css/bootstrap.optimized.css';
import '../css/clean-blog.css';
import '../css/codehilite.css';
import '../css/font-awesome.optimized.css';
import '../css/fonts.css';
import './bootstrap.js';
import './clean-blog.js';
import 'details-polyfill-es6';

import registerServiceWorker from './registerServiceWorker.js';
registerServiceWorker();

import pageConfigurator from './pageConfigurator.js';
pageConfigurator();
