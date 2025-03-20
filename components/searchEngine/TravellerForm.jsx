import React, { useState } from 'react';
import { Flex, Radio, Button } from 'antd';

import {
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';


export const TravellerForm = ({showTraveller, adult, clickMinus, clickPlus, clickMinusChildren,clickPlusChildren, children, travellerClass, handleChangeClass, opentrvForm}) => {

   return (
      <>
      {showTraveller ? 
        <>
        <div className="lg:w-2/5 md:w-2/5w-full absolute h-auto bg-white right-0 -mt-5 p-4 bx_shadow_dr1">
           <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold">Adults</div>
              <div className="flex custome_addBtn1">
                 <div 
                    className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                    onClick={adult >
                    1 ? clickMinus : null} // Conditionally enable onClick
                    style={{ cursor: adult > 1 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                    >
                    <MinusOutlined className="text-blue-700" />
                 </div>
                 <div className="w-10 h-8 flex justify-center items-center prevent-select" type="number" id="number">{adult}</div>
                 <div 
                 className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                 onClick={adult < 10 ? clickPlus : null} // Conditionally enable onClick
                 style={{ cursor: adult < 10 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                 >
                 <PlusOutlined className="text-blue-700" />
              </div>
           </div>
        </div>
        <div className="form_dr1 flex justify-between items-center pt-4">
           <div className="text-base font-bold">Children</div>
           <div className="flex custome_addBtn1">
              <div 
                 className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                 onClick={children >
                 0 ? clickMinusChildren : null} // Conditionally enable onClick
                 style={{ cursor: children > 0 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                 >
                 <MinusOutlined className="text-blue-700" />
              </div>
              <div className="w-10 h-8 flex justify-center items-center prevent-select" type="number" id="number">{children}</div>
              <div 
              className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
              onClick={children < 10 ? clickPlusChildren : null} // Conditionally enable onClick
              style={{ cursor: children < 10 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
              >
              <PlusOutlined className="text-blue-700" />
           </div>

        </div>
        </div>

         <Flex vertical gap="middle" className="mt-15">
  CHOOSE TRAVEL CLASS
<div>
    <Radio.Group value={travellerClass} // Bind state to value
         onChange={handleChangeClass}
         defaultValue={travellerClass}
         buttonStyle="solid" className="flex flex-wrap">
      <Radio.Button className="w-50" value="a">Economy/Premium Economy</Radio.Button>
      <Radio.Button className="w-50" value="b">Premium Economy</Radio.Button>
      <Radio.Button className="w-50 mt-1" value="c">NEWBusiness</Radio.Button>
      <Radio.Button className="w-50 mt-1" value="d">First Class</Radio.Button>
    </Radio.Group>
</div>
  </Flex>

<Button type="primary" onClick={opentrvForm} block className="mt-15">
      APPLY
    </Button>

        </div>

 
        </>
        : null }
        </>
        ) 

};


export const AppTravellerHotel = ({showTraveller, adult, clickMinus, clickPlus, clickMinusChildren,clickPlusChildren, children, travellerClass, handleChangeClass, opentrvForm, clickRoomAdd,
 clickRoomMinus, rooms}) => {

   return (
      <>
      {showTraveller ? 
        <>
        <div className="lg:w-2/5 md:w-2/5w-full absolute h-auto bg-white right-0 -mt-5 p-4 bx_shadow_dr1">
           <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold">Rooms</div>
              <div className="flex custome_addBtn1">
                 <div 
                    className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                    onClick={rooms >
                    1 ? clickRoomMinus : null} // Conditionally enable onClick
                    style={{ cursor: rooms > 1 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                    >
                    <MinusOutlined className="text-blue-700" />
                 </div>
                 <div className="w-10 h-8 flex justify-center items-center prevent-select" type="number" id="number">{rooms}</div>
                 <div 
                 className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                 onClick={rooms < 10 ? clickRoomAdd : null} // Conditionally enable onClick
                 style={{ cursor: rooms < 10 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                 >
                 <PlusOutlined className="text-blue-700" />
              </div>
           </div>
        </div>
        <div className="form_dr1 flex justify-between items-center pt-4">
           <div className="text-base font-bold">Adults</div>
           <div className="flex custome_addBtn1">
             <div 
                    className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                    onClick={adult >
                    1 ? clickMinus : null} // Conditionally enable onClick
                    style={{ cursor: adult > 1 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                    >
                    <MinusOutlined className="text-blue-700" />
                 </div>
                 <div className="w-10 h-8 flex justify-center items-center prevent-select" type="number" id="number">{adult}</div>
                 <div 
                 className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                 onClick={adult < 10 ? clickPlus : null} // Conditionally enable onClick
                 style={{ cursor: adult < 10 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                 >
                 <PlusOutlined className="text-blue-700" />
              </div>

        </div>

        </div>



         <div className="form_dr1 flex justify-between items-center pt-4">
           <div className="text-base font-bold">Children</div>
           <div className="flex custome_addBtn1">
              <div 
                 className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                 onClick={children >
                 0 ? clickMinusChildren : null} // Conditionally enable onClick
                 style={{ cursor: children > 0 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
                 >
                 <MinusOutlined className="text-blue-700" />
              </div>
              <div className="w-10 h-8 flex justify-center items-center prevent-select" type="number" id="number">{children}</div>
              <div 
              className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
              onClick={children < 10 ? clickPlusChildren : null} // Conditionally enable onClick
              style={{ cursor: children < 10 ? 'pointer' : 'not-allowed' }} // Change cursor on disabled
              >
              <PlusOutlined className="text-blue-700" />
           </div>
            
        </div>

        </div>

      

<Button type="primary" onClick={opentrvForm} block className="mt-15">
      APPLY
    </Button>

        </div>

 
        </>
        : null }
        </>
        ) 

};
