backbone-broker
====================

[![npm version](https://badge.fury.io/js/backbone.broker.svg)](http://badge.fury.io/js/backbone.broker)
[![Build Status](https://secure.travis-ci.org/nnance/backbone-broker.png?branch=master)](http://travis-ci.org/nnance/backbone-broker)
[![Dependency Status](https://gemnasium.com/nnance/backbone-broker.svg)](https://gemnasium.com/nnance/backbone-broker)

A Backbone pub/sub event aggregator based on channels.  Which includes:
* Use channels to Publish & Subscribe to messages
* Application wide singleton

## Getting Started

Install with bower.  If you haven't used [bower](#http://bower.io) before, be sure to check out the [Getting Started](http://bower.io/#getting-started) guide, as it explains how to install Bower and install bower packages. Once you're familiar with that process, you may install this plugin with this command:
```
bower install backbone.broker --save
```
## Documentation

Backbone.Broker is a global singleton that can be required using AMD or CommonJS.  It is also available on Backbone in the cases where a module loading system isn't being used.  For Example

### AMD or CommonJS

```
var Backbone = require('backbone');
var broker = require('broker');
```

### Global
```
var broker = Backbone.broker;
```

### Control

The broker can be stopped and started based on specific needs.  While the broker is stopped subscripting will continue to work but publishing is turned off.  As messages are published to channels they will be queued in order and sent once the broker is started.

**WARNING:** The broker's initial state is stopped so publishing will not work until the broker is started.  The helps to make sure an application is loaded and initialized before the messages are sent.

#### Starting

The broker can be started by
```
var broker = require('broker');
broker.start();
```

#### Stopping

The broker can be stopped with
```
var broker = require('broker');
broker.stop();
```

### Channels

Broker is based on a channel system.  Messages can only be published and subscribed to a channel.  Channels are instances of [Backbone.Events](http://backbonejs.org/#Events) and therfore has the same API.

#### Accessing

To retrieve or create a channel.
```
var broker = require('broker');
var channel = broker.channel('session');
```

#### Subscribing

Subscribing to a message on a channel. This is the same as [Backbone.Events.on](http://backbonejs.org/#Events-on)
```
var broker = require('broker');
broker.channel('session').subscribe('login', function(){
  ...
});
```

#### Publishing

Publishing a message on a channel.  This is the same as [Backbone.Events.trigger](http://backbonejs.org/#Events-trigger)
```
var broker = require('broker');
var view = new Backbone.View();

broker.channel('session').publish('show',view);
```
#### Unsubscribing

Unsubscribing to a message on a channel.  This is the same as [Backbone.Events.off](http://backbonejs.org/#Events-off)
```
var broker = require('broker');
broker.channel('session').unsubscribe('login');
```
