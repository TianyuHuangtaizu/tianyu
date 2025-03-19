document.getElementById('deltaOrderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 获取设备指纹
    const deviceFingerprint = localStorage.getItem('deltaDevice');
    
    // 构建请求数据
    const formData = {
        agentId: e.target.agentId.value,
        serviceType: e.target.serviceType.value,
        deviceHash: deviceFingerprint
    };

    try {
        const response = await fetch('https://delta-backend.herokuapp.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Security-Token': 'DELTA-2023'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('HTTP错误');
        
        const result = await response.json();
        window.location.href = `success.html?orderId=${result.orderId}`;
        
    } catch (error) {
        console.error('通信故障:', error);
        showAlert('danger', '与指挥中心失去联系！');
    }
});

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `hud-alert hud-${type}`;
    alertDiv.textContent = message;
    document.body.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}
