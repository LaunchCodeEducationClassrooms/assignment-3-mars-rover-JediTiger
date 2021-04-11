const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  // 7 tests here!
// 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(5);
    expect(typeof rover.position).toEqual('number');
    expect(rover.position).toEqual(5);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
// 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');
  });
// 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(385421);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
// 10
  it("responds correctly to status check command", function() {
    let commands = new Command('STATUS_CHECK');
    let message = new Message('Check that STATUS_CHECK works correctly', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });
// 11
  it("responds correctly to mode change command", function() {
    let commands = new Command('MODE_CHANGE', 'LOW_POWER');
    let message = new Message('Check that MODE_CHANGE works correctly', commands);
    let rover = new Rover(46561);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.mode).toEqual('LOW_POWER');
  });
// 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = new Command('MOVE', 852369);
    let message = new Message('Check that MODE_CHANGE works correctly', commands);
    let rover = new Rover(85245);
    rover.mode = 'LOW_POWER';
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(false);
    expect(rover.position).toEqual(85245);
  });
// 13
  it("responds with position for move command", function() {
    let rover = new Rover(20000);
    expect(rover.position).toEqual(20000);
  });

});
