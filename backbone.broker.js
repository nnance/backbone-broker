/*!
 * backbone.broker.js v0.1.0
 * Copyright 2014, Nick Nance (@nancenick)
 * backbone.broker.js may be freely distributed under the MIT license.
 */
 (function (factory) {

  // Check for AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  }

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object') {
    factory(require('underscore'), require('backbone'));
  }

  // Finally, as a browser global.
  else {
    Backbone.broker = factory(_, Backbone);
  }

}(function (_, Backbone) {

  var started = false;
  var channels = [];

  var Channel = function(name) {
    this.name = name;
    this.queue = [];
  };

  _.extend(Channel.prototype, Backbone.Events, {
    publish: function() {
      if (arguments.length > 0) {
        this.queue.push(arguments);
      }
      if (started) {
        this.queue.forEach(function(args){
          this.trigger.apply(this, args);
        }.bind(this));
        this.queue = [];
      }
      return this;
    },

    subscribe: function() {
      this.on.apply(this, arguments);
      return this;
    },

    unsubscribe: function() {
      this.off.apply(this, arguments);
      return this;
    }

  });

  return {
    channel: function(name) {
      if (name && name.length > 0) {
        var results = channels.filter(function(channel){
          if (channel.name === name) {
            return channel;
          }
        });
        if (results.length > 0) {
          return results[0];
        } else {
          var channel = new Channel(name);
          channels.push(channel);
          return channel;
        }
      }
    },

    getChannels: function() {
      return channels;
    },

    start: function() {
      started = true;
      channels.forEach(function(channel){
        channel.publish();
      });
    },

    stop: function() {
      started = false;
    }
  };

}));
