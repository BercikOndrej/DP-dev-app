const createSkeletons = (length: number) =>
  Array.from({ length: length }, (_, num) => num + 1);

export default createSkeletons;
