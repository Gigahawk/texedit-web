const paletteContainer = document.querySelector('.palette_container')
const btnBlack = document.createElement('button')
const btnRgb = document.createElement('button')
const btnGray = document.createElement('button')
const btnSize = document.createElement('button')
const section = document.querySelector('.section');
const buttonsContainer = document.querySelector('.buttons');

window.onload = () => {
    const boxs = paletteContainer.querySelectorAll('.box')
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
        paletteContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        paletteContainer.style.gridTemplateRows = `repeat(${height}, 1fr)`;
        paletteContainer.appendChild(div).classList.add('box')
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


function reSet() {
    const boxs = paletteContainer.querySelectorAll('.box')
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



