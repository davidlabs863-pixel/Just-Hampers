(function () {
  window.JustHampersPaymentConfig = {
    currency: 'NGN',
    provider: null,
    methods: [
      { id: 'card', label: 'Card', detail: 'Debit and credit cards through secure provider checkout.', enabled: false, providerChannel: 'card' },
      { id: 'bank_transfer', label: 'Bank transfer', detail: 'Provider-managed transfer instructions.', enabled: false, providerChannel: 'bank_transfer' },
      { id: 'payment_link', label: 'Payment link', detail: 'A secure, order-specific link issued by the payment backend.', enabled: false, providerChannel: null }
    ],
    endpoints: {
      createCheckout: '/api/payments/checkout',
      verifyStatus: '/api/payments/status',
      corporatePaymentLink: '/api/corporate/payments/link'
    },
    corporate: {
      depositPercentage: null,
      balancePercentage: null,
      scheduleSource: 'approved_quote'
    }
  };
})();
