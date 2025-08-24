"use strict";
// 23. Create an interface Payment with method pay(amount). Implement CashPayment and
// CardPayment.
class CashPayment {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng tiền mặt.`);
    }
}
class CardPayment {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng thẻ.`);
    }
}
const cash = new CashPayment();
const card = new CardPayment();
cash.pay(100);
card.pay(200);
