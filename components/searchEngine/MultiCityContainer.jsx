import React, { useState } from "react";
import MultiCitySegment from "./MultiCitySegment";

const MultiCityContainer = () => {
  const [segments, setSegments] = useState([
    { from: "", fromCode: "", to: "", toCode: "", departureDate: null },
  ]);

  const updateSegment = (index, newData) => {
    const newSegments = [...segments];
    newSegments[index] = newData;
    setSegments(newSegments);
  };

  const addSegment = () => {
    if (segments.length < 5) {
      setSegments([
        ...segments,
        { from: "", fromCode: "", to: "", toCode: "", departureDate: null },
      ]);
    }
  };

  const removeSegment = (index) => {
    if (segments.length > 1) {
      setSegments(segments.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full">
      {segments.map((segment, idx) => (
        <div key={idx} className="mb-4">
          <MultiCitySegment
            index={idx}
            segment={segment}
            updateSegment={updateSegment}
            removeSegment={removeSegment}
            addSegment={addSegment}
            disableRemove={segments.length === 1}
            isLast={idx === segments.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default MultiCityContainer;
