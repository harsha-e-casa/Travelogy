// mapper.ts

// import { FlightData, Ticket } from "./types";

// export const mapFlightDataToTickets = (data: FlightData[]): Ticket[] => {
//   return data.ONWARD.flatMap((flight, flightIndex) =>
//     flight.sI.map((si, segmentIndex) => ({
//       id: flightIndex * 1000 + segmentIndex,
//       price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//       airlines: si.fD?.aI?.name ?? "Unknown",
//       class: "Economy",
//       rating: 5,
//       name: si.fD?.fN ?? "Unknown",
//       location: si.da?.city ?? "Unknown",
//       image: "",
//       fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//     }))
//   );
// };


// import { FlightData, Ticket } from "./types";

// export const mapFlightDataToTickets = (data: FlightData[]): Ticket[] => {
//   const allTickets: Ticket[] = [];

//   // Iterate through all trip types (e.g., "ONWARD", "RETURN", "COMBO", "0", "1")
//   for (const tripKey in data) {
//     const tripsKeyRes = data[tripKey];
    
//     tripsKeyRes.forEach((flight, flightIndex) => {
//       // Initialize the corresponding airlines variable based on journey type
//       let airlines: string = "Unknown";
//       let returnAirlines: string = "Unknown";

//       flight.sI.forEach((si, segmentIndex) => {

//         if (tripKey === "RETURN") {
//           returnAirlines = si.fD?.aI?.name ?? "Unknown";
//         }else{
//           airlines = si.fD?.aI?.name ?? "Unknown";
//         }

//         console.log('pusreturnAirlines', airlines)
//         allTickets.push({
//           id: flightIndex * 1000 + segmentIndex,
//           price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//           airlines,   
//           tripsKeyRes,
//           returnAirlines,
//           class: "Economy",     // Default class
//           rating: 5,            // Default rating
//           name: si.fD?.fN ?? "Unknown",
//           location: si.da?.city ?? "Unknown",
//           image: "",            // Optional: if you want to add images dynamically
//           fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//         });
//       });
//     });
//   }

//   return allTickets;
// };



// import { FlightData, Ticket } from "./types";

// export const mapFlightDataToTickets = (data: FlightData[]): { tickets: Ticket[], filters: any } => {
//   const onwardTickets: Ticket[] = [];
//   const returnTickets: Ticket[] = [];
//   const multiCityTickets: Ticket[] = [];
//   const allTickets: Ticket[] = [];

//   const uniqueAirlines: Set<string> = new Set();
//   const uniqueReturnAirlines: Set<string> = new Set();
//   const uniqueLocations: Set<string> = new Set();
//   const fareIdentifiers: Set<string> = new Set();
//   const onwardFlightNumbers: Set<string> = new Set();
//   const returnFlightNumbers: Set<string> = new Set();
//   const priceRanges: number[] = [];

//   // Iterate through all dynamic trip keys (e.g., "0", "1", "2", etc.)
//   for (const tripKey in data) {
//     const trips = data[tripKey];

//     trips.forEach((flight, flightIndex) => {
//       let airlines: string = "Unknown";
//       let returnAirlines: string = "Unknown";
//       let onwardFlightNum: string = "Unknown";
//       let returnFlightNum: string = "Unknown";

//       // For each flight segment (sI)
//       flight.sI.forEach((si, segmentIndex) => {
//         // Default handling for dynamic keys, set airlines and returnAirlines based on the data available
//         airlines = si.fD?.aI?.name ?? "Unknown"; // Default onward airlines
//         returnAirlines = si.fD?.aI?.name ?? "Unknown"; // Default return airlines

//         // Logic for handling specific trip types like "ONWARD" or "RETURN" can be added based on the tripKey
//         // You can still use "if" conditions if certain keys (like "0", "1") need special handling
//         if (tripKey === "ONWARD" || tripKey === "COMBO") {
//           onwardFlightNum = si.fD?.fN ?? "Unknown";
//           onwardTickets.push({
//             id: flightIndex * 1000 + segmentIndex,
//             price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//             airlines,
//             class: "Economy",
//             rating: 5,
//             name: si.fD?.fN ?? "Unknown",
//             location: si.da?.city ?? "Unknown",
//             image: "",
//             fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//           });
//         } else if (tripKey === "RETURN") {
//           returnFlightNum = si.fD?.fN ?? "Unknown";
//           returnTickets.push({
//             id: flightIndex * 1000 + segmentIndex,
//             price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//             airlines, // Onward airlines for return leg
//             class: "Economy",
//             rating: 5,
//             name: si.fD?.fN ?? "Unknown",
//             location: si.da?.city ?? "Unknown",
//             image: "",
//             fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//           });
//         } else if (tripKey === "COMBO" || tripKey === "MULTICITY") {
//           // Handle multi-city or combo flights
//           multiCityTickets.push({
//             id: flightIndex * 1000 + segmentIndex,
//             price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//             airlines,
//             class: "Economy",
//             rating: 5,
//             name: si.fD?.fN ?? "Unknown",
//             location: si.da?.city ?? "Unknown",
//             image: "",
//             fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//           });
//         } else {
//           // Default case for other dynamic keys or unknown keys
//           allTickets.push({
//             id: flightIndex * 1000 + segmentIndex,
//             price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
//             airlines,             // Default onward journey airlines
//             class: "Economy",     // Default class
//             rating: 5,            // Default rating
//             name: si.fD?.fN ?? "Unknown",
//             location: si.da?.city ?? "Unknown",
//             image: "",
//             fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
//           });
//         }

