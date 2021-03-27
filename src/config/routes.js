// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";

// Admin Pages
import Home from '../components/Main';
import Auth from '../pages/auth/Auth';

// Other
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/home",
        component: Home,
        exact: true
      },
      {
        path: "/login",
        component: Auth,
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
];

export default routes;
