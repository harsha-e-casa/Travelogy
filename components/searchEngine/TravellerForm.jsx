import React, { useState } from "react";
import { Flex, Radio, Button } from "antd";
import { Divider, Select, Space } from "antd";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

export const TravellerForm = ({
  showTraveller,
  adult,
  clickMinus,
  clickPlus,
  clickMinusChildren,
  clickPlusChildren,
  countchildren,
  countinfant,
  clickMinusinfant,
  clickPlusinfant,
  travellerClass,
  handleChangeClass,
  opentrvForm,
  totalPassenderCount,
}) => {
  return (
    <>
      {showTraveller ? (
        <>
          <div className="lg:w-2/5 md:w-2/5w-full absolute h-auto bg-white right-0 -mt-5 p-4 bx_shadow_dr1">
            <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold">Adults</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult > 1 ? clickMinus : null} // Conditionally enable onClick
                  style={{ cursor: adult > 1 ? "pointer" : "not-allowed" }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {adult}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult < 9 ? clickPlus : null} // Conditionally enable onClick
                  style={{
                    cursor:
                      adult < 9 && totalPassenderCount < 9
                        ? "pointer"
                        : "not-allowed",
                  }} // Change cursor on disabled
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
                  onClick={countchildren > 0 ? clickMinusChildren : null} // Conditionally enable onClick
                  style={{
                    cursor: countchildren > 0 ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {countchildren}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countchildren < 9 ? clickPlusChildren : null} // Conditionally enable onClick
                  style={{
                    cursor:
                      countchildren < 9 && totalPassenderCount < 9
                        ? "pointer"
                        : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <PlusOutlined className="text-blue-700" />
                </div>
              </div>
            </div>
            {/* infants */}
            <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold">Infant</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countinfant > 0 ? clickMinusinfant : null} // Conditionally enable onClick
                  style={{
                    cursor: countinfant > 0 ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {countinfant}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countinfant < adult ? clickPlusinfant : null} // Conditionally enable onClick
                  style={{
                    cursor: countinfant < adult ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <PlusOutlined className="text-blue-700" />
                </div>
              </div>
            </div>

            <Flex vertical gap="middle" className="mt-15">
              CHOOSE TRAVEL CLASS
              <div>
                <Radio.Group
                  value={travellerClass} // Bind state to value
                  onChange={handleChangeClass}
                  defaultValue={travellerClass}
                  buttonStyle="solid"
                  className="flex flex-wrap"
                >
                  <Radio.Button className="w-50" value="a">
                    Premium Economy
                  </Radio.Button>
                  <Radio.Button className="w-50" value="b">
                    Economy
                  </Radio.Button>
                  <Radio.Button className="w-50" value="c">
                    Business
                  </Radio.Button>
                  <Radio.Button className="w-50" value="d">
                    First
                  </Radio.Button>
                </Radio.Group>
              </div>
            </Flex>

            <Button
              type="primary"
              onClick={opentrvForm}
              block
              className="mt-15"
            >
              APPLY
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export const AppTravellerHotel = ({
  showTraveller,
  adult,
  clickMinus,
  clickPlus,
  clickMinusChildren,
  clickPlusChildren,
  countchildren,
  travellerClass,
  handleChangeClass,
  opentrvForm,
  clickRoomAdd,
  clickRoomMinus,
  rooms,
  childAgesPerRoom,
  setChildAgesPerRoom,
}) => {
  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childAgesPerRoom];
    updatedAges[index] = parseInt(value, 10);
    setChildAgesPerRoom(updatedAges);
  };
  return (
    <>
      {showTraveller ? (
        <>
          <div className="lg:w-2/5 md:w-2/5w-full absolute h-auto bg-white right-5 -mt-5 p-4 bx_shadow_dr1 z-50">
            <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold text-black">Rooms</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={rooms > 1 ? clickRoomMinus : null} // Conditionally enable onClick
                  style={{ cursor: rooms > 1 ? "pointer" : "not-allowed" }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select text-black"
                  type="number"
                  id="number"
                >
                  {rooms}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={rooms < 10 ? clickRoomAdd : null} // Conditionally enable onClick
                  style={{ cursor: rooms < 10 ? "pointer" : "not-allowed" }} // Change cursor on disabled
                >
                  <PlusOutlined className="text-blue-700" />
                </div>
              </div>
            </div>
            <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold text-black">Adults</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult > 1 ? clickMinus : null} // Conditionally enable onClick
                  style={{ cursor: adult > 1 ? "pointer" : "not-allowed" }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select text-black"
                  type="number"
                  id="number"
                >
                  {adult}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult < 10 ? clickPlus : null} // Conditionally enable onClick
                  style={{ cursor: adult < 10 ? "pointer" : "not-allowed" }} // Change cursor on disabled
                >
                  <PlusOutlined className="text-blue-700" />
                </div>
              </div>
            </div>

            <div className="form_dr1 flex justify-between items-center pt-4">
              <div className="text-base font-bold text-black">Children</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countchildren > 0 ? clickMinusChildren : null} // Conditionally enable onClick
                  style={{
                    cursor: countchildren > 0 ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <MinusOutlined className="text-blue-700" />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select text-black"
                  type="number"
                  id="number"
                >
                  {countchildren}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countchildren < 10 ? clickPlusChildren : null}
                  style={{
                    cursor: countchildren < 10 ? "pointer" : "not-allowed",
                  }}
                >
                  <PlusOutlined className="text-blue-700" />
                </div>
              </div>
            </div>

            {countchildren && countchildren > 0 ? (
              <>
                {" "}
                <Divider
                  className="prevent-select"
                  style={{ borderColor: "orange" }}
                >
                  Age of Children
                </Divider>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(countchildren)].map((_, index) => (
                    <div className="flex items-center gap-2 ">
                      <div className="text-base font-bold text-black ">
                        Child {index + 1}
                      </div>
                      <Select
                        name={`childrenNamels${index}`}
                        value={
                          childAgesPerRoom[index] !== undefined
                            ? childAgesPerRoom[index]
                            : ""
                        }
                        onChange={(value) => handleChildAgeChange(index, value)}
                        style={{ width: 120 }}
                        options={Array.from({ length: 18 }, (_, i) => ({
                          value: i,
                          label: i === 0 ? "<1 Yrs" : `${i} Yrs`,
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            <Button
              type="primary"
              onClick={opentrvForm}
              block
              className="mt-15"
            >
              APPLY
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};
