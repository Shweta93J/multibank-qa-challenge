const assert = require('node:assert/strict');
const {
  normalizeTransactionId,
  findDuplicateTransactions,
  validateOrder,
} = require('./transactionUtils');

function run() {
  assert.equal(normalizeTransactionId(' tx-1001 '), 'TX-1001');

  assert.deepEqual(
    findDuplicateTransactions([
      { transactionId: 'tx-1001' },
      { transactionId: 'TX-1002' },
      { transactionId: ' tx-1001 ' },
      { transactionId: 'tx-1003' },
      { transactionId: 'TX-1002' },
    ]),
    ['TX-1001', 'TX-1002']
  );

  assert.deepEqual(validateOrder({ symbol: 'BTCUSDT', side: 'BUY', amount: 1.5, price: 65000 }), {
    valid: true,
    reason: 'Order is valid',
  });

  assert.deepEqual(validateOrder({ symbol: '', side: 'BUY', amount: 1.5, price: 65000 }), {
    valid: false,
    reason: 'Symbol is required',
  });

  console.log('All coding exercise checks passed.');
}

run();
