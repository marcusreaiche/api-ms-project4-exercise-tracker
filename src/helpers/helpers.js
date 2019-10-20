module.exports = {
  filterExercises(arr, filterObj) {
    // Filters the exercises array using from, to, and limit
    const {from, to, limit} = filterObj;
    if (from) {
      const fromDate = new Date(from);
      arr = arr.filter(elem => elem.date >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      arr = arr.filter(elem => elem.date <= toDate);
    }
    if (limit) {
      arr = arr.slice(0, Math.min(arr.length, limit));
    }
    return arr;
  }
};

