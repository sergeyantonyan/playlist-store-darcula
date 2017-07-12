'use strict';

const SPSP = require('ilp').SPSP;
const FiveBells = require('ilp-plugin-bells');

async function pay(senderId, senderPass, receiverId, amount, message) {
  const plugin = new FiveBells({
    account: "https://ilp.tumo.org/ledger/accounts/" + senderId,
    password: senderPass
  });

  await plugin.connect();
  console.log('Plugin connected');

  const payment = await SPSP.quote(plugin, {
    receiver: receiverId + '@ilp.tumo.org',
    sourceAmount: amount
  });

  payment.headers = {
    'Source-Identifier': senderId + '@ilp.tumo.org',
    'Message': message
  }
  console.log('got SPSP payment details:', payment)

  return SPSP.sendPayment(plugin, payment);
  console.log('Sent money');
}

module.exports = pay;
