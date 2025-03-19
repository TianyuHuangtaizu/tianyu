let socket = new WebSocket('wss://your-domain.com/ws');

// 实时订单更新
socket.onmessage = (event) => {
    const orders = JSON.parse(event.data);
    
    // 更新统计面板
    document.getElementById('active-orders').textContent = orders.filter(o => o.status === 'active').length;
    
    // 渲染订单列表
    const tbody = document.getElementById('order-list');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.playerId}</td>
            <td>${order.serviceType}</td>
            <td><span class="status-${order.status}">${order.status}</span></td>
            <td>
                <button class="btn-detail" onclick="showDetail('${order.id}')">详情</button>
                <button class="btn-cancel" onclick="cancelOrder('${order.id}')">取消</button>
            </td>
        </tr>
    `).join('');
};

// 查看订单详情
function showDetail(orderId) {
    fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
            alert(`订单详情：\n${JSON.stringify(data, null, 2)}`);
        });
}
