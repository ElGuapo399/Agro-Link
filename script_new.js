const productos = [
    {
        id: 1,
        nombre: "Tomate Rojo",
        categoria: "verduras",
        agricultor: "Juan Pérez",
        ubicacion: "Ciudad Victoria",
        precios: {
            kg: 25,
            caja: 300,
            saco: 180,
            pieza: 2,
            tonelada: 25000
        },
        descripcion: "Tomate rojo cultivado de manera orgánica, disponible para entrega inmediata.",
        imagen: "Tomate.jpg"
    },
    {
        id: 2,
        nombre: "Aguacate Hass",
        categoria: "frutas",
        agricultor: "María González",
        ubicacion: "Güémez",
        precios: {
            kg: 80,
            caja: 1600,
            saco: 1200,
            pieza: 12,
            tonelada: 80000
        },
        descripcion: "Aguacate Hass de primera calidad, cosechado esta semana.",
        imagen: "Aguacate.jpeg"
    },
    {
        id: 3,
        nombre: "Cebolla Blanca",
        categoria: "verduras",
        agricultor: "Jose Perez",
        ubicacion: "Gonzales",
        precios: {
            kg: 23,
            caja: 350,
            saco: 200,
            pieza: 1.5,
            tonelada: 23000
        },
        descripcion: "Cebolla blanca recién cosechada, disponible en grandes cantidades.",
        imagen: "Cebolla.jpg"
    },
    // ... más productos con el mismo formato
];
 
const UNIDADES_TEXTO = {
    kg: 'Kilogramo',
    caja: 'Caja',
    saco: 'Saco/Costal',
    pieza: 'Pieza',
    tonelada: 'Tonelada'
};
 
let cart = [];
let selectedProductId = null;
let selectedUnit = 'kg';
 
// Función para mostrar productos con selector de unidades
function mostrarProductos(categoria = "todas") {
    const container = document.getElementById('products-container');
    if (!container) return;
   
    container.innerHTML = '';
   
    const productosFiltrados = categoria === "todas"
        ? productos
        : productos.filter(producto => producto.categoria === categoria);
   
    if (productosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otra categoría o término de búsqueda.</p>
            </div>
        `;
        return;
    }
   
    productosFiltrados.forEach(producto => {
        const card = document.createElement('article');
        card.className = 'product-card';
       
        // Generar opciones de precio para cada unidad
        const preciosHTML = Object.entries(producto.precios)
            .map(([unidad, precio]) => `
                <div class="price-option">
                    <input type="radio"
                           name="unit-${producto.id}"
                           id="unit-${producto.id}-${unidad}"
                           value="${unidad}"
                           ${unidad === 'kg' ? 'checked' : ''}>
                    <label for="unit-${producto.id}-${unidad}">
                        <span class="unit-name">${UNIDADES_TEXTO[unidad]}</span>
                        <span class="unit-price">$${precio.toFixed(2)}</span>
                    </label>
                </div>
            `).join('');
 
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${producto.imagen}');" role="img" aria-label="${producto.nombre}"></div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <div class="product-meta">
                    <span>Agricultor: ${producto.agricultor}</span>
                    <span>${producto.ubicacion}</span>
                </div>
                <div class="price-selector" data-product-id="${producto.id}">
                    <h4>Selecciona presentación:</h4>
                    <div class="price-options">
                        ${preciosHTML}
                    </div>
                </div>
                <p class="product-description">${producto.descripcion}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${producto.id}">
                    <i class="fas fa-shopping-cart"></i> Agregar al carrito
                </button>
            </div>
        `;
 
        // Event listeners para los radio buttons de unidades
        const priceSelector = card.querySelector('.price-selector');
        priceSelector.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                selectedUnit = e.target.value;
            }
        });
 
        // Event listener para el botón de agregar al carrito
        const addButton = card.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => {
            const productId = parseInt(addButton.dataset.id);
            const selectedUnitEl = card.querySelector('input[type="radio"]:checked');
            if (selectedUnitEl) {
                openCartModal(productId, selectedUnitEl.value);
            }
        });
 
        container.appendChild(card);
    });
}
 
