// クラス図 演習2

interface Shape {
    calcArea(): number;
}

class Rectangle implements Shape {
    private width: number;
    private height: number;

    calcArea(): number {
        return this.width * this.height;
    }
}

class Circle implements Shape {
    private radius: number;

    calcArea(): number {
        return this.radius * this.radius * Math.PI;
    }
}

class Client {
    private shape: Shape;
}