const userAction = (data) => {
  return {
    type: "Store",
    payload: data,
  };
};

export default userAction;
