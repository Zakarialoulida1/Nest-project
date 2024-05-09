import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/layout";
import Home from "../page/Home";
import Register from "../page/Register";
import LoginForm from "../page/Login";


export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
          path: LOGIN_ROUTE,
              element: <LoginForm />
       },
       {
        path: REGISTER_ROUTE,
            element: <Register />
     },
    ]
  },
  // {
  //   element: <GuestLayout />,
  //   children: [
  //    
  //     {
  //       path: REGISTER_ROUTE,
  //       element: <Register />
  //     },

  
  //       {
  //       path: STUDENT_DASHBOARD_guest,
  //       element: <Iteneraries />
  //     },
  //   ]
  // },
  // {
  //   element: <StudentDashboardLayout />,
  //   children: [
 
  //     {
  //       path: '/IteneraryForm',
  //       element: <CreateItineraryForm />
  //     },
  //     // Add route for updating itinerary
  //     {
  //       path: ROUTE_UPDATE_ITINERARY,
  //       element: <UpdateItenerary />
  //     },
  //     {
  //       path: ROUTE_ADD_DESTINATION_TO_ITINERARY,
  //       element: <AddDestinationModal/>
  //     },
  //     {
  //       path: STUDENT_DASHBOARD_ROUTE,
  //       element: <Iteneraries />
  //     },

  //   ]
  // }
]);
