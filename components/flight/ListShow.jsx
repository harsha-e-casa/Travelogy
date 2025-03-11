import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";

const airportData = [
  {
    location: "Metro City",
    code: "MTC",
    name: "Metro City International Airport",
  },
  {
    location: "Oceanview",
    code: "OCV",
    name: "Oceanview Regional Airport",
  },
  {
    location: "Hilltown",
    code: "HTN",
    name: "Hilltown National Airport",
  },
  {
    location: "Lakemont",
    code: "LKM",
    name: "Lakemont Airfield",
  },
  {
    location: "Sunport",
    code: "SNP",
    name: "Sunport International",
  },
  {
    location: "Greenville",
    code: "GRV",
    name: "Greenville City Airport",
  },
  {
    location: "Skyville",
    code: "SKY",
    name: "Skyville Global Airhub",
  },
  {
    location: "Northdale",
    code: "NDL",
    name: "Northdale Airport",
  },
  {
    location: "Riverbay",
    code: "RBY",
    name: "Riverbay International Terminal",
  },
  {
    location: "Cloudcity",
    code: "CLD",
    name: "Cloudcity Central Airport",
  },
];

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setData(airportData);
    }, 500); // mimic delay
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        width:190,
        height: 300,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.code}>
            <List.Item.Meta
            //   avatar={<Avatar>{item.code[0]}</Avatar>}
              title={item.location}
              description={`${item.code} | ${item.name}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
