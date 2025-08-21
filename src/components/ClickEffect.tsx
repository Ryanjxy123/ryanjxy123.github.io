import React, { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number; // 剩余生命，粒子消失依据
};

export default function MultiCircleClickEffect() {
  const ballsRef = useRef<Ball[]>([]);
  const animationFrameId = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // 生成随机颜色
  function randomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  }

  // 生成随机速度（散开）
  function randomVelocity() {
    const angle = Math.random() * 2 * Math.PI;
    const speed = 2 + Math.random() * 1.5;
    return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
  }

  // 点击时添加多个粒子
  function addBalls(x: number, y: number) {
    const newBalls: Ball[] = [];
    const count = 15 + Math.floor(Math.random() * 10);
    for (let i = 0; i < count; i++) {
      const size = 8 + Math.random() * 4;
      const color = randomColor();
      const { vx, vy } = randomVelocity();
      newBalls.push({ x, y, size, color, vx, vy, life: 60 });
    }
    ballsRef.current.push(...newBalls);
  }

  // 动画循环，更新粒子位置和生命
  function animate() {
    const ctx = containerRef.current?.getContext("2d");
    if (!ctx) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ballsRef.current = ballsRef.current.filter((ball) => ball.life > 0);

    ballsRef.current.forEach((ball) => {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.life--;
      // 粒子逐渐变小和透明
      const alpha = ball.life / 60;
      ctx.fillStyle = ball.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const canvas = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function handleClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addBalls(x, y);
    }

    window.addEventListener("click", handleClick);
    // 设置 canvas 尺寸（根据窗口）
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}
