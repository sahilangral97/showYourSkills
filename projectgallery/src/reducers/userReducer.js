const userReducer = (state = "", action) => {
  if (action.type === "Store") {
    return (state = action.payload);
  }

  return state;
};

export default userReducer;
