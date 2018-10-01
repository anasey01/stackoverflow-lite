const moments = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 0 },
];

const calculateTiming = (date) => {
  const secondsTiming = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals = moments.find(interval => interval.seconds < secondsTiming);
  const count = Math.floor(secondsTiming / intervals.seconds);
  return `${count} ${intervals.label}${count !== 1 ? 's' : ''} ago`;
};
