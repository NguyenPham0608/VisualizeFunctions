/**@type{HTMLCanvasElement} */

const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')
const dropdown=document.getElementById('functions')

let equation=1

dropdown.addEventListener('change',function(e){
    equation=e.target.value
})


let x=0
let y=0

const halfWayY=canvas.height/2
const halfWayX=canvas.width/2
const canvasWidth=canvas.width
const canvasHeight=canvas.height

let mousedown=false

let a=860
let b=940

let g=414
let h=435

let spaceWidthX=canvasWidth/(b-a)
let spaceWidthY=canvasHeight/(h-g)


let offsetX=0
let offsetY=0

let mouseX=0
let mouseY=0

let newOriginX=0
let newOriginY=0


let upPressed=false
let downPressed=false
let leftPressed=false
let rightPressed=false

function loop(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    if(upPressed){
        a+=4/spaceWidthX
        b-=4/spaceWidthX
    }
    if(downPressed){
        a-=4/spaceWidthX
        b+=4/spaceWidthX
    }
    if(leftPressed){
        g-=4/spaceWidthY
        h+=4/spaceWidthY
    }
    if(rightPressed){
        g+=4/spaceWidthY
        h-=4/spaceWidthY
    }

    if(mousedown){
        offsetX=mouseX+newOriginX
        offsetY=mouseY+newOriginY
    }

    spaceWidthX=canvasWidth/(b-a)
    spaceWidthY=canvasHeight/(h-g)
    spaces=canvasWidth/spaceWidthX
    drawTicks()
    drawAxis()
    drawFunction()
    console.log(offsetX,offsetY)
    requestAnimationFrame(loop)
}

function drawFunction(){
    ctx.lineWidth=5
    for(let i = -halfWayX; i<halfWayX;i++){
        ctx.strokeStyle='darkblue'
        x=i
        y=f(i)
        ctx.beginPath()
        ctx.moveTo((i-1)+halfWayX,f(i-1))
        ctx.lineTo(x+halfWayX,y)
        ctx.stroke()
    }
}


function f(a){
    if(equation==1){
        return((spaceWidthY*(-Math.sin((a+offsetX)/spaceWidthX))+(halfWayY+offsetY)))
    }else{
        return((-spaceWidthY*((a/spaceWidthX)**2))+halfWayY)
    }
}

function drawAxis(){
    ctx.beginPath()
    ctx.lineWidth=2
    ctx.strokeStyle='black'
    ctx.moveTo(0-offsetX,halfWayY+offsetY)
    ctx.lineTo(canvasWidth-offsetX,halfWayY+offsetY)
    ctx.moveTo(halfWayX-offsetX,0+offsetY)
    ctx.lineTo(halfWayX-offsetX,canvasHeight+offsetY)
    ctx.stroke()
}

function drawTicks(){
    ctx.lineWidth=2
    ctx.strokeStyle='#F1F1F1'

    for(let i=0;i<halfWayX;i+=spaceWidthX){
        ctx.beginPath()
        ctx.moveTo(i+halfWayX,halfWayY-(halfWayY))
        ctx.lineTo(i+halfWayX,halfWayY+(halfWayY))
        ctx.stroke()
    }
    for(let i=0;i>-halfWayX;i-=spaceWidthX){
        ctx.beginPath()
        ctx.moveTo(i+halfWayX,halfWayY-(halfWayY))
        ctx.lineTo(i+halfWayX,halfWayY+(halfWayY))
        ctx.stroke()
    }
    for(let i=0;i<halfWayY;i+=spaceWidthY){
        ctx.beginPath()
        ctx.moveTo(halfWayX-(halfWayX),i+halfWayY)
        ctx.lineTo(halfWayX+(halfWayX),i+halfWayY)
        ctx.stroke()
    }
    for(let i=0;i>-halfWayY;i-=spaceWidthY){
        ctx.beginPath()
        ctx.moveTo(halfWayX-(halfWayX),i+halfWayY)
        ctx.lineTo(halfWayX+(halfWayX),i+halfWayY)
        ctx.stroke()
    }
}

window.addEventListener('keyup',function(e){
    if(e.key=='ArrowUp'){
        upPressed=false
    }
    if(e.key=='ArrowDown'){
        downPressed=false
    }
    if(e.key=='ArrowLeft'){
        leftPressed=false
    }
    if(e.key=='ArrowRight'){
        rightPressed=false
    }
})

window.addEventListener('keydown',function(e){
    if(e.key=='ArrowUp'){
        upPressed=true
    }
    if(e.key=='ArrowDown'){
        downPressed=true
    }
    if(e.key=='ArrowLeft'){
        leftPressed=true
    }
    if(e.key=='ArrowRight'){
        rightPressed=true
    }
})

window.addEventListener('mousemove',function(e){
    mouseX=-(e.clientX-halfWayX)
    mouseY=(e.clientY-halfWayY)
})

window.addEventListener('mousedown',function(e){
    mousedown=true
})
window.addEventListener('mouseup',function(e){
    mousedown=false

    newOriginX=mouseX
    newOriginY=mouseY

})





loop()