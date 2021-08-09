import AuthPage from "./pages/AuthPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { route } from "./routes/route";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={route.authPage.path} component={AuthPage} />
        <Route exact path={route.blogsPage.path} component={BlogsPage} />
        <Route path={route.blogDetailPage.path} component={BlogDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;
