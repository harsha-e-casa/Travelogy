// import React from 'react';
// import { DatePicker, Space, theme } from 'antd';
// const AppDateRage = ({openDateRage}) => {

//   const { token } = theme.useToken();
//   const style = {
//     border: `1px solid ${token.colorPrimary}`,
//     borderRadius: '50%',
//   };

//   const cellRender = (current, info) => {
//     if (info.type !== 'date') {
//       return info.originNode;
//     }
//     if (typeof current === 'number' || typeof current === 'string') {
//       return <div className="ant-picker-cell-inner">{current}</div>;
//     }
//     return (
//       <div className="ant-picker-cell-inner" style={current.date() === 1 ? style : {}}>
//         {current.date()}
//       </div>
//     );
//   };
//   return (
    
//     <Space size={12} direction="vertical">
//       <DatePicker.RangePicker open={openDateRage} cellRender={cellRender} />
//     </Space>
    
//   );
// };
// export default AppDateRage;


import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const AppDateRange = ({ openToDateRange, setDatedep }) => {

  const [dates, setDates] = useState([]);
  const [open, setOpen] = useState(true);

  const handleChange = (dates, dateString) => {
  
    if (dateString) { 
      setDatedep(dateString)
      openToDateRange();
    } else {
      setDatedep(null)
      console.log('No dates selected');
    }
  };

  const dateFormat = 'DD-MM-YYYY';
  
  const disabledDate = current => {
    // If the current date exists and is less than the start of today, disable it
    return current && current < dayjs().startOf('day');
  };


  return (
    <>
    {open ? 
    <div className="custome-date-rage">
      {/*<DatePicker.RangePicker
        icon={false}
        placeholder={['Allow Empty', 'Till Now']}
        allowEmpty={[false, false]}
        open={open} // Controls the opening of the calendar
        onChange={handleChange}
      />*/}

  <DatePicker
    open={open} 
    // needConfirm
    disabledDate={disabledDate}
    onChange={handleChange}
  />

    </div> : null }
    </>
  );
};

export default AppDateRange;
