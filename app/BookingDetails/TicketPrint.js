export function printTicketInWindow(data, win) {
  if (!win) return false;

  const html = renderTicketHTML(data);

  try {
    win.document.open();
    win.document.write(html);
    win.document.close();
  } catch (e) {
    console.error("Failed to write print HTML:", e);
    try {
      win.close();
    } catch { }
    return false;
  }

  const triggerPrint = () => {
    try {
      win.focus();
      win.print();
    } catch (e) {
      console.error("Print failed:", e);
    }
  };

  const imgs = win.document?.images ?? [];
  if (imgs.length === 0) {
    triggerPrint();
  } else {
    let loaded = 0;
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener("load", () => {
        loaded++;
        if (loaded === imgs.length) triggerPrint();
      });
      imgs[i].addEventListener("error", () => {
        loaded++;
        if (loaded === imgs.length) triggerPrint();
      });
    }
    setTimeout(triggerPrint, 1200);
  }

  return true;
}

// function normalize(raw) {
//   // Safe getters
//   const air = raw?.itemInfos?.AIR;
//   const trip = air?.tripInfos?.[0];
//   const legs = trip?.sI || [];
//   const pax = air?.travellerInfos || [];
//   const order = raw?.order || {};
//   const delivery = order?.deliveryInfo || {};
//   const totals = air?.totalPriceInfo?.totalFareDetail?.fC || {};

//   // Build segments
//   const segments = legs.map((s) => {
//     const airline = s?.fD?.aI || {};
//     const flightNo = `${airline.code ?? ""} ${s?.fD?.fN ?? ""}`.trim();
//     // Try baggage/cabin from the first traveler fare detail on this leg if present
//     const firstTI = s?.bI?.tI?.[0]?.fd;
//     const bag = firstTI?.bI || {};
//     const cabinClass = firstTI?.cc || "";
//     const fareClass = firstTI?.cB || "";

//     return {
//       airlineName: airline.name || "",
//       airlineCode: airline.code || "",
//       flightNo,
//       equipment: s?.fD?.eT || "",
//       from: {
//         code: s?.da?.code || "",
//         name: s?.da?.name || "",
//         city: s?.da?.city || "",
//         terminal: s?.da?.terminal || "",
//       },
//       to: {
//         code: s?.aa?.code || "",
//         name: s?.aa?.name || "",
//         city: s?.aa?.city || "",
//         terminal: s?.aa?.terminal || "",
//       },
//       depTime: s?.dt || "",
//       arrTime: s?.at || "",
//       durationMins: Number(s?.duration || 0),
//       stops: Number(s?.stops || 0),
//       cabin: cabinClass,
//       fareClass: fareClass,
//       baggage: {
//         checkin: bag?.iB || "",
//         cabin: bag?.cB || "",
//       },
//     };
//   });

//   // Build passengers
//   const passengers = pax.map((p) => {
//     // pick PNR / ticket for first leg if available
//     const firstLegKey = segments?.[0]
//       ? `${segments[0].from.code}-${segments[0].to.code}`
//       : Object.keys(p?.pnrDetails || {})[0];

//     const pnr = firstLegKey ? p?.pnrDetails?.[firstLegKey] : "";
//     const tkt = firstLegKey ? p?.ticketNumberDetails?.[firstLegKey] : "";

//     return {
//       title: p?.ti || "",
//       firstName: p?.fN || "",
//       lastName: p?.lN || "",
//       type: p?.pt || "",
//       dob: p?.dob || "",
//       passportIssueDate: p?.pid || "",
//       passportExpiry: p?.eD || "",
//       nationality: p?.pNat || "",
//       pnr: pnr || "",
//       ticketNo: tkt || "",
//       baggage: {
//         checkin: p?.fd?.bI?.iB || "",
//         cabin: p?.fd?.bI?.cB || "",
//       },
//     };
//   });

//   // Airline logo is not in payload; leave empty or map from code if you have a CDN
//   return {
//     bookingRef: order?.bookingId || "",
//     status: order?.status || "",
//     amount: Number(order?.amount || 0),
//     contact: {
//       emails: delivery?.emails || [],
//       phones: delivery?.contacts || [],
//     },
//     totals: {
//       base: toFixedOrNull(totals.BF),
//       taxes: toFixedOrNull(totals.TAF),
//       total: toFixedOrNull(totals.TF ?? order?.amount),
//       igst: toFixedOrNull(totals.IGST),
//     },
//     segments,
//     passengers,
//   };
// }

// function normalize(raw) {
//   const air = raw?.itemInfos?.AIR;
//   const trip = air?.tripInfos?.[0];
//   const legs = trip?.sI || [];
//   const pax = air?.travellerInfos || [];
//   const order = raw?.order || {};
//   const delivery = order?.deliveryInfo || {};
//   const totalsFC = air?.totalPriceInfo?.totalFareDetail?.fC || {};

//   const segments = legs.map((s) => {
//     const airline = s?.fD?.aI || {};
//     const flightNo = `${airline.code ?? ""} ${s?.fD?.fN ?? ""}`.trim();
//     const firstTI = s?.bI?.tI?.[0]?.fd;
//     const bag = firstTI?.bI || {};
//     const cabinClass = firstTI?.cc || "";
//     const fareClass = firstTI?.cB || "";
//     return {
//       airlineName: airline.name || "",
//       airlineCode: airline.code || "",
//       flightNo,
//       equipment: s?.fD?.eT || "",
//       from: {
//         code: s?.da?.code || "",
//         name: s?.da?.name || "",
//         city: s?.da?.city || "",
//         terminal: s?.da?.terminal || "",
//       },
//       to: {
//         code: s?.aa?.code || "",
//         name: s?.aa?.name || "",
//         city: s?.aa?.city || "",
//         terminal: s?.aa?.terminal || "",
//       },
//       depTime: s?.dt || "",
//       arrTime: s?.at || "",
//       durationMins: Number(s?.duration || 0),
//       stops: Number(s?.stops || 0),
//       cabin: cabinClass,
//       fareClass: fareClass,
//       baggage: { checkin: bag?.iB || "", cabin: bag?.cB || "" },
//     };
//   });

