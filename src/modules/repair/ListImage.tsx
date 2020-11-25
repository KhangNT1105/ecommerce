import React from 'react';
import tracdia1 from 'assets/images/repair/tracdia1.jpg';
import tracdia2 from 'assets/images/repair/tracdia2.jpg';
import tracdia3 from 'assets/images/repair/tracdia3.jpg';
import tracdia4 from 'assets/images/repair/tracdia4.jpg';

const ListImage: React.FC = () => {
  return (
    <div className="ListImage">
      <img src={tracdia1} alt="img" />
      <img src={tracdia2} alt="img" />
      <img src={tracdia3} alt="img" />

      <img src={tracdia4} alt="img" />
    </div>
  );
};

export default ListImage;
