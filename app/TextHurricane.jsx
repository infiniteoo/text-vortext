"use client";
import React from "react";
import Sketch from "react-p5";

export default function TextHurricane() {
  let letters = [];
  const numLetters = 1000;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < numLetters; i++) {
      letters.push(new Letter(p5));
    }
  };

  const draw = (p5) => {
    p5.background(0);
    for (let letter of letters) {
      letter.update();
      letter.display(p5);
    }
  };

  class Letter {
    constructor(p5) {
      this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      this.vel = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
      this.char = String.fromCharCode(65 + Math.floor(p5.random(26))); // Random letter A-Z
    }

    update() {
      this.pos.add(this.vel);
      if (this.pos.x < 0 || this.pos.x > p5.width) this.vel.x *= -1;
      if (this.pos.y < 0 || this.pos.y > p5.height) this.vel.y *= -1;
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
          whiteSpace: "pre",
        }}
      >
        {/* Your ASCII Art Here */}
      </div>
    </div>
  );
}