//         // Extract filterable data
//         uniqueAirlines.add(airlines);
//         uniqueReturnAirlines.add(returnAirlines);
//         uniqueLocations.add(si.da?.city ?? "Unknown");
//         fareIdentifiers.add(flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown");
//         onwardFlightNumbers.add(onwardFlightNum);
//         returnFlightNumbers.add(returnFlightNum);
//         priceRanges.push(flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0);
//       });
//     });
//   }

//   // Remove duplicates from priceRanges by using a Set
//   const uniquePriceRanges = [...new Set(priceRanges)];


//   console.log('onewya-', onwardTickets);
//   console.log('RETURN-', onwardTickets);
//   console.log('multicity-', multiCityTickets);
  

//   // Combine all tickets
//   allTickets.push(...onwardTickets, ...returnTickets, ...multiCityTickets);


//   // console.log('allfilter', allTickets);
//   // Return tickets and filterable data
//   return {
//     tickets: allTickets,
//     filters: {
//       onwardFlightNumbers: [...onwardFlightNumbers],
//       returnFlightNumbers: [...returnFlightNumbers],
//       airlines: [...uniqueAirlines],
//       returnAirlines: [...uniqueReturnAirlines],
//       locations: [...uniqueLocations],
//       fareIdentifiers: [...fareIdentifiers],
//       priceRanges: uniquePriceRanges
//     }
//   };
// };



// import { FlightData, Ticket } from "./types";


// export const mapFlightDataToTickets = (data: FlightData[]): { tickets: Ticket[], filters: any } => { 
  
//  // Check if the "RETURN" data exists and filter it
 
//  if (data.RETURN) {
//   console.log('polpw-www', data.RETURN);

//   // Extracting the RETURN flights
//   // const returnFlights = rawData.searchResult.tripInfos.RETURN;

//   const uniqueAirlines = [...new Set(data.RETURN.map((t) => t.airlines))];

// }

  //   return data.ONWARD.flatMap((flight, flightIndex) =>
  //   flight.sI.map((si, segmentIndex) => ({
  //     id: flightIndex * 1000 + segmentIndex,
  //     price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
  //     airlines: si.fD?.aI?.name ?? "Unknown",
  //     class: "Economy",
  //     rating: 5,
  //     name: si.fD?.fN ?? "Unknown",
  //     location: si.da?.city ?? "Unknown",
  //     image: "",
  //     fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown"
  //   }))
  // );

// };

import { FlightData, Ticket } from "./types";

