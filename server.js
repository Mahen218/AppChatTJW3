const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));

// Menangani koneksi socket
io.on('connection', (socket) => {
  const userAgent = socket.request.headers['user-agent'];
  console.log('User terhubung dari perangkat:', userAgent);

  // Menangani pesan yang diterima
  socket.on('chat message', (data) => {
    console.log('Pesan diterima:', data);

    // Mengirim pesan beserta nama client ke semua pengguna terhubung
    io.emit('chat message', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User terputus');
  });
});

// Running server
const port = 3000;
const host = '192.168.202.112';
server.listen(port, host, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
