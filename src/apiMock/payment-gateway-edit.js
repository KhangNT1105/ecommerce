module.exports = {
  paymentGatewayId: '0001',
  paymentGatewayName: 'Zain Jordan',
  content: [
    {
      id: '5ec243e3b3650d188f1ef100',
      plan: 'weekly',
      product: 'vip',
      initialRetrialsCount: 10,
      initialRetrialFrequency: 5,
      frequencyUnit: 'minute',
      revokeAfterAttempts: 5
    },
    {
      id: '5ec243e3b3650d188f1ef101',
      plan: 'monthly',
      product: 'vip',
      initialRetrialsCount: 10,
      initialRetrialFrequency: 5,
      frequencyUnit: 'minute',
      revokeAfterAttempts: 5
    },
    {
      id: '5ec243e3b3650d188f1ef102',
      plan: 'yearly',
      product: 'vip',
      initialRetrialsCount: 10,
      initialRetrialFrequency: 5,
      frequencyUnit: 'minute',
      revokeAfterAttempts: 5
    }
  ]
};
