import '../css/normalize.css';
import '../css/bootstrap.css';
import '../css/clean-blog.css';
import '../css/codehilite.css';
import '../css/font-awesome.min.css';
import '../css/fonts.css';
import './pageScripts/jquery.js';
import './pageScripts/bootstrap.js';
import './pageScripts/clean-blog.js';
import './pageScripts/jqBootstrapValidation.js';
import './pageScripts/contact_me.js';

import registerServiceWorker from './sw/clients/registerServiceWorker.js';
registerServiceWorker();
import configure from './sw/clients/pageConfigurator.js';
configure();
// import storageConfigure from './sw/clients/storage.js';
// storageConfigure();
