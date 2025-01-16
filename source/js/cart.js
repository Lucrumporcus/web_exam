document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const notifications = document.getElementById('notifications');
    const orderForm = document.getElementById('order-form');

    // Пример данных о товарах в корзине
    const cartItems = [
        { id: 1, name: 'Товар 1', image: 'https://via.placeholder.com/150', price: 500, discountPrice: 400 },
        { id: 2, name: 'Товар 2', image: 'https://via.placeholder.com/150', price: 1200, discountPrice: 1000 }
    ];

    // Функция для обновления отображения корзины
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItems.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p class="price">${item.discountPrice ? item.discountPrice : item.price} ₽</p>
                    ${item.discountPrice ? `<p class="discount-price">${item.price} ₽</p>` : ''}
                    <button onclick="removeItem(${item.id})">Удалить</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    // Функция для удаления товара из корзины
    window.removeItem = function (id) {
        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1) {
            cartItems.splice(index, 1);
            updateCart();
            showNotification('Товар удален из корзины');
        }
    };

    // Функция для отображения уведомлений
    function showNotification(message) {
        notifications.textContent = message;
        notifications.classList.remove('hidden');
        setTimeout(() => {
            notifications.classList.add('hidden');
        }, 3000);
    }

    // Обработчик отправки формы
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showNotification('Ваш заказ оформлен');
        orderForm.reset();
    });

    // Инициализация
    updateCart();
});
