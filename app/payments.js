'use strict';

const SPSP = require('ilp').SPSP;
const FiveBells = require('ilp-plugin-bells');
const config = require('../config/config.js');

async function pay(senderId, senderPass, receiverId, amount, message) {
  const plugin = new FiveBells({
    account: "https://" + config.ilp + "/ledger/accounts/" + senderId,
    password: senderPass
  });

  await plugin.connect();
  console.log('Plugin connected');

  const payment = await SPSP.quote(plugin, {
    receiver: receiverId + '@' + config.ilp,
    sourceAmount: amount
  });

  payment.headers = {
    'Source-Identifier': senderId + '@' + config.ilp,
    'Message': message
  }
  console.log('got SPSP payment details:', payment)

  return SPSP.sendPayment(plugin, payment);
  console.log('Sent money');
}

module.exports = pay;
