import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const data = [
  { place: 'London', title: 'LONDON', title2: 'PREFECTURE', image: 'https://travelogy.digilogy.co/demo1.jpg' },
  { place: 'Switzerland Alps', title: 'SAINT', title2: 'ANTONIEN', image: 'https://travelogy.digilogy.co/demo2.jpg' },
  { place: 'Australia - Morocco', title: 'MOROCCO', title2: 'MERZOUGA', image: 'https://travelogy.digilogy.co/demo3.jpeg' },
  { place: 'Switzerland Alps', title: 'ALPS', title2: 'ANTONIEN', image: 'https://travelogy.digilogy.co/demo2.jpg' },
  { place: 'Australia - Morocco', title: 'AUSTRALIA', title2: 'MERZOUGA', image: 'https://travelogy.digilogy.co/demo3.jpeg' },
  { place: 'London', title: 'LONDON', title2: 'PREFECTURE', image: 'https://travelogy.digilogy.co/demo1.jpg' },
];

const Slider = () => {
  const cardsRef = useRef([]);
  const orderRef = useRef(data.map((_, index) => index));

  const getResponsiveValues = () => {
    const width = window.innerWidth;

    if (width <= 480) { // Mobile (320px - 480px)
      return {
        mainHeight: 650,
        smallCardWidth: 150,
        smallCardHeight: 180,
        smallCardStartX: width * 0.30, // Right-aligned positioning
        smallCardSpacing: 180,
        smallCardY: 390,
        smallCardAnimateY: 390,
        borderRadius: 10,
        FontSize: 12,
      };
    } else if (width <= 768) { // Tablet (768px)
      return {
        mainHeight: 500,
        smallCardWidth: 110,
        smallCardHeight: 170,
        smallCardStartX: width * 0.35,
        smallCardSpacing: 135,
        smallCardY: 350,
        smallCardAnimateY: 370,
        borderRadius: 10,
        FontSize: 14,
      };
    } else { // Desktop
      return {
        mainHeight: 650,
        smallCardWidth: 180,
        smallCardHeight: 250,
        smallCardStartX: width * 0.55,
        smallCardSpacing: 240,
        smallCardY: 470,
        smallCardAnimateY: 470,
        borderRadius: 15,
        FontSize: 10,
      };
    }
  };

  const init = () => {
    const values = getResponsiveValues();
    const [active, ...rest] = orderRef.current;

    gsap.set(cardsRef.current[active], {
      x: 0,
      y: 0,
      width: "100%", // Use percentage for full-width reliability
      height: values.mainHeight,
      borderRadius: 0,
    });

    // Initial text animation for the first slide - Sync all elements and smoothen
    gsap.fromTo(cardsRef.current[active].querySelectorAll('.anim-text'),
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0,
        ease: 'power2.in',
      }
    );

    rest.forEach((i, index) => {
      // Ensure small card text is visible
      gsap.set(cardsRef.current[i].querySelectorAll('.anim-text'), {
        opacity: 1,
        yPercent: 0
      });

      gsap.set(cardsRef.current[i], {
        x: values.smallCardStartX + index * values.smallCardSpacing,
        y: values.smallCardY,
        width: values.smallCardWidth,
        height: values.smallCardHeight,
        borderRadius: values.borderRadius,
        zIndex: 10 + index,
      });
    });
  };

  useEffect(() => {
    const animateSlider = () => {
      const order = orderRef.current;
      order.push(order.shift());

      const [active, ...rest] = order;
      const prev = rest[rest.length - 1];
      const values = getResponsiveValues();
      const screenWidth = window.innerWidth;

      // Active Card Transition
      gsap.to(cardsRef.current[active], {
        x: 0,
        y: 0,
        width: "100%",
        height: values.mainHeight,
        borderRadius: 0,
        zIndex: 2, // Slightly higher than background
        duration: 0.8,
        ease: 'power2.in',
      });

      // Text Animations based on Screen Size
      const isMobile = screenWidth <= 480;
      const isTablet = screenWidth <= 768;

      // Sync all text elements to come at the same time with smooth transition
      gsap.fromTo(cardsRef.current[active].querySelectorAll('.anim-text'),
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0,
          ease: 'power2.in',
          clearProps: "transform",
        }
      );

      // Move Remaining Cards
      rest.forEach((i, index) => {
        if (i !== prev) {
          gsap.to(cardsRef.current[i], {
            x: values.smallCardStartX + index * values.smallCardSpacing,
            y: values.smallCardAnimateY,
            width: values.smallCardWidth,
            height: values.smallCardHeight,
            zIndex: 10 + index,
            duration: 0.5,
            ease: 'sine.inOut',
          });
          // Keep the previous card in background and static during transition
          gsap.set(cardsRef.current[prev], {
            zIndex: 1,
            x: 0,
            y: 0,
            width: "100%",
            height: values.mainHeight,
            borderRadius: 0
          });

          // Snap the card that was just main to the back of the queue AFTER it's covered
          gsap.set(cardsRef.current[prev], {
            x: values.smallCardStartX + (rest.length - 1) * values.smallCardSpacing,
            y: values.smallCardY,
            width: values.smallCardWidth,
            height: values.smallCardHeight,
            borderRadius: values.borderRadius,
            zIndex: 10 + (rest.length - 1),
            delay: 0.8 // Matches active card expansion duration
          });
        }
      });
    };

    init();
    const interval = setInterval(animateSlider, 4000);

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="slider-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden', height: '750px' }}>
      <div className="slider-container" style={{ position: 'relative', width: '100%' }}>
        {data.map((item, index) => (
          <div
            key={index}
            className="card"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{
              backgroundImage: `url(${item.image})`,
              position: 'absolute',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden'
            }}
          >
            <div className="card-content">
              <div className="card_sub">
                <div className="content-start anim-text"></div>
                <div className="content-place anim-text">{item.place}</div>
                <div className="content-title-1 anim-text">{item.title}</div>
                <div className="content-title-2 anim-text">{item.title2}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
