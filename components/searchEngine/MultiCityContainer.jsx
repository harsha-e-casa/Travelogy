import React, { useState } from "react";
import MultiCitySegment from "./MultiCitySegment";

const MultiCityContainer = ({
  segments,
  updateSegment,
  addSegment,
  removeSegment,
}) => {
  const [openSection, setOpenSection] = useState({
    segmentIndex: null,
    type: null,
  });

  const handleToggleSection = (index, type) => {
    console.log("onToggleSection called with:", index, type);
    setOpenSection((prev) =>
      prev.segmentIndex === index && prev.type === type
        ? { segmentIndex: null, type: null }
        : { segmentIndex: index, type }
    );
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
            showAdd={idx === segments.length - 1}
            showRemove={idx === segments.length - 1 && segments.length > 1}
            openSection={openSection}
            onToggleSection={handleToggleSection}
          />
        </div>
      ))}
    </div>
  );
};

export default MultiCityContainer;
