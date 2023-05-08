import React, { useState, useEffect } from 'react';

const TimeSpentOnPage = () => {
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpent((timeSpent) => timeSpent + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>Time spent playing: {timeSpent} seconds</p>
    </div>
  );
};

export default TimeSpentOnPage;
