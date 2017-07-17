import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import App from '../imports/client/App.js';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../imports/api/accounts-config.js';

Meteor.startup(() => {
   injectTapEventPlugin();
   render(<App />, document.getElementById('render-target'))
});
