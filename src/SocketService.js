import openSocket from 'socket.io-client'

class Socket {
  constructor () {
    this.socket = openSocket(`http://localhost:3001`)
    this.socket.on('news', data => {
      console.log(data)
    })
  }

  get socket () {
    return this._socket
  }

  set socket (val) {
    this._socket = val
  }
}

const s = new Socket().socket

export default s
