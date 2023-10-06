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
      let isChaotic = i >= numLetters / 2; // First half orderly, second half chaotic
      letters.push(new Letter(p5, isChaotic));
    }
  };

  const draw = (p5) => {
    p5.background(0);
    for (let letter of letters) {
      letter.update(p5);
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
    constructor(p5, isChaotic = false) {
      this.isChaotic = isChaotic;
      this.baseRadius = isChaotic
        ? p5.random(50, 300)
        : radii[Math.floor(p5.random(radii.length))];
      this.radiusOffset = p5.random(-20, 20);
      this.angle = p5.random(p5.TWO_PI);
      this.speed = isChaotic ? p5.random(0.01, 0.07) : p5.random(0.005, 0.05);
      this.oscillationSpeed = isChaotic
        ? p5.random(0.02, 0.06)
        : p5.random(0.01, 0.03);
      this.char = String.fromCharCode(65 + Math.floor(p5.random(26)));
      this.pos = p5.createVector(
        p5.width / 2 + this.baseRadius * p5.cos(this.angle),
        p5.height / 2 + this.baseRadius * p5.sin(this.angle)
      );
    }

    update(p5) {
      this.angle += this.speed;

      let oscillationAmplitude = this.isChaotic ? 50 : 10;
      this.radiusOffset += this.oscillationSpeed;
      let currentRadius =
        this.baseRadius + oscillationAmplitude * p5.sin(this.radiusOffset);

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
          color: "white",
          fontSize: "48px",
          fontWeight: "bold",
          zIndex: 2,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Vortext
      </div>
    </div>
  );
}