//   // const passengers = pax.map((p) => {
//   //   const firstKey = segments?.[0]
//   //     ? `${segments[0].from.code}-${segments[0].to.code}`
//   //     : Object.keys(p?.pnrDetails || {})[0];
//   //   const pnr = firstKey ? p?.pnrDetails?.[firstKey] : "";
//   //   const tkt = firstKey ? p?.ticketNumberDetails?.[firstKey] : "";
//   //   return {
//   //     title: p?.ti || "",
//   //     firstName: p?.fN || "",
//   //     lastName: p?.lN || "",
//   //     type: p?.pt || "",
//   //     dob: p?.dob || "",
//   //     passportIssueDate: p?.pid || "",
//   //     passportExpiry: p?.eD || "",
//   //     nationality: p?.pNat || "",
//   //     pnr: pnr || "",
//   //     ticketNo: tkt || "",
//   //     baggage: { checkin: p?.fd?.bI?.iB || "", cabin: p?.fd?.bI?.cB || "" },
//   //   };
//   // });

//   const passengers = pax.map((p) => {
//     // Build per-segment details using the keys from pnrDetails
//     const segKeys = Object.keys(p?.pnrDetails || {});
//     const perSegment = segKeys.map((segKey) => {
//       const [fromCode = "", toCode = ""] = segKey.split("-");

//       return {
//         segKey,
//         fromCode,
//         toCode,
//         pnr: p?.pnrDetails?.[segKey] || "",
//         ticketNo: p?.ticketNumberDetails?.[segKey] || "",
//         baggage: p?.ssrBaggageInfos?.[segKey]?.desc ?? "", // ✅ correct source
//         meal: p?.ssrMealInfos?.[segKey]?.desc ?? "", // ✅ correct source
//         seat: p?.ssrSeatInfos?.[segKey]?.code ?? "", // ✅ correct source
//       };
//     });

//     // Choose the “primary” segment for top-level display (first one, like your UI)
//     const primary = perSegment[0] || null;

//     return {
//       title: p?.ti || "",
//       firstName: p?.fN || "",
//       lastName: p?.lN || "",
//       type: p?.pt || "",
//       dob: p?.dob || "",
//       passportIssueDate: p?.pid || "",
//       passportExpiry: p?.eD || "",
//       nationality: p?.pNat || "",
//       // legacy top-level PNR/Ticket (keep for convenience; from primary seg)
//       pnr: primary?.pnr || "",
//       ticketNo: primary?.ticketNo || "",

//       // ✅ use SSR values (from primary segment) for the main row
//       baggage: { checkin: "", cabin: "" }, // keep structure if you use elsewhere
//       ssr: {
//         primary: primary
//           ? {
//               segKey: primary.segKey,
//               baggageDesc: primary.baggage,
//               mealDesc: primary.meal,
//               seatCode: primary.seat,
//             }
//           : null,
//         perSegment, // keep full list for optional detailed table
//       },
//     };
//   });

//   const extraFees = extractFees(raw);

//   return {
//     bookingRef: order?.bookingId || "",
//     status: order?.status || "",
//     amount: Number(order?.amount || 0),
//     contact: {
//       emails: delivery?.emails || [],
//       phones: delivery?.contacts || [],
//     },
//     totals: {
//       base: toFixedOrNull(totalsFC.BF),
//       taxes: toFixedOrNull(totalsFC.TAF),
//       total: toFixedOrNull(totalsFC.TF ?? order?.amount),
//       igst: toFixedOrNull(totalsFC.IGST),

//       // new ancillary breakdown
//       mealFee: toFixedOrNull(extraFees.mealFee),
//       seatFee: toFixedOrNull(extraFees.seatFee),
//       baggageFee: toFixedOrNull(extraFees.baggageFee),
//       oldAncillary: toFixedOrNull(extraFees.oldAncillary), // rssr
//       reissueFee: toFixedOrNull(extraFees.reissue), // afs
//     },
//     segments,
//     passengers,
//   };
// }

