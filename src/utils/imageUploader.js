export const getRatioSize = (ratio, width, height) => {
  const local_ratio = ratio.split(":")[0] / ratio.split(":")[1];
  if (ratio.split(":")[0] > ratio.split(":")[1]) {
    if (width > height) {
      return {
        ratioWidth: width,
        ratioHeight: width / local_ratio,
      };
    }
  } else {
    return {
      ratioWidth: height * local_ratio,
      ratioHeight: height,
    };
  }
};
