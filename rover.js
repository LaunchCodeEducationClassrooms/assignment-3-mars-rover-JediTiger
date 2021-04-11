/*
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);
Output
{
   message: 'Test message with two commands',
   results: [
      {
         completed: true
      },
      {
         completed: true,
         roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
      }
   ]
}*/

// The Rover class takes the commands and message sent to it and returns its action

class Rover {
  constructor(position) {
    this.mode = 'NORMAL';
    if (this.mode === 'NORMAL') {
      this.position = position;
    }
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let response = {};
    let results = [];
    let reply;
    if (message.commands.length === undefined) {
      message.commands = [ message.commands ];
    }
    for (let i = 0; i < message.commands.length; i++) {
      if (message.commands[i].commandType === 'MODE_CHANGE') {
        this.mode = message.commands[i].value;
        reply = { completed: true };
        results.push(reply)
      }
      else if (message.commands[i].commandType === 'STATUS_CHECK') {
        reply = { completed: true, roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position } }
        results.push(reply)
      }
      else if (message.commands[i].commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          reply = { completed: false };
        }
        else {
          this.position = message.commands[i].value;
          reply = { completed: true };
        }
        results.push(reply)
      }
    }
    return {
      message: message.name,
      results: results
    }
  }
}

module.exports = Rover;