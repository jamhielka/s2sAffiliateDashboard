import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

let router = new Router({
  mode: "hash",
  //base: process.env.BASE_URL,
  routes: [
    {
      name: "PublicRoutes",
      path: "/",
      redirect: "/login",
      component: () => import("@/views/auth/Toolbar"),
      children: [
        {
          name: "Login",
          path: "/login",
          // redirect: '/login',
          component: () => import("@/views/auth/Login"),
          // meta: { authorize: [] }
        },
        {
          name: "Registration",
          path: "/register",
          component: () => import("@/views/auth/Registration"),
          // meta: { authorize: [] }
        },

        {
          name: "Forgot",
          path: "/Forgot",
          component: () => import("@/views/auth/Forgot"),
        },
        {
          name: "Change Password",
          path: "/ChangePassword",
          component: () => import("@/views/auth/ChangePassword"),
        },
      ],
    },
    {
      name: "S2SAdminRoutes",
      path: "/S2Sadmin",
      redirect: "/",
      component: () => import("@/layouts/Layout"),
      children: [
        // Components

        {
          name: "AdminDashboard",
          path: "/",
          component: () => import("@/views/pages/Admin"),
        },
        {
          name: "Affiliate",
          path: "Affiliate",
          component: () => import("@/views/pages/Affiliate"),
        },
        {
          name: "CORequest",
          path: "CORequest",
          component: () => import("@/views/pages/CORequest"),
        },
        {
          name: "COCompleted",
          path: "COCompleted",
          component: () => import("@/views/pages/COCompleted"),
        },
      ]
      },
    {
      name: "AdminRoutes",
      path: "/admin",
      redirect: "/",
      component: () => import("@/layouts/Layout"),
      children: [
        // Components

        {
          name: "Home",
          path: "/",
          component: () => import("@/views/pages/home"),
        },

        {
          name: "Tracking Link",
          path: "trackinglink",
          component: () => import("@/views/pages/TrackingLink"),
        },
        {
          name: "Cash Out",
          path: "cashout",
          component: () => import("@/views/pages/CashOut"),
        },
        {
          name: "Profile",
          path: "profile",
          component: () => import("@/views/pages/Profile"),
        },

        // {
        //   name: "Icons",
        //   path: "/icons",
        //   component: () => import("@/views/pages/Icons"),
        // },

        // {
        //   name: "Events",
        //   path: "/events",
        //   component: () => import("@/views/pages/Games"),
        // },

        // {
        //   name: "TableSimple",
        //   path: "/tables-simple",
        //   component: () => import("@/views/pages/TableSimple"),
        // },
        // {
        //   name: "Add Employee",
        //   path: "/addEmployee",
        //   component: () => import("@/views/pages/addEmployee"),
        // },
        // {
        //   name: "Department",
        //   path: "/department",
        //   component: () => import("@/views/pages/department"),
        // },

        // {
        //   name: "Designations",
        //   path: "/designations",
        //   component: () => import("@/views/pages/designations"),
        // },
        // {
        //   name: "Job Status",
        //   path: "/jobStatus",
        //   component: () => import("@/views/pages/jobStatus"),
        // },
        // {
        //   name: "Shifts",
        //   path: "/shifts",
        //   component: () => import("@/views/pages/Shifts"),
        // },
        // {
        //   name: "Holiday",
        //   path: "/holiday",
        //   component: () => import("@/views/pages/Holiday"),
        // },
        // {
        //   name: "Employee",
        //   path: "/employee",
        //   component: () => import("@/views/pages/employee"),
        // },
        // {
        //   name: "Schedule",
        //   path: "/schedule",
        //   component: () => import("@/views/pages/schedule"),
        // },
        // {
        //   name: "Scheduling",
        //   path: "/scheduling",
        //   component: () => import("@/views/pages/scheduling"),
        // },

        // {
        //   name: "TableSimple",
        //   path: "/tables-simple",
        //   component: () => import("@/views/pages/TableSimple"),
        // },
        // {
        //   name: "Add Employee",
        //   path: "/addEmployee",
        //   component: () => import("@/views/pages/addEmployee"),
        // },
        // {
        //   name: "Department",
        //   path: "/department",
        //   component: () => import("@/views/pages/department"),
        // },

        // {
        //   name: "Designations",
        //   path: "/designations",
        //   component: () => import("@/views/pages/designations"),
        // },
        // {
        //   name: "Job Status",
        //   path: "/jobStatus",
        //   component: () => import("@/views/pages/jobStatus"),
        // },
        // {
        //   name: "Shifts",
        //   path: "/shifts",
        //   component: () => import("@/views/pages/Shifts"),
        // },
        // {
        //   name: "Holiday",
        //   path: "/holiday",
        //   component: () => import("@/views/pages/Holiday"),
        // },
        // {
        //   name: "Employee",
        //   path: "/employee",
        //   component: () => import("@/views/pages/employee"),
        // },
        // {
        //   name: "Schedule",
        //   path: "/schedule",
        //   component: () => import("@/views/pages/schedule"),
        // },
        // {
        //   name: "Scheduling",
        //   path: "/scheduling",
        //   component: () => import("@/views/pages/scheduling"),
        // },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const userRole = store.getters.userRole;
  const isLoggedIn = store.getters.isLoggedIn;

  if (authorize) {
    if (!isLoggedIn) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }
    // check if route is restricted by role
    if (authorize.length && !authorize.includes(userRole)) {
      // role not authorised so redirect to home page
      return next({ path: `/${userRole.toLowerCase()}` });
    }
  }
  next();
});

export default router;
