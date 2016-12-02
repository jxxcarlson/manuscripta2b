export const activeDocument = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'SELECT_DOCUMENT':
      return payload;
    default:
      return state;
  }
};