// Función para abrir el modal del carrito
function openCartModal(productId, unit = 'kg') {
    selectedProductId = productId;
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
 
    document.getElementById('cart-quantity').value = 1;
   
    // Actualizar las opciones de unidad en el modal
    const unitSelect = document.getElementById('cart-unit');
    if (unitSelect) {
        unitSelect.innerHTML = Object.entries(producto.precios)
            .map(([unidad, precio]) => `
                <option value="${unidad}" ${unidad === unit ? 'selected' : ''}>
                    ${UNIDADES_TEXTO[unidad]} - $${precio.toFixed(2)}
                </option>
            `).join('');
    }
 
    mostrarModal('cart-modal');
}
 
// Función para agregar al carrito
function addToCart(productId, cantidad, unidad) {
    const producto = productos.find(p => p.id === productId);
    if (!producto || !producto.precios[unidad]) return;
 
    const precio = producto.precios[unidad];
    const existing = cart.find(item => item.id === productId && item.unidad === unidad);
 
    if (existing) {
        existing.cantidad = Number(existing.cantidad) + Number(cantidad);
    } else {
        cart.push({
            id: productId,
            nombre: producto.nombre,
            precio: precio,
            cantidad: Number(cantidad),
            unidad: unidad
        });
    }
 
    updateCart();
    closeCartModal();
}
 
// Función para actualizar el carrito
function updateCart() {
    const container = document.getElementById('cart-contents');
    if (!container) return;
 
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>No hay productos en tu carrito</p>
            </div>`;
        updateCartCount();
        updateTotalAmount();
        return;
    }
 
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">
                    <span class="price">$${item.precio.toFixed(2)} por ${UNIDADES_TEXTO[item.unidad]}</span>
                    <span class="subtotal">Subtotal: $${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <input type="number" min="1" value="${item.cantidad}"
                           class="cart-qty"
                           data-id="${item.id}"
                           data-unit="${item.unidad}">
                    <span class="cart-unit">${UNIDADES_TEXTO[item.unidad]}</span>
                </div>
                <button class="remove-from-cart" data-id="${item.id}" data-unit="${item.unidad}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
 
    // Agregar event listeners para los controles del carrito
    addCartControlListeners();
    updateCartCount();
    updateTotalAmount();
}
 
// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + Number(item.cantidad), 0);
        cartCount.textContent = totalItems;
    }
}
 
// Función para actualizar el monto total
function updateTotalAmount() {
    const totalElement = document.getElementById('cart-total-amount');
    if (totalElement) {
        const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
 
// Función para agregar event listeners a los controles del carrito
function addCartControlListeners() {
    // Event listeners para cantidades
    document.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', function() {
            const id = Number(this.dataset.id);
            const unit = this.dataset.unit;
            const cantidad = Number(this.value) || 1;
            updateCartItem(id, cantidad, unit);
        });
    });
 
    // Event listeners para eliminar items
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = Number(this.dataset.id);
            const unit = this.dataset.unit;
            removeFromCart(id, unit);
        });
    });
}
 
// Función para actualizar un item del carrito
function updateCartItem(productId, cantidad, unit) {
    const item = cart.find(i => i.id === productId && i.unidad === unit);
    if (item) {
        item.cantidad = Math.max(1, cantidad);
        updateCart();
    }
}
 
// Función para eliminar un item del carrito
function removeFromCart(productId, unit) {
    cart = cart.filter(item => !(item.id === productId && item.unidad === unit));
    updateCart();
}
 
// Event Listeners cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar productos iniciales
    mostrarProductos();
 
    // Event listener para el botón de agregar al carrito en el modal
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const qty = Number(document.getElementById('cart-quantity').value) || 1;
            const unit = document.getElementById('cart-unit').value;
            if (selectedProductId) {
                addToCart(selectedProductId, qty, unit);
            }
        });
    }
 
    // Event listener para limpiar carrito
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                cart = [];
                updateCart();
            }
        });
    }
});