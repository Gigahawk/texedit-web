const container = document.querySelector('.container')
window.addEventListener('onload', creatDivs(16,16));
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








function grayColor() { 
    const btn = document.createElement('button')
    btn.textContent = "Gray"
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