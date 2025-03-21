
export const rootReducer = (state, action) => {
  if (state === undefined) state = initState();

  switch (action.type) {
    default:
      return state;
  }
};

export const initState = () => {
  return {};
}


