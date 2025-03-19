require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const orderRoutes = require('./routes/orders');

const app = express();

// 安全中间件
app.use(helmet());
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100 // 限制100次请求
}));

// 订单路由
app.use('/api/orders', orderRoutes);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        code: 'DELTA-500',
        error: '战术系统故障'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`战术指挥中心运行中: http://localhost:${PORT}`);
});
