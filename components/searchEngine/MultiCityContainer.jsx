import React, { useState, useEffect, useCallback } from "react"; // Import useEffect, useCallback
import MultiCitySegment from "./MultiCitySegment";

const MultiCityContainer = ({
  segments,
  updateSegment,
  addSegment,
  removeSegment,
  onMultiCityErrorChange,
  initialDepartureDate, // New prop
  handleToggleSection,
  openSection,
  multiCityCloseAllFields,
}) => {
  // const [openSection, setOpenSection] = useState({
  //   segmentIndex: null,
  //   type: null,
  // });

  const [segmentErrors, setSegmentErrors] = useState({});

  const handleSegmentErrorChange = useCallback((index, hasError) => {
    setSegmentErrors((prevErrors) => ({
      ...prevErrors,
      [index]: hasError,
    }));
  }, []);

  const hasMultiCityError = Object.values(segmentErrors).some((error) => error);

  useEffect(() => {
    console.log("hasMultiCityErrorhasMultiCityError ==> ", hasMultiCityError);
    if (onMultiCityErrorChange) {
      onMultiCityErrorChange(hasMultiCityError);
    }
  }, [hasMultiCityError, onMultiCityErrorChange]);

  // const handleToggleSection = (index, type) => {
  //   console.log("onToggleSection called with:", index, type);
  //   setOpenSection((prev) =>
  //     prev.segmentIndex === index && prev.type === type
  //       ? { segmentIndex: null, type: null }
  //       : { segmentIndex: index, type }
  //   );
  // };

  return (
    <div className="w-full">
      {segments.map((segment, idx) => {
        const previousSegmentDepartureDate =
          idx > 0 ? segments[idx - 1].departureDate : initialDepartureDate; // Use initialDepartureDate for the first segment

        return (
          <div
            key={idx}
            className="mb-4"
          >
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
              minDate={previousSegmentDepartureDate}
              onSegmentErrorChange={handleSegmentErrorChange}
              multiCityCloseAllFieldsFn={multiCityCloseAllFields}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultiCityContainer;
