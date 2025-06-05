
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const ExtraBaggage=({numAdults,numChild,numInfants,apiData,form})=>{
    console.log("apiData from extra baggage",apiData)
//     const data={
//     "tripInfos": [
//         {
//             "sI": [
//                 {
//                     "id": "409",
//                     "fD": {
//                         "aI": {
//                             "code": "SG",
//                             "name": "SpiceJet",
//                             "isLcc": true
//                         },
//                         "fN": "8153",
//                         "eT": "737"
//                     },
//                     "stops": 0,
//                     "so": [],
//                     "duration": 135,
//                     "da": {
//                         "code": "DEL",
//                         "name": "Delhi Indira Gandhi Intl",
//                         "cityCode": "DEL",
//                         "city": "Delhi",
//                         "country": "India",
//                         "countryCode": "IN",
//                         "terminal": "Terminal 3"
//                     },
//                     "aa": {
//                         "code": "BOM",
//                         "name": "Chhatrapati Shivaji",
//                         "cityCode": "BOM",
//                         "city": "Mumbai",
//                         "country": "India",
//                         "countryCode": "IN",
//                         "terminal": "Terminal 2"
//                     },
//                     "dt": "2020-11-19T06:20",
//                     "at": "2020-11-19T08:35",
//                     "iand": false,
//                     "isRs": false,
//                     "sN": 0,
//                     "ssrInfo": {
//                         // "BAGGAGE": [
//                         //     {
//                         //         "code": "BOF1",
//                         //         "amount": 100.00,
//                         //         "desc": "Bag Out First with 1 Bag"
//                         //     },
//                         //     {
//                         //         "code": "BOF2",
//                         //         "amount": 200.00,
//                         //         "desc": "Bag Out First with 2 Bag"
//                         //     },
//                         //     {
//                         //         "code": "BOF3",
//                         //         "amount": 450.00,
//                         //         "desc": "Bag Out First with 3 Bag"
//                         //     },
//                         //     {
//                         //         "code": "EB05",
//                         //         "amount": 1900.00,
//                         //         "desc": "5KG"
//                         //     },
//                         //     {
//                         //         "code": "EB15",
//                         //         "amount": 5700.00,
//                         //         "desc": "15KG"
//                         //     },
//                         //     {
//                         //         "code": "EB20",
//                         //         "amount": 7600.00,
//                         //         "desc": "20KG"
//                         //     },
//                         //     {
//                         //         "code": "EB30",
//                         //         "amount": 11400.00,
//                         //         "desc": "30KG"
//                         //     }
//                         // ],
//                         "MEAL": [
//                             {
//                                 "code": "LCVS",
//                                 "amount": 0.00,
//                                 "desc": "Low cal salad Vegetarian"
//                             },
//                             {
//                                 "code": "LCNS",
//                                 "amount": 0.00,
//                                 "desc": "Low cal salad Non Vegetarian"
//                             },
//                             {
//                                 "code": "VGSW",
//                                 "amount": 180.00,
//                                 "desc": "Veg Sandwich/Wrap/Sub"
//                             },
//                             {
//                                 "code": "NVSW",
//                                 "amount": 180.00,
//                                 "desc": "Non Veg Sandwich/Wrap/Sub"
//                             },
//                             {
//                                 "code": "JNSW",
//                                 "amount": 180.00,
//                                 "desc": "Jain Cold Sandwich (current Cucumber and Tomato sandwich)"
//                             },
//                             {
//                                 "code": "VGML",
//                                 "amount": 275.00,
//                                 "desc": "Veg Meal"
//                             },
//                             {
//                                 "code": "NVML",
//                                 "amount": 275.00,
//                                 "desc": "Non Veg Meal"
//                             },
//                             {
//                                 "code": "VCC2",
//                                 "amount": 300.00,
//                                 "desc": "Vegetable in Red Thai Curry with Steamed Rice"
//                             },
//                             {
//                                 "code": "NCC6",
//                                 "amount": 300.00,
//                                 "desc": "Chicken schezwan on bed of fried rice"
//                             },
//                             {
//                                 "code": "NCC5",
//                                 "amount": 300.00,
//                                 "desc": "Tawa Fish masala on bed of  Steamed rice with tadka masoordal"
//                             },
//                             {
//                                 "code": "NCC4",
//                                 "amount": 300.00,
//                                 "desc": "Tandoori Chicken tangri with chicken haryali tikka & vegetable shami kebab"
//                             },
//                             {
//                                 "code": "NCC2",
//                                 "amount": 300.00,
//                                 "desc": "Chicken in Red Thai Curry with Steamed Rice"
//                             },
//                             {
//                                 "code": "NCC1",
//                                 "amount": 300.00,
//                                 "desc": "Grilled Chicken Breast with Mushroom Sauce, Yellow Rice, Saut Carrot & Beans Baton"
//                             },
//                             {
//                                 "code": "JNML",
//                                 "amount": 350.00,
//                                 "desc": "Jain Hot Meal"
//                             },
//                             {
//                                 "code": "GFVG",
//                                 "amount": 350.00,
//                                 "desc": "Vegetarian Gluten-free Hot Meal"
//                             },
//                             {
//                                 "code": "GFNV",
//                                 "amount": 350.00,
//                                 "desc": "Non Vegetarian Gluten-free Hot Meal"
//                             },
//                             {
//                                 "code": "GFCM",
//                                 "amount": 350.00,
//                                 "desc": "Vegetarian Gluten-free Cold Meal"
//                             },
//                             {
//                                 "code": "FPML",
//                                 "amount": 350.00,
//                                 "desc": "Fruit Platter"
//                             },
//                             {
//                                 "code": "DNVL",
//                                 "amount": 350.00,
//                                 "desc": "Non Vegetarian Diabetic Hot Meal"
//                             },
//                             {
//                                 "code": "DBML",
//                                 "amount": 350.00,
//                                 "desc": "Vegetarian Diabetic Hot Meal"
//                             },
//                             {
//                                 "code": "CHML",
//                                 "amount": 350.00,
//                                 "desc": "Kids meal"
//                             }
//                         ]
//                     },
//                     "ac": []
//                 }
//             ],
//             "totalPriceList": [
//                 {
//                     "fd": {
//                         "INFANT": {
//                             "fC": {
//                                 "TF": 1277.70,
//                                 "TAF": 77.70,
//                                 "NF": 1277.70,
//                                 "BF": 1200.00
//                             },
//                             "afC": {
//                                 "TAF": {
//                                     "MF": 15.00,
//                                     "OT": 0.00,
//                                     "AGST": 60.00,
//                                     "MFT": 2.70
//                                 }
//                             },
//                             "isHB": true
//                         },
//                         "ADULT": {
//                             "fC": {
//                                 "NCM": 471.20,
//                                 "TAF": 1155.00,
//                                 "TF": 3635.00,
//                                 "NF": 3163.80,
//                                 "BF": 2480.00
//                             },
//                             "afC": {
//                                 "NCM": {
//                                     "TDS": -24.80,
//                                     "OT": 496.00
//                                 },
//                                 "TAF": {
//                                     "MF": 500.00,
//                                     "OT": 433.00,
//                                     "AGST": 132.00,
//                                     "MFT": 90.00
//                                 }
//                             },
//                             "sR": 1,
//                             "bI": {
//                                 "iB": "0Default"
//                             },
//                             "isHB": true,
//                             "rT": 2,
//                             "cc": "ECONOMY",
//                             "cB": "HO",
//                             "fB": "UHBO"
//                         },
//                         "CHILD": {
//                             "fC": {
//                                 "NCM": 471.20,
//                                 "TAF": 1155.00,
//                                 "TF": 3635.00,
//                                 "NF": 3163.80,
//                                 "BF": 2480.00
//                             },
//                             "afC": {
//                                 "NCM": {
//                                     "TDS": -24.80,
//                                     "OT": 496.00
//                                 },
//                                 "TAF": {
//                                     "MF": 500.00,
//                                     "OT": 433.00,
//                                     "AGST": 132.00,
//                                     "MFT": 90.00
//                                 }
//                             },
//                             "sR": 1,
//                             "bI": {
//                                 "iB": "0Default"
//                             },
//                             "isHB": true,
//                             "rT": 2,
//                             "cc": "ECONOMY",
//                             "cB": "HO",
//                             "fB": "UHBO"
//                         }
//                     },
//                     "fareIdentifier": "HANDBAGGAGE",
//                     "id": "4-0333594672_DELBOMSG8153_811996401394509",
//                     "messages": [],
//                     "pc": {
//                         "code": "SG",
//                         "name": "SpiceJet",
//                         "isLcc": true
//                     }
//                 }
//             ]
//         }
//     ],
//     "alerts": [
//         {
//             "oldFare": 7403.10,
//             "newFare": 8547.70,
//             "type": "FAREALERT"
//         }
//     ],
//     "searchQuery": {
//         "routeInfos": [
//             {
//                 "fromCityOrAirport": {
//                     "code": "DEL",
//                     "name": "Delhi Indira Gandhi Intl",
//                     "cityCode": "DEL",
//                     "city": "Delhi",
//                     "country": "India",
//                     "countryCode": "IN"
//                 },
//                 "toCityOrAirport": {
//                     "code": "BOM",
//                     "name": "Chhatrapati Shivaji",
//                     "cityCode": "BOM",
//                     "city": "Mumbai",
//                     "country": "India",
//                     "countryCode": "IN"
//                 },
//                 "travelDate": "2020-11-19"
//             }
//         ],
//         "cabinClass": "ECONOMY",
//         "paxInfo": {
//             "ADULT": 1,
//             "CHILD": 1,
//             "INFANT": 1
//         },
//         "searchType": "ONEWAY",
//         "searchModifiers": {},
//         "sourceIds": [
//             4
//         ],
//         "isDomestic": true,
//         "isCustomCombination": false,
//         "isOneWay": true,
//         "isDomesticMultiCity": false,
//         "isDomesticReturn": false,
//         "isMultiCity": false
//     },
//     "bookingId": "TJS105300003497",
//     "totalPriceInfo": {
//         "totalFareDetail": {
//             "fC": {
//                 "NCM": 942.40,
//                 "TF": 8547.70,
//                 "TAF": 2387.70,
//                 "NF": 7605.30,
//                 "BF": 6160.00
//             },
//             "afC": {
//                 "NCM": {
//                     "TDS": -49.60,
//                     "OT": 992.00
//                 },
//                 "TAF": {
//                     "MF": 1015.00,
//                     "OT": 866.00,
//                     "AGST": 324.00,
//                     "MFT": 182.70
//                 }
//             }
//         }
//     },
//     "status": {
//         "success": true,
//         "httpStatus": 200
//     },
//     "conditions": {
//         "ffas": [],
//         "isa": true,
//         "dob": {
//             "adobr": false,
//             "cdobr": false,
//             "idobr": true
//         },
//         "isBA": true,
//         "st": 840,
//         "sct": "2020-02-13T20:53:57.285",
//         "gst": {
//             "gstappl": true,
//             "igm": false
//         }
//     }
// }
// const ssrInfo = data.tripInfos
//   .flatMap(trip => trip.sI || [])      // flatten all segments from each trip
//   .map(segment => segment.ssrInfo)     // get ssrInfo from each segment
//   .filter(Boolean);                    // remove undefined/null values

 const tripInfos = apiData?.tripInfos || [];
  const ssrInfo = tripInfos
    .flatMap((trip) => trip.sI || [])
    .map((segment) => segment?.ssrInfo)
    .filter(Boolean);


console.log("ssrInfo from extra baggage", ssrInfo);

const hasBaggage = ssrInfo.some(e => Array.isArray(e.BAGGAGE) && e.BAGGAGE.length > 0);
    return(<>
{hasBaggage?(<>

<Form form={form} name="baggageForm" layout="vertical" autoComplete="off">
      {/* ADULT BAGGAGE SELECTION */}
      {Array.from({ length: numAdults }).map((_, index) => (
        <div className="p-3 flex flex-row gap-5 items-center" key={`adult-${index}`}>
          <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
            ADULT {index + 1}
          </span>
          <Form.Item name={`adultBaggage-${index}`} style={{ marginBottom: 0 }}>
            <Select className="h-10 w-100" placeholder="Add Baggage">
              {ssrInfo.flatMap((e) =>
                e.BAGGAGE?.map((bag) => (
                  <Option key={bag.code} value={bag.code}>
                    {bag.desc} - ₹{bag.amount}
                  </Option>
                )) || []
              )}
            </Select>
          </Form.Item>
        </div>
      ))}

      {/* CHILD BAGGAGE SELECTION */}
      {Array.from({ length: numChild }).map((_, index) => (
        <div className="p-3 flex flex-row gap-5 items-center" key={`child-${index}`}>
          <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
            CHILD {index + 1}
          </span>
          <Form.Item name={`childBaggage-${index}`} style={{ marginBottom: 0 }}>
            <Select className="h-10 w-100" placeholder="Add Baggage">
              {ssrInfo.flatMap((e) =>
                e.BAGGAGE?.map((bag) => (
                  <Option key={bag.code} value={bag.code}>
                    {bag.desc} - ₹{bag.amount}
                  </Option>
                )) || []
              )}
            </Select>
          </Form.Item>
        </div>
      ))}

      {/* INFANT BAGGAGE SELECTION */}
      {Array.from({ length: numInfants }).map((_, index) => (
        <div className="p-3 flex flex-row gap-5 items-center" key={`infant-${index}`}>
          <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
            INFANT {index + 1}
          </span>
          <Form.Item name={`infantBaggage-${index}`} style={{ marginBottom: 0 }}>
            <Select className="h-10 w-100" placeholder="Add Baggage">
              {ssrInfo.flatMap((e) =>
                e.BAGGAGE?.map((bag) => (
                  <Option key={bag.code} value={bag.code}>
                    {bag.desc} - ₹{bag.amount}
                  </Option>
                )) || []
              )}
            </Select>
          </Form.Item>
        </div>
      ))}
    </Form>

</>):(<>
 <div className="p-3 text-sm text-gray-500">No baggage options available for this flight.</div>
</>)}




    </>)
}
export default ExtraBaggage