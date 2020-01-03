const ROUTES = {
  HOME: "/",
  EXPLORE: "/explore",
  EXPLORE_PAGES: {
    PV_SOLAR: "/explore/pv-solar",
    STORAGE: "/explore/storage",
    WIND: "/explore/wind",
    MICROGRIDS: "/explore/microgrids",
    MAPS: "/explore/maps"
  },
  PROJECT_BASE: "/project/",
  PROJECT: "/project/:projectId",
  INVESTOR: "/investor",
  INVESTOR_PAGES: {
    DASHBOARD: "/investor/dashboard",
    PROFILE: "/investor/profile",
    NOTIFICATIONS: "/investor/notifications",
    CONFIRMATION: "/investor/:id/confirm",
  },
  RECEIVER: "/receiver",
  RECEIVER_PAGES: {
    DASHBOARD: "/receiver/dashboard",
    NOTIFICATIONS: "/receiver/notifications",
    ORIGINATE: "/receiver/originate",
  },
  DEVELOPER: "/developer",
  PROFILE: "/profile",
  PROFILE_PAGES: {
    DASHBOARD: "/profile/dashboard",
    SETTINGS: "/profile/settings",
    SETTINGS_PAGES: {
      ACCOUNT: "/profile/settings/account",
      SECURITY: "/profile/settings/security",
      ENTITY_PROFILE: "/profile/settings/entity",
			ENTITY_PROFILE_PAGES: {
      	NEW_ENTITY: "/profile/settings/entity/register"
			},
      USER_PROFILES: "/profile/settings/users",
      FUNDS: "/profile/settings/funds",
      LEGAL: "/profile/settings/legal",
    }
  },
  ABOUT: "/about",
  DEVELOPMENT: "/development",
  LOGIN: "/login",
  SIGNUP: "/signup",
  LOGOUT: "/logout",
};

export default ROUTES;
