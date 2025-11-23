// ==========================================
// SCRIPT.JS - LÓGICA DE NEGOCIO Y PROCEDIMIENTOS
// ==========================================

// ESTADO GLOBAL
// Nota: 'productos', 'UNIDADES_TEXTO' y 'TIPOS_VEHICULO' vienen de script_new.js
let cart = JSON.parse(localStorage.getItem('agrolink_cart') || '[]');
let selectedProductId = null;
let currentUser = JSON.parse(localStorage.getItem('agrolink_user') || 'null');
let transportistas = JSON.parse(localStorage.getItem('agrolink_transportistas') || '[]');
let pedidos = JSON.parse(localStorage.getItem('agrolink_pedidos') || '[]');

// --- GESTIÓN DE USUARIO ---

function saveUser() {
    localStorage.setItem('agrolink_user', JSON.stringify(currentUser));
}

function updateUserInfo() {
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const userRating = document.getElementById('user-rating');
    
    if (currentUser) {
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        // Ocultar botones de login/registro
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('register-btn').style.display = 'none';
        
        if (userRating) {
            userRating.innerHTML = '★'.repeat(Math.floor(currentUser.rating || 0)) + 
                                 '☆'.repeat(5 - Math.floor(currentUser.rating || 0));
        }
    } else {
        userInfo.style.display = 'none';
        document.getElementById('login-btn').style.display = 'inline-block';
        document.getElementById('register-btn').style.display = 'inline-block';
    }
}

// --- GESTIÓN DEL CARRITO ---

function saveCart() {
    localStorage.setItem('agrolink_cart', JSON.stringify(cart));
}

function openCartModal(productId, selectedUnit = 'kg') {
    selectedProductId = productId;
    // Buscamos en la variable global 'productos' que está en script_new.js
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
   
    document.getElementById('cart-quantity').value = 1;
    const unitSelect = document.getElementById('cart-unit');
    
    if (unitSelect) {
        unitSelect.innerHTML = '';
        // Llenar select con las unidades disponibles de ese producto
        Object.keys(producto.precios).forEach(unidad => {
            const option = document.createElement('option');
            option.value = unidad;
            option.textContent = `${UNIDADES_TEXTO[unidad]} - $${producto.precios[unidad].toFixed(2)}`;
            if (unidad === selectedUnit) {
                option.selected = true;
            }
            unitSelect.appendChild(option);
        });
    }
   
    cargarTransportistas(); // Cargar lista para opción de entrega
    mostrarModal('cart-modal');
}

function closeCartModal() {
    ocultarModal('cart-modal');
    selectedProductId = null;
}

function addToCart(productId, cantidad, unidad) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    const precioPorUnidad = producto.precios[unidad];
    if (precioPorUnidad === undefined) return;
    
    const existing = cart.find(item => item.id === productId && item.unidad === unidad);
    
    if (existing) {
        existing.cantidad = Number(existing.cantidad) + Number(cantidad);
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: precioPorUnidad, // Guardamos precio unitario actual
            cantidad: Number(cantidad),
            unidad: unidad,
            agricultor: producto.agricultor,
            imagen: producto.imagen
        });
    }
    
    saveCart();
    renderCart();
    updateCartCount();
    closeCartModal();
    alert("Producto agregado al carrito");
}

function removeFromCart(productId, unit) {
    cart = cart.filter(item => !(item.id === productId && item.unidad === unit));
    saveCart();
    renderCart();
    updateCartCount();
}

function updateCartItem(productId, cantidad, unit) {
    const item = cart.find(i => i.id === productId && i.unidad === unit);
    if (!item) return;
    
    // Validar precio actualizado
    const producto = productos.find(p => p.id === productId);
    if (producto && producto.precios[unit] !== undefined) {
        item.precio = producto.precios[unit];
    }
    
    item.cantidad = Number(cantidad) || 1;
    saveCart();
    renderCart(); // Re-renderizar para actualizar subtotales
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + Number(item.cantidad), 0);
        cartCount.textContent = totalItems;
    }
}

function calcularTotalItem(item) {
    return item.precio * item.cantidad;
}

