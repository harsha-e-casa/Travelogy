import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';



const data = [
  {
    place: 'London',
    title: 'London',
    title2: 'PREFECTURE',
    description: '',
    image: 'https://travelogy.digilogy.co/demo1.jpg',
  },
  {
    place: 'Switzerland Alps',
    title: 'SAINT',
    title2: 'ANTONIEN',
    description: "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for tranquility and adventure.",
    image: 'https://travelogy.digilogy.co/demo2.jpg',
  },
  {
    place: 'Morocco',
    title: 'MARRAKECH',
    title2: 'MERZOUGA',
    description: "Morocco offers vibrant markets, desert landscapes, and rich cultural experiences.",
    image: 'https://travelogy.digilogy.co/demo3.jpeg',
  },

    {
    place: 'Switzerland Alps',
    title: 'SAINT',
    title2: 'ANTONIEN',
    description: "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for tranquility and adventure.",
    image: 'https://travelogy.digilogy.co/demo2.jpg',
  },
  {
    place: 'Morocco',
    title: 'MARRAKECH',
    title2: 'MERZOUGA',
    description: "Morocco offers vibrant markets, desert landscapes, and rich cultural experiences.",
    image: 'https://travelogy.digilogy.co/demo3.jpeg',
  },
  {
    place: 'London',
    title: 'London',
    title2: 'PREFECTURE',
    description: '',
    image: 'https://travelogy.digilogy.co/demo1.jpg',
  },
];



const Slider = () => {
  const cardsRef = useRef([]);
  const cardContentsRef = useRef([]);


 useEffect(() => {
    // Adding styles to the body when the component is mounted
    document.body.style.overflowX = 'hidden';

    // Cleanup function to reset body styles when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []); // Empty dependency array ensures it runs only on mount and unmount


  useEffect(() => {
    let order = data.map((_, index) => index);

    const init = () => {

      const [active, ...rest] = order;

      gsap.set(cardsRef.current[active], {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: 600,
      });

      rest.forEach((i, index) => {
        gsap.set(cardsRef.current[i], {
          x: 700 + index * 210,
          y: 450,
          width: 180,
          height: 230,
          borderRadius: 10,
        });
      });
    };

    const animateSlider = () => {
      
      order.push(order.shift());

      const [active, ...rest] = order;
      const prev = rest[rest.length - 1];

      gsap.to(cardsRef.current[active], {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: 600,
        borderRadius: 0,
        zIndex: -1,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.set(cardsRef.current[prev], {
            x: 700 + (rest.length - 1) * 210,
            y: 450,
            width: 180,
            height: 230,
            borderRadius: 10,
          });

        },
      });


      rest.forEach((i, index) => {
        if (i !== prev) {
          gsap.to(cardsRef.current[i], {
            x: 900 + index * 210,
            y: 450,
            width: 180,
            height: 230,
            zIndex: 99999,
            duration: 0.3,
            ease: "sine.inOut",
          });
        }
      });
    };

    const loop = () => {
      animateSlider();
      setTimeout(loop, 4000);
    };

    const preloadImages = () => {
      return Promise.all(
        data.map(({ image }) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
    };

    preloadImages().then(() => {
      init();
      loop();
    });
  }, [data]);

  return (
    <div className="slider-container">
      {data.map((item, index) => (
        <a key={index} href="trip/details.html">
          <div
            className="card"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div
              className="card-content"
              ref={(el) => (cardContentsRef.current[index] = el)}
            >
            <div className="card_sub">
              <div className="content-start"></div>
              <div className="content-place">{item.place}</div>
              <div className="content-title-1">{item.title}</div>
              <div className="content-title-2">{item.title2}</div>
            </div>
            </div>
          </div>
        </a>
      ))}

    </div>
  );
};

export default Slider;
