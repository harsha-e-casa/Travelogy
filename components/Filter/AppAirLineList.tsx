import React, { useState } from 'react';
import { Checkbox, List } from 'antd';

const data = [
  { title: 'Indigo' },
  { title: 'SpiceJet' },
  { title: 'akasha' }
];

const AppAirLineList = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const onChange = (title: string) => {
    setCheckedList(prev => {
      if (prev.includes(title)) {
        return prev.filter(item => item !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  return (
    <List
      dataSource={data}
      renderItem={item => (
        <List.Item key={item.title}>
          <span>{item.title}</span>
          <Checkbox
            checked={checkedList.includes(item.title)}
            onChange={() => onChange(item.title)}
          />
          ;ldf 
        </List.Item>
      )}
    />
  );
};

export default AppAirLineList;
