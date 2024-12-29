import React, { useRef, useEffect, useState } from 'react';
import { Point } from '../models/Point';

const size_x = 500;
const size_y = 600;
const offset_x = 10;
const offset_y = 40;
const dotRadius = 5;
const coordinates:{x:number, y:number}[] = [];
let points:Point[] = [];

const createCoordinates = () => {
    coordinates.push({x: 4 * 60 + offset_x, y: offset_x});

    for(let i = 1; i < 8; i++){
        if(i !== 4){
            coordinates.push({x: i * 60 + offset_x, y: offset_y});
            coordinates.push({x: i * 60 + offset_x, y: 8 * 65 + offset_y});
        }
    }

    for (let i = 1; i < 8; i++) {
        for(let j = 0; j < 9; j++){
            coordinates.push({ x: j * 60 + offset_x, y: i * 65 + offset_y});
        }
    }

    coordinates.push({x: 4 * 60 + offset_x, y: size_y - offset_x});
};

const assignPoints = () => {
    let index = 0;
    points.push(new Point(4, -1, index));
    index++;

    for(let i = 1; i < 8; i++){
        if(i !== 4) {
            points.push(new Point(i, 0, index));
            index++;
            points.push(new Point(i, 8, index));
            index++;
        }
    }

    for (let i = 1; i < 8; i++) {
        for(let j = 0; j < 9; j++){
            points.push(new Point(j, i, index));
            index++;
        }
    }
    
    points.push(new Point(4, 9, index));
};

const drawDot = (x:number, y:number, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.stroke();
};

const setUp = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, size_x, size_y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    createCoordinates();
    coordinates.map((c) => (
        drawDot(c.x, c.y, ctx)
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
    const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null); // Przechowujemy wybrany punkt
    const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null); // Przechowujemy początek linii
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return; // Jeśli canvas jest null, zakończ działanie
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      setUp(ctx);

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
        coordinates.forEach(c => {
          if (isCursorOverDot(cursorX, cursorY, c.x, c.y, dotRadius)) {
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

      if (lineStart && selectedPoint && (lineStart.x !== selectedPoint.x || lineStart.y !== selectedPoint.y)) {
        ctx.beginPath();
        ctx.moveTo(lineStart.x, lineStart.y);
        ctx.lineTo(selectedPoint.x, selectedPoint.y);
        ctx.stroke();
        setLineStart({x: selectedPoint.x, y: selectedPoint.y});
      }
    }, [selectedPoint, lineStart]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const cursorX = e.nativeEvent.offsetX;
        const cursorY = e.nativeEvent.offsetY;
    
        // Sprawdzanie, czy kliknięto na jedną z kropek
        for (let c of coordinates) {
          const dx = cursorX - c.x;
          const dy = cursorY - c.y;
          if (Math.sqrt(dx * dx + dy * dy) <= dotRadius) {
            if (!lineStart) {
              // Jeśli nie ma punktu początkowego, ustaw go
              setLineStart({ x: c.x, y: c.y });
            } else {
              // Jeśli jest już punkt początkowy, rysujemy linię
              setSelectedPoint({ x: c.x, y: c.y });
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
        style={{ border: '1px solid #000' }}
        onClick={handleCanvasClick} // Obsługuje kliknięcie na canvasie
        />
    );
};

export default Pitch;
