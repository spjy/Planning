import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meetups } from '../api/meetups.js';

export default class Form extends Component {
   insertMeetup(e) {
      e.preventDefault();

      // get values from form
      const organizer = Meteor.users.findOne(Meteor.userId()).username;
      const location = $('#location').val();
      const address = $('#address').val();
      const date = $('#date').val();
      const time = $('#time').val();
      const notes = $('#notes').val();

      // insert values to database
      Meetups.insert({
         organizer, location, address, date, time, notes, attendees: []
      });

      // clear form
      $('#location').val('');
      $('#address').val('');
      $('#date').val('');
      $('#time').val('');
      $('#notes').val('');
   }
   render() {
      return (
         <div className="ui segment">
            <h3 className="ui header">plan a meetup</h3>
            <form className="ui form submitData" onSubmit={this.insertMeetup.bind(this)}>
               <div className="two fields">
                  <div className="field">
                     <label>Location</label>
                     <input id="location" type="text" name="location" placeholder="Location" autoComplete="off" />
                  </div>
                  <div className="field">
                     <label>Address</label>
                     <input id="address" type="text" name="address" placeholder="Address" autoComplete="off" />
                  </div>
               </div>
               <div className="two fields">
                  <div className="field">
                     <label>Date</label>
                     <input id="date" type="text" name="date" placeholder="Date" autoComplete="off" />
                  </div>
                  <div className="field">
                     <label>Time</label>
                     <input id="time" type="text" name="time" placeholder="Time" autoComplete="off" />
                  </div>
               </div>
               <div className="field">
                  <label>Notes</label>
                  <textarea id="notes" name="notes" placeholder="Notes" rows="2"></textarea>
               </div>
               <button className="ui button" type="submit">Submit</button>
            </form>
         </div>
      );
   }
}