function renderCart() {
    const container = document.getElementById('cart-contents');
    if (!container) return;
    container.innerHTML = '';
   
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 2em; color: #ccc;"></i>
                <p>No hay artículos en tu lista.</p>
            </div>`;
        updateCartCount();
        document.getElementById('cart-total-amount').textContent = '$0.00';
        return;
    }

    let total = 0;
    const sortedCart = [...cart].sort((a, b) => a.nombre.localeCompare(b.nombre));

    sortedCart.forEach(item => {
        const subtotal = calcularTotalItem(item);
        total += subtotal;
        
        const row = document.createElement('div');
        row.className = 'cart-item';
        
        row.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-main">
                    <div class="cart-item-name">${item.nombre} <small>(${item.agricultor})</small></div>
                    <div class="cart-item-price">
                        <span class="price">$${item.precio.toFixed(2)}/${item.unidad}</span>
                        <span class="subtotal">Subtotal: $${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <input type="number" min="1" value="${item.cantidad}" data-id="${item.id}" data-unit="${item.unidad}" class="cart-qty">
                    <span class="cart-unit">${UNIDADES_TEXTO[item.unidad]}</span>
                </div>
                <button class="remove-from-cart" data-id="${item.id}" data-unit="${item.unidad}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        container.appendChild(row);
    });

    // Event Listeners dinámicos para el carrito
    container.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = Number(this.getAttribute('data-id'));
            const unit = this.getAttribute('data-unit');
            removeFromCart(id, unit);
        });
    });

    container.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', function() {
            const id = Number(this.getAttribute('data-id'));
            const unit = this.getAttribute('data-unit');
            const val = Number(this.value) || 1;
            updateCartItem(id, val, unit);
        });
    });

    document.getElementById('cart-total-amount').textContent = `$${total.toFixed(2)}`;
    updateCartCount();
}

// --- GESTIÓN DE TRANSPORTISTAS ---

function cargarTransportistas() {
    const select = document.getElementById('transporter-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecciona un transportista</option>';
    transportistas.forEach(transporter => {
        const option = document.createElement('option');
        option.value = transporter.id;
        option.textContent = `${transporter.name} - ${TIPOS_VEHICULO[transporter.vehicle]} (${transporter.capacity}kg)`;
        select.appendChild(option);
    });
    
    // Listener para mostrar info al seleccionar
    select.addEventListener('change', function() {
        const selectedId = this.value;
        const infoContainer = document.getElementById('transporter-info');
        const transporter = transportistas.find(t => t.id == selectedId);
        
        if (transporter && infoContainer) {
            infoContainer.innerHTML = `
                <p><strong>Vehículo:</strong> ${TIPOS_VEHICULO[transporter.vehicle]}</p>
                <p><strong>Capacidad:</strong> ${transporter.capacity} kg</p>
                <p><strong>Zonas:</strong> ${transporter.zones.join(', ')}</p>
                <p><strong>Contacto:</strong> ${transporter.phone}</p>
            `;
        } else if (infoContainer) {
            infoContainer.innerHTML = '';
        }
    });
}

function saveTransportistas() {
    localStorage.setItem('agrolink_transportistas', JSON.stringify(transportistas));
}

// --- PROCESO DE COMPRA (CHECKOUT) ---

function procesarCompra() {
    if (cart.length === 0) {
        alert('No hay productos en el carrito');
        return;
    }
    
    if (!currentUser) {
        alert('Por favor inicia sesión para realizar la compra');
        mostrarModal('login-modal');
        return;
    }
    
    // Validar método de entrega
    const deliveryRadio = document.querySelector('input[name="delivery-method"]:checked');
    const deliveryMethod = deliveryRadio ? deliveryRadio.value : 'pickup';
    
    // Validar método de pago
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        alert('Por favor selecciona un método de pago');
        return;
    }
    
    // Validar transportista si aplica
    let transportistaId = null;
    if (deliveryMethod === 'transport') {
        transportistaId = document.getElementById('transporter-select').value;
        if (!transportistaId) {
            alert('Por favor selecciona un transportista');
            return;
        }
    }
    
    // Crear objeto pedido
    const pedido = {
        id: 'PED-' + Date.now().toString().slice(-6),
        fecha: new Date().toISOString(),
        productos: [...cart],
        total: cart.reduce((sum, item) => sum + calcularTotalItem(item), 0),
        metodoPago: paymentMethod.value,
        metodoEntrega: deliveryMethod,
        transportistaId: transportistaId,
        estado: 'confirmado',
        comprador: currentUser,
        vendedores: [...new Set(cart.map(item => item.agricultor))]
    };
    
    pedidos.push(pedido);
    localStorage.setItem('agrolink_pedidos', JSON.stringify(pedidos));
    
    // Limpiar carrito
    cart = [];
    saveCart();
    renderCart();
    
    alert(`¡Pedido ${pedido.id} realizado con éxito!`);
    ocultarModal('cart-modal');
}

// --- FACTURACIÓN ---

function generarFactura() {
    if (cart.length === 0) {
        alert('No hay productos en el carrito para facturar');
        return;
    }

    const fecha = new Date().toLocaleDateString('es-MX');
    const numeroFactura = 'AGR-' + Date.now().toString().slice(-6);
    
    let subtotal = 0;
    const iva = 0.16;

    let facturaHTML = `
        <div class="factura-container">
            <div class="factura-header">
                <h2>🌱 FACTURA AGROLINK TAMAULIPAS</h2>
                <div class="factura-info">
                    <p><strong>No. Factura:</strong> ${numeroFactura}</p>
                    <p><strong>Fecha:</strong> ${fecha}</p>
                </div>
            </div>
            
            <div class="factura-cliente">
                <h3>Datos del Cliente</h3>
                <div class="cliente-form">
                    <input type="text" id="cliente-nombre" placeholder="Nombre completo" value="${currentUser ? currentUser.name : ''}" required>
                    <input type="text" id="cliente-rfc" placeholder="RFC" required>
                    <input type="text" id="cliente-direccion" placeholder="Dirección fiscal" required>
                    <input type="email" id="cliente-email" placeholder="Email" value="${currentUser ? currentUser.email : ''}" required>
                </div>
            </div>

            <div class="factura-detalles">
                <h3>Detalles de la Compra</h3>
                <table class="factura-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Unidad</th>
                            <th>P. Unit.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    cart.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        subtotal += subtotalItem;

        facturaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${UNIDADES_TEXTO[item.unidad]}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td>$${subtotalItem.toFixed(2)}</td>
            </tr>
        `;
    });

    const ivaMonto = subtotal * iva;
    const total = subtotal + ivaMonto;

    facturaHTML += `
                    </tbody>
                </table>
                
                <div class="factura-totales">
                    <div class="total-line"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
                    <div class="total-line"><span>IVA (16%):</span><span>$${ivaMonto.toFixed(2)}</span></div>
                    <div class="total-line total-final"><span><strong>Total:</strong></span><span><strong>$${total.toFixed(2)}</strong></span></div>
                </div>
            </div>

            <div class="factura-actions">
                <button class="btn btn-outline" onclick="ocultarModal('factura-modal')">Cancelar</button>
                <button class="btn btn-primary" onclick="alert('Descargando PDF...')">Descargar PDF</button>
            </div>
        </div>
    `;

    const modalContent = document.getElementById('factura-content');
    if (modalContent) {
        modalContent.innerHTML = facturaHTML;
        mostrarModal('factura-modal');
    }
}

// --- MODALES UI ---

function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = 'flex';
}

function ocultarModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.style.display = 'none';
}

function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
   
    const seccion = document.getElementById(seccionId);
    if(seccion) seccion.classList.remove('hidden');
   
    // Actualizar menú activo
    document.querySelectorAll('nav a, .hero-buttons button, .header-actions button[data-section]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === seccionId) {
            link.classList.add('active');
        }
    });
   
    // Si vamos a buscar, recargar productos (función en script_new.js)
    if (seccionId === 'search' && typeof mostrarProductos === 'function') {
        mostrarProductos();
    }
}

// --- EVENT LISTENERS (AL CARGAR PÁGINA) ---

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización UI
    mostrarSeccion('home');
    updateCartCount();
    updateUserInfo();
    renderCart();

    // Navegación
    document.querySelectorAll('nav a, .hero-buttons button, [data-section]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.getAttribute('data-section');
            mostrarSeccion(seccion);
        });
    });
    
    // Botones del Header
    document.getElementById('header-cart-btn').addEventListener('click', () => {
         if (cart.length === 0) alert('Tu carrito está vacío');
         else mostrarModal('cart-modal');
    });

    // Filtros de Categoría (Delegación a función de script_new.js)
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (typeof mostrarProductos === 'function') {
                mostrarProductos(this.getAttribute('data-category'));
            }
        });
    });
    
    // Buscador
    document.getElementById('search-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const termino = document.getElementById('product-search').value.toLowerCase();
        const ubicacion = document.getElementById('location').value;
        const categoria = document.getElementById('category').value;
        
        // Llamar a mostrarProductos con filtros (asumiendo que script_new.js maneja la lógica de filtrado interno o lo adaptamos)
        // Nota: Si script_new tiene la lógica de renderizado, es mejor pasarle los filtros o filtrar el array global 'productos'
        if (typeof mostrarProductos === 'function') {
             // Pequeño hack: filtramos el array global y llamamos renderizado
             // Lo ideal es que mostrarProductos acepte un array filtrado, pero por compatibilidad:
             const productosFiltrados = productos.filter(p => {
                 const matchNombre = !termino || p.nombre.toLowerCase().includes(termino);
                 const matchUbic = !ubicacion || p.ubicacion.toLowerCase().includes(ubicacion);
                 const matchCat = !categoria || p.categoria === categoria;
                 return matchNombre && matchUbic && matchCat;
             });
             // Renderizamos manualmente usando la función de script_new pero pasando datos filtrados si fuera posible
             // Como mostrarProductos en script_new usa la variable global, modificamos la llamada:
             mostrarProductos(null, productosFiltrados); // Necesitarás adaptar script_new para recibir param opcional
        }
    });

    // Acciones del Carrito y Modales
    document.getElementById('close-cart').addEventListener('click', closeCartModal);
    
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if(addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const qty = Number(document.getElementById('cart-quantity').value) || 1;
            const unit = document.getElementById('cart-unit').value;
            if (selectedProductId) addToCart(selectedProductId, qty, unit);
        });
    }

    document.getElementById('clear-cart').addEventListener('click', function() {
        if (confirm('¿Limpiar lista?')) {
            cart = [];
            saveCart();
            renderCart();
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', procesarCompra);
    document.getElementById('generate-invoice-btn').addEventListener('click', generarFactura);

    // Login y Registro Modales
    document.getElementById('register-btn').addEventListener('click', () => mostrarModal('register-modal'));
    document.getElementById('login-btn').addEventListener('click', () => mostrarModal('login-modal'));
    document.getElementById('close-register').addEventListener('click', () => ocultarModal('register-modal'));
    document.getElementById('close-login').addEventListener('click', () => ocultarModal('login-modal'));
    document.getElementById('cancel-register').addEventListener('click', () => ocultarModal('register-modal'));
    document.getElementById('cancel-login').addEventListener('click', () => ocultarModal('login-modal'));

    // Forms Login/Registro
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser = { name: "Usuario Demo", email: document.getElementById('login-email').value, rating: 4.5 };
        saveUser();
        updateUserInfo();
        ocultarModal('login-modal');
        alert("Bienvenido " + currentUser.name);
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if(document.getElementById('register-password').value !== document.getElementById('register-confirm').value) {
            alert("Contraseñas no coinciden"); return;
        }
        currentUser = { name: document.getElementById('register-name').value, email: document.getElementById('register-email').value, rating: 0 };
        saveUser();
        updateUserInfo();
        ocultarModal('register-modal');
        alert("Cuenta creada");
    });

    // Formulario Transportista
    document.getElementById('transporter-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newTransporter = {
            id: Date.now(),
            name: document.getElementById('transporter-name').value,
            phone: document.getElementById('transporter-phone').value,
            vehicle: document.getElementById('transporter-vehicle').value,
            capacity: document.getElementById('transporter-capacity').value,
            zones: Array.from(document.getElementById('transporter-zones').selectedOptions).map(opt => opt.value)
        };
        transportistas.push(newTransporter);
        saveTransportistas();
        alert('Transportista registrado');
    });
    
    // UI: Toggle detalles de pago
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(d => d.style.display = 'none');
            const details = document.querySelector(`.${this.value}-details`);
            if (details) details.style.display = 'block';
        });
    });

    // UI: Toggle detalles entrega
    document.querySelectorAll('input[name="delivery-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const transportDiv = document.querySelector('.transport-details');
            if(transportDiv) transportDiv.style.display = (this.value === 'transport') ? 'block' : 'none';
        });
    });
});