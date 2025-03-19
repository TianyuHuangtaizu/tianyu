const express = require('express');
const router = express.Router();
const { validateDevice } = require('../middleware/security');

// 获取所有订单
router.get('/', (req, res) => {
    const { status } = req.query;
    let result = database.getOrders();
    
    if(status) {
        result = result.filter(o => o.status === status);
    }
    
    res.json(result);
});

// 提交新订单
router.post('/', validateDevice, (req, res) => {
    const newOrder = {
        id: generateOrderId(),
        ...req.body,
        createdAt: new Date(),
        status: 'pending'
    };
    
    database.saveOrder(newOrder);
    res.status(201).json(newOrder);
});

// 订单状态操作
router.patch('/:id', (req, res) => {
    const order = database.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
});

module.exports = router;
