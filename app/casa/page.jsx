'use client';  // This marks the component as a client component

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Header1 from "@/components/layout/header/Header1"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './dusklec.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimationWithRef = () => {
  // Create a reference for the box container
  const main = useRef();

  useLayoutEffect(() => {
    // Select all elements with the class 'box'
    const boxes = gsap.utils.toArray('.box');

    // Animate the boxes when they come into view
    gsap.to(boxes, {
      x: 0,  // Move the box horizontally by 50px
      borderRadius: '0px',  // Increase the border-radius to 50px
        borderRadius: '0px',  // Set the border-radius values
      transform: 'translate(0px, 0px)', 
      width: '100%',  // Increase the width of the box
      height: '650px',
      scrollTrigger: {
      	ease: "power2.out",
        trigger: boxes,  // The box itself will trigger the animation
        start: 'top 80%',  // Start when the bottom of the box hits the bottom of the viewport
        end: 'bottom 60%',  // End when the top of the box reaches 10% of the viewport height (you can adjust this value)
        scrub: true,  // Smooth out the scroll animation as you scroll
        // markers: true,  // Uncomment to see the markers for debugging
      },
    });
  }, []);

  return (
  	<>
  	<Header1 />
    <div>
      <section className="section_pos section flex-center column">
        <h2>Basic ScrollTrigger with React</h2>
        <p>Scroll down to see the magic happen!!</p>
      </section>
      
      <div className="section flex-center column relative absolute top-0" ref={main}>
        <div className="box gradient-blue">box 1</div>
      </div>
      
      <section className="section"></section>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    dk fd

    <div className="skhd">
    </div>
    </>
  );
};

export default ScrollAnimationWithRef;
