const paletteContainer = document.querySelector('.palette_container')
const imageContainer = document.querySelector('.image_container')
const btnBlack = document.createElement('button')
const btnRgb = document.createElement('button')
const btnGray = document.createElement('button')
const btnSize = document.createElement('button')
const section = document.querySelector('.section');
const buttonsContainer = document.querySelector('.buttons');

const containerSideLength = 600;

window.onload = () => {
    const boxs = paletteContainer.querySelectorAll('.box')
    boxs.forEach(box => box.addEventListener('mouseover', () => {
        box.style.background = 'black'
    }))
}

function setPixels(container, width, height, colorList) {
    var containerHeight;
    var containerWidth;
    if(width >= height) {
        containerWidth = containerSideLength;
        containerHeight = containerSideLength*height/width;
    } else {
        containerHeight = containerSideLength;
        containerWidth = containerSideLength*width/height;
    }
    container.style.width = `${containerWidth}px`;
    container.style.height = `${containerHeight}px`;
    for(let i = 0; i <  (width * height); i++) {
        const div = document.createElement("div");
        if(colorList != undefined) {
            div.style.backgroundColor = colorList[i];
        }
        container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
        container.appendChild(div).classList.add("box");
    }
}

function setPalettePixels(width, height, colorList) {
    setPixels(paletteContainer, width, height, colorList);
}

function setImagePixels(width, height, colorList) {
    setPixels(imageContainer, width, height, colorList);
}


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

async function readFile(file) {
    let result = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        reader.readAsArrayBuffer(file)
    })
    return new Uint8Array(result);
}

document.getElementById("load_form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const palette = await readFile(data.palette_file);
    const colorArray = setPalette(palette, data.palette_format);

    const image = await readFile(data.image_file)
    setImage(
        image, colorArray, parseInt(data.image_bpp),
        parseInt(data.image_width), parseInt(data.image_height)
    );
})

function setPalette(byteArray, format) {
    var colorArray;
    if (format == "RGBA") {
        let paletteArray = new Uint32Array(byteArray.buffer)

        colorArray = uint32ArrayToCSSColors(paletteArray)

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

        resetPalette();
        setPalettePixels(palette_width, palette_height, colorArray);
    } else {
        console.error("Unsupported format " + format)
    }
    return colorArray;
}

function bitSetToInt(bs) {
    let arr = bs.toArray();
    let out = 0;
    for (let i of arr) {
        out += 2**i;
    }
    return out;
}

function setImage(imageArray, colorArray, bpp, width, height) {
    const imageBitsLength = imageArray.length*8;
    const imageBits = new BitSet(imageArray);
    let imageColorArray = [];
    for (let i = 0; i < imageBitsLength; i+=bpp) {
        slice = imageBits.slice(i, i + bpp - 1);
        paletteIdx = bitSetToInt(slice);
        color = colorArray[paletteIdx]
        imageColorArray.push(color);
    }
    console.logImageColorArray

    resetImage();
    setImagePixels(width, height, imageColorArray);
}


function resetContainer(container) {
    const boxs = container.querySelectorAll('.box');
    boxs.forEach(box => {
        box.remove();
    })
}

function resetPalette() {
    resetContainer(paletteContainer);
}

function resetImage() {
    resetContainer(imageContainer);
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



