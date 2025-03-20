import React from 'react';
import { Select } from 'antd';

const AppListSeacrh = ({setSelectFrom, operEngLocation, setSelectFromSub, categoryType}) => {

const handleChange = (value) => {
  const getDtaa = value.split(',');

  setSelectFrom(getDtaa[0])
  setSelectFromSub(getDtaa[1])
  operEngLocation()
};

return (

  <Select
    dropdownClassName="custom-select-dropdown"  // Assign a custom class to the dropdown
    showSearch
    open={true}
    style={{
      width: '100%',
    }}
    onChange={handleChange}
  options={[
  {
    label: <span>Suggestion</span>,
    title: 'manager',
    options: [
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
            </svg>
            : null
          }
            <div>
            {categoryType == 'hotel' ?
              <>
                <div>Delhi</div>
              </>
              : 
              <>
                <div>Delhi (National Capital Territory of Delhi)</div>
                <div>Indira Gandhi International Airport (DEL)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Delhi, Indira Gandhi International Airport (DEL)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Chennai</div>
              </>
              : 
              <>

              <div>Chennai (Tamil Nadu)</div>
              <div>Chennai International Airport (MAA)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Chennai, Chennai International Airport (MAA)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Mumbai</div>
              </>
              : 
              <>

              <div>Mumbai (Maharashtra)</div>
              <div>Chhatrapati Shivaji Maharaj International Airport (BOM)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Mumbai, Chhatrapati Shivaji Maharaj International Airport (BOM)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Bangalore</div>
              </>
              : 
              <>

              <div>Bangalore (Karnataka)</div>
              <div>Kempegowda International Airport (BLR)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Bangalore, Kempegowda International Airport (BLR)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Kolkata</div>
              </>
              : 
              <>

              <div>Kolkata (West Bengal)</div>
              <div>Netaji Subhas Chandra Bose International Airport (CCU)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Kolkata, Netaji Subhas Chandra Bose International Airport (CCU)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Hyderabad</div>
              </>
              : 
              <>

              <div>Hyderabad (Telangana)</div>
              <div>Rajiv Gandhi International Airport (HYD)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Hyderabad, Rajiv Gandhi International Airport (HYD)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Ahmedabad</div>
              </>
              : 
              <>

              <div>Ahmedabad (Gujarat)</div>
              <div>Sardar Vallabhbhai Patel International Airport (AMD)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Ahmedabad, Sardar Vallabhbhai Patel International Airport (AMD)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Kochi</div>
              </>
              : 
              <>

              <div>Kochi (Kerala)</div>
              <div>Cochin International Airport (COK)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Kochi, Cochin International Airport (COK)',
      },
      {
        label: <>
          <div className="inline_flex">  
            {!categoryType ?
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"/>
              </svg>
              : null 
            }

            <div>
             {categoryType == 'hotel' ?
              <>
                <div>Pune</div>
              </>
              : 
              <>

              <div>Pune (Maharashtra)</div>
              <div>Pune Airport (PNQ)</div>
              </>
            }
            </div>
          </div>
        </>,
        value: 'Pune, Pune Airport (PNQ)',
      },
      // Add more cities and airports here in a similar format.
    ],
  },
]}

  />
)

};
export default AppListSeacrh;