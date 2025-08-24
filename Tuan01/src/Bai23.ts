// 23. Create an interface Payment with method pay(amount). Implement CashPayment and
// CardPayment.

interface Payment {
  pay(amount: number): void;
}

class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng tiền mặt.`);
  }
}

class CardPayment implements Payment {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount} bằng thẻ.`);
  }
}

const cash: Payment = new CashPayment();
const card: Payment = new CardPayment();

cash.pay(100);
card.pay(200);  