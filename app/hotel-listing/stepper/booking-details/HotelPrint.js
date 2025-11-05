// Hotel Booking Print Functionality
// Similar to flight ticket print but adapted for hotel bookings

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function printHotelBooking(bookingDetails) {
  if (!bookingDetails) return;

  const vm = normalizeHotelData(bookingDetails);
  
  // Debug logging
  console.log("=== HOTEL PRINT DEBUG ===");
  console.log("Normalized VM:", vm);
  console.log("Rooms with guests:", vm.rooms.map(r => ({
    name: r.name,
    type: r.type,
    checkIn: r.checkIn,
    checkOut: r.checkOut,
    guestCount: r.guests.length,
    guests: r.guests
  })));
  console.log("=== END DEBUG ===");
  
  const html = renderHotelHTML(vm);

  // Create a hidden iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");
  document.body.appendChild(iframe);

  // Write content
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  // Print once, then cleanup
  let printed = false;
  let timeoutId;

  const triggerOnce = () => {
    if (printed) return;
    printed = true;
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {
      console.error("Print failed:", e);
    }
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
  timeoutId = setTimeout(triggerOnce, 1500);
}

function normalizeHotelData(raw) {
  const order = raw?.order || {};
  const hotelInfo = raw?.itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const ops = hotelInfo?.ops?.[0] || {};
  const query = raw?.itemInfos?.HOTEL?.query || {};

  // Extract hotel details
  const hotel = {
    name: hotelInfo.name || "",
    address: hotelInfo.ad?.adr || "",
    city: hotelInfo.ad?.city?.name || "",
    country: hotelInfo.ad?.country?.name || "",
    phone: hotelInfo.cnt?.ph || "",
    email: hotelInfo.cnt?.em || "",
    rating: hotelInfo.rt || 0,
  };

  // Extract room details with guest info from ops.ris
  const rooms = (ops.ris || []).map((room) => ({
    name: room.rc || "",
    type: room.mb || "",
    adults: room.adt || 0,
    children: room.chd || 0,
    checkIn: query.checkinDate || "",
    checkOut: query.checkoutDate || "",
    nights: calculateNights(query.checkinDate, query.checkoutDate),
    guests: (room.ti || []).filter(g => 
      g?.fN?.trim().toUpperCase() !== "TBA" && 
      g?.lN?.trim().toUpperCase() !== "TBA"
    ),
  }));

  // Extract pricing
  const pricing = {
    basePrice: ops.tp || 0,
    taxes: ops.tpc || 0,
    total: order?.amount || 0,
  };

  // Cancellation policy
  const cancellationPolicy = ops.cnp?.pd || [];

  // Booking notes from inst (instructions)
  const bookingNotes = hotelInfo.inst || [];

  return {
    bookingRef: order?.bookingId || "",
    status: order?.status || "",
    bookingDate: order?.createdAt || new Date().toISOString(),
    contact: {
      emails: deliveryInfo?.emails || [],
      phones: deliveryInfo?.contacts || [],
      codes: deliveryInfo?.code || [],
    },
    hotel,
    rooms,
    pricing,
    cancellationPolicy,
    bookingNotes,
  };
}

function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  try {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  } catch {
    return 0;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const dt = new Date(dateStr);
    return dt.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  try {
    const dt = new Date(dateStr);
    return dt.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function sanitize(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "<")
    .replace(/>/g, ">");
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

function statusLabel(s) {
  return String(s || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderHotelHTML(vm) {
  const styles = `
    <style>
      @page { 
        size: A4; 
        margin: 12mm;
      }
      * { 
        box-sizing: border-box; 
        margin: 0;
        padding: 0;
      }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #000;
        background: #fff;
        font-size: 13px;
        line-height: 1.4;
      }
      .container {
        max-width: 100%;
        margin: 0 auto;
        padding: 20px;
      }
      
      /* Logo Header */
      .logo-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
      }
      .logo-header img {
        height: 80px;
        width: auto;
      }
      .company-info {
        text-align: right;
        font-size: 11px;
        color: #666;
        line-height: 1.5;
        margin-top: 0;
      }
      
      /* Status Header */
      .status-header {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        margin-top: 12px;
      }
      .status-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .status-text {
        font-size: 24px;
        font-weight: 600;
      }
      .status-success {
        color: #22c55e;
      }
      .status-cancelled {
        color: #f59e0b;
      }
      .status-pending {
        color: #eab308;
      }
      .status-failed {
        color: #ef4444;
      }
      .booking-id {
        font-size: 14px;
        margin-bottom: 15px;
        color: #000;
      }
      
      /* Hotel Header */
      .hotel-header {
        margin-bottom: 15px;
      }
      .hotel-name {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .hotel-address {
        font-size: 13px;
        color: #000;
        line-height: 1.3;
      }
      .rating {
        color: #fbbf24;
        font-size: 15px;
      }
      
      /* Info Grid */
      .info-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        background: #d2ddf3ff;
        padding: 15px 12px;
        margin-bottom: 18px;
        border-radius: 4px;
      }
      .info-item {
        text-align: center;
      }
      .info-label {
        font-size: 12px;
        font-weight: 600;
        color: #000;
        margin-bottom: 3px;
      }
      .info-value {
        font-size: 12px;
        color: #000;
      }
      
      /* Section Title */
      .section-title {
        font-size: 16px;
        font-weight: 700;
        margin: 18px 0 10px 0;
        color: #000;
      }
      
      /* Room Section */
      .room-section {
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      .room-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 6px;
        color: #000;
      }
      
      /* Table Styles */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      th {
        background: #d2ddf3ff;
        padding: 8px 10px;
        text-align: left;
        font-weight: 600;
        font-size: 12px;
        border: 1px solid #e5e7eb;
      }
      td {
        padding: 8px 10px;
        border: 1px solid #e5e7eb;
        font-size: 12px;
      }
      
      /* Contact Details */
      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        background: #d2ddf3ff;
        padding: 12px;
        margin-bottom: 18px;
        border-radius: 4px;
      }
      .contact-item {
        display: flex;
        flex-direction: column;
      }
      .contact-label {
        font-size: 12px;
        color: #000;
        margin-bottom: 3px;
      }
      .contact-value {
        font-size: 12px;
        font-weight: 600;
        color: #000;
      }
      
      /* Cancellation Policy */
      .policy-table {
        margin-bottom: 12px;
      }
      .policy-notes {
        margin-top: 10px;
        font-size: 11px;
        line-height: 1.6;
      }
      .policy-notes p {
        margin-bottom: 3px;
      }
      .policy-notes .red-text {
        color: #dc2626;
      }
      
      /* Booking Notes */
      .notes-section {
        margin-top: 18px;
        page-break-inside: avoid;
      }
      .notes-content {
        font-size: 11px;
        line-height: 1.6;
      }
      .notes-content p {
        margin-bottom: 6px;
      }
      .notes-subtitle {
        font-weight: 600;
        margin: 10px 0 6px 0;
        font-size: 13px;
      }
      
      /* Terms Section */
      .terms-section {
        margin-top: 18px;
        page-break-inside: avoid;
      }
      .terms-list {
        list-style: decimal;
        padding-left: 20px;
        font-size: 11px;
        line-height: 1.6;
      }
      .terms-list li {
        margin-bottom: 6px;
      }
      
      @media print {
        body {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
      }
    </style>
  `;

  // Logo and Company Header
  const logoHeader = `
    <div class="logo-header">
      <img src="https://travelogy.digilogy.co/Travelogy%20logoNew.png" alt="Travelogy Logo" />
      <div class="company-info">
        <strong>Address:</strong> NPL Devi, 111, Lattice Brg Rd,<br/>
       Thiruvanmiyur, Chennai, Tamil Nadu 600041<br/>
        <strong>Phone:</strong> +91-95662 66061<br/>
        <strong>Email:</strong> info@casagrandtravelogy.co.in
      </div>
    </div>
  `;

  // Status Header with dynamic color
  const statusValue = String(vm.status || "").toUpperCase();
  let statusColorClass = "status-success";
  let iconColor = "#22c55e";
  
  if (statusValue === "CANCELLED" || statusValue === "CANCELLATION_PENDING" || statusValue === "VOID") {
    statusColorClass = "status-cancelled";
    iconColor = "#f59e0b";
  } else if (statusValue === "PENDING" || statusValue === "PROCESSING" || statusValue === "ON_HOLD") {
    statusColorClass = "status-pending";
    iconColor = "#eab308";
  } else if (statusValue === "FAILED" || statusValue === "ERROR" || statusValue === "DECLINED") {
    statusColorClass = "status-failed";
    iconColor = "#ef4444";
  }
  
  const statusHeader = `
    <div class="status-header">
      <svg class="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="${iconColor}"/>
        <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h1 class="status-text ${statusColorClass}">${sanitize(statusLabel(vm.status))}</h1>
    </div>
    <div class="booking-id">Booking ID: ${sanitize(vm.bookingRef)}</div>
  `;

  // Hotel Header
  const hotelHeader = `
    <div class="hotel-header">
      <div class="hotel-name">
        ${sanitize(vm.hotel.name)}
        ${
          vm.hotel.rating > 0
            ? `<span class="rating">${"★".repeat(vm.hotel.rating)}</span>`
            : ""
        }
      </div>
      <div class="hotel-address">${sanitize(vm.hotel.address)}</div>
      <div class="hotel-address">${sanitize(vm.hotel.city)}${
    vm.hotel.country ? `, ${sanitize(vm.hotel.country)}` : ""
  } -</div>
    </div>
  `;

  // Info Grid
  const totalAdults = vm.rooms.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = vm.rooms.reduce((sum, r) => sum + r.children, 0);
  
  const infoGrid = `
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Check In</div>
        <div class="info-value">${formatDate(vm.rooms[0]?.checkIn)}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Check Out</div>
        <div class="info-value">${formatDate(vm.rooms[0]?.checkOut)}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Total Rooms</div>
        <div class="info-value">${vm.rooms.length}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Total Guests</div>
        <div class="info-value">${totalAdults} Adult${totalAdults !== 1 ? 's' : ''}${totalChildren > 0 ? `, ${totalChildren} Child${totalChildren !== 1 ? 'ren' : ''}` : ''}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Total Nights</div>
        <div class="info-value">${vm.rooms[0]?.nights || 0} Night${vm.rooms[0]?.nights !== 1 ? 's' : ''}</div>
      </div>
    </div>
  `;

  // Guest Details Section - use guests from room.guests (ti array)
  const guestDetailsSection = `
    <h3 class="section-title">Guest Details:</h3>
    ${vm.rooms
      .map((room, idx) => {
        const roomGuests = room.guests || [];
        // Use the actual room capacity (adults + children) for display
        const totalRoomCapacity = room.adults + room.children;
        
        return `
          <div class="room-section avoid-break">
            <div class="room-title">${sanitize(room.name)} (${sanitize(room.type)}) (${totalRoomCapacity} Guest${totalRoomCapacity !== 1 ? 's' : ''})</div>
            <table>
              <thead>
                <tr>
                  <th style="width: 10%;">No.</th>
                  <th style="width: 20%;">Title</th>
                  <th style="width: 35%;">First Name</th>
                  <th style="width: 35%;">Last Name</th>
                </tr>
              </thead>
              <tbody>
                ${roomGuests.length > 0 ? roomGuests
                  .map((guest, gIdx) => `
                    <tr>
                      <td>${gIdx + 1}.</td>
                      <td>${sanitize(guest.ti || '')}</td>
                      <td>${sanitize(guest.fN || '').toUpperCase()}</td>
                      <td>${sanitize(guest.lN || '').toUpperCase()}</td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="4" style="text-align: center; color: #666;">No guest details available</td>
                    </tr>
                  `}
              </tbody>
            </table>
          </div>
        `;
      })
      .join('')}
  `;

  // Contact Details
  const contactDetails = `
    <h3 class="section-title">Contact Details</h3>
    <div class="contact-grid">
      <div class="contact-item">
        <div class="contact-label">Email</div>
        <div class="contact-value">${vm.contact.emails?.[0] ? sanitize(vm.contact.emails[0]) : '-'}</div>
      </div>
      <div class="contact-item">
        <div class="contact-label">Mobile</div>
        <div class="contact-value">${vm.contact.phones?.[0] ? `${vm.contact.codes?.[0] || ''} ${sanitize(vm.contact.phones[0])}` : '-'}</div>
      </div>
    </div>
  `;

  // Total Fare Summary
  const fareSummary = `
    <div class="avoid-break">
      <h3 class="section-title">TOTAL FARE SUMMARY</h3>
      <table>
        <tbody>
          <tr>
            <th style="width: 60%;">Base Fare</th>
            <td style="text-align: right;">₹${fmtIN(vm.pricing.basePrice)}</td>
          </tr>
          <tr>
            <th>Taxes and Fees</th>
            <td style="text-align: right;">₹${fmtIN(vm.pricing.taxes)}</td>
          </tr>
          <tr>
            <th style="border-top: 1px solid #000; font-weight: 700;">Total Amount Payable</th>
            <td style="border-top: 1px solid #000; text-align: right; font-weight: 700; font-size: 14px;">₹${fmtIN(vm.pricing.total)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // Cancellation Policy
  const cancellationSection = vm.cancellationPolicy.length > 0 ? `
    <div class="avoid-break">
      <h3 class="section-title">Cancellation Policy:</h3>
      <table class="policy-table">
        <thead>
          <tr>
            <th>Cancellation on or After</th>
            <th>Cancellation on or Before</th>
            <th>Cancellation Charges/Comments</th>
          </tr>
        </thead>
        <tbody>
          ${vm.cancellationPolicy.map(policy => `
            <tr>
              <td>${formatDateTime(policy.fdt)}</td>
              <td>${formatDateTime(policy.tdt)}</td>
              <td>₹${fmtIN(policy.am || 0)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="policy-notes">
        <p>* Each booking is applicable for ₹20 per room/night non-refundable service fee.</p>
        <p>* No Show will attract full cancellation charge unless otherwise specified.</p>
        <p>* Early checkout will attract full cancellation charge unless otherwise specified.</p>
        <p class="red-text">* Taxes & fees are non-refundable.</p>
      </div>
    </div>
  ` : '';

  // Booking Notes - parse from inst array
  const bookingNotesSection = vm.bookingNotes.length > 0 ? `
    <div class="notes-section">
      <h3 class="section-title">Booking Notes:</h3>
      <div class="notes-content">
        ${vm.bookingNotes.map(note => {
          let parsedMsg;
          try {
            parsedMsg = JSON.parse(note.msg);
          } catch {
            parsedMsg = { raw: note.msg };
          }

          const noteType = (note.type || '')
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase());

          if (typeof parsedMsg === 'object' && !parsedMsg.raw) {
            const entries = Object.entries(parsedMsg)
              .map(([key, value]) => {
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                return `<p><strong>${sanitize(label)}:</strong> ${sanitize(value)}</p>`;
              })
              .join('');
            return `
              <div style="margin-bottom: 12px;">
                <p class="notes-subtitle">${sanitize(noteType)}</p>
                ${entries}
              </div>
            `;
          } else {
            const content = parsedMsg.raw || '';
            if (!content.trim()) return '';
            return `
              <div style="margin-bottom: 12px;">
                <p class="notes-subtitle">${sanitize(noteType)}</p>
                <p>${sanitize(content)}</p>
              </div>
            `;
          }
        }).join('')}
      </div>
    </div>
  ` : '';

  // General Terms
  const termsSection = `
    <div class="terms-section">
      <h3 class="section-title">General Terms & Conditions:</h3>
      <ol class="terms-list">
        <li>Each country/state may have its own set of COVID-19 guidelines and restrictions. Please check with the hotel or visit the country's/state's website for the same.</li>
        <li>Your booking is confirmed. However, your name will be listed in the hotel's reservation system closer to your arrival date.</li>
        <li>Guest Photo ID must be presented at the time of check-in.</li>
        <li>Credit card or cash deposit may be required for extra services at the time of check-in.</li>
        <li>All extra charges will be borne by the guest directly prior to departure.</li>
        <li>Extra-person and/or Extra-bed charges may apply and vary depending on property policy.</li>
        <li>In case of the guest arrival delayed or postponed due to any unforeseen occurrences, additional charges will be borne by the guest.</li>
        <li>In case of incorrect residency and nationality chosen by the user at the time of booking, additional charges may be applicable which will be borne by the guest and paid to the hotel at the time of check-in/check-out.</li>
        <li>Any special requests are all subject to availability at the time of check-in and are not guaranteed at the time of booking (bed type, smoking room, early check-in, late check-out etc.).</li>
        <li>Full cancellation charges are applicable on early check-out unless otherwise specified.</li>
        <li>Hotels do not permit unmarried or unrelated couples and it is at the hotel management's discretion to allow or cancel the booking. In such case no refund is applicable if the hotel disallows check-in.</li>
        <li>City tax and resort fee (if any) are to be paid directly to the hotel.</li>
        <li>If your booking offers complimentary car transfer you need to inform the hotel of your travel details 24 hours prior to check-in.</li>
        <li>As per RBI guidelines: in case of foreign nationals, it is mandatory to submit a passport copy of the guest. Please send a scanned copy of the guest's passport to us. Failure to comply may result in the cancellation of the booking without notice.</li>
        <li>Additional GST Payment (if any) to be paid to the hotel directly by the guest.</li>
      </ol>
    </div>
    
    <div style="text-align: center; font-size: 12px; color: #6B7280; margin-top: 20px; padding: 12px; border: 1px solid #E5E7EB; border-radius: 8px;">
      This booking receipt is system generated. Please carry a valid government ID along with this document.
    </div>
  `;
  

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Hotel Booking • ${sanitize(vm.bookingRef)}</title>
        ${styles}
      </head>
      <body>
        <div class="container">
          ${logoHeader}
          ${statusHeader}
          ${hotelHeader}
          ${infoGrid}
          ${guestDetailsSection}
          ${contactDetails}
          ${fareSummary}
          ${cancellationSection}
          ${bookingNotesSection}
          ${termsSection}
        </div>
      </body>
    </html>
  `;
}

/**
 * Download hotel booking as PDF with the same layout as print
 * Uses browser's native print-to-PDF for proper page breaks
 * @param {Object} bookingDetails - The booking details object
 */
export async function downloadHotelBookingAsPDF(bookingDetails) {
  if (!bookingDetails) {
    console.error("No booking details provided for PDF generation");
    return;
  }

  try {
    // Normalize data and render HTML using the same functions as print
    const vm = normalizeHotelData(bookingDetails);
    const html = renderHotelHTML(vm);

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      alert('Please allow popups to download the PDF. Then try again.');
      return;
    }

    // Write the HTML content
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for images and fonts to load
    const waitForLoad = new Promise((resolve) => {
      if (printWindow.document.readyState === 'complete') {
        resolve();
      } else {
        printWindow.addEventListener('load', resolve);
      }
    });

    await waitForLoad;

    // Wait for images
    const imgs = Array.from(printWindow.document.images || []);
    if (imgs.length > 0) {
      await new Promise((resolve) => {
        let loaded = 0;
        const done = () => {
          loaded++;
          if (loaded >= imgs.length) resolve();
        };
        imgs.forEach((img) => {
          if (img.complete) return done();
          img.addEventListener('load', done);
          img.addEventListener('error', done);
        });
        // Fallback timeout
        setTimeout(resolve, 3000);
      });
    }

    // Small delay to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Trigger print dialog (user can save as PDF)
    printWindow.focus();
    printWindow.print();

    // Close the window after printing
    // Note: We can't automatically close it immediately as the print dialog needs to stay open
    printWindow.addEventListener('afterprint', () => {
      setTimeout(() => {
        printWindow.close();
      }, 100);
    });

    console.log("Print dialog opened for PDF generation");
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  }
}
