const container = document.querySelector('.container')
const btnBlack = document.createElement('button')
const btnRgb = document.createElement('button')
const btnGray = document.createElement('button')
const btnSize = document.createElement('button')
const section = document.querySelector('.section');
const buttonsContainer = document.querySelector('.buttons');

window.onload = () => {
    const boxs = container.querySelectorAll('.box')
    boxs.forEach(box => box.addEventListener('mouseover', () => {
        box.style.background = 'black'
    }))
}


function creatDivs(width , height, colorList) {
    console.log(colorList)
    for(let i = 0;i < (width * height); i++) {
        const div = document.createElement('div') 
        if (colorList != undefined) {
            console.log(colorList[i])
            div.style.backgroundColor = colorList[i]
        }
        container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
        container.appendChild(div).classList.add('box')
    }
}
creatDivs(16,16)


function factorial(num) {
    return [...Array(num + 1).keys()].filter(
        (i) => num % i === 0
    );
}

function isOdd(num) {
    return num % 2
}

function uint32ArrayToCSSColors(uint32Array) {
    return Array.from(uint32Array, color => {
        let a = ((color >> 24) & 0xFF) / 0x80; // Convert alpha from 0-255 to 0-1 for CSS
        let b = (color >> 16) & 0xFF;
        let g = (color >> 8)  & 0xFF;
        let r = (color & 0xFF);

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    });
}

document.getElementById("load_form").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    

    const palette_reader = new FileReader();
    palette_reader.onload = function(event) {
        const arrayBuffer = event.target.result; // Get ArrayBuffer
        const byteArray = new Uint8Array(arrayBuffer); // Convert to Uint8Array
        setPalette(byteArray, data.palette_format);
    };
    palette_reader.onerror = function(error) {
        console.error("Error reading file:", error);
    };
    palette_reader.readAsArrayBuffer(data.palette_file); // Read file as ArrayBuffer

    console.log(data.palette_file)
})

function setPalette(byteArray, format) {
    if (format == "RGBA") {
        console.log(byteArray)
        let paletteArray = new Uint32Array(byteArray.buffer)
        console.log(paletteArray)

        let colorArray = uint32ArrayToCSSColors(paletteArray)

        // Generate palette dimensions (as square as possible)
        factors = factorial(paletteArray.length)
        factor_idx = Math.floor(factors.length/2)
        if (isOdd(factors.length)) {
            palette_width = factors[factor_idx];
            palette_height = factors[factor_idx];
        } else {
            palette_width = factors[factor_idx];
            palette_height = factors[factor_idx + 1];
        }

        reSet();
        creatDivs(palette_width, palette_height, colorArray);



    } else {
        console.error("Unsupported format " + format)
    }
}

function grayColor() { 
    
    const boxs = container.querySelectorAll('.box')
    btnGray.textContent = "GRAY"
    btnGray.addEventListener('click', () => {
        boxs.forEach(box => box.addEventListener('mouseover', ()=> {
            let RNum = Math.floor(Math.random() * 256);
            let GrayScale = `rgb(${RNum},${RNum},${RNum})`
            box.style.background = GrayScale;
        }))
    })
    buttonsContainer.appendChild(btnGray).classList.add('btn')
}
grayColor()


function rgbColors() {
    
    const boxs = container.querySelectorAll('.box')
    btnRgb.textContent = "RGB"
    btnRgb.addEventListener('click' ,() => {
        boxs.forEach(box => box.addEventListener('mouseover', () => {
            let R = Math.floor(Math.random() * 256);
            let G = Math.floor(Math.random() * 256);
            let B = Math.floor(Math.random() * 256);
            const RGB = `rgb(${R},${G},${B})`;
            box.style.background = RGB;
        }))
    })
    buttonsContainer.appendChild(btnRgb).classList.add('btn')
}
rgbColors()

function blackColor() {
   
    const boxs = container.querySelectorAll('.box')
    btnBlack.textContent = 'BLACK';
    btnBlack.addEventListener('click', function () {
        boxs.forEach(box => box.addEventListener('mouseover', function() {
            this.style.background = 'black'
        }))
    })
    buttonsContainer.appendChild(btnBlack).classList.add('btn')
}
blackColor() 

function reSet() {
    const boxs = container.querySelectorAll('.box')
    boxs.forEach(box => {
        box.remove();
    })
}



function reSize() {
   
    btnSize.textContent = 'GRID SIZE'
    btnSize.addEventListener('click', () => {
        let user = prompt('WHAT SIZE YOU WANT YOUR GRID TO BE?')
        if(user === null || user < 1){
            reSet();
            creatDivs(16,16);
            grayColor();
            rgbColors();
            blackColor();
        } else { 
            reSet();
            creatDivs(user,user);
            grayColor();
            rgbColors();
            blackColor();
        }
    })
    buttonsContainer.appendChild(btnSize).classList.add('btn')
}
reSize()

function backgrooundAnim() {

    colors = ['red','green','blue', 'yellow'];
    const section = document.querySelector('.section');
    const span = document.createElement('span');

    let size = Math.random() * 50;

    span.style.width = 10 + size + 'px';
    span.style.height = 10 + size + 'px';
    span.style.borderRadius = `${size}%`;
    span.style.top = Math.random() * innerHeight + "px";
    span.style.left = Math.random() * innerWidth + "px";

    const bg = colors[Math.floor(Math.random() * colors.length)];
    span.style.background = bg;

    section.appendChild(span);

    setTimeout(() => {span.remove()},5000)
}

setInterval(backgrooundAnim, 150);