class PaymentSystem {
    constructor() {
        this.gateways = {
            wechat: 'https://pay.wechat.com/api',
            alipay: 'https://openapi.alipay.com/gateway.do'
        };
    }

    async createPayment(order) {
        const response = await fetch(this.gateways[order.channel], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': this.generateSignature(order)
            },
            body: JSON.stringify({
                amount: order.amount,
                orderId: order.id,
                notifyUrl: 'https://your-domain.com/payment/callback'
            })
        });
        
        return response.json();
    }

    generateSignature(order) {
        // 生成支付签名
        const raw = `${order.id}|${order.amount}|${order.channel}`;
        return btoa(raw);
    }
}
