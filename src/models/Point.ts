export class Point {
    x: number;
    y: number;
    id: number;
    wasReached: boolean = false;
    reachablePoints: Point[] = [];
  
    // Konstruktor
    constructor(x: number, y: number, id:number) {
      this.x = x;
      this.y = y;
      this.id = id;
    }
  
    setWasReached(value:boolean): void{
        this.wasReached = value;
    }

    addReachablePoint(point:Point): void {
      this.reachablePoints.push(point);
    }

  }

  