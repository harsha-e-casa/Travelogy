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
    place: 'Australia - Morocco',
    title: 'Morocco',
    title2: 'MERZOUGA',
    description: "Morocco offers vibrant markets, desert landscapes, and rich cultural experiences.",
    image: 'https://travelogy.digilogy.co/demo3.jpeg',
  },

  {
    place: 'Switzerland Alps',
    title: 'Alps',
    title2: 'ANTONIEN',
    description: "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for tranquility and adventure.",
    image: 'https://travelogy.digilogy.co/demo2.jpg',
  },
  {
    place: 'Australia - Morocco',
    title: 'Australia',
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
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let order = data.map((_, index) => index);

    const init = () => {
      const [active, ...rest] = order;

      gsap.set(cardsRef.current[active], {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: 650,
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
        height: 650,
        borderRadius: 0,
        zIndex: -1,
        ease: 'sine.inOut',
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
      
      gsap.from(
        cardsRef.current[active].querySelectorAll('.card_sub'),
        { y: 50, opacity: 1, bottom: '50%', marginLeft: '20px'}
      );

      gsap.fromTo(
        cardsRef.current[active].querySelectorAll('.card_sub > div'),
        { y: 50, opacity: 0},
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power2.out' }
      );

      gsap.from(
        cardsRef.current[active].querySelectorAll('.content-place'),
        {  fontSize: '1.5em', marginBottom: '20px', paddingBottom: '15px'}
      );

       gsap.from(
        cardsRef.current[active].querySelectorAll('.pt_set'),
        {  fontSize: '6em', marginTop: '20px'}
      );

      gsap.from(
        cardsRef.current[active].querySelectorAll('.pt_set1'),
        { paddingTop: '10px'}
      );
      gsap.from(
        cardsRef.current[active].querySelectorAll('.pt_set2'),
        { paddingTop: '50px'}
      );

     

      rest.forEach((i, index) => {
        if (i !== prev) {
          gsap.to(cardsRef.current[i], {
            x: 900 + index * 210,
            y: 500,
            width: 180,
            height: 230,
            zIndex: 99999,
            duration: 0.3,
            ease: 'sine.inOut',
          });
        
          gsap.set(cardsRef.current[i].querySelectorAll('.card_sub'), { clearProps: 'all' });

          gsap.set(cardsRef.current[i].querySelectorAll('.pt_set'), { clearProps: 'all' });

          gsap.set(cardsRef.current[i].querySelectorAll('.pt_set2'), { clearProps: 'all' });
          gsap.set(cardsRef.current[i].querySelectorAll('.pt_set2'), { clearProps: 'all' });

          gsap.set(cardsRef.current[i].querySelectorAll('.content-place'), { clearProps: 'all' });


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
  }, []);

  return (
    <div className="slider-container">
      {data.map((item, index) => (
        <a key={index} href="trip-details">
          <div
            className="card"
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="card-content" ref={(el) => (cardContentsRef.current[index] = el)}>
              <div className="card_sub ">
                <div className="content-start"></div>
                <div className="content-place">{item.place}</div>
                <div className="content-title-1 pt_set1 pt_set">{item.title}</div>
                <div className="content-title-2 pt_set2 pt_set">{item.title2}</div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Slider;
