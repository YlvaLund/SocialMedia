import React, { useRef, useEffect, useState } from "react";

export default function GradientCanvas() {
  const [width, setWidth] = useState(document.body.clientWidth);
  const [height, setHeight] = useState(document.body.clientHeight);
  const gradientCanvas = useRef();
  let pixels = [];
  const COLORS = [
    { r: 144, g: 242, b: 243 },
    { r: 225, g: 230, b: 240 },
    { r: 148, g: 167, b: 174 },
    { r: 138, g: 157, b: 164 },
    { r: 200, g: 118, b: 106 },
    { r: 250, g: 108, b: 96 },
  ];

  useEffect(() => {
    function handleResize() {
      setWidth(document.body.clientWidth);
      setHeight(document.body.clientHeight);
    }

    // Attach the event listener to the window object
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const context = gradientCanvas.current.getContext("2d");
    let totalParticles = 6;
    let maxRadius = 900;
    let minRadius = 300;

    if (gradientCanvas.current) {
      gradientCanvas.current.width = width;
      gradientCanvas.current.height = height;
    }

    const animate = () => {
      //
      requestAnimationFrame(animate);
      context.clearRect(0, 0, width, height);

      if (pixels?.length > 0 && gradientCanvas.current) {
        for (let p of pixels) {
          p.animate(context, p.rgb.r, p.rgb.g, p.rgb.b, p.posX, p.posY, p.radius);
          p.posX += p.velocityX;
          p.posY += p.velocityY;
          p.radius += p.sinusValue;

          if (p.radius >= maxRadius) {
            p.sinusValue *= -1;
          } else if (p.radius <= minRadius) {
            p.sinusValue *= -1;
          }

          if (p.posX <= 0) {
            p.posX = 10;
            p.velocityX *= -1;
          } else if (p.posX >= width) {
            p.posX = width - 10;
            p.velocityX *= -1;
          } else if (p.posY <= 0) {
            p.posY = 10;
            p.velocityY *= -1;
          } else if (p.posY >= height) {
            p.posY = height - 10;
            p.velocityY *= -1;
          }
        }
      }
    };

    function createParticles() {
      let currentColorPosition = 0;

      for (let i = 0; i < totalParticles; i++) {
        pixels.push({
          posX: Math.random() * width,
          posY: Math.random() * height,
          radius: Math.random() * (maxRadius - minRadius) + minRadius,
          sinusValue: Math.random(),
          rgb: COLORS[currentColorPosition++],
          velocityX: Math.random(),
          velocityY: Math.random(),
          animate: (ctx, red, green, blue, posX, posY, radius) => {
            ctx.beginPath();
            let gradient = ctx.createRadialGradient(posX, posY, radius * 0.01, posX, posY, radius);
            gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 1)`);
            gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
            ctx.fillStyle = gradient;
            ctx.arc(posX, posY, radius, Math.PI * 2, false);
            ctx.fill();
          },
        });
        if (currentColorPosition >= COLORS.length) {
          currentColorPosition = 0;
        }
      }
    }
    createParticles();
    requestAnimationFrame(animate);

    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ position: "absolute", top: "0px", left: "0px", zIndex: "-1", height: "50vh", overflow: "hidden", width: "100%" }}>
      <canvas ref={gradientCanvas} />
      <div className="custom-shape-divider-bottom-1712250562">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
}

// Idea references
// https://www.youtube.com/watch?v=D6EiRSRhsbQ
// https://stripe.com/en-no

// https://www.shapedivider.app/ <- used for the oval path ;)
