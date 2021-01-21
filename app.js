const container = document.querySelector('.container')

function creatDivs(col , rows) {

    for(let i = 0;i < (col * rows); i++) {
        const div = document.createElement('div')
        container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        div.style.border = '1px solid red'
        container.appendChild(div).classList.add('box')
    }

    const boxs = container.querySelectorAll('div')
    boxs.forEach(box => box.addEventListener('mouseover', changeColor))
}

creatDivs(16,16)

function changeColor() {

    let RNum = Math.floor(Math.random() * 256);
    let RGB = `rgb(${RNum},${RNum},${RNum})`
    this.style.background = RGB;
    console.log(RGB)
}