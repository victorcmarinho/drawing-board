/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Loading from 'components/Loading/Loading';
import { SplashProvider } from 'hooks/LoadingContext';
import GlobalStyles from 'styles/global';
const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [contextRef, setContextRef] = useState<CanvasRenderingContext2D>();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'rgb(255,174,61)';
    context.lineWidth = 5;
    setContextRef(context);
  }, []);

  const startDrawing = ({ nativeEvent }: any) => {
    const event = nativeEvent as MouseEvent;
    const { offsetX, offsetY } = event;
    contextRef?.beginPath();
    contextRef?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef?.closePath();
    setIsDrawing(false);
  };

  const drawn = ({ nativeEvent }: any) => {
    if (!isDrawing) return;
    const event = nativeEvent as MouseEvent;
    const { offsetX, offsetY } = event;
    contextRef?.lineTo(offsetX, offsetY);
    contextRef?.stroke();
  };

  return (
    <>
      <SplashProvider SplashScreen={Loading}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawn}
        ></canvas>
      </SplashProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
