document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://edu.std-900.ist.mospolytech.ru/exam-2024-1/api/goods';
    const API_KEY = 'f4a4141f-c439-4130-a14d-4158099b7b90';

    let currentPage = 1;
    let totalPages = 1;
    let sortOrder = 'rating_asc'; // Изначальная сортировка

    const sortSelect = document.getElementById('sort');

    async function loadProducts(page = 1) {
        try {
            // Формируем URL с учётом сортировки
            const url = `${API_URL}?page=${page}&per_page=8&sort_order=${sortOrder}&api_key=${API_KEY}`;
            console.log(`Запрос на страницу: ${page} Сортировка: ${sortOrder}`); // Логирование запроса
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при запросе данных');
            }

            const data = await response.json();

            currentPage = data._pagination.current_page;
            totalPages = Math.ceil(data._pagination.total_count / data._pagination.per_page);

            const productsContainer = document.getElementById('product-grid');
            productsContainer.innerHTML = '';

            // Генерация карточек товаров
            data.goods.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="rating">Рейтинг: ${product.rating}</p>
                    <p class="price">Цена: ₽${product.discount_price || product.actual_price}</p>
                    <button>В корзину</button>
                `;

                productsContainer.appendChild(productCard);
            });

            updatePagination();
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    }

    // Обновление пагинации
    function updatePagination() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = page;
            pageButton.classList.add('page-button');

            if (page === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                loadProducts(page);
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    // Слушаем изменение сортировки
    sortSelect.addEventListener('change', (event) => {
        // Прямо присваиваем значение из event.target.value
        sortOrder = event.target.value || 'rating_asc'; // Если ничего не выбрано, по умолчанию 'rating_asc'
        loadProducts(1); // Загружаем товары с первой страницы
    });

    // Инициализируем загрузку товаров
    loadProducts(currentPage);
});