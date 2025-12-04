function Rectangle(length, width){
    this.length = length; // 700
    this.width = width; //350
}


Rectangle.prototype.getArea = function(){
    let area = this.length * this.width;
    console.log(area);
}



// const phoneScreen = new Rectangle(700, 350);

function Square(side){
    this.side = side;
    Rectangle.call(this, side, side);
}

// console.log(Rectangle.prototype);
Square.prototype = Object.create(Rectangle.prototype);
// console.log(Square.prototype);

Square.prototype.constructor = Square;

Square.prototype.logArea = function(){
    this.getArea()
}


const appleWatchScreen = new Square(150);
console.log(appleWatchScreen)