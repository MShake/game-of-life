let matrice;
let generationNumber = 1;
const resolution = randomIntBetween(30, 60);
const timeBetweenGeneration = 50; // ms
const xDimension = Math.floor(window.innerWidth / resolution);
const yDimension = Math.floor(window.innerHeight / resolution);
document.getElementById('grid').setAttribute('width', window.innerWidth);
document.getElementById('grid').setAttribute('height', window.innerHeight);

const cellColor = randomIntBetween(100000, 999999);

main();

function main(){

    matrice = getMatrice(xDimension, yDimension);
    matrice = initMatrice(matrice);
    draw(matrice);
    setInterval(function(){
        generationNumber++;
        document.getElementById('generationNumber').innerHTML = 'Generation: ' + generationNumber;
        matrice = computeNextGeneration(matrice);
        draw(matrice);
    }, timeBetweenGeneration); 
};


function randomIntBetween(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMatrice(xDimension, yDimension) {
    let array = new Array(xDimension);
    for (x = 0; x < xDimension; x++) {
        array[x] = new Array(yDimension);
    }
    return array;
}

function initMatrice(matrice) {
    for (x = 0; x < matrice.length; x++) {
        for (y = 0; y < matrice[x].length; y++) {
            matrice[x][y] = randomIntBetween(0, 1);
        }
    }
    return matrice;
};

function draw(matrice) {
    var ctx = document.getElementById('grid').getContext('2d');
        
    for (let x = 0, i = 0; i < xDimension; x += 10, i++) {
        for (let y = 0, j = 0; j < yDimension; y += 10, j++) {
            const x = i * resolution;
            const y = j * resolution; 
            ctx.beginPath();
            if(matrice[i][j] == 1) {
                ctx.fillStyle = "#" + cellColor;
            } else {
                ctx.fillStyle = "#FFF";
            }       
            //ctx.arc(x,y,5,0,2*Math.PI)  
            ctx.rect(x, y,resolution, resolution);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function countNeighbors(matrice, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + xDimension) % xDimension;
            let row = (y + j + yDimension) % yDimension;
            sum += matrice[col][row];
        }
    }
    sum -= matrice[x][y];
    return sum;
}

function computeNextGeneration(matrice) {
    let nextGenaration = getMatrice(xDimension, yDimension);

    for (x = 0; x < matrice.length; x++) {
        for (y = 0; y < matrice[x].length; y++) {
            let state = matrice[x][y];
            let neighbors = countNeighbors(matrice, x, y);

            if (state == 0 && neighbors == 3) {
                nextGenaration[x][y] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                nextGenaration[x][y] = 0;
            } else {
                nextGenaration[x][y] = matrice[x][y];
            }
            //console.log(neighbors);
        }
    }

    return nextGenaration;
};

