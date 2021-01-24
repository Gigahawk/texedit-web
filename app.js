const container = document.querySelector('.container')
//window.addEventListener('onload', creatDivs(10,10));
const boxs = container.querySelectorAll('div')

function creatDivs(col , rows) {
    for(let i = 0;i < (col * rows); i++) {
        const div = document.createElement('div') 
        container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        div.style.border = '1px solid red'
        container.appendChild(div).classList.add('box')
    }
    // boxs.forEach(box => box.addEventListener('mouseover', changeColor))
}
creatDivs(5,5)

function grayColor() { 
    const btn = document.createElement('button')
    btn.textContent = "GRAY"
    btn.addEventListener('click', () => {
        boxs.forEach(box => box.addEventListener('mouseover', ()=> {
            let RNum = Math.floor(Math.random() * 256);
            let GrayScale = `rgb(${RNum},${RNum},${RNum})`
            box.style.background = GrayScale;
        }))
    })
   document.body.appendChild(btn).classList.add('btn')
}
grayColor()


function rgbColors() {
    const btn = document.createElement('button')
    btn.textContent = "RGB"
    btn.addEventListener('click' ,() => {
        boxs.forEach(box => box.addEventListener('mouseover', () => {
            let R = Math.floor(Math.random() * 256);
            let G = Math.floor(Math.random() * 256);
            let B = Math.floor(Math.random() * 256);
            const RGB = `rgb(${R},${G},${B})`;
            box.style.background = RGB;
        }))
    })
    document.body.appendChild(btn).classList.add('btn')
}
rgbColors()

function blackColor() {
    const btn = document.createElement('button')
    btn.textContent = 'BLACK';
    btn.addEventListener('click', function () {
        boxs.forEach(box => box.addEventListener('mouseover', function() {
            this.style.background = 'black'
        }))
    })
    document.body.appendChild(btn).classList.add('btn')
}
blackColor() 


function reSize(x,y) {
    const btn = document.createElement('button')
    btn.textContent = 'GRID SIZE'
    btn.addEventListener('click', () => {
        let user = prompt('WHAT SIZE YOU WANT YOUR GRID TO BE?' ,'THE CURRENT SIZE IS 16')
        if(user !== null || user !== " "){
            x = Number(user);
            y = x;
            //window.removeEventListener('onload', creatDivs)
        }
       
        creatDivs(x,y)
    })
    document.body.appendChild(btn)
    return;
}
reSize()