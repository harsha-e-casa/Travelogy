import React, { useState } from "react";
import { Select } from "antd";
const apiListAirLineState = require("./apiListAirLineState");

const AppListSearch = ({
  setSelectFrom,
  operEngLocation,
  setSelectFromSub,
  categoryType,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(apiListAirLineState);
  // const apiListAirLineState = [
  //   { "key": "AHA", "city": "Ambikapur", "name": "Ambikapur airport", "country": "India" },
  //   { "key": "DAE", "city": "Daparizo", "name": "Daparizo Airport", "country": "India" },
  //   { "key": "PUI", "city": "Purnea", "name": "Purnea Airport", "country": "India" },
  //   { "key": "VID", "city": "Bellary", "name": "Bellary", "country": "India" },
  //   { "key": "IHX", "city": "Kailashahar", "name": "Kailashahar", "country": "India" },
  //   { "key": "XLL", "city": "Alleppey", "name": "Alleppey", "country": "India" },
  //   { "key": "XKU", "city": "Kumarakom", "name": "Kumarakom", "country": "India" },
  //   { "key": "XAM", "city": "Amreli", "name": "Amreli", "country": "India" },
  //   { "key": "UJA", "city": "Ujjain", "name": "Ujjain", "country": "India" },
  //   { "key": "IXX", "city": "Bidar", "name": "Bidar Airport", "country": "India" },
  //   { "key": "KTK", "city": "Ankula Part", "name": "Kunua Airport", "country": "India" },
  //   { "key": "OMN", "city": "Osmanabad", "name": "Osmanabad", "country": "India" },
  //   { "key": "MZA", "city": "Muzaffarnagar", "name": "Muzaffarnagar", "country": "India" },
  //   { "key": "AWT", "city": "Awantipur", "name": "Awantipur", "country": "India" },
  //   { "key": "ISK", "city": "Nasik", "name": "Ozar Airport", "country": "India" },
  //   { "key": "IXA", "city": "Agartala", "name": "Singerbhil Arpt", "country": "India" },
  //   { "key": "IXB", "city": "Bagdogra", "name": "Bagdogra Arpt", "country": "India" },
  //   { "key": "IXC", "city": "Chandigarh", "name": "Chandigarh Arpt", "country": "India" },
  //   { "key": "IXD", "city": "Prayagraj", "name": "Prayagraj airport", "country": "India" },
  //   { "key": "IXE", "city": "Mangalore", "name": "Bajpe Arpt", "country": "India" },
  //   { "key": "IXG", "city": "Belgaum", "name": "Belagavi airport", "country": "India" },
  //   { "key": "IXH", "city": "Kailashahar", "name": "Kailashahar Airport", "country": "India" },
  //   { "key": "IXI", "city": "Lilabari", "name": "Lilabari Arpt", "country": "India" },
  //   { "key": "IXJ", "city": "Jammu", "name": "Satwari Arpt", "country": "India" },
  //   { "key": "IXK", "city": "Keshod", "name": "Keshod Airport", "country": "India" },
  //   { "key": "IXL", "city": "Leh IN", "name": "Leh Kushok Bakula Rimpochee Arpt", "country": "India" },
  //   { "key": "IXM", "city": "Madurai", "name": "Madurai Airport", "country": "India" },
  //   { "key": "IXN", "city": "khowai", "name": "khowai Airport", "country": "India" },
  //   { "key": "IXP", "city": "Pathankot", "name": "Pathankot Arpt", "country": "India" },
  //   { "key": "IXQ", "city": "Kamalpur", "name": "Kamalpur Airport", "country": "India" },
  //   { "key": "IXR", "city": "Ranchi", "name": "Birsa Munda Arpt", "country": "India" },
  //   { "key": "IXS", "city": "Silchar", "name": "Kumbhigram Arpt", "country": "India" },
  //   { "key": "IXT", "city": "Pasighat", "name": "Pasighat Airport", "country": "India" },
  //   { "key": "IXU", "city": "Aurangabad", "name": "Aurangabad airport", "country": "India" },
  //   { "key": "IXV", "city": "Along", "name": "Along Airport", "country": "India" },
  //   { "key": "IXW", "city": "Jamshedpur", "name": "Sonari Arpt", "country": "India" },
  //   { "key": "IXY", "city": "Kandla", "name": "Kandla Arpt", "country": "India" },
  //   { "key": "IXZ", "city": "Port Blair", "name": "Veer Savarkar Arpt", "country": "India" },
  //   { "key": "JAI", "city": "Jaipur", "name": "Sanganeer Arpt", "country": "India" },
  //   { "key": "KNU", "city": "Kanpur", "name": "Chakeri Arpt", "country": "India" },
  //   { "key": "KTU", "city": "Kota", "name": "Kota Airport", "country": "India" },
  //   { "key": "KUU", "city": "Kulu", "name": "Bhuntar Arpt", "country": "India" },
  //   { "key": "JDH", "city": "Jodhpur", "name": "Jodhpur Arpt", "country": "India" },
  //   { "key": "JGA", "city": "Jamnagar", "name": "Govardhanpur Arpt", "country": "India" },
  //   { "key": "JGB", "city": "Jagdalpur", "name": "Jagdalpur Airport", "country": "India" },
  //   { "key": "COH", "city": "Cooch Behar", "name": "Cooch Behar Airport", "country": "India" },
  //   { "key": "COK", "city": "Kochi", "name": "Cochin Internation Arpt", "country": "India" },
  //   { "key": "JLR", "city": "Jabalpur", "name": "Jabalpur Airport", "country": "India" },
  //   { "key": "JRH", "city": "Jorhat", "name": "Rowriah Arpt", "country": "India" },
  //   { "key": "JSA", "city": "Jaisalmer", "name": "Jaisalmer airport", "country": "India" },
  //   { "key": "GOI", "city": "Goa In", "name": "Dabolim Arpt", "country": "India" },
  //   { "key": "GOP", "city": "Gorakhpur", "name": "Gorakhpur Arpt", "country": "India" },
  //   { "key": "MAA", "city": "Chennai", "name": "Chennai Arpt", "country": "India" },
  //   { "key": "BHJ", "city": "Bhuj", "name": "Rudra Mata Arpt", "country": "India" },
  //   { "key": "BHO", "city": "Bhopal", "name": "Raja Bhoj Arpt", "country": "India" },
  //   { "key": "BHU", "city": "Bhavnagar", "name": "Bhavnagar Arpt", "country": "India" },
  //   { "key": "NAG", "city": "Nagpur", "name": "Dr Ambedkar Intl Arpt", "country": "India" },
  //   { "key": "NDC", "city": "Nanded", "name": "Nanded Airport", "country": "India" },
  //   { "key": "PGH", "city": "Pantnagar", "name": "Pantnagar", "country": "India" },
  //   { "key": "KBK", "city": "Kushinagar", "name": "Kushinagar International Airport", "country": "India" },
  //   { "key": "LDA", "city": "Malda", "name": "Malda Airport", "country": "India" },
  //   { "key": "DBD", "city": "Dhanbad", "name": "Dhanbad", "country": "India" },
  //   { "key": "CJB", "city": "Coimbatore", "name": "Peelamedu Airport", "country": "India" },
  //   { "key": "AGR", "city": "Agra", "name": "Kheria Arpt", "country": "India" },
  //   { "key": "AGX", "city": "Agatti Island", "name": "Agatti Aerodrome", "country": "India" },
  //   { "key": "AIP", "city": "Jalandhar", "name": "Jalandhar Airport", "country": "India" },
  //   { "key": "AJL", "city": "Aizawl", "name": "Lengpui Airport", "country": "India" },
  //   { "key": "AKD", "city": "Akola", "name": "Akola Airport", "country": "India" },
  //   { "key": "GUX", "city": "Guna", "name": "Guna", "country": "India" },
  //   { "key": "GWL", "city": "Gwalior", "name": "Gwalior Airport", "country": "India" },
  //   { "key": "KLH", "city": "Kolhapur", "name": "Kolhapur Arpt", "country": "India" },
  //   { "key": "DED", "city": "Dehra Dun", "name": "Jolly Grant Airport", "country": "India" },
  //   { "key": "DEL", "city": "Delhi", "name": "Delhi indira gandhi intl", "country": "India" },
  //   { "key": "DEP", "city": "Deparizo", "name": "Deparizo Airport", "country": "India" },
  //   { "key": "DHM", "city": "Dharamsala", "name": "Dharamsala", "country": "India" },
  //   { "key": "DIB", "city": "Dibrugarh", "name": "Mohanbari Arpt", "country": "India" },
  //   { "key": "DIU", "city": "Diu In", "name": "Diu Arpt", "country": "India" },
  //   { "key": "LKO", "city": "Lucknow", "name": "Amausi Arpt", "country": "India" },
  //   { "key": "NMB", "city": "Daman", "name": "Daman Airport", "country": "India" },
  //   { "key": "DMU", "city": "Dimapur", "name": "Dimapur Airport", "country": "India" },
  //   { "key": "PNQ", "city": "Pune", "name": "Lohegaon Arpt", "country": "India" },
  //   { "key": "PNY", "city": "Pondicherry", "name": "Pondicherry Airport", "country": "India" },
  //   { "key": "BLR", "city": "Bengaluru", "name": "Bengaluru intl arpt", "country": "India" },
  //   { "key": "NVY", "city": "Neyveli", "name": "Neyveli", "country": "India" },
  //   { "key": "BMH", "city": "Baramulla", "name": "Bomai Airport", "country": "India" },
  //   {
  //     "key": "BOM", "city": "Mumbai",
  //     "name": "Chhatrapati shivaji maharaj international airport",
  //     "country": "India"
  //   },
  //   { "key": "BPM", "city": "Hyderabad", "name": "Begumpet Airport", "country": "India" },
  //   { "key": "HBX", "city": "Hubli", "name": "Hubli Arpt", "country": "India" },
  //   {
  //     "key": "AMD", "city": "Ahmedabad",
  //     "name": "Sardar Vallabh Bhai Patel Intl Arpt",
  //     "country": "India"
  //   },
  //   { "key": "PUT", "city": "Puttaprathe", "name": "Puttaprathe", "country": "India" },
  //   { "key": "HJR", "city": "Khajuraho", "name": "Khajuraho Arpt", "country": "India" },
  //   { "key": "HSS", "city": "Hissar", "name": "Hissar Airport", "country": "India" },
  //   { "key": "ATQ", "city": "Amritsar", "name": "Raja Sansi Arpt", "country": "India" },
  //   { "key": "PYB", "city": "Jeypore", "name": "Jeypore Airport", "country": "India" },
  //   { "key": "LTU", "city": "Latur", "name": "Latur Arpt", "country": "India" },
  //   { "key": "LUH", "city": "Ludhiana", "name": "Ludhiana Arpt", "country": "India" },
  //   { "key": "RAJ", "city": "Rajkot", "name": "Rajkot Civil Arpt", "country": "India" },
  //   { "key": "CCJ", "city": "Kozhikode", "name": "Kozhikode Arpt", "country": "India" },
  //   { "key": "CCU", "city": "Kolkata", "name": "Netaji Subhas Chandra Bose Intl", "country": "India" },
  //   { "key": "BUP", "city": "Bhatinda", "name": "Bhatinda Air Force Station", "country": "India" },
  //   {
  //     "key": "HYD", "city": "Hyderabad",
  //     "name": "Shamshabad Rajiv Gandhi Intl Arpt",
  //     "country": "India"
  //   },
  //   {
  //     "key": "GAU", "city": "Guwahati",
  //     "name": "Lokpriya Gopinath Bordoloi Intl Arpt",
  //     "country": "India"
  //   },
  //   { "key": "GAY", "city": "Gaya", "name": "Gaya Arpt", "country": "India" },
  //   { "key": "GBI", "city": "Kalaburagi", "name": "Kalaburagi Airport", "country": "India" },
  //   { "key": "REW", "city": "Rewa", "name": "Rewa", "country": "India" },
  //   { "key": "RGH", "city": "Balurghat", "name": "Balurghat Airport", "country": "India" },
  //   {
  //     "key": "CBD", "city": "Car Nicobar",
  //     "name": "Car Nicobar Air Force Base",
  //     "country": "India"
  //   },
  //   { "key": "MUI", "city": "Muirpur Airport", "name": "Muirpur Airport", "country": "India" },
  //   { "key": "PAB", "city": "Bilaspur", "name": "Bilaspur Airport", "country": "India" },
  //   { "key": "PAT", "city": "Patna", "name": "Jai Prakash Narayan Arpt", "country": "India" },
  //   { "key": "PBD", "city": "Porbandar", "name": "Porbandar Arpt", "country": "India" },
  //   { "key": "BBI", "city": "Bhubaneswar", "name": "Biju Patnaik Arpt", "country": "India" },
  //   { "key": "BDP", "city": "Bhadrapur", "name": "Bhadrapur Airport", "country": "India" },
  //   { "key": "BDQ", "city": "Vadodara", "name": "Vadodara Arpt", "country": "India" },
  //   { "key": "RJA", "city": "Rajahmundry", "name": "Rajahmundry Arpt", "country": "India" },
  //   { "key": "RJI", "city": "Rajouri", "name": "Rajouri Airport", "country": "India" },
  //   { "key": "RMD", "city": "Ramagundam", "name": "Ramagundam Airport", "country": "India" },
  //   {
  //     "key": "IDR", "city": "Indore",
  //     "name": "Devi Ahilya Bai Holkar Arpt",
  //     "country": "India"
  //   },
  //   { "key": "IMF", "city": "Imphal", "name": "Tulihal Arpt", "country": "India" },
  //   { "key": "BEK", "city": "Bareilly", "name": "Bareilly airport", "country": "India" },
  //   { "key": "BEP", "city": "Bellary", "name": "Bellary Airport", "country": "India" },
  //   { "key": "MYQ", "city": "Mysore", "name": "Mysore Arpt", "country": "India" },
  //   { "key": "MZU", "city": "Muzzafarpu", "name": "Muzzafarpur Airport", "country": "India" },
  //   { "key": "CDP", "city": "Cuddapah", "name": "Cuddapah Airport", "country": "India" },
  //   { "key": "RPR", "city": "Raipur", "name": "Raipur Arpt", "country": "India" },
  //   { "key": "RRK", "city": "Rourkela", "name": "Rourkela Airport", "country": "India" },
  //   { "key": "RTC", "city": "Ratnagiri", "name": "Ratnagiri Airport", "country": "India" },
  //   { "key": "RUP", "city": "Rupsi", "name": "Rupsi Airport", "country": "India" },
  //   { "key": "SXR", "city": "Srinagar", "name": "Srinagar Arpt", "country": "India" },
  //   { "key": "SXV", "city": "Salem", "name": "Salem Arpt", "country": "India" },
  //   {
  //     "key": "GOX", "city": "Goa",
  //     "name": "Mopa international airport",
  //     "country": "India"
  //   },
  //   {
  //     "key": "CNN", "city": "Kannur",
  //     "name": "Kannur International Airport",
  //     "country": "India"
  //   },
  //   {
  //     "key": "HSR", "city": "Rajkot",
  //     "name": "Hirasar international airport",
  //     "country": "India"
  //   },
  //   { "key": "SAG", "city": "Shirdi", "name": "Shirdi", "country": "India" },
  //   { "key": "DBR", "city": "Darbhanga", "name": "Darbhanga Airport", "country": "India" },
  //   {
  //     "key": "RDP", "city": "Durgapur",
  //     "name": "Kazi Nazrul Islam Airport",
  //     "country": "India"
  //   },
  //   { "key": "JRG", "city": "Odisha", "name": "Jharsuguda Airport", "country": "India" },
  //   { "key": "KQH", "city": "Ajmer", "name": "Ajmer Airport", "country": "India" },
  //   { "key": "KJB", "city": "Kurnool", "name": "Kurnool Airport", "country": "India" },
  //   { "key": "JLG", "city": "Jalgaon", "name": "Jalgaon Airport", "country": "India" },
  //   { "key": "PYG", "city": "Pakyong", "name": "Pakyong", "country": "India" },
  //   { "key": "VDX", "city": "Ghaziabad", "name": "Hindon Airport", "country": "India" },
  //   { "key": "TCR", "city": "Tuticorin", "name": "Tuticorin Arpt", "country": "India" },
  //   { "key": "TEI", "city": "Tezu", "name": "Tezu Airport", "country": "India" },
  //   { "key": "TEZ", "city": "Tezpur", "name": "Salonibari Airport", "country": "India" },
  //   { "key": "SHL", "city": "Shillong", "name": "Shillong Airport", "country": "India" },
  //   { "key": "TIR", "city": "Tirupati", "name": "Tirupati Arpt", "country": "India" },
  //   {
  //     "key": "TJV", "city": "Thanjavur",
  //     "name": "Thanjavur Air Force Station",
  //     "country": "India"
  //   },
  //   { "key": "SLV", "city": "Simla", "name": "Simla Arpt", "country": "India" },
  //   { "key": "VDY", "city": "Vidyanagar", "name": "Vidyanagar", "country": "India" },
  //   { "key": "VGA", "city": "Vijayawada", "name": "Vijayawada", "country": "India" },
  //   { "key": "TNI", "city": "Satna Airport", "name": "Satna Airport", "country": "India" },
  //   { "key": "SSE", "city": "Sholapur", "name": "Solapur Airport", "country": "India" },
  //   { "key": "VNS", "city": "Varanasi", "name": "Lal Bahadur Shastri Arpt", "country": "India" },
  //   { "key": "VTZ", "city": "Vishakhapatanam", "name": "Vishakhapatnam", "country": "India" },
  //   { "key": "TRV", "city": "Thiruvananthapuram", "name": "Thiruvananthapuram Arpt", "country": "India" },
  //   {
  //     "key": "TRZ", "city": "Tiruchirappali",
  //     "name": "Tiruchirapally Civil Arpt",
  //     "country": "India"
  //   },
  //   { "key": "STV", "city": "Surat", "name": "Surat Airport", "country": "India" },
  //   { "key": "WGC", "city": "Warangal", "name": "Warangalairport", "country": "India" },
  //   { "key": "UDR", "city": "Udaipur", "name": "Maharana Pratap Arpt", "country": "India" },
  //   { "key": "ZER", "city": "Zero", "name": "Zero Airport", "country": "India" }
  // ]

  const handleChange = (value) => {
    const getDtaa = value.split(",");
    alert(getDtaa)

    setSelectFrom(getDtaa[0]);
    setSelectFromSub(getDtaa[1]);
    operEngLocation();
  };

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(apiListAirLineState); // Show all if input is cleared
      return;
    }

    // const filtered = apiListAirLineState.filter((item) =>
    //   item.city.toLowerCase().startsWith(searchText.toLowerCase())
    // );
    const filtered = apiListAirLineState.filter(
      (item) =>
        item?.key?.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item?.city?.toLowerCase().startsWith(searchText.toLowerCase())
    );

    setFilteredOptions(filtered.slice(0, 10)); // Show top 10 only
  };

  // const mappedOptions = apiListAirLineState.map((item) => ({
  const mappedOptions = filteredOptions.map((item) => ({
    // The label is rendered as custom JSX – you can adjust the layout as required.
    label: (
      <div className="inline_flex">
        {/* Conditionally show the SVG icon if categoryType is falsy */}
        {!categoryType && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"
            />
          </svg>
        )}
        <div>
          {categoryType === "hotel" ? (
            // For hotels, simply show the airport (or city) name:
            <div>{item.city}</div>
          ) : (
            // Otherwise, show additional details. Adjust the layout as needed.
            <>
              <div>
                {item.city} ({item.country})
              </div>
              <div>{item.name}</div>
            </>
          )}
        </div>
      </div>
    ),
    // Set the value to a string combining the airport name and key;
    // adjust according to how you need to consume the selection.
    value: `${item.city},${item.key},${item.country}`,
  }));

  // Build the options structure with a group (you can add more groups if needed).
  const options = [
    {
      label: <span>Suggestion</span>,
      title: "manager",
      options: mappedOptions,
    },
  ];

  return (
    //   <Select
    //     dropdownClassName="custom-select-dropdown"  // Assign a custom class to the dropdown
    //     showSearch
    //     open={true}
    //     style={{
    //       width: '100%',
    //     }}
    //     onChange={handleChange}
    //   options={[
    //   {
    //     label: <span>Suggestion</span>,
    //     title: 'manager',
    //     options: [
    //       {
    //         label: <>
    //           <div className="inline_flex">
    //             {!categoryType ?
    //             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    //               <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
    //             </svg>
    //             : null
    //           }
    //             <div>
    //             {categoryType == 'hotel' ?
    //               <>
    //                 <div>Delhi</div>
    //               </>
    //               :
    //               <>
    //                 <div>Delhi (National Capital Territory of Delhi)</div>
    //                 <div>Indira Gandhi International Airport (DEL)</div>
    //               </>
    //             }
    //             </div>
    //           </div>
    //         </>,
    //         value: 'Delhi, Indira Gandhi International Airport (DEL)',
    //       },
    //     ],
    //   },

    // ]}

    //   />

    <Select
      dropdownClassName="custom-select-dropdown" // custom class name for dropdown styling
      autoFocus
      showSearch
      open={true}
      style={{ width: "100%" }}
      onSearch={handleSearch}
      onChange={handleChange}
      options={options}
      placeholder="Select an airport..."
      filterOption={false} // disables built-in search
    />
  );
};
export default AppListSearch;
