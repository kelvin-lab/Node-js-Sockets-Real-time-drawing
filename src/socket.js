
module.exports = (io)=>{
    var data = []//para ver los dibujos anteriores
    var users=0
    io.on('connection', (socket)=>{
        for (let i = 0; i < data.length; i++) {
            io.emit('show_drawing', data[i])
        }
        users++
        io.emit('users',users)
        socket.on('delete',()=>{
            data=[]
            io.emit('show_drawing', null)
        })
        socket.on('drawing', (drawing)=>{
            data.push(drawing)
            io.emit('show_drawing', drawing)
        })
        socket.on('disconnect', ()=>{
            users--
            io.emit('users',users)
        })
    })
}

