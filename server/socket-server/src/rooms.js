<<<<<<< HEAD
require('babel-register');
require('babel-polyfill');


=======
>>>>>>> rebasing
export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId) {
    let room = this.store.get(roomId);
    if (!room) {
      room = new Map();
      room.set('id', roomId);
      room.set('text', startingText);
      this.store.set(roomId, room);
    }
    return room;
  }
}
