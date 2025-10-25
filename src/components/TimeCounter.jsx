import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  parseISO,
  differenceInMonths,
  differenceInDays,
  addMonths,
} from 'date-fns';

const calculateTimeDifference = (startDate, endDate = null) => {
  const start = parseISO(startDate);
  const end = endDate ? parseISO(endDate) : new Date();
  const totalMonths = differenceInMonths(end, start);
  const monthAdjusted = addMonths(start, totalMonths);
  // Add 1 to include the end day in the count
  const days = differenceInDays(end, monthAdjusted) + 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, days };
};

const TimeUnit = ({ value, unit }) => (
  <motion.div
    className="flex flex-col items-center bg-white bg-opacity-70 rounded-lg p-2 shadow-md w-20"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <span className="text-2xl font-bold text-pink-600 relative z-10">
      {value}
    </span>
    <span className="text-xs text-purple-600 relative z-10">{unit}</span>
  </motion.div>
);

export const TimeCounter = ({ startDate, endDate = null, label }) => {
  const [time, setTime] = useState(() =>
    calculateTimeDifference(startDate, endDate)
  );

  useEffect(() => {
    if (endDate) {
      // fixed end: compute once
      setTime(calculateTimeDifference(startDate, endDate));
      return;
    }
    // live counter: update periodically
    const timer = setInterval(() => {
      setTime(calculateTimeDifference(startDate, null));
    }, 1000); // you can increase to 60000 to update every minute

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-purple-600 mb-2">{label}</h3>
      <div className="flex justify-center space-x-2">
        <TimeUnit
          value={time.years}
          unit={time.years === 1 ? 'Year' : 'Years'}
        />
        <TimeUnit
          value={time.months}
          unit={time.months === 1 ? 'Month' : 'Months'}
        />
        <TimeUnit value={time.days} unit={time.days === 1 ? 'Day' : 'Days'} />
      </div>
    </div>
  );
};