function normalize(raw, markup = 0) {
  const air = raw?.itemInfos?.AIR;
  const itemIndex = indexSegments(raw?.itemInfos); // <- build route map once
  const pax = air?.travellerInfos || [];
  const order = raw?.order || {};
  const delivery = order?.deliveryInfo || {};
  const totalsFC = air?.totalPriceInfo?.totalFareDetail?.fC || {};

  const extraFees = extractFees(raw);

  const passengers = pax.map((p) => {
    const segKeys = Object.keys(p?.pnrDetails || {});
    const perSegment = segKeys.map((segKey) => {
      const [fromCode = "", toCode = ""] = segKey.split("-");

      // flight meta for this route
      const meta = itemIndex.get(segKey) || {};
      const pnr = p?.pnrDetails?.[segKey] || "";
      const ticketNo = p?.ticketNumberDetails?.[segKey] || "";

      // SSRs for this segment
      const baggageDesc = p?.ssrBaggageInfos?.[segKey]?.desc ?? "";
      const mealDesc = p?.ssrMealInfos?.[segKey]?.desc ?? "";
      const seatCode = p?.ssrSeatInfos?.[segKey]?.code ?? "";

      // segment-specific barcode
      const segForBarcode = {
        fromCode,
        toCode,
        airlineCode: meta.airlineCode || "",
        flightNo: meta.flightNo || "",
        depTime: meta.depTime || "",
      };
      const rawCode = buildBarcodeString(
        { firstName: p?.fN, lastName: p?.lN, pnr }, // name + this seg PNR
        segForBarcode
      );
      const barcodeUrl = `/api/barcode/pdf417?data=${encodeURIComponent(
        rawCode
      )}&scale=3&eclevel=5&truncated=true`;

      return {
        segKey,
        fromCode,
        toCode,
        pnr,
        ticketNo,
        airlineCode: meta.airlineCode || "",
        flightNo: meta.flightNo || "",
        depTime: meta.depTime || "",
        baggageDesc,
        mealDesc,
        seatCode,
        barcodeUrl,
      };
    });

    const primary = perSegment[0] || null;

    return {
      title: p?.ti || "",
      firstName: p?.fN || "",
      lastName: p?.lN || "",
      type: p?.pt || "",
      dob: p?.dob || "",
      passportIssueDate: p?.pid || "",
      passportExpiry: p?.eD || "",
      nationality: p?.pNat || "",
      pnr: primary?.pnr || "",
      ticketNo: primary?.ticketNo || "",
      ssr: {
        primary: primary
          ? {
            segKey: primary.segKey,
            baggageDesc: primary.baggageDesc,
            mealDesc: primary.mealDesc,
            seatCode: primary.seatCode,
          }
          : null,
        perSegment,
      },
    };
  });

  // ...keep your segments array for the itinerary & totals as before...
  // ...return the full vm with bookingRef, status, contact, totals, segments, passengers...
  return {
    bookingRef: order?.bookingId || "",
    status: order?.status || "",
    amount: Number(order?.amount || 0),
    contact: {
      emails: delivery?.emails || [],
      phones: delivery?.contacts || [],
    },
    totals: {
      base: toFixedOrNull(totalsFC.BF),
      taxes: toFixedOrNull((Number(totalsFC.TAF) || 0) + (Number(markup) || 0)),
      total: toFixedOrNull((Number(totalsFC.TF ?? order?.amount) || 0) + (Number(markup) || 0)),
      igst: toFixedOrNull(totalsFC.IGST),
      mealFee: toFixedOrNull(extraFees.mealFee),
      seatFee: toFixedOrNull(extraFees.seatFee),
      baggageFee: toFixedOrNull(extraFees.baggageFee),
      oldAncillary: toFixedOrNull(extraFees.oldAncillary),
      reissueFee: toFixedOrNull(extraFees.reissueFee),
    },
    // you likely already build vm.segments for itinerary; keep that part
    // segments: (air?.tripInfos?.[0]?.sI || []).map((s) => {
    //   const airline = s?.fD?.aI || {};
    //   const flightNo = `${airline.code ?? ""} ${s?.fD?.fN ?? ""}`.trim();
    //   const firstTI = s?.bI?.tI?.[0]?.fd;
    //   const bag = firstTI?.bI || {};
    //   const cabinClass = firstTI?.cc || "";
    //   const fareClass = firstTI?.cB || "";
    //   return {
    //     airlineName: airline.name || "",
    //     airlineCode: airline.code || "",
    //     flightNo,
    //     equipment: s?.fD?.eT || "",
    //     from: {
    //       code: s?.da?.code || "",
    //       name: s?.da?.name || "",
    //       city: s?.da?.city || "",
    //       terminal: s?.da?.terminal || "",
    //     },
    //     to: {
    //       code: s?.aa?.code || "",
    //       name: s?.aa?.name || "",
    //       city: s?.aa?.city || "",
    //       terminal: s?.aa?.terminal || "",
    //     },
    //     depTime: s?.dt || "",
    //     arrTime: s?.at || "",
    //     durationMins: Number(s?.duration || 0),
    //     stops: Number(s?.stops || 0),
    //     cabin: cabinClass,
    //     fareClass: fareClass,
    //     baggage: { checkin: bag?.iB || "", cabin: bag?.cB || "" },
    //   };
    // }),
    segments: (() => {
      const allSegs = [];

      (air?.tripInfos || []).forEach((trip) => {
        console.log("trippppppppppppppppppppp ==> ", trip);
        (trip?.sI || []).forEach((s) => {
          const airline = s?.fD?.aI || {};
          const flightNo = `${airline.code ?? ""} ${s?.fD?.fN ?? ""}`.trim();

          const firstTI = s?.bI?.tI?.[0]?.fd;
          const bag = firstTI?.bI || {};
          const cabinClass = firstTI?.cc || "";
          const fareClass = firstTI?.cB || "";

          allSegs.push({
            airlineName: airline.name || "",
            airlineCode: airline.code || "",
            flightNo,
            // equipment: s?.fD?.eT || "",
            from: {
              code: s?.da?.code || "",
              name: s?.da?.name || "",
              city: s?.da?.city || "",
              terminal: s?.da?.terminal || "",
            },
            to: {
              code: s?.aa?.code || "",
              name: s?.aa?.name || "",
              city: s?.aa?.city || "",
              terminal: s?.aa?.terminal || "",
            },
            depTime: s?.dt || "",
            arrTime: s?.at || "",
            durationMins: Number(s?.duration || 0),
            stops: Number(s?.stops || 0),
            cabin: cabinClass,
            // fareClass: fareClass,
            baggage: { checkin: bag?.iB || "", cabin: bag?.cB || "" },
          });
        });
      });

      console.log("allSegsallSegs => ", allSegs);

      return allSegs;
    })(),
    passengers,
  };
}

