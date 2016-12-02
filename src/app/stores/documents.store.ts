export const documents = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'INITIALIZE_DOCUMENTS':
      return payload;
    default:
      return state;
  }
};