export const mapFlightDataToTickets = (data: FlightData[]): { tickets: Ticket[], filters: any } => {
  const onwardTickets: Ticket[] = [];
  const returnTickets: Ticket[] = [];
  const multiCityTickets: Ticket[] = [];
  const allTickets: Ticket[] = [];

  // Initialize sets to store unique filterable data
  const uniqueOnwardAirlines: Set<string> = new Set();
  const uniqueReturnAirlines: Set<string> = new Set();
  const uniqueLocations: Set<string> = new Set();
  const onwardFareIdentifiers: Set<string> = new Set();
  const returnFareIdentifiers: Set<string> = new Set();
  const onwardFlightNumbers: Set<string> = new Set();
  const returnFlightNumbers: Set<string> = new Set();
  const priceRanges: number[] = [];
  const uniqueOnwardDurations: Set<number> = new Set(); // Onward flight durations
  const uniqueReturnDurations: Set<number> = new Set(); // Return flight durations

  // Iterate through all dynamic trip keys (e.g., "0", "1", "2", etc.)
  for (const tripKey in data) {
    const trips = data[tripKey];

    trips?.forEach((flight, flightIndex) => {
      let airlines: string = "Unknown";
      let returnAirlines: string = "Unknown";
      let onwardFlightNum: string = "Unknown";
      let returnFlightNum: string = "Unknown";
      let onwardDuration: number = 0;
      let returnDuration: number = 0;
      let onwardFareIdentifier = "Unknown";
      let returnFareIdentifier = "Unknown";


      flight.sI.forEach((si, segmentIndex) => {
        airlines = si.fD?.aI?.name ?? "Unknown"; // Default onward airlines
        returnAirlines = si.fD?.aI?.name ?? "Unknown"; // Default return airlines

        // Handle onward tickets
        if (tripKey === "ONWARD" || tripKey === "COMBO") {
          onwardFlightNum = si.fD?.fN ?? "Unknown";
          onwardDuration = si.duration ?? 0; // Onward flight duration
          // onwardTickets.push({
          //   id: flightIndex * 1000 + segmentIndex,
          //   price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
          //   airlines,
          //   class: "Economy",
          //   rating: 5,
          //   name: si.fD?.fN ?? "Unknown",
          //   location: si.da?.city ?? "Unknown",
          //   image: "",
          //   fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown",
          //   duration: onwardDuration // Include onward duration
          // });
          uniqueOnwardAirlines.add(airlines); // Store onward airlines
          uniqueOnwardDurations.add(onwardDuration); // Store onward duration

        onwardFareIdentifier = flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown";
        onwardFareIdentifiers.add(onwardFareIdentifier); // Store onward fareIdentifier
        
        } else if (tripKey === "RETURN") {
          returnFlightNum = si.fD?.fN ?? "Unknown";
          returnDuration = si.duration ?? 0; // Return flight duration
          // returnTickets.push({
          //   id: flightIndex * 1000 + segmentIndex,
          //   price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
          //   airlines,
          //   class: "Economy",
          //   rating: 5,
          //   name: si.fD?.fN ?? "Unknown",
          //   location: si.da?.city ?? "Unknown",
          //   image: "",
          //   fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown",
          //   duration: returnDuration // Include return duration
          // });
          uniqueReturnAirlines.add(returnAirlines); // Store return airlines
          uniqueReturnDurations.add(returnDuration); // Store return duration

          returnFareIdentifier = flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown";
          returnFareIdentifiers.add(returnFareIdentifier); // Store return fareIdentifier

        } else if (tripKey === "COMBO" || tripKey === "MULTICITY") {
          // Handle multi-city or combo flights
          // multiCityTickets.push({
          //   id: flightIndex * 1000 + segmentIndex,
          //   price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
          //   airlines,
          //   class: "Economy",
          //   rating: 5,
          //   name: si.fD?.fN ?? "Unknown",
          //   location: si.da?.city ?? "Unknown",
          //   image: "",
          //   fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown",
          //   duration: onwardDuration // Include duration for multi-city
          // });
        } else {
          onwardFlightNum = si.fD?.fN ?? "Unknown";
          onwardDuration = si.duration ?? 0; // Onward flight duration
          // onwardTickets.push({
          //   id: flightIndex * 1000 + segmentIndex,
          //   price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
          //   airlines,
          //   class: "Economy",
          //   rating: 5,
          //   name: si.fD?.fN ?? "Unknown",
          //   location: si.da?.city ?? "Unknown",
          //   image: "",
          //   fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown",
          //   duration: onwardDuration // Include onward duration
          // });
          uniqueOnwardAirlines.add(airlines); // Store onward airlines
          uniqueOnwardDurations.add(onwardDuration); // Store onward duration

        onwardFareIdentifier = flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown";
        onwardFareIdentifiers.add(onwardFareIdentifier); // Store onward fareIdentifier
        
          // // Default case for other dynamic keys or unknown keys
          // allTickets.push({
          //   id: flightIndex * 1000 + segmentIndex,
          //   price: flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0,
          //   airlines,
          //   class: "Economy",
          //   rating: 5,
          //   name: si.fD?.fN ?? "Unknown",
          //   location: si.da?.city ?? "Unknown",
          //   image: "",
          //   fareIdentifier: flight.totalPriceList?.[0]?.fareIdentifier ?? "Unknown",
          //   duration: onwardDuration // Include duration in default tickets
          // });
        }

        // Extract filterable data
        uniqueLocations.add(si.da?.city ?? "Unknown");
        onwardFlightNumbers.add(onwardFlightNum);
        returnFlightNumbers.add(returnFlightNum);
        priceRanges.push(flight.totalPriceList?.[0]?.fd?.ADULT?.fC?.TF ?? 0);

      });
    });
  }

  // Remove duplicates from priceRanges by using a Set
  const uniquePriceRanges = [...new Set(priceRanges)];

  // Combine all tickets
  allTickets.push(...onwardTickets, ...returnTickets, ...multiCityTickets);

  // Return tickets and filterable data
  return {
    tickets: allTickets,
    filters: {
      onwardFlightNumbers: [...onwardFlightNumbers],
      returnFlightNumbers: [...returnFlightNumbers],
      onwardAirlines: [...uniqueOnwardAirlines], // Onward Airlines
      returnAirlines: [...uniqueReturnAirlines], // Return Airlines
      locations: [...uniqueLocations],
      onwardfareIdentifiers: [...onwardFareIdentifiers],
      returnfareIdentifiers: [...returnFareIdentifiers],
      priceRanges: uniquePriceRanges,
      onwardDurations: [...uniqueOnwardDurations], // Onward Durations
      returnDurations: [...uniqueReturnDurations] // Return Durations
    }
  };
};

