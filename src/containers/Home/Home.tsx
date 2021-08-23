import React from 'react';

import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='home-image'>
        <img
          src='https://res.cloudinary.com/dqaav1s3t/image/upload/v1629755395/Trainee/585f93ddcb11b227491c3584_elbfvc.png'
          alt='Marvel Heroes'
        />
      </div>
      <div className='home-description'>
        <h1>Marvel Heroes</h1>
        <p>
          {`Marvel was started in 1939 by Martin Goodman under a number of corporations and imprints
          but now known as Timely Comics, and by 1951 had generally become known as Atlas Comics.
          The Marvel era began in 1961, the year that the company launched The Fantastic Four and
          other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko and many others. The
          Marvel brand, which had been used over the years, was solidified as the company's primary
          brand.`}
        </p>
      </div>
    </div>
  );
};

export default Home;
