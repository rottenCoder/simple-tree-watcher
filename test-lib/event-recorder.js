'use strict';
const debug = require('../lib/debug')('event-recorder');

function EventRecorder() {
  var events;
  var checkFn;

  function record(event, name, stat, oldStat) {
    debug("event:", event, name, stat.size);
    var e = {
      event: event,
      name: name,
      stat: stat,
      oldStat: oldStat,
      id: events.length,
    };
    events.push(e);
    checkFn(e);
  }

  function clear() {
    events = [];
    checkFn = () => {};
  }

  function setCheck(fn) {
    checkFn = fn;
  }

  function getEvents(type, filename) {
    if (type && filename) {
      return events.filter(function(e) {
        return e.event === type && e.name === filename;
      });
    } else if (type) {
      return events.filter(function(e) {
        return e.event === type;
      });
    }
    return events;
  }

  function showEvents() {
    events.forEach((e) => {
      debug(e.id, e.event, e.name);
    });
  }

  this.clear = clear;
  this.getEvents = getEvents;
  this.record = record;
  this.setCheck = setCheck;
  this.showEvents = showEvents;

  clear();
}

module.exports = EventRecorder;

