import React from "react";
import MultiCitySegment from "./MultiCitySegment";

const MultiCityContainer = ({
  segments,
  updateSegment,
  addSegment,
  removeSegment,
}) => {
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
