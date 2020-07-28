function whenValueChanges(init, callback, isEqual = (a, b) => a === b) {
  let prev = init;
  return (value) => {
    if (!isEqual(prev, value)) {
      callback();
      prev = value;
    }
  };
}

export default whenValueChanges;
