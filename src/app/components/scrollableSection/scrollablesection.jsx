import React from 'react';
import PropTypes from 'prop-types';

const ScrollableSection = ({ scrollableContent, staticContent }) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      {/* Scrollable side */}
      <div className="md:col-end-2 xs:col-span-6  overflow-y-scroll">
        {scrollableContent}
      </div>

      {/* Static side */}
      <div className=" col-start-2">
        {staticContent}
      </div>
    </div>
  );
};

ScrollableSection.propTypes = {
  scrollableContent: PropTypes.node.isRequired,
  staticContent: PropTypes.node.isRequired,
};

export default ScrollableSection;
