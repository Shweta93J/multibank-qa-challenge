function normalizeTransactionId(transactionId) {
  if (typeof transactionId !== 'string') {
    throw new TypeError('transactionId must be a string');
  }

  return transactionId.trim().toUpperCase();
}

function findDuplicateTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new TypeError('transactions must be an array');
  }

  const seen = new Map();
  const duplicates = [];

  for (const transaction of transactions) {
    if (!transaction || typeof transaction !== 'object') {
      continue;
    }

    const key = normalizeTransactionId(transaction.transactionId || '');
    if (!key) {
      continue;
    }

    const count = seen.get(key) || 0;
    seen.set(key, count + 1);

    if (count === 1) {
      duplicates.push(key);
    }
  }

  return duplicates;
}

function validateOrder(order) {
  if (!order || typeof order !== 'object') {
    return { valid: false, reason: 'Order payload is required' };
  }

  const { symbol, side, amount, price } = order;

  if (!symbol || typeof symbol !== 'string') {
    return { valid: false, reason: 'Symbol is required' };
  }

  if (!['BUY', 'SELL'].includes(String(side).toUpperCase())) {
    return { valid: false, reason: 'Side must be BUY or SELL' };
  }

  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
    return { valid: false, reason: 'Amount must be a positive number' };
  }

  if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
    return { valid: false, reason: 'Price must be a positive number' };
  }

  return { valid: true, reason: 'Order is valid' };
}

module.exports = {
  normalizeTransactionId,
  findDuplicateTransactions,
  validateOrder,
};
