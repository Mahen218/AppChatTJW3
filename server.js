// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Menyajikan file statis dari folder 'public'
// app.use(express.static('public'));

// // Menangani koneksi socket
// io.on('connection', (socket) => {
//   const userAgent = socket.request.headers['user-agent'];
//   console.log('User terhubung dari perangkat:', userAgent);

//   // Menangani pesan yang diterima
//   socket.on('chat message', (message) => {
//     console.log('Pesan diterima:', message);

//     // Mengirim pesan ke semua pengguna terhubung
//     io.emit('chat message', message);
//   });

//   // Menangani pemutusan koneksi socket
//   socket.on('disconnect', () => {
//     console.log('User terputus');
//   });
// });

// // Menjalankan server
// const port = 3000;
// const host = '192.168.1.4'; // Menggunakan host universal
// server.listen(port, host, () => {
//   console.log(`Server berjalan di http://${host}:${port}`);
// });

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

  // Menangani pemutusan koneksi socket
  socket.on('disconnect', () => {
    console.log('User terputus');
  });
});

// Menjalankan server
const port = 3000;
const host = '192.168.202.112'; // Menggunakan host universal
server.listen(port, host, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
