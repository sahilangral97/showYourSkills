import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import AddProject from "./components/screens/AddProject";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import User from "./components/screens/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { loginAction } from "./actions/loginAction";
import { useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userData"));
  //   if (user) {
  //     history.push("/profile");
  //     dispatch(loginAction());
  //   } else {
  //     history.push("/");
  //   }
  // }, []);
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Profile} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/addproject" component={AddProject} />

      {/* <Route exact path="/">
        <Signin />
      </Route> */}

      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/addproject">
        <AddProject />
      </Route>
      <Route path="/user/:id">
        <User />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar />
        <div className="body" style={{ backgroundColor: "#343e57" }}>
          <Routing />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
