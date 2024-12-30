import React, { useRef, useEffect, useState } from 'react';
import { Point } from '../models/Point';
import { Modal } from 'bootstrap';


const size_x = 500;
const size_y = 600;
const offset_x = 10;
const offset_y = 40;
const dotRadius = 5;
let points:Point[] = [];
let index = 0;
let edges:{p1:Point, p2:Point}[] = [];

const triggerModal = () => {
  const modalElement = document.getElementById('staticBackdrop');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
};


const createPoints = () => {
    points.push(new Point(4 * 60 + offset_x, offset_x, index));
    index++;

    for(let i = 1; i < 8; i++){
        if(i !== 4){
            points.push(new Point(i * 60 + offset_x, offset_y, index));
            index++;
            points.push(new Point(i * 60 + offset_x, 8 * 65 + offset_y, index));
            index++; 
        }
    }

    for (let i = 1; i < 8; i++) {
        for(let j = 0; j < 9; j++){
            points.push(new Point(j * 60 + offset_x, i * 65 + offset_y, index));
            index++;
          }
    }

    points.push(new Point(4 * 60 + offset_x, size_y - offset_x, index));
    index++;

    const radius = 90
    for (let point of points) {
      for (let p of points) {
        const dx = point.x - p.x;
        const dy = point.y - p.y;
        if (Math.sqrt(dx * dx + dy * dy) <= radius) {
          point.addReachablePoint(p);
        }
      }
    }

};

const drawDot = (x:number, y:number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.stroke();
};

const isEndPoint = (point:Point):boolean => {
  return point.y === offset_x || point.y === size_y - offset_x;
}

const setUp = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, size_x, size_y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    createPoints();
    points.map((p) => (
        drawDot(p.x, p.y, ctx)
    ));

    // Draw field lines
    ctx.beginPath();
    // Top and bottom
    ctx.moveTo(10, 40);
    ctx.lineTo(190, 40);
    ctx.moveTo(310, 40);
    ctx.lineTo(490, 40);
    ctx.moveTo(310, 560);
    ctx.lineTo(490, 560);
    ctx.moveTo(10, 560);
    ctx.lineTo(190, 560);

    // Left and right sides
    ctx.moveTo(10, 562);
    ctx.lineTo(10, 38);
    ctx.moveTo(490, 562);
    ctx.lineTo(490, 38);

    // Goals
    ctx.moveTo(190, 42);
    ctx.lineTo(190, 10);
    ctx.moveTo(190, 10);
    ctx.lineTo(310, 10);
    ctx.moveTo(310, 8);
    ctx.lineTo(310, 42);

    ctx.moveTo(190, 558);
    ctx.lineTo(190, 590);
    ctx.moveTo(190, 590);
    ctx.lineTo(310, 590);
    ctx.moveTo(310, 590);
    ctx.lineTo(310, 558);

    ctx.stroke();
};

const Pitch = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null); // Przechowujemy wybrany punkt
    const [lineStart, setLineStart] = useState<Point | null>(null); // Przechowujemy początek linii
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return; // Jeśli canvas jest null, zakończ działanie
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setUp(ctx);
      // setting start point
      points.map((point) => {
        if(point.x === size_x/2 && point.y == size_y/2){
          setLineStart(point);
          point.setWasReached(true);
        }
      });

      const isCursorOverDot = (cursorX: number, cursorY: number, dotX: number, dotY: number, radius: number) => {
        const dx = cursorX - dotX;
        const dy = cursorY - dotY;
        return Math.sqrt(dx * dx + dy * dy) <= radius;
      };

      canvas.addEventListener('mousemove', (e) => {
        const cursorX = e.offsetX;
        const cursorY = e.offsetY;
        let cursorOnDot = false;
      
        // Sprawdzanie, czy kursor znajduje się nad którąś z kropek
        points.forEach(p => {
          if (isCursorOverDot(cursorX, cursorY, p.x, p.y, dotRadius)) {
            cursorOnDot = true;
          }
        });
      
        // Zmiana kursora na pointer, jeśli kursor jest nad kropką
        if (cursorOnDot) {
          canvas.style.cursor = 'pointer';
        } else {
          canvas.style.cursor = 'default';
        }
      });

    }, []); // Empty dependency array to run only once

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (lineStart && selectedPoint && lineStart.id !== selectedPoint.id) {
        ctx.beginPath();
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(selectedPoint.x, selectedPoint.y);
        ctx.stroke();
        edges.push({p1: lineStart, p2: selectedPoint});
        setLineStart(selectedPoint);
        if(isEndPoint(selectedPoint)){
          triggerModal();
        }
      }
    }, [selectedPoint, lineStart]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const cursorX = e.nativeEvent.offsetX;
        const cursorY = e.nativeEvent.offsetY;
    
        // Sprawdzanie, czy kliknięto na jedną z kropek
        for (let p of points) {
          const dx = cursorX - p.x;
          const dy = cursorY - p.y;
          const allowedPoint = p.reachablePoints.find(reachablePoint => reachablePoint.id === lineStart?.id);
          if (Math.sqrt(dx * dx + dy * dy) <= dotRadius && allowedPoint !== undefined) {
            if (!lineStart) {
              // Jeśli nie ma punktu początkowego, ustaw go
              setLineStart(p);
            } else {
              // Jeśli jest już punkt początkowy, rysujemy linię
              setSelectedPoint(p);
            }
            break;
          }
        }
      };

    return (
        <canvas
        ref={canvasRef}
        width={size_x}
        height={size_y}
        onClick={handleCanvasClick} // Obsługuje kliknięcie na canvasie
        />
    );
};

export default Pitch;
