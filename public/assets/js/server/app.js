const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// 中间件
app.use(bodyParser.json());
app.use(cors());

// 内存数据库（生产环境替换为MySQL/MongoDB）
let orders = [];

// 提交订单接口
app.post('/api/orders', (req, res) => {
    const { gameId, serviceType } = req.body;
    const deviceInfo = req.headers['x-device-fingerprint'];

    // 设备验证
    if (!validateDevice(deviceInfo)) {
        return res.status(403).json({ 
            code: 'DELTA-403',
            error: '设备验证失败' 
        });
    }

    // 创建订单
    const newOrder = {
        id: `DSC-${Date.now().toString(36)}`,
        gameId,
        serviceType,
        status: 'pending',
        createdAt: new Date(),
        deviceInfo: JSON.parse(deviceInfo)
    };

    orders.push(newOrder);
    notifyAgent(newOrder); // 通知代练人员
    res.json({ 
        code: 'DELTA-200', 
        orderId: newOrder.id 
    });
});

// 设备验证逻辑
const validateDevice = (deviceInfo) => {
    try {
        const { gpu, resolution, os } = JSON.parse(deviceInfo);
        return gpu && resolution && os;
    } catch (e) {
        return false;
    }
};

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`战术指挥中心运行中: http://localhost:${PORT}`);
});
