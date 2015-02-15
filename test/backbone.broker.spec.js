describe('backbone.broker', function(){
  describe('when accessing global broker', function(){
    it('should provide a channel function', function(){
      expect(_.isFunction(Backbone.broker.channel)).to.be.true;
    });

    it('should provide a start function', function(){
      expect(_.isFunction(Backbone.broker.start)).to.be.true;
    });

    it('should provide a stop function', function(){
      expect(_.isFunction(Backbone.broker.stop)).to.be.true;
    });
  });

  describe('when accessing a new channel', function(){
    var channel;
    before(function(){
      channel = Backbone.broker.channel('test');
    });

    it ('should provide a new channel', function(){
      expect(channel).to.exist;
    });

    it ('should return the same channel', function(){
      expect(channel).to.equal(Backbone.broker.channel('test'));
    });

    it ('should have one channel', function(){
      expect(Backbone.broker.getChannels().length).to.equal(1);
    });

    it ('channel should have subscribe function', function(){
      expect(channel.subscribe).to.exist;
    });

    it ('channel should have publish function', function(){
      expect(channel.publish).to.exist;
    });
  });

  describe('when publishing message to a channel', function(){
    var spy = sinon.spy();
    before(function(){
      Backbone.broker.channel('test').subscribe('message',spy);
      Backbone.broker.channel('test').publish('message','hello');
    });

    describe('when stopped', function(){
      it ('should not call the subscriber', function(){
        expect(spy.calledOnce).to.be.false;
      });

    });

    describe('when started', function(){
      before(function(){
        Backbone.broker.start();
      });

      after(function(){
        Backbone.broker.stop();
      });

      it ('should call the subscriber once', function(){
        expect(spy.calledOnce).to.be.true;
      });

      it ('should call the subscriber with hello', function(){
        expect(spy.calledWithExactly('hello')).to.be.true;
      });

      describe('when publishing message after started', function(){
        before(function(){
          Backbone.broker.channel('test').publish('message','you there?');
        });

        it ('should call the subscriber a second time', function(){
          expect(spy.calledTwice).to.be.true;
        });

        it ('should call the subscriber with you there?', function(){
          expect(spy.calledWith('you there?')).to.be.true;
        });

      });
    });


  });
});
