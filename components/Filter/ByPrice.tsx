import { useEffect, useState, useRef } from "react";
import { Slider } from "antd";

export default function ByPrice({ filter, handlePriceRangeChange, range }: any) {

	const timerRef = useRef<number | null>(null);


  const [rangedata, setRangedata] = useState<[number, number]>([5000, 11000]);

  // Sync initial value from props (if range prop is passed)
  useEffect(() => {
    if (range && Array.isArray(range)) {
      setRangedata(range);
    }
  }, [range]);

  const onSliderChange = (val: [number, number]) => {
	
    setRangedata(val);

	  // clear any pending timeout
	  if (timerRef.current !== null) {
		clearTimeout(timerRef.current);
	  }

   timerRef.current = window.setTimeout(() => {
    handlePriceRangeChange("onwardPrice", val);
    timerRef.current = null; // reset
  }, 2000);
  };

  return (
    <div className="box-collapse scrollFilter">
      <div className="mb-2 text-sm font-medium">Price Range</div>

      <Slider
        range
        step={10}
        min={range[0]}
        max={range[1]}
        value={rangedata}
        onChange={onSliderChange}
        tooltip={{ formatter: (val) => `₹${val}` }}
      />

      <div className="mt-1">
        ₹{rangedata[0]} - ₹{rangedata[1]}
      </div>
    </div>
  );
}
