// types.ts

export interface FlightDataFile {
    sI: {
      fD: {
        aI: {
          name: string;
        };
        fN: string;
      };
      duration: number;
      da: {
        city: string;
      };
    }[];
    totalPriceList: {
      fd: {
        ADULT: {
          fC: {
            TF: number;
          };
        };
      };
    }[];
  }
  
  export interface Ticket {
    id: number;
    price: number;
    airlines: string;
    class: string;
    rating: number;
    name: string;
    location: string;
    image: string;
  }
  
  export interface Filter {
    names: string[];
    class: string[];
    locations: string[];
    priceRange: [number, number];
    ratings: number[];
    airlines: string[];
  }
  