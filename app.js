const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleTab;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    drawIt() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    MAJ() {
        if(this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = this.directionX;
        }
        if(this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.drawIt();
    }
}

// const obj1 = new Particle(200,200,50,50,100,"black");
// console.log(obj1);
// obj1.drawIt();

function init() {
    particleTab = [];
    for(let i = 0; i < 100; i++) {
        let size = (Math.random() + 0.01) * 20;
        let x = Math.random() * (window.innerWidth - size * 2);
        let y = Math.random() * (window.innerHeight - size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = "lightgray";

        particleTab.push(new Particle(x,y,directionX, directionY,size,color));
    }
}

function animation() {
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    for(let i = 0; i < particleTab.length; i++) {
        particleTab[i].MAJ();
    }
}

init();
animation();
console.log(particleTab)

function resize() {
    init();
    animation();
}


let doit;
window.addEventListener('resize', () => {
    clearTimeout(doit);
    doit = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})