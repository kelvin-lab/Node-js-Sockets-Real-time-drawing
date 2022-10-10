const socket = io();
var click = false;
var movingMouse = false;
var xPosition = 0;
var yPosition = 0;
var previousPosition = null
var color = 'black';

const canvas = document.getElementById('canvas');
const users =  document.getElementById('users')
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.addEventListener('mousedown',()=>{
    click=true
})

canvas.addEventListener('mouseup',()=>{
    click=false
})

canvas.addEventListener('mousemove',(event)=>{
    xPosition = event.clientX
    yPosition = event.clientY
    movingMouse = true
})

function change_color(c){
    color = c
    context.strokeStyle = color
    context.stroke()
}

function delete_all(){
    socket.emit('delete')
}

function create_drawing(){
    if(click && movingMouse && previousPosition!=null){
        let drawing = {
            xPosition: xPosition,
            yPosition: yPosition,
            color: color,
            previousPosition: previousPosition
        }
        // show_drawing(drawing)
        socket.emit('drawing', drawing)
    }
    previousPosition={xPosition:xPosition, yPosition:yPosition}
    setTimeout(create_drawing,25)
}

socket.on('show_drawing',(drawing)=>{
    if(drawing!=null){
        context.beginPath()
        context.lineWidth = 3
        context.strokeStyle = drawing.color
        context.moveTo(drawing.xPosition, drawing.yPosition)
        context.lineTo(drawing.previousPosition.xPosition,
            drawing.previousPosition.yPosition)
        context.stroke()
    }else{
        context.clearRect(0,0,canvas.width,canvas.height)
    }
})


socket.on('users',(number)=>{
    users.innerHTML = `Número de usuarios conectados: ${number}`
})

create_drawing()