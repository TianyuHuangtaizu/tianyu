// WebSocket连接后端
const socket = new WebSocket('ws://localhost:3000/ws');

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    updateDashboard(data);
});

const updateDashboard = (orders) => {
    // 更新活跃订单数
    document.getElementById('activeOrders').textContent = orders.length;

    // 渲染订单列表
    const tbody = document.getElementById('orderList');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.serviceType}</td>
            <td class="status-${order.status}">${order.status}</td>
            <td>
                <button class="btn-detail" data-order="${order.id}">详情</button>
            </td>
        </tr>
    `).join('');
};
