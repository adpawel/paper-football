export class Point {
    x: number;
    y: number;
    id: number;
    wasReached: boolean = false;
  
    // Konstruktor
    constructor(x: number, y: number, id:number) {
      this.x = x;
      this.y = y;
      this.id = id;
    }
  
    setWasReached(value:boolean): void{
        this.wasReached = value;
    }
  }

  