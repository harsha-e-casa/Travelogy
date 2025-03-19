import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const data = [
  {
    image: "https://placehold.co/300x400",
    place: "Paris",
    title: "Eiffel Tower",
    title2: "City of Light",
    description: "Discover the magic of Paris.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    place: "Paris",
    title: "Eiffel Tower",
    title2: "City of Light",
    description: "Discover the magic of Paris.",
  },

  {
    image: "https://placehold.co/300x400",
    place: "Paris",
    title: "Eiffel Tower",
    title2: "City of Light",
    description: "Discover the magic of Paris.",
  },

  {
    image:
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    place: "Paris",
    title: "Eiffel Tower",
    title2: "City of Light",
    description: "Discover the magic of Paris.",
  },

  {
    image: "https://placehold.co/300x400",
    place: "Paris",
    title: "Eiffel Tower",
    title2: "City of Light",
    description: "Discover the magic of Paris.",
  },

];

const CardSlider = () => {
  const demoRef = useRef(null);
  const slideNumberRef = useRef(null);

  useEffect(() => {
    const order = Array(data.length)
      .fill(0)
      .map((_, i) => i);

    const offsetTop = 450;
    const offsetLeft = 700;
    const cardWidth = 180;
    const cardHeight = 230;
    const gap = 30;
    const numberSize = 50;
    const ease = "sine.inOut";
    let detailsEven = true;

    const getCard = (index) => `#card${index}`;
    const getCardContent = (index) => `#card-content-${index}`;
    const getSliderItem = (index) => `#slide-item-${index}`;

    if (demoRef.current) {
      demoRef.current.innerHTML = data
        .map(
          (item, index) => `
        <a href="/trip/details.html">
          <div class="card" id="card${index}" style="background-image:url(${item.image})"></div>
        </a>
        <div class="card-content" id="card-content-${index}">
          <div class="content-start"></div>
          <div class="content-place">${item.place}</div>
          <div class="content-title-1">${item.title}</div>
          <div class="content-title-2">${item.title2}</div>
        </div>`
        )
        .join("");
    }

    if (slideNumberRef.current) {
      slideNumberRef.current.innerHTML = data
        .map(
          (_, index) =>
            `<div class="item" id="slide-item-${index}">${index + 1}</div>`
        )
        .join("");
    }

    const init = () => {
      const [active, ...rest] = order;
      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: 600,
      });

      gsap.set(getCardContent(active), {
        x: 0,
        y: 0,
        opacity: 0,
      });

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });

        gsap.set(getCardContent(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop + cardHeight - 100,
          zIndex: 40,
        });

        gsap.set(getSliderItem(i), {
          x: (index + 1) * numberSize,
        });
      });

    };

    init();
  }, []);

  return (
    <div>
      <div ref={demoRef} className="demo-container" />
      <div ref={slideNumberRef} className="slide-numbers" />
    </div>
  );
};

export default CardSlider;
