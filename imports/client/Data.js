import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meetups } from '../api/meetups.js';

export default class Data extends Component {
   componentDidMount() {
      // initialize popup
      $('.attendeesList').popup({
         on: 'click'
      });
   }
   deleteMeetup(e) {
      e.preventDefault();

      // remove meetup if it matches user's ID
      if (this.props.meetup.organizer === Meteor.users.findOne(Meteor.userId()).username) {
         Meetups.remove(this.props.meetup._id);
      }
   }
   attendMeetup(e) {
      e.preventDefault();

      const attendees = Meetups.findOne(this.props.meetup._id).attendees;
      const user = Meteor.users.findOne(Meteor.userId()).username;

      if (!attendees.includes(user)) {
         Meetups.update(this.props.meetup._id, {
            $push: {
               attendees: user
            }
         });
      } else if (attendees.includes(user)) {
         Meetups.update(this.props.meetup._id, {
            $pull: {
               attendees: user
            }
         });
      }
   }
   render() {
      const attendingCheckmark = this.props.meetup.attendees.includes(Meteor.users.findOne(Meteor.userId()).username) ? 'check icon green text' : 'check icon';
      const attendingText = this.props.meetup.attendees.includes(Meteor.users.findOne(Meteor.userId()).username) ? 'You are attending' : 'Attend';
      const attendingFirstUser = this.props.meetup.attendees[0];
      const attendingUsersCount = this.props.meetup.attendees.length - 1;
      const timeUntilEvent = moment(this.props.meetup.date + this.props.meetup.time, 'MM/DD/YY hh:mm a').fromNow();
      let attendingUsersDisplay;

      if (attendingUsersCount === 1) {
         attendingUsersDisplay = 'and ' + attendingUsersCount + ' other';
      } else if (attendingUsersCount > 1) {
         attendingUsersDisplay = 'and ' + attendingUsersCount + ' others';
      } else if (attendingUsersCount < 1) {
         attendingUsersDisplay = '';
      }
      return(
         <div className="meetup-entry ui column">
            <br /><br />
               <div className="ui raised card">
                 <div className="content">
                   <a><i className="right floated red text delete icon" onClick={this.deleteMeetup.bind(this)}></i></a>
                   <div className="header">{this.props.meetup.location}</div>
                   <div className="meta">
                      <span>Organized by {this.props.meetup.organizer}</span>
                     </div>
                   <div className="description">
                     <div className="ui list">
                        <div className="item">
                          <i className="wait icon"></i>
                          <div className="content">
                           happening {timeUntilEvent}
                          </div>
                        </div>
                       <div className="item">
                         <i className="marker icon"></i>
                         <div className="content">
                           {this.props.meetup.address}
                         </div>
                       </div>
                       <div className="item">
                         <i className="calendar outline icon"></i>
                         <div className="content">
                           {this.props.meetup.date} {this.props.meetup.time}
                         </div>
                       </div>
                       <div className="item">
                         <i className="sticky note icon"></i>
                         <div className="content">
                           {this.props.meetup.notes}
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="extra content">
                   <span className="left floated check">
                     <a onClick={this.attendMeetup.bind(this)}><i className={attendingCheckmark}></i></a>
                     {attendingText}
                   </span>
                   <br />
                   <div className="hoverHandCursor">
                   <span className="left floated attendeesList" data-position="right center" data-content={this.props.meetup.attendees.join(', ')}>
                      <a><i className="user blue text icon"></i></a>
                      {attendingFirstUser} {attendingUsersDisplay}
                   </span>
                  </div>
                 </div>

               </div>
         </div>

      );
   }
}