function indexSegments(itemInfos) {
  const map = new Map();
  const trips = itemInfos?.AIR?.tripInfos || [];
  for (const t of trips) {
    for (const s of t?.sI || []) {
      const key = `${s?.da?.code || ""}-${s?.aa?.code || ""}`;
      const airlineCode = s?.fD?.aI?.code || "";
      const flightNo = `${airlineCode} ${s?.fD?.fN ?? ""}`.trim();
      const depTime = s?.dt || "";
      if (!map.has(key)) map.set(key, { airlineCode, flightNo, depTime });
    }
  }
  return map;
}

function toFixedOrNull(n) {
  const x = Number(n);
  if (Number.isFinite(x)) return x.toFixed(2);
  return null;
}

function num(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
}

function sumObjectKeys(obj, keys) {
  if (!obj) return 0;
  return keys.reduce((acc, k) => acc + num(obj?.[k]), 0);
}

function extractFees(raw) {
  const air = raw?.itemInfos?.AIR;
  const topFC = air?.totalPriceInfo?.totalFareDetail?.fC || {};
  console.log("topFC ==> ", topFC);
  const travellers = Array.isArray(air?.travellerInfos)
    ? air.travellerInfos
    : [];
  console.log("travellers ==> ", travellers);

  // Common keys (observed or typical) for ancillary fees in different APIs
  const KEYSETS = {
    meal: ["MF", "MFT"], // Meal fee / Meal fee total
    seat: ["SF", "SEAT", "ST"], // Seat selection fees (varies by provider)
    baggage: ["BG", "BGF", "XBAG", "XB"], // Extra baggage fees (varies by provider)
    oldAncillary: ["rssr"], // Old ancillary amount
    reissue: ["afs"], // Reissue fee
  };

  const topOldAnc =
    raw?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail?.fC?.AFS;
  const topReissue =
    raw?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail?.fC?.RSSR;

  // Sum from each traveller’s fd.fC if present
  let totalMeal = 0,
    totalSeat = 0,
    totalBaggage = 0;
  for (const t of travellers) {
    const ssrMeals = t?.ssrMealInfos;
    const ssrSeats = t?.ssrSeatInfos;
    const ssrBaggages = t?.ssrBaggageInfos;
    totalMeal += sumSSRAmounts(ssrMeals);
    totalSeat += sumSSRAmounts(ssrSeats);
    totalBaggage += sumSSRAmounts(ssrBaggages);
  }

  return {
    mealFee: totalMeal || 0,
    seatFee: totalSeat || 0,
    baggageFee: totalBaggage || 0,
    oldAncillary: topOldAnc || 0, // rssr
    reissueFee: topReissue || 0, // afs
  };
}

function sumSSRAmounts(ssrObj) {
  if (!ssrObj || typeof ssrObj !== "object") return 0;

  return Object.values(ssrObj).reduce((sum, item) => {
    const amt = Number(item?.amount) || 0;
    return sum + amt;
  }, 0);
}

export function printTicket(raw, markup = 0) {
  // Normalize your API shape into a simple view model for printing
  const vm = normalize(raw, markup);
  const html = renderTicketHTML(vm);

  // 1) Create a hidden iframe (no new window/tab)
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  // 2) Write content
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  // 3) Print once, then cleanup
  let printed = false;
  let timeoutId;

  const triggerOnce = () => {
    if (printed) return;
    printed = true;
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch { }
  };

  const cleanup = () => {
    setTimeout(() => {
      if (iframe && iframe.parentNode) iframe.parentNode.removeChild(iframe);
      if (timeoutId) clearTimeout(timeoutId);
    }, 50);
  };

  if (iframe.contentWindow) {
    iframe.contentWindow.onafterprint = cleanup;
  }

  const mql = iframe.contentWindow?.matchMedia?.("print");
  if (mql && typeof mql.addEventListener === "function") {
    mql.addEventListener("change", (e) => {
      if (printed && !e.matches) cleanup();
    });
  }

  const waitForFonts = doc.fonts?.ready ?? Promise.resolve();
  const waitForImages = new Promise((resolve) => {
    const imgs = Array.from(doc.images || []);
    if (imgs.length === 0) return resolve();
    let loaded = 0;
    const done = () => {
      loaded++;
      if (loaded >= imgs.length) resolve();
    };
    imgs.forEach((img) => {
      if (img.complete) return done();
      img.addEventListener("load", done);
      img.addEventListener("error", done);
    });
  });

  Promise.all([waitForFonts, waitForImages]).then(triggerOnce);
  timeoutId = setTimeout(triggerOnce, 1200); // fallback
}

function julianDate3(dtStr) {
  try {
    const d = new Date(dtStr);
    const start = new Date(d.getFullYear(), 0, 1);
    const diff = Math.floor((d - start) / 86400000) + 1;
    return String(diff).slice(-3).padStart(3, "0");
  } catch {
    return "000";
  }
}

// helper: keep only digits from flight number like "6E-1461" => "1461"
function digitsOnly(str) {
  return String(str || "").replace(/\D+/g, "");
}

