const container = document.querySelector('.container')

function creatDivs(col , rows) {
    for(let i = 0;i < (col * rows); i++) {
        const div = document.createElement('div')
        container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        div.style.border = '1px solid red'
        container.appendChild(div).classList.add('box')
    }
}

creatDivs(16,16)