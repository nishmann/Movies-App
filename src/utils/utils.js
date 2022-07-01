export const generateBorderColor = (vote_average) => {
  let classNames = '';
  if (vote_average < 3) {
    classNames = ' movie__grade_border_red';
  } else if (vote_average > 3 && vote_average < 5) {
    classNames = ' movie__grade_border_orange';
  } else if (vote_average > 5 && vote_average < 7) {
    classNames = ' movie__grade_border_yellow';
  } else if (vote_average > 7) {
    classNames = ' movie__grade_border_green';
  }
  return classNames;
};

export const shortText = (str, maxLength, dots) => {
  const normDesc = str.indexOf(' ', maxLength);
  return normDesc === -1 ? str : str.substr(0, normDesc) + dots;
};