function buildBarcodeString(p, seg) {
  // p: passenger (name + PNR), seg: per-segment info (route, airline, flight, depTime)
  const lastName = (p.lastName || "").toUpperCase();
  const firstName = (p.firstName || "").toUpperCase();

  // M1SURNAME/NAME padded to 20
  const passengerName = `${lastName}/${firstName}`
    .trim()
    .toUpperCase()
    .padEnd(20, " ");
  const pnrPadded = String(p.pnr || "").padEnd(7, " ");

  const fromCityCode = seg.fromCode || "";
  const toCityCode = seg.toCode || "";

  // Airline code with your spacing rule
  // let ftCode = String(seg.airlineCode || "");
  // if (ftCode.length === 2) ftCode = ftCode + " ";
  // else if (ftCode.length === 1) ftCode = ftCode + "  ";
  // else ftCode = (ftCode || "").slice(0, 2).padEnd(2, " ") + " ";
  const ftCode = "6E ";

  // Flight number digits padded to 4 + space (your exact logic)
  const flightNumDigits = digitsOnly(
    seg.flightNo?.split(" ")[1] || seg.flightNo || ""
  );
  let paddedFlightNumber = flightNumDigits.toString();
  if (paddedFlightNumber.length === 1)
    paddedFlightNumber = "000" + paddedFlightNumber + " ";
  else if (paddedFlightNumber.length === 2)
    paddedFlightNumber = "00" + paddedFlightNumber + " ";
  else if (paddedFlightNumber.length === 3)
    paddedFlightNumber = "0" + paddedFlightNumber + " ";
  else if (paddedFlightNumber.length === 4)
    paddedFlightNumber = paddedFlightNumber + " ";

  // Use segment's depTime for Julian
  const j3 = julianDate3(seg.depTime);

  // Tail per your sample
  const tail = "Y000000000000";

  const raw = `M1${passengerName} ${pnrPadded}${fromCityCode}${toCityCode}${ftCode}${paddedFlightNumber}${j3}${tail}`;
  // console.log("PDF417 raw =>", raw.replace(/\s+$/, ""));
  return raw.replace(/\s+$/, "");
}

// function buildBarcodeString(p, firstSeg) {
//   const lastName = (p.lastName || "").toUpperCase();
//   const firstName = (p.firstName || "").toUpperCase();

//   // M1SURNAME/NAME padded to 20 chars
//   const passengerName = `${lastName}/${firstName}`
//     .trim()
//     .toUpperCase()
//     .padEnd(20, " ");

//   // pnr padded to width 7
//   const pnrPadded = String(p.pnr || "").padEnd(7, " ");

//   const fromCityCode = firstSeg?.from?.code || "";
//   const toCityCode = firstSeg?.to?.code || "";

//   // airline code padded to 2 chars + one trailing space (e.g., "6E ")
//   // let ftCode = String(firstSeg?.airlineCode || "");
//   // if (ftCode.length === 2) ftCode = ftCode + " ";
//   // else if (ftCode.length === 1) ftCode = ftCode + "  ";
//   // else ftCode = (ftCode || "").slice(0, 2).padEnd(2, " ") + " ";
//   const ftCode = "6E ";

//   // flight number: numeric part only, padded to 4 chars + trailing space
//   const flightNumDigits = digitsOnly(
//     firstSeg?.flightNo?.split(" ")[1] || firstSeg?.flightNo || p.flightNumber
//   );
//   let paddedFlightNumber = String(flightNumDigits || "");
//   if (paddedFlightNumber.length === 1)
//     paddedFlightNumber = "000" + paddedFlightNumber + " ";
//   else if (paddedFlightNumber.length === 2)
//     paddedFlightNumber = "00" + paddedFlightNumber + " ";
//   else if (paddedFlightNumber.length === 3)
//     paddedFlightNumber = "0" + paddedFlightNumber + " ";
//   else
//     paddedFlightNumber = paddedFlightNumber.slice(0, 4).padStart(4, "0") + " ";

//   // 3-digit Julian date from first segment departure time
//   const j3 = julianDate3(firstSeg?.depTime);

//   // final constant tail as per your sample
//   const tail = "Y000000000000";

//   // This matches your return in generateBarcodeData:
//   // `M1${passengerName} ${pnr.padEnd(7," ")}${from}${to}${ftCode}${paddedFlightNumber}${julian3}Y000000000000`
//   const raw = `M1${passengerName} ${pnrPadded}${fromCityCode}${toCityCode}${ftCode}${paddedFlightNumber}${j3}${tail}`;

//   // For debugging parity with your console.log
//   console.log("while printing ==> ", raw.replace(/\s+$/, ""));
//   return raw.replace(/\s+$/, "");
// }

/** ---------- helpers (unchanged) ---------- **/
function formatDT(dtStr) {
  try {
    const dt = new Date(dtStr);
    return dt.toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return dtStr || "-";
  }
}

function minsToHM(mins = 0) {
  const m = Number(mins) || 0;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return `${h}h ${r}m`;
}

