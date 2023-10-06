// components/TextHurricane.js
"use client";
import React from "react";
import Sketch from "react-p5";

export default function TextCircles() {
  let letters = [];
  const numLetters = 1000;
  const radii = [100, 200, 300];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < numLetters; i++) {
      let radius = radii[i % radii.length]; // Cycle through the radii
      letters.push(new Letter(p5, radius));
    }
  };

  const draw = (p5) => {
    p5.background(0);
    for (let letter of letters) {
      letter.update(p5); // Ensure p5 is passed here
      letter.display(p5);
    }

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      letters = [];
      for (let i = 0; i < numLetters; i++) {
        let radius = radii[i % radii.length];
        letters.push(new Letter(p5, radius));
      }
    };
  };

  class Letter {
    constructor(p5, baseRadius) {
      this.baseRadius = baseRadius;
      this.radiusOffset = p5.random(-20, 20); // Random offset for oscillation
      this.angle = p5.random(p5.TWO_PI); // Random starting angle
      this.speed = p5.random(0.005, 0.05); // Variable speed
      this.oscillationSpeed = p5.random(0.01, 0.03); // Speed of oscillation
      this.char = String.fromCharCode(65 + Math.floor(p5.random(26))); // Random letter A-Z
    }

    update(p5) {
      this.angle += this.speed;

      // Oscillate the radius
      this.radiusOffset += this.oscillationSpeed;
      let currentRadius = this.baseRadius + 10 * p5.sin(this.radiusOffset);

      this.pos = p5.createVector(
        p5.width / 2 + currentRadius * p5.cos(this.angle),
        p5.height / 2 + currentRadius * p5.sin(this.angle)
      );
    }

    display(p5) {
      p5.fill(255);
      p5.text(this.char, this.pos.x, this.pos.y);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <Sketch setup={setup} draw={draw} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Courier New",
          whiteSpace: "",
        }}
      >
        {/* Your ASCII Art Here */}
      </div>
    </div>
  );
}
