import { ENTITIES, API_ENTITIES_NAME } from 'constants/enum';

export const mockDataSidebar = {
  menus: [
    {
      title: 'SIDEBAR_MENU.CONTENT',
      featureName: 'Content',
      icon: 'fa-youtube-play',
      subMenus: [
        {
          icon: 'fa-film',
          title: 'SIDEBAR_MENU.SHOWS',
          featureName: 'Shows',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SHOWS}`,
          menuItemName: `${API_ENTITIES_NAME.SHOWS}`,
          parent: true,
          entity: `${ENTITIES.NAME.SHOWS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.SHOWS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SHOWS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.SHOWS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SHOWS}/create`
            }
          ]
        },
        {
          icon: 'fa-calendar-check-o',
          title: 'SIDEBAR_MENU.SCHEDULES',
          featureName: 'Schedules',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SCHEDULES}`,
          menuItemName: `${API_ENTITIES_NAME.SCHEDULES}`,
          parent: true,
          entity: `${ENTITIES.NAME.SCHEDULES}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.SCHEDULES',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SCHEDULES}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.SCHEDULES',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.SCHEDULES}/create`
            }
          ]
        },
        {
          icon: 'fa-television',
          title: 'SIDEBAR_MENU.CHANNELS',
          featureName: 'Channels',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CHANNELS}`,
          menuItemName: `${API_ENTITIES_NAME.CHANNELS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CHANNELS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.CHANNELS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CHANNELS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.CHANNELS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CHANNELS}/create`
            }
          ]
        },
        {
          icon: 'fa-tags',
          title: 'SIDEBAR_MENU.CATALOGS',
          featureName: 'Catalogs',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATALOGS}`,
          menuItemName: `${API_ENTITIES_NAME.CATALOGS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CATALOGS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.CATALOGS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATALOGS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.CATALOGS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATALOGS}/create`
            }
          ]
        },
        {
          icon: 'fa-th-large',
          title: 'SIDEBAR_MENU.CATEGORIES',
          featureName: 'Categories',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATEGORIES}`,
          menuItemName: `${API_ENTITIES_NAME.CATEGORIES}`,
          parent: true,
          entity: `${ENTITIES.NAME.CATEGORIES}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.CATEGORIES',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATEGORIES}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.CATEGORIES',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CATEGORIES}/create`
            }
          ]
        },
        {
          icon: 'fa-user-secret',
          title: 'SIDEBAR_MENU.CASTINGS',
          featureName: 'Casts',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CASTINGS}`,
          menuItemName: `${API_ENTITIES_NAME.CASTINGS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CASTINGS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.CASTS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CASTINGS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.CASTS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CASTINGS}/create`
            }
          ]
        },
        {
          icon: 'fa-video-camera',
          title: 'SIDEBAR_MENU.VIDEO_CLIPS',
          featureName: 'VideoClips',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CLIPS}`,
          menuItemName: `${API_ENTITIES_NAME.CLIPS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CLIPS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.VIDEO_CLIPS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CLIPS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.VIDEO_CLIPS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.CLIPS}/create`
            }
          ]
        },
        {
          icon: 'fa-list-alt',
          title: 'SIDEBAR_MENU.VIDEO_PLAYLISTS',
          featureName: 'Video Playlists',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.PLAYLISTS}`,
          menuItemName: `${API_ENTITIES_NAME.PLAYLISTS}`,
          parent: true,
          entity: `${ENTITIES.NAME.PLAYLISTS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.VIDEO_PLAYLISTS',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.PLAYLISTS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.VIDEO_PLAYLISTS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.PLAYLISTS}/create`
            }
          ]
        },
        {
          icon: 'fa-refresh',
          title: 'SIDEBAR_MENU.UPDATES',
          featureName: 'Updates',
          to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.UPDATES}`,
          menuItemName: `${API_ENTITIES_NAME.UPDATES}`,
          parent: true,
          entity: `${ENTITIES.NAME.UPDATES}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.UPDATES',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.UPDATES}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.UPDATES',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.CONTENT}/${ENTITIES.NAME.UPDATES}/create`
            }
          ]
        }
      ]
    },
    {
      title: 'SIDEBAR_MENU.LICENSES',
      featureName: 'Licenses',
      icon: 'fa-paperclip',
      subMenus: [
        {
          icon: 'fa-suitcase',
          title: 'SIDEBAR_MENU.CONTRACTS',
          featureName: 'Contracts',
          to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.CONTRACTS}`,
          menuItemName: `${API_ENTITIES_NAME.CONTRACTS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CONTRACTS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.CONTRACTS',
              to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.CONTRACTS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.CONTRACTS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.CONTRACTS}/create`
            }
          ]
        },
        {
          icon: 'fa-male',
          title: 'SIDEBAR_MENU.LICENSORS',
          featureName: 'Licensors',
          to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.LICENSORS}`,
          menuItemName: `${API_ENTITIES_NAME.LICENSORS}`,
          parent: true,
          entity: `${ENTITIES.NAME.LICENSORS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.LICENSORS',
              to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.LICENSORS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.LICENSORS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.LICENSES}/${ENTITIES.NAME.LICENSORS}/create`
            }
          ]
        }
      ]
    },
    {
      title: 'SIDEBAR_MENU.USER_MANAGEMENT',
      featureName: 'UserManagement',
      icon: 'fa-user-plus',
      subMenus: [
        {
          icon: 'fa-user',
          title: 'SIDEBAR_MENU.SYSTEM_USERS',
          featureName: 'SystemUsers',
          to: `/${ENTITIES.PATH.USER_MANAGEMENT}/${ENTITIES.NAME.SYSTEM_USERS}`,
          menuItemName: `${API_ENTITIES_NAME.SYSTEM_USERS}`,
          parent: true,
          entity: `${ENTITIES.NAME.SYSTEM_USERS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.SYSTEM_USERS',
              to: `/${ENTITIES.PATH.USER_MANAGEMENT}/${ENTITIES.NAME.SYSTEM_USERS}`
            }
          ]
        },
        {
          icon: 'fa-users',
          title: 'SIDEBAR_MENU.USER_GROUPS',
          featureName: 'UserGroups',
          to: `/${ENTITIES.PATH.USER_MANAGEMENT}/${ENTITIES.NAME.USER_GROUPS}`,
          menuItemName: `${API_ENTITIES_NAME.USER_GROUPS}`,
          parent: true,
          entity: `${ENTITIES.NAME.USER_GROUPS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.USER_GROUPS',
              to: `/${ENTITIES.PATH.USER_MANAGEMENT}/${ENTITIES.NAME.USER_GROUPS}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.USER_GROUPS',
              name: 'btnCreate',
              to: `/${ENTITIES.PATH.USER_MANAGEMENT}/${ENTITIES.NAME.USER_GROUPS}/create`
            }
          ]
        }
      ]
    },
    {
      title: 'SIDEBAR_MENU.SYSTEM_CONFIGURATION',
      featureName: 'SystemConfiguration',
      icon: 'fa-cogs',
      subMenus: [
        {
          icon: 'fa-credit-card',
          title: 'SIDEBAR_MENU.PAYMENT_GATEWAYS',
          featureName: 'PaymentGateways',
          to: `/${ENTITIES.PATH.SYSTEM_CONFIGURATION}/${ENTITIES.NAME.PAYMENT_GATEWAYS}`,
          menuItemName: `${API_ENTITIES_NAME.CONFIGURATIONS}`,
          parent: true,
          entity: `${ENTITIES.NAME.CONFIGURATIONS}`,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.PAYMENT_GATEWAYS',
              to: `/${ENTITIES.PATH.SYSTEM_CONFIGURATION}/${ENTITIES.NAME.PAYMENT_GATEWAYS}`
            }
          ]
        },
        {
          icon: 'fa-shield',
          title: 'SIDEBAR_MENU.RISK_ENGINE_RULES_CONFIG',
          featureName: 'PaymentGateways',
          to: `/${ENTITIES.PATH.SYSTEM_CONFIGURATION}/${ENTITIES.NAME.RISK_ENGINE_RULES_CONFIG}`,
          menuItemName: `${API_ENTITIES_NAME.CONFIGURATIONS}`,
          parent: true,
          subMenus: [
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.ALL.RISK_ENGINE_RULES_CONFIG',
              to: `/${ENTITIES.PATH.SYSTEM_CONFIGURATION}/${ENTITIES.NAME.RISK_ENGINE_RULES_CONFIG}`
            },
            {
              icon: 'd-none',
              title: 'SIDEBAR_MENU.CREATE.RISK_ENGINE_RULES_CONFIG',
              to: `/${ENTITIES.PATH.SYSTEM_CONFIGURATION}/${ENTITIES.NAME.RISK_ENGINE_RULES_CONFIG}/create`
            }
          ]
        }
      ]
    }
  ]
};

export default {
  mockDataSidebar
};