function labelize(str) {
  return String(str || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function sanitize(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fmtIN(n) {
  if (n == null) return "-";
  const num = Number(n);
  if (!Number.isFinite(num)) return "-";
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function renderTicketHTML(vm) {
  const styles = `
    <style>
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
             margin: 0; color: #111827; }
      .header-top {display: flex;justify-content: space-between;align-items: flex-start;margin-bottom: 12px;}
      .header-logo img {height: 100px;width: auto;}
      .header-address {text-align: right;font-size: 12px;line-height: 1.4;}
      .wrap { max-width: 820px; margin: 0 auto; }
      .card { border: 1px solid #E5E7EB; border-radius: 12px; padding: 18px; margin-bottom: 14px; }
      .row { display: flex; gap: 12px; }
      .space-between { display: flex; justify-content: space-between; align-items: center; }
      .hr { height: 1px; background: #E5E7EB; margin: 12px 0; }
      .muted { color: #6B7280; }
      .title { font-size: 18px; font-weight: 700; }
      .small { font-size: 12px; }

      .seg { border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px; margin-bottom: 10px; }
      .seg-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 8px; }
      .seg-title { font-weight: 700; }
      .seg-meta { color: #6B7280; font-size: 12px; }
      .seg-body { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; }
      .station .code { font-size: 24px; font-weight: 800; letter-spacing: .5px; }
      .station .name { color: #374151; }
      .station .time { margin-top: 2px; font-weight: 600; }
      .duration { text-align: center; }
      .dots { width: 120px; height: 6px; background: repeating-linear-gradient(90deg,#D1D5DB,#D1D5DB 6px,transparent 6px,transparent 12px); border-radius:999px; margin: 0 auto 6px; }
      .badge { display: inline-block; padding: 2px 8px; border: 1px solid #D1D5DB; border-radius: 999px; font-size: 12px; color: #374151; }
      .status-badge {display: inline-block;padding: 2px 10px;border-radius: 999px;font-size: 12px;font-weight: 700;border: 1px solid #D1D5DB;}
      .status-success { color: #065F46; background: #ECFDF5; border-color: #A7F3D0; }
      .status-pending { color: #92400E; background: #FFFBEB; border-color: #FDE68A; }
      .status-failed { color: #991B1B; background: #FEF2F2; border-color: #FECACA; }
      .status-cancelled { color: #1F2937; background: #F3F4F6; border-color: #D1D5DB; }

      .qr-wrap { display: inline-flex; align-items: center; gap: 12px; margin-top: 6px; }
      .qr { width: 96px; height: 96px; }
      .qr-caption { line-height: 1.2; }
      .barcode-row img {border: 1px solid #e5e7eb;}

      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid #E5E7EB; padding: 8px 10px; font-size: 14px; vertical-align: top; }
      th { background: #F9FAFB; text-align: left; }

      .totals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .totals .cell { border: 1px solid #E5E7EB; border-radius: 10px; padding: 10px; text-align: center; }
      .totals .amt { font-weight: 700; }

      @media screen { body { background: #F3F4F6; padding: 24px; } }
    </style>
  `;

  const segCards = vm.segments
    .map((s, idx) => {
      const bagBits = [
        s.baggage?.checkin ? `Check-in: ${sanitize(s.baggage.checkin)}` : "",
        s.baggage?.cabin ? `Cabin: ${sanitize(s.baggage.cabin)}` : "",
      ]
        .filter(Boolean)
        .join(" · ");

      return `
      <div class="seg">
        <div class="seg-head">
          <div class="seg-title" style="display:flex; align-items:center; gap:6px;">
            <img src="/assets/imgs/airlines/${sanitize(s.airlineCode)}.png"
                onerror="this.style.display='none'"
                style="height:18px; width:auto;" />
            <span>${sanitize(s.airlineName || "Airline")} • ${sanitize(
        s.flightNo
      )}</span>
          </div>
          <div class="seg-meta">
            ${s.cabin
          ? `<span class="badge">${sanitize(labelize(s.cabin))}</span>`
          : ""
        }
            ${s.fareClass
          ? ` <span class="badge">Class ${sanitize(s.fareClass)}</span>`
          : ""
        }
            ${s.equipment
          ? ` <span class="badge">${sanitize(s.equipment)}</span>`
          : ""
        }
            ${s.stops > 0
          ? ` <span class="badge">${s.stops} stop</span>`
          : ` <span class="badge">Non-stop</span>`
        }
          </div>
        </div>
        <div class="seg-body">
          <div class="station">
            <div class="code">${sanitize(s.from.code)}</div>
            <div class="name">${sanitize(s.from.city)}${s.from.terminal ? ` • ${sanitize(s.from.terminal)}` : ""
        }</div>
            <div class="time">${formatDT(s.depTime)}</div>
          </div>
          <div class="duration">
            <div class="dots"></div>
            <div class="small muted">${minsToHM(s.durationMins)}</div>
          </div>
          <div class="station">
            <div class="code">${sanitize(s.to.code)}</div>
            <div class="name">${sanitize(s.to.city)}${s.to.terminal ? ` • ${sanitize(s.to.terminal)}` : ""
        }</div>
            <div class="time">${formatDT(s.arrTime)}</div>
          </div>
        </div>
        ${bagBits
          ? `<div class="small muted" style="margin-top:8px;">${bagBits}</div>`
          : ""
        }
      </div>
    `;
    })
    .join("");

  //   const paxRows = vm.passengers
  //     .map((p, i) => {
  //       const barcodeString = encodeURIComponent(buildBarcodeString(p, firstSeg));
  //       const barcodeUrl = `/api/barcode/pdf417?data=${barcodeString}&scale=3&eclevel=5&truncated=true`;
  //       console.log("barcode url ==> ", barcodeUrl);

  //       return `
  // <tr>
  //   <td>${i + 1}</td>
  //   <td>
  //     <div><strong>${sanitize(
  //       [p.title, p.firstName, p.lastName].filter(Boolean).join(" ")
  //     )}</strong></div>
  //     <div class="small muted">${sanitize(p.type)}</div>
  //     ${p.dob ? `<div class="small muted">DOB: ${sanitize(p.dob)}</div>` : ""}
  //     ${
  //       p.nationality
  //         ? `<div class="small muted">Nationality: ${sanitize(
  //             p.nationality
  //           )}</div>`
  //         : ""
  //     }
  //     ${
  //       p.passportIssueDate
  //         ? `<div class="small muted">Passport Issue: ${sanitize(
  //             p.passportIssueDate
  //           )}</div>`
  //         : ""
  //     }
  //     ${
  //       p.passportExpiry
  //         ? `<div class="small muted">Passport Expiry: ${sanitize(
  //             p.passportExpiry
  //           )}</div>`
  //         : ""
  //     }
  //   </td>
  //   <td>${sanitize(p.pnr || "-")}</td>
  //   <td>${sanitize(p.ticketNo || "-")}</td>
  //   <td class="small">
  //   ${
  //     p.ssr?.primary?.baggageDesc ||
  //     p.ssr?.primary?.mealDesc ||
  //     p.ssr?.primary?.seatCode
  //       ? [
  //           p.ssr.primary.baggageDesc
  //             ? `Baggage: ${sanitize(p.ssr.primary.baggageDesc)}`
  //             : "",
  //           p.ssr.primary.mealDesc
  //             ? `Meal: ${sanitize(p.ssr.primary.mealDesc)}`
  //             : "",
  //           p.ssr.primary.seatCode
  //             ? `Seat: ${sanitize(p.ssr.primary.seatCode)}`
  //             : "",
  //         ]
  //           .filter(Boolean)
  //           .join(" | ")
  //       : "-"
  //   }
  // </td>
  // </tr>

  // <tr class="barcode-row">
  //   <td colspan="5" style="padding-top:4px;">
  //     <img src="${barcodeUrl}" alt="PDF417 Barcode" style="background:#fff;padding:8px;width:294px;height:99px;">
  //     <div class="small muted" style="margin-top:2px;">Passenger Barcode (PDF417)</div>
  //   </td>
  // </tr>
  // `;
  //     })
  //     .join("");
  const paxRows = vm.passengers
    .map((p, pi) => {
      // If no segments for this passenger, show a single placeholder row
      console.log("ppppppppppppprrrrrrrrrrrrr ", p);
      if (!p.ssr?.perSegment || p.ssr.perSegment.length === 0) {
        return `
      <tr>
        <td>${pi + 1}</td>
        <td>
          <div><strong>${sanitize(
          [p.title, p.firstName, p.lastName].filter(Boolean).join(" ")
        )}</strong></div>
          <div class="small muted">${sanitize(p.type)}</div>
        </td>
        <td>-</td><td>-</td>
        <td class="small">-</td>
      </tr>`;
      }

      // Otherwise, emit one row PER segment (+ barcode row)
      return p.ssr.perSegment
        .map((seg, si) => {
          const indexCell = si === 0 ? pi + 1 : ""; // only number first seg of this passenger
          const ssrText =
            [
              seg.baggageDesc ? `Baggage: ${sanitize(seg.baggageDesc)}` : "",
              seg.mealDesc ? `Meal: ${sanitize(seg.mealDesc)}` : "",
              seg.seatCode ? `Seat: ${sanitize(seg.seatCode)}` : "",
            ]
              .filter(Boolean)
              .join(" | ") || "-";

          return `
      <tr>
        <td>${indexCell}</td>
        <td>
          <div><strong>${sanitize(
            [p.title, p.firstName, p.lastName].filter(Boolean).join(" ")
          )}</strong></div>
          <div class="small muted">${sanitize(p.type)}</div>
          ${p.dob
              ? `<div class="small muted">DOB: ${sanitize(p.dob)}</div>`
              : ""
            }
          ${p.nationality
              ? `<div class="small muted">Nationality: ${sanitize(
                p.nationality
              )}</div>`
              : ""
            }
          ${p.passportIssueDate
              ? `<div class="small muted">Passport Issue: ${sanitize(
                p.passportIssueDate
              )}</div>`
              : ""
            }
          ${p.passportExpiry
              ? `<div class="small muted">Passport Expiry: ${sanitize(
                p.passportExpiry
              )}</div>`
              : ""
            }
          <div class="small muted">${sanitize(seg.fromCode)} → ${sanitize(
              seg.toCode
            )} • ${sanitize(seg.airlineCode)} ${sanitize(
              digitsOnly(seg.flightNo)
            )}</div>
        </td>
        <td>${sanitize(seg.pnr || "-")}</td>
        <td>${sanitize(seg.ticketNo || "-")}</td>
        <td class="small">${ssrText}</td>
      </tr>
      <tr class="barcode-row">
        <td colspan="5" style="padding-top:4px;">
          <img src="${seg.barcodeUrl}"
               alt="PDF417 Barcode"
               style="background:#fff;padding:8px;width:294px;height:99px;border:1px solid #E5E7EB;" />
        </td>
      </tr>
    `;
        })
        .join("");
    })
    .join("");

  const contactBlock = `
  <div class="card">
    <div class="row" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap;">

      <!-- Column 1: Booking Details -->
      <div style="width:48%; min-width:260px;">
        <div class="title" style="margin-bottom:6px;">Booking Details</div>

        <div style="margin-bottom:6px;">
          <span class="muted small">Booking ID:</span><br/>
          <strong>${sanitize(vm.bookingRef || "-")}</strong>
        </div>

        ${vm.status
      ? `<div style="margin-bottom:6px;">
                <span class="muted small">Booking Status:</span><br/>
                <span class="${statusClass(vm.status)}">${sanitize(
        vm.status
      )}</span>
              </div>`
      : ""
    }
      </div>

      <!-- Column 2: Contact Details -->
      <div style="width:48%; min-width:260px;">
        <div class="title" style="margin-bottom:6px;">Contact Details</div>

        <div style="margin-bottom:6px;">
          <span class="muted small">Email:</span><br/>
          ${vm.contact.emails?.[0] ? sanitize(vm.contact.emails[0]) : "-"}
        </div>

        <div style="margin-bottom:6px;">
          <span class="muted small">Phone:</span><br/>
          ${vm.contact.phones?.[0] ? sanitize(vm.contact.phones[0]) : "-"}
        </div>
      </div>

    </div>
  </div>
`;

  const totalsBlock = `
  <div class="card">
    <div class="title">Fare Summary</div>
    <div class="hr"></div>

    <table>
      <tbody>
        <tr>
          <th style="width:60%;">Base Fare</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.base)}</td>
        </tr>
        <tr>
          <th>Taxes & Fees</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.taxes)}</td>
        </tr>

        ${vm.totals.mealFee
      ? `
        <tr>
          <th>Meal Fees</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.mealFee)}</td>
        </tr>`
      : ""
    }

        ${vm.totals.seatFee
      ? `
        <tr>
          <th>Seat Selection Fees</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.seatFee)}</td>
        </tr>`
      : ""
    }

        ${vm.totals.baggageFee
      ? `
        <tr>
          <th>Extra Baggage Fees</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.baggageFee)}</td>
        </tr>`
      : ""
    }

        ${vm.totals.oldAncillary != 0
      ? `
        <tr>
          <th>Old Ancillary Amount</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.oldAncillary)}</td>
        </tr>`
      : ""
    }

        ${vm.totals.reissueFee != 0
      ? `
        <tr>
          <th>Reissue Fees</th>
          <td style="text-align:right;">₹ ${fmtIN(vm.totals.reissueFee)}</td>
        </tr>`
      : ""
    }

        <tr>
          <th style="border-top:2px solid #E5E7EB;">Total</th>
          <td style="border-top:2px solid #E5E7EB; text-align:right; font-weight:700;">₹ ${fmtIN(
      vm.totals.total
    )}</td>
        </tr>
      </tbody>
    </table>
  </div>
`;

  const importantNotice = `
  <div class="card">
    <div class="title">Important Information</div>
    <div class="hr"></div>

    <div class="small" style="margin-top:6px;">
      <div style="display:flex;gap:6px;align-items:start;margin-bottom:4px;">
        <span style="font-weight:bold;">•</span>
        <span>You should carry a print-out of your booking and present for check-in.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;margin-bottom:4px;">
        <span style="font-weight:bold;">•</span>
        <span>Date & Time is calculated based on the local time of city/destination.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;margin-bottom:4px;">
        <span style="font-weight:bold;">•</span>
        <span>Use the Reference Number for all Correspondence with us.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;">
        <span style="font-weight:bold;">•</span>
        <span>Use the Airline PNR for all Correspondence directly with the Airline.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;">
        <span style="font-weight:bold;">•</span>
        <span>For departure terminal please check with airline first.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;">
        <span style="font-weight:bold;">•</span>
        <span>Please CheckIn atleast 2 hours prior to the departure for domestic flight and 3 hours prior to the departure of international flight.</span>
      </div>

      <div style="display:flex;gap:6px;align-items:start;">
        <span style="font-weight:bold;">•</span>
        <span>For rescheduling/cancellation within 4 hours of departure time contact the airline directly.</span>
      </div>
    </div>
  </div>
`;

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Ticket • ${sanitize(vm.bookingRef) || "Booking"}</title>
        ${styles}
      </head>
      <body>
        <div class="wrap">
            <!-- Company Header -->
            <div class="header-top">
                <div class="header-logo">
                <img src="https://travelogy.digilogy.co/Travelogy%20logoNew.png" alt="Travelogy" />
                </div>

                <div class="header-address">
                Address: NPL Devi, 111,</br>
                Lattice Brg Rd, Thiruvanmiyur,<br/>
                Chennai, Tamil Nadu 600041<br/>
                Phone: +91-9566266061<br/>
                info@casagrandtravelogy.co.in
                </div>
            </div>

            <div class="hr"></div>
          ${contactBlock}

          <div class="card">
            <div class="title">Flight Itinerary</div>
            <div class="hr"></div>
            ${segCards || `<div class="muted">No flight segments found.</div>`}
          </div>

          <div class="card">
            <div class="title">Passengers</div>
            <div class="hr"></div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Passenger</th>
                  <th>PNR</th>
                  <th>Ticket No.</th>
                  <th>SSR</th>
                </tr>
              </thead>
              <tbody>
                ${paxRows ||
    `<tr><td colspan="5" class="muted">No passengers found.</td></tr>`
    }
              </tbody>
            </table>
          </div>

          ${totalsBlock}

          ${importantNotice}

          <div class="card small muted" style="text-align:center;">
            This itinerary receipt is system generated. Please carry a valid government ID along with this ticket.
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" referrerpolicy="no-referrer"></script>
        <script>
          (function () {
            function initQR() {
              var nodes = document.querySelectorAll('.qr');
              nodes.forEach(function(el){
                var payload = el.getAttribute('data-payload') || '';
                // Clear in case of re-renders
                el.innerHTML = '';
                try {
                  new QRCode(el, {
                    text: payload,
                    width: 96,
                    height: 96,
                    correctLevel: QRCode.CorrectLevel.M
                  });
                } catch (e) {
                  console && console.error && console.error('QR render failed', e);
                }
              });
            }
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              initQR();
            } else {
              document.addEventListener('DOMContentLoaded', initQR);
            }
          })();
        </script>
      </body>
    </html>
  `;
}

function statusClass(s) {
  const v = String(s || "").toUpperCase();
  if (v === "SUCCESS" || v === "CONFIRMED")
    return "status-badge status-success";
  if (v === "PENDING" || v === "PROCESSING" || v === "ON_HOLD")
    return "status-badge status-pending";
  if (v === "FAILED" || v === "ERROR" || v === "DECLINED")
    return "status-badge status-failed";
  if (v === "CANCELLED" || v === "VOID") return "status-badge status-cancelled";
  return "status-badge";
}
