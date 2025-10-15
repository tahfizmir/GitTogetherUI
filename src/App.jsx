import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import EditProfile from "./components/EditProfile";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit/profile" element={<EditProfile />} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests/>} />
              {/* <Route path="/test" element={<Abc />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
