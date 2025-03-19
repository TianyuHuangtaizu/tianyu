// 生成随机设备指纹
const generateDeviceFingerprint = () => {
    const fakeData = {
        gpu: `ANGLE (${Math.random().toString(36).substr(2, 5)})`,
        resolution: `${screen.width}x${screen.height}`,
        os: navigator.platform.replace(/\s+/g, '_'),
        noise: Math.random().toFixed(5)
    };
    localStorage.setItem('deltaDevice', JSON.stringify(fakeData));
    return fakeData;
};

// 初始化时生成
generateDeviceFingerprint();

// 每5分钟刷新一次
setInterval(generateDeviceFingerprint, 300000);

// 导出指纹供其他模块使用
export const getDeviceFingerprint = () => {
    return JSON.parse(localStorage.getItem('deltaDevice'));
};
