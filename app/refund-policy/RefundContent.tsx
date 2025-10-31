// export default function RefundContent() {
//   return (
//     <div style={{background: 'linear-gradient(135deg, #aca491ff 0%, #d09409 100%)'}} className="min-vh-100 py-5">
//     <div className="container mt-100 mb-100">
//       <div className="row justify-content-center">
//         <div className="col-lg-10">
//           <div className="bg-white rounded-4 shadow-lg p-5">
//             <div className="text-center mb-5">
//               <h1 className="heading-44-medium mb-3">Cancellation / Refund Terms</h1>
//             </div>

//           <div className="mb-40">
//             <h3 className="heading-6-medium mb-20">Terms and Conditions of Online Payments</h3>
//             <p className="text-md neutral-700 mb-20">
//               <strong>Payments/Top Ups/ Paid for Order:</strong>Please note that any transaction done through any Online Payment by our registered agents or walking customer comes to an agent. In case of Walk-in customer swiping the card for a booking or Wallet update, Card holder is fully responsible for it and if any dispute/Chargeback raised will be taken care by the Trip Jack registered agent.
//             </p>
//              <p className="text-md neutral-700 mb-20">
//               <strong>Wallet Update:</strong>If any transaction through any online payment mode and payment get success however booking fails than that transaction amount (Excluding Payment gateway charges) will be credited to Trip Jack Agent ID wallet.
// In-case of processing refund, based on standing instruction from the Trip-jack Agent it will be refunded through respective payment mode used while transaction.
//              </p>
//               <p className="text-md neutral-700 mb-20">
// <strong>Payment Gateway Fees:</strong>Please note that any payment Gateway fee will be applied automatically to the online payment option.
// Payment gateway charges will be Non-refundable in any circumstances.
//               </p>
//                <p className="text-md neutral-700 mb-20">
// <strong>Payment Processing Terms & Conditions:</strong>By providing your credit card details and accepting our Terms & Conditions, you authorise Trip Jack to arrange for funds to be debited from your nominated credit card, in accordance with the terms & conditions of the Direct Debit Request Service Agreement as amended from time to time.
// Your bank or credit card provider may apply currency conversion fees. Credit Cards are required to secure bookings if you are travelling within 14 days.
//                </p>
//                 <p className="text-md neutral-700 mb-20">
// <strong>Credit Card Chargeback Fees:</strong>Any fees charged to Trip Jack by our credit card payment provider arising from a chargeback or a disputed charge on the cardholder's credit card will be charged to the cardholder or registered agency. his fee is non-refundable.
//                 </p>
//                  <p className="text-md neutral-700 mb-20">
// <strong>Outstanding:</strong>If any outstanding is due, its unpaid after several reminders, Trip Jack has rights to recover by future flown tickets.
//                  </p>
//                   <p className="text-md neutral-700 mb-20">
// <strong>Payment Options:</strong>Trip jack offers a secure server for your credit card payments.
//                   </p>
//           </div>

//           {/* <div className="mb-40">
//             <h3 className="heading-6-medium mb-20">2. Cancellation Timeframes</h3>
//             <p className="text-md neutral-700 mb-20">
//               Refund amounts depend on when you cancel your booking:
//             </p>
//             <ul className="list-disc ml-20">
//               <li className="text-md neutral-700 mb-10"><strong>24+ hours before:</strong> Full refund minus processing fees</li>
//               <li className="text-md neutral-700 mb-10"><strong>12-24 hours before:</strong> 50% refund</li>
//               <li className="text-md neutral-700 mb-10"><strong>Less than 12 hours:</strong> No refund</li>
//               <li className="text-md neutral-700 mb-10"><strong>No-show:</strong> No refund</li>
//             </ul>
//           </div>

//           <div className="mb-40">
//             <h3 className="heading-6-medium mb-20">3. Processing Time</h3>
//             <p className="text-md neutral-700 mb-20">
//               Approved refunds will be processed within 5-10 business days and credited back to your original payment method.
//             </p>
//           </div>

//           <div className="mb-40">
//             <h3 className="heading-6-medium mb-20">4. Non-Refundable Items</h3>
//             <p className="text-md neutral-700 mb-20">
//               The following items are non-refundable:
//             </p>
//             <ul className="list-disc ml-20">
//               <li className="text-md neutral-700 mb-10">Service fees and taxes</li>
//               <li className="text-md neutral-700 mb-10">Special promotional bookings</li>
//               <li className="text-md neutral-700 mb-10">Third-party insurance</li>
//             </ul>
//           </div>

//           <div className="mb-40">
//             <h3 className="heading-6-medium mb-20">5. How to Request a Refund</h3>
//             <p className="text-md neutral-700 mb-20">
//               To request a refund, contact our customer support team at refunds@travelogy.com with your booking reference number.
//             </p>
//           </div>

//           <div className="text-center mt-50">
//             <p className="text-sm neutral-500">
//               Last updated: {new Date().toLocaleDateString()}
//             </p>
//           </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

export default function RefundContent() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #aca491ff 0%, #d09409 100%)",
      }}
      className="min-vh-100 py-5"
    >
      <div className="container mt-100 mb-100">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white rounded-4 shadow-lg p-5">
              <div className="text-center mb-5">
                <h1 className="heading-44-medium mb-3" style={{ fontSize: "32px"}} >
                  Cancellation / Refund Terms
                </h1>
              </div>

              {/* Added policy content below */}
              <div className="mb-40">
                <h2 className="heading-6-medium" style={{ fontSize: "26px" }}>General</h2>
                <p className="text-md neutral-700 mb-20">
                  The cancellation policy is effective for all vacations crafted
                  by Travelogy. Travelogy customers eligible for refunds will
                  receive the refund amount within 90 working days from the date
                  of cancellation or when the supplier(s) processes the refund,
                  whichever is later. For refunds related to on-trip
                  cancellations, customers will receive the refund amount within
                  90 working days from the date of their return or when the
                  supplier(s) processes the refund, whichever is later. For
                  queries/clarifications, please reach out to{" "}
                  <a href="mailto:info@casagrandtravelogy.co.in">
                    info@casagrandtravelogy.co.in
                  </a>
                  .
                </p>
                <p className="text-md neutral-700 mb-0">
                  The Refund amount depicted is subjected to change based on
                  international exchange rates, refunds received from suppliers
                  and payments received from customers till date. Any change in
                  refund amount will be communicated to customers by their
                  respective account owners.
                </p>
              </div>

              <div className="mb-40">
                <h2 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Flight</h2>
                <p className="text-md neutral-700 mb-10">
                  On cancelling flights marked as “Non-Refundable” on the final
                  travel vouchers, customers will be eligible for a zero refund.
                </p>
                <p className="text-md neutral-700 mb-10">
                  For Flights marked as “Refundable” on the final travel
                  vouchers, customers will receive a refund as per the details
                  mentioned under the “Cancellation Policy” section of the
                  product and also in the final itinerary shared over the email.
                </p>
                <p className="text-md neutral-700 mb-10">
                  The total refunds for flights may include components which
                  vary as per the international exchange rates.
                </p>
                <p className="text-md neutral-700 mb-10">
                  Travelogy will not be responsible for
                  grounded/cancelled/delayed flights. Any cancellation requests
                  for these flights will have to be placed with the respective
                  airlines. Realization of refunds would be subject to
                  processing by the respective airline carrier.
                </p>
                <p className="text-md neutral-700 mb-10">
                  The onus is on the customer to ensure that his/her passport
                  has a minimum of 1- year validity and is in good condition.
                  Travelogy is not liable to refund a customer who is not
                  allowed to board the flight because of invalid passports
                  (validity expired, damaged passports).
                </p>
                <p className="text-md neutral-700 mb-10">
                  Customers are expected to reach the airport ahead of their
                  boarding time (at least 2 hours prior to boarding time).
                  Travelogy is not responsible to refund customers (for cases
                  wherein airport transfers are not planned by us) who miss
                  their flights owing to delayed arrival at the airport.
                </p>
                <p className="text-md neutral-700 mb-10">
                  For cases wherein airport transfers are planned by Travelogy,
                  flight cancellations due to delayed transfers owing to
                  unforeseen circumstances specific to a region will not be
                  borne by Travelogy.
                </p>
                <p className="text-md neutral-700 mb-10">
                  Details about baggage limitations (cabin and check-in) will be
                  furnished as part of the final travel vouchers. Additional
                  costs owing to breached baggage limits will have to be paid by
                  the customer at the time of check-in.
                </p>
                <p className="text-md neutral-700 mb-10">
                  Certain flight carriers (LCC like Ryanair, Vueling, Voltea
                  etc.) have a mandatory web check-in policy. Failure to comply
                  with this could result in an additional cost to be paid at the
                  airport. Travelogy is not liable to refund customers in such
                  circumstances.
                </p>
                <p className="text-md neutral-700 mb-0">
                  Travelogy will set meal preferences for customers with airline
                  carriers upon request. However, Travelogy has no control over
                  the availability and quality of meals served on the flight.
                  This will be controlled completely by the airline carrier.
                </p>
              </div>

              <div className="mb-40">
                <h2 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Hotels</h2>
                <p className="text-md neutral-700 mb-10">
                  On cancelling hotels which have been marked as
                  “Non-Refundable” on the final travel vouchers, the customer
                  will be eligible for a zero refund.
                </p>
                <p className="text-md neutral-700 mb-10">
                  For hotels which have been marked as “Refundable” on the final
                  travel vouchers, refunds and their timelines will be
                  applicable as mentioned under the “Cancellation Policy”
                  section of the product and in the final itinerary shared over
                  email.
                </p>
                <p className="text-md neutral-700 mb-10">
                  The total refunds for hotels may include components which vary
                  with international exchange rates.
                </p>
                <p className="text-md neutral-700 mb-10">
                  While Travelogy strives to provide the best hotels with
                  world-class amenities, we cannot be held responsible for
                  factors such as hotel staff behaviour, cleanliness and quality
                  of accommodation. Additional costs owing to on-trip room
                  upgrades and additional amenities will be borne by the
                  customer. All hotels changed on-trip (Hotels booked per
                  itinerary cancelled and new hotels booked) will entail a 100%
                  cancellation fee.
                </p>
                <p className="text-md neutral-700 mb-0">
                  Entertaining early check-in or late check-out requests is
                  solely based on the discretion of the hotel. Travelogy will
                  not be able to process cancellation requests owing to
                  non-availability of these requests.
                </p>
              </div>

              <div className="mb-40">
                <h2 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Activities</h2>
                <p className="text-md neutral-700 mb-10">
                  On cancelling activities marked as “Non-Refundable” on the
                  final travel vouchers, the customer will be eligible for a
                  zero refund.
                </p>
                <p className="text-md neutral-700 mb-10">
                  For activities, which have been marked as “Refundable” on the
                  final travel vouchers, refunds and their timelines will be
                  applicable as mentioned under the “Cancellation Policy”
                  section of the product and in the final itinerary shared over
                  email.
                </p>
                <p className="text-md neutral-700 mb-0">
                  The total refund for activities may include components which
                  vary with international exchange rates.
                </p>
              </div>

              <div className="mb-40">
                <h2 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Visa &amp; Insurance</h2>
                <p className="text-md neutral-700 mb-10">
                  Travelogy acts as a facilitator for processing Visa
                  applications. We will guide customers on Visa formalities
                  &amp; Visa documentation for specific destinations. The
                  discretion to grant/reject Visa rests solely with the
                  concerned embassy and Travelogy will not be responsible for
                  rejection of any applications. The visa fee is non-refundable
                  in case of rejected visa applications.
                </p>
                <p className="text-md neutral-700 mb-10">
                  While we strive to provide a seamless Visa experience to the
                  customers, Travelogy will not be held responsible for
                  unforeseen changes to Visa formalities levied by the embassy
                  during the document submission and processing phase.
                </p>
                <p className="text-md neutral-700 mb-0">
                  Insurance once applied is subject to 100% cancellation fee and
                  is non-refundable.
                </p>
              </div>

              <div className="mb-40">
                <h2 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Transfers</h2>
                <p className="text-md neutral-700 mb-10">
                  For all transfers, refunds and their timelines will be
                  applicable as mentioned under the “Cancellation Policy”
                  section of the product and in the final itinerary shared over
                  email.
                </p>
                <p className="text-md neutral-700 mb-0">
                  The total refunds for transfers may include components which
                  vary with international exchange rates.
                </p>
              </div>

              <div className="text-center mt-50">
                <p className="text-sm neutral-500">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
