module.exports = {
  name: 'Block Checkout for 3 Hours',
  type: 'LIMIT_TEMPORARY',
  paymentGatewayId: 'checkout',
  evaluationType: 'REVOKE_COUNT',
  evaluationValue: 3,
  timeRangeDuration: 1,
  timeRangeDurationUnit: 'HOUR',
  action: 'BLACK_LIST_PAYMENT_INSTRUMENT',
  actionDuration: 3,
  actionDurationUnit: 'MINUTE'
}
