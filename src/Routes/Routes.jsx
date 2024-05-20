import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Board from "../Component/Board";
import Dashborad from "../Component/Dashborad";
import Home from "../Component/Home";

import Login from "../Component/Login";
import SignUp from "../Component/SignUp"


const router = createBrowserRouter([
      {
            path : '/',
            element:<App/>,
            children:[
                  {
                        index:true,
                        element:<Home/>
                  },
                  {
                        path:'dashboard',
                        element:<Dashborad/>
                  },
                  {
                        path:'log-in',
                        element:<Login/>
                  },
                  {
                        path:'user/:id/board/:id/:name',
                        element:<Board/>
                  }
            ]
      },
      
      {
            path:'/sign-up',
            element:<SignUp/>
      }
])

export default router