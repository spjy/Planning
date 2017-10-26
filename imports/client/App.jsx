import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meetups } from '../api/meetups.js';
import Form from './Form.jsx';
import Data from './Data.jsx';

class App extends Component {
   render() {
      return (
         <div className="app ui container">
           <Form />
           {/* Iterate through meetups from db */}
           {this.props.meetup.map((meetup) => {
                  return (
                     <Data meetup={meetup} key={meetup._id} />
                  );
               })}
         </div>
      );
   }
}

// Get data from meetup database
export default createContainer(() => {
   return {
      meetup: Meetups.find({}).fetch()
   };
}, App);
