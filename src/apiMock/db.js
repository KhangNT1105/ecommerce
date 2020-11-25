const users = require('./users');
const clips = require('./clips');
const logout = require('./logout');
const exportFiles = require('./exportFiles');
const suggestion = require('./suggestion');
const upload = require('./upload');
const usergroups = require('./usergroups');
const createUserGroup = require('./createUserGroup');
const permissions = require('./permissions');
const login = require('./login');
const casts = require('./castings');
const catalogs = require('./catalogs');
const categories = require('./categories');
const licensors = require('./licensors');
const activityLog = require('./activityLog');
const castings = require('./castings')
const casting = require('./casting')
const paymentGateways = require('./payment-gateways');
const paymentGatewayEdit = require('./payment-gateway-edit');
const paymentGatewayRetrialConfig = require('./payment-gateway-retrial-configs');
const paymentGatewayName = require('./payment-gateway-name');
const paymentGatewaySubscriptionPlans = require('./payment-gateway-subscription-plans');
const paymentGatewaySubscriptionProducts = require('./payment-gateway-subscription-products');
const riskEngine = require('./risk-engine');
const riskEngineEdit = require('./risk-engine-edit');
const categoryDetail = require('./category-detail');
const channels = require('./channels');
const genres = require('./genres')
const categoryData = require('./categoryData');
const videoClips = require('./videoClips')

module.exports = () => ({
  users,
  clips,
  logout,
  exportFiles,
  suggestion,
  upload,
  usergroups,
  createUserGroup,
  login,
  permissions,
  castings,
  casting,
  casts,
  catalogs,
  categories,
  paymentGateways,
  licensors,
  activityLog,
  paymentGatewayEdit,
  paymentGatewayRetrialConfig,
  paymentGatewayName,
  paymentGatewaySubscriptionPlans,
  paymentGatewaySubscriptionProducts,
  riskEngine,
  riskEngineEdit,
  categoryDetail,
  channels,
  genres,
  categoryData,
  videoClips
});
