var st = "";
if (localStorage.getItem("token")) {
  st = "LOGIN";
}

const loginReducer = (state = st, action) => {
  if (action.type === "LOGIN") {
    return (state = "LOGIN");
  } else if (action.type === "LOGOUT") {
    return (state = "");
  }

  return state;
};

export default loginReducer;
