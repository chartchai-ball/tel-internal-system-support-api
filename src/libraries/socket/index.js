import http from 'http'

import ioClient from 'socket.io-client'
// export let io = {}
export default async app => {
  const server = http.createServer(app)
  const io = require('socket.io')(server)

  io.on('connection', socket => {
    socket.emit('request', {
      msg: 'Send From Server',
    })
    socket.on('import', msg => {
      console.log('msg server :::', msg)
      //   io.emit('importStatus', {
      //     msg,
      //   })
    })
    socket.on('getTicket', msg => {
      io.emit('getTicketAll', {
        msg,
      })
    })
  })
  server.listen(3333, () => {
    console.log('server socket io port 3333')
  })
}
