export const groupReviews = (reviews, groups) => {
  const { day, week, month } = groups;

  let lastDay = day.length ? day[day.length - 1] : null;
  let lastWeek = week.length ? week[week.length - 1] : {};
  let lastMonth = month.length ? month[month.length - 1] : {};

  reviews.forEach(review => {
    // Group by day
    if (lastDay !== review.reviewCreated) {
      day.push({
        date: review.reviewCreated,
        reviews: [review.reviewId]
      });
    } else {
      day[day.length - 1].reviews.push(review.reviewId);
    }
    lastDay = review.reviewCreated;

    // Group by week
    const { weekStart, weekEnd } = determineWeek(review.reviewCreated);
    if (lastWeek.start === weekStart && lastWeek.end === weekEnd) {
      week[week.length - 1].reviews.push(review.reviewId);
    } else {
      week.push({
        start: weekStart,
        end: weekEnd,
        reviews: [review.reviewId]
      });
    }
    lastWeek = {
      start: weekStart,
      end: weekEnd
    };

    // Group by month
    const date = new Date(review.reviewCreated);
    const reviewYear = date.getFullYear();
    const reviewMonth = date.getMonth();

    if (reviewYear === lastMonth.year && reviewMonth === lastMonth.month) {
      month[month.length - 1].reviews.push(review.reviewId);
    } else {
      month.push({
        month: reviewMonth,
        year: reviewYear,
        reviews: [review.reviewId]
      });
    }
    lastMonth = {
      month: reviewMonth,
      year: reviewYear
    };
  });

  return { week, month, day };
};

function determineWeek(timestamp) {
  const date = new Date(timestamp);
  const weekDay = date.getDay();
  const weekStart = timestamp - (weekDay - 1) * 60 * 60 * 24 * 1000;
  const weekEnd = timestamp + (7 - weekDay) * 60 * 60 * 24 * 1000;

  return { weekStart, weekEnd };
}
