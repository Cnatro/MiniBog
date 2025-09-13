import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE } from "./contants";
import Home from "./component/home/Home";
import Navigation from "./component/common/Navigation";
import SignIn from "./component/user/SignIn";
import SignUp from "./component/user/SignUp";
import AddPost from "./component/post/AddPost";
import PostDetail from "./component/post/PostDetail";
import Profile from "./component/user/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Container>
        <Routes>
          <Route path={ROUTE.HOME} element={<Home />} />
          <Route path={ROUTE.ACCOUNT} element={<Profile />} />
          <Route path={ROUTE.ADD_POST} element={<AddPost />} />
          <Route path={ROUTE.POST_DETAIL} element={<PostDetail />} />
          <Route path={ROUTE.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTE.SIGN_UP} element={<SignUp />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
