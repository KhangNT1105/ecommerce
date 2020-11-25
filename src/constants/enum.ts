// TODO: All enum should be listed here
import { TypeOptions, ToastPosition } from 'react-toastify';
import { EXPORT_TYPE } from './types';

export const COLOR = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger',
  LINK: 'link'
};

export const SIZE = {
  LARGE: 'lg',
  SMALL: 'sm'
};

export const DURATION = {
  TOAST: 5000,
  TOAST_TRANSITION: 1000
};

interface POSITION_OPTIONS {
  [pos: string]: ToastPosition;
}
export const POSITION: POSITION_OPTIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center'
};

interface TYPE_OPTIONS {
  [type: string]: TypeOptions;
}
export const TOAST_TYPE: TYPE_OPTIONS = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export const DATE_RANGE = {
  TODAY: 'today',
  LAST_7_DAYS: 'last7days',
  LAST_30_DAYS: 'last30days',
  LAST_WEEK: 'lastweek',
  LAST_MONTH: 'lastmonth',
  CUSTOM_DATE: 'customdate'
};

interface FILE_TYPE {
  [pos: string]: EXPORT_TYPE;
}
export const EXPORT_FILE_TYPE: FILE_TYPE = {
  CSV: 'csv',
  XLS: 'xls'
};

export const BREAKPOINTS = {
  EXTRA_LARGE: 1200,
  LARGE: 992,
  MEDIUM: 768,
  SMALL: 576
};

export const DROPZONE_EVENT_TYPE = {
  DROP: 'drop',
  CLICK: 'click'
};

export const ENTITIES = {
  PATH: {
    CONTENT: 'content',
    LICENSES: 'licenses',
    USER_MANAGEMENT: 'user-management',
    SYSTEM_CONFIGURATION: 'system-configuration'
  },
  NAME: {
    SHOWS: 'shows',
    SCHEDULES: 'schedules',
    CHANNELS: 'channels',
    CATALOGS: 'catalogs',
    CATEGORIES: 'categories',
    CASTINGS: 'casts',
    CLIPS: 'clips',
    PLAYLISTS: 'playlists',
    UPDATES: 'updates',
    CONTRACTS: 'contracts',
    LICENSORS: 'licensors',
    SYSTEM_USERS: 'system-users',
    USER_GROUPS: 'user-groups',
    SEASONS: 'seasons',
    CONFIGURATIONS: 'configuration',
    EPISODES: 'episodes',
    PAYMENT_GATEWAYS: 'payment-gateways',
    RISK_ENGINE_RULES_CONFIG: 'risk-engine'
  }
};

export const PUBLIC_PAGES = {
  NAME: {
    WELCOME: '/',
    LOGIN: 'login',
    TAC: 'term-and-conditions',
    ACCESS_DENIED: 'access-denied-403',
    DEMO: '/demo',
    PRODUCTS: 'sanpham',
    PRODUCT: 'sanpham/:id',
    CART: 'cart',
    CHECKOUT: 'checkout'
  }
};

export const LANGUAGES_CODE = {
  VN: 'vn',
  EN: 'en'
};

// This is API's entities from BE
export const API_ENTITIES_NAME = {
  SHOWS: 'shows',
  SCHEDULES: 'schedules',
  CHANNELS: 'channels',
  CATALOGS: 'catalogs',
  CATEGORIES: 'categories',
  CASTINGS: 'casts',
  CLIPS: 'clips',
  PLAYLISTS: 'playlists',
  UPDATES: 'updates',
  CONTRACTS: 'contracts',
  LICENSORS: 'licensors',
  SYSTEM_USERS: 'usergroups', // BE don't have entity's name : users | using same usergroups entity
  USER_GROUPS: 'usergroups',
  SEASONS: 'seasons',
  CONFIGURATIONS: 'configurations',
  EPISODES: 'episodes',
  RISK_ENGINES: 'riskengines'
};

export const PAGE_ACTIONS = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete'
};

export const API_ERROR_CODE = {
  TOKEN_INVALID: '1012',
  TOKEN_EXPIRED: '1011',
  REFRESH_TOKEN_EXPIRED: '1014',
  REFRESH_TOKEN_INVALID: '1015'
};

export const PERMISSION_PREFIX = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  EDIT_APPROVAL: 'EDIT_APPROVAL',
  EDIT_VIEW_CONTRACT: 'EDIT_VIEW_CONTRACT',
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  DELETE: 'DELETE',
  RETRIEVE_BCM: 'RETRIEVE_BCM'
};

export const PAGE_ENTITY = {
  HOME: 'HOME'
};

export const BUTTONS_VISIBILITY = {
  SHOW: 'show'
};
export const PAGE_ACCESSIBILITY = {
  SHOW: 'show'
};

export const CLASS_NAME = {
  READONLY: 'read-only',
  DISABLED: 'disabled'
};

export const SEARCH_BOX_SUBMIT_DELAY = 600;

export const SHOWS_TYPES = {
  MOVIE: 'movie',
  SERIES: 'series',
  LIFE_EVENT: 'life event',
  THEATRICAL_PLAY: 'theatrical play',
  PROGRAM: 'program',
  MATCH: 'match',
  SEASONS: 'seasons',
  CHANNELS: 'channels',
  SCHEDULED: 'scheduled',
  SCHEDULING: 'ready for scheduling'
};

export const IMAGE_TYPES = {
  POSTER: 'poster',
  LANDSCAPE: 'landscape',
  POSTER_CLEAN: 'poster clean',
  LANDSCAPE_CLEAN: 'landscape clean',
  POSTER_WITH_LOGO: 'poster with logo',
  LANDSCAPE_WITH_LOGO: 'landscape with logo',
  LOGO_TITLE: 'logo title',
  HERO_BANNER_DESKTOP: 'hero banner desktop',
  HERO_BANNER_MOBILE: 'hero banner mobile'
};

export const INPUT_FIELD = {
  MAX_LENGTH_NORMAL: 100,
  MAX_LENGTH_URL: 1000
};

export const SORTING_DIRECTION = {
  ASCENDING: 'asc',
  DESCENDING: 'desc'
};
const SECONDS = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  MONTH: 2592000,
  YEAR: 31536000
};
const ENUMS = {
  COLOR,
  SIZE,
  DURATION,
  POSITION,
  TOAST_TYPE,
  DATE_RANGE,
  EXPORT_FILE_TYPE,
  BREAKPOINTS,
  DROPZONE_EVENT_TYPE,
  SECONDS
};

export default ENUMS;
