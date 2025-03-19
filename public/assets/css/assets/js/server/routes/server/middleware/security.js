// 设备验证中间件
exports.validateDevice = (req, res, next) => {
    const deviceInfo = req.headers['x-device-fingerprint'];
    
    if(!deviceInfo || !isValidDevice(deviceInfo)) {
        return res.status(403).json({ 
            code: "DEVICE_INVALID",
            error: "设备验证失败" 
        });
    }
    
    next();
};

// 验证设备指纹
function isValidDevice(deviceInfo) {
    try {
        const { gpu, resolution } = JSON.parse(deviceInfo);
        return gpu && resolution && gpu.includes('ANGLE');
    } catch(e) {
        return false;
    }
}
