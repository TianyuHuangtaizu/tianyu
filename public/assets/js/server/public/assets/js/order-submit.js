import { getDeviceFingerprint } from './device-mask.js';

document.getElementById('deltaOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        gameId: e.target.gameId.value,
        serviceType: e.target.serviceType.value
    };

    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Device-Fingerprint': JSON.stringify(getDeviceFingerprint())
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.code === 'DELTA-200') {
            window.location.href = `success.html?orderId=${result.orderId}`;
        } else {
            alert(`错误代码：${result.code}\n${result.error}`);
        }
    } catch (error) {
        console.error('网络通信故障:', error);
        alert('无法连接指挥中心，请检查网络');
    }
});
