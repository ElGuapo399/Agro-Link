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
    
    // Dentro del array 'productos', agregar nuevos objetos:
{
    id: 4,  // Siguiente número disponible
    nombre: "Maíz Blanco",
    categoria: "granos",
    agricultor: "Carlos Rodríguez",
    ubicacion: "Xicoténcatl",
    precios: {
        kg: 15,
        caja: 180,
        saco: 120,
        pieza: 1,
        tonelada: 15000
    },
    descripcion: "Maíz blanco recién cosechado, ideal para tortillas.",
    imagen: "Maiz.jpg"
},
{
    id: 5,
    nombre: "Limón Persa",
    categoria: "frutas", 
    agricultor: "Ana Martínez",
    ubicacion: "Gómez Farías",
    precios: {
        kg: 30,
        caja: 400,
        saco: 250,
        pieza: 3,
        tonelada: 30000
    },
    descripcion: "Limón persa jugoso y aromático.",
    imagen: "Limon.jpg"
},
];

// CONSTANTES GLOBALES
const UNIDADES_TEXTO = {
    kg: 'Kilogramo',
    caja: 'Caja',
    saco: 'Saco/Costal',
    pieza: 'Pieza',
    tonelada: 'Tonelada',
    g: 'Gramo',
    lb: 'Libra'
};

const TIPOS_VEHICULO = {
    camioneta: 'Camioneta',
    camion: 'Camión',
    motocicleta: 'Motocicleta',
    van: 'Van'
};

// ESTADO GLOBAL
let cart = JSON.parse(localStorage.getItem('agrolink_cart') || '[]');
let selectedProductId = null;
let currentUser = JSON.parse(localStorage.getItem('agrolink_user') || 'null');
let currentProducer = null;
let currentTransporter = null;
let transportistas = JSON.parse(localStorage.getItem('agrolink_transportistas') || '[]');
let pedidos = JSON.parse(localStorage.getItem('agrolink_pedidos') || '[]');

// FUNCIONES DE GESTIÓN DE USUARIO
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
        if (userRating) {
            userRating.innerHTML = '★'.repeat(Math.floor(currentUser.rating || 0)) + 
                                 '☆'.repeat(5 - Math.floor(currentUser.rating || 0));
        }
    } else {
        userInfo.style.display = 'none';
    }
}

// FUNCIONES DE GESTIÓN DE CARRITO
function saveCart() {
    localStorage.setItem('agrolink_cart', JSON.stringify(cart));
}

function openCartModal(productId, selectedUnit = 'kg') {
    selectedProductId = productId;
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
   
    document.getElementById('cart-quantity').value = 1;
    const unitSelect = document.getElementById('cart-unit');
    if (unitSelect) {
        unitSelect.innerHTML = '';
       
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
   
    // Cargar transportistas disponibles
    cargarTransportistas();
   
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
            precio: precioPorUnidad,
            cantidad: Number(cantidad),
            unidad: unidad,
            agricultor: producto.agricultor
        });
    }
    saveCart();
    renderCart();
    updateCartCount();
    closeCartModal();
}

function removeFromCart(productId, unit) {
    cart = cart.filter(item => !(item.id === productId && item.unidad === unit));
    saveCart();
    renderCart();
}

function updateCartItem(productId, cantidad, unit) {
    const item = cart.find(i => i.id === productId && i.unidad === unit);
    if (!item) return;
    
    const producto = productos.find(p => p.id === productId);
    if (producto && producto.precios[unit] !== undefined) {
        item.precio = producto.precios[unit];
    }
    
    item.cantidad = Number(cantidad) || 1;
    saveCart();
    renderCart();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + Number(item.cantidad), 0);
        cartCount.textContent = totalItems;
    }
}

function calcularTotal(item) {
    const producto = productos.find(p => p.id === item.id);
    if (!producto || !producto.precios) return 0;
    
    const precioPorUnidad = producto.precios[item.unidad];
    if (precioPorUnidad === undefined) return 0;
    
    return precioPorUnidad * item.cantidad;
}

function renderCart() {
    const container = document.getElementById('cart-contents');
    if (!container) return;
    container.innerHTML = '';
   
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>No hay artículos en tu lista.</p>
            </div>`;
        updateCartCount();
        document.getElementById('cart-total-amount').textContent = '$0.00';
        return;
    }

    let total = 0;
    const sortedCart = [...cart].sort((a, b) => a.nombre.localeCompare(b.nombre));

    sortedCart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        const subtotal = calcularTotal(item);
        total += subtotal;
       
        row.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-main">
                    <div class="cart-item-name">${item.nombre}</div>
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

    // Event listeners para controles del carrito
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
}

// FUNCIONES DE TRANSPORTISTAS
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
    
    // Event listener para mostrar info del transportista seleccionado
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
        } else {
            infoContainer.innerHTML = '';
        }
    });
}

function saveTransportistas() {
    localStorage.setItem('agrolink_transportistas', JSON.stringify(transportistas));
}

// FUNCIONES DE PEDIDOS
function crearPedido() {
    if (cart.length === 0) {
        alert('No hay productos en el carrito');
        return;
    }
    
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const selectedTransporter = document.getElementById('transporter-select').value;
    
    const pedido = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        productos: [...cart],
        total: cart.reduce((sum, item) => sum + calcularTotal(item), 0),
        metodoEntrega: deliveryMethod,
        transportistaId: deliveryMethod === 'transport' ? selectedTransporter : null,
        estado: 'pendiente',
        comprador: currentUser ? currentUser.name : 'Cliente no registrado'
    };
    
    pedidos.push(pedido);
    localStorage.setItem('agrolink_pedidos', JSON.stringify(pedidos));
    
    // Limpiar carrito
    cart = [];
    saveCart();
    renderCart();
    
    alert('¡Pedido creado exitosamente!');
    closeCartModal();
}

// FUNCIONES DE FACTURACIÓN (actualizadas)
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
                    <input type="text" id="cliente-nombre" placeholder="Nombre completo" required>
                    <input type="text" id="cliente-rfc" placeholder="RFC" required>
                    <input type="text" id="cliente-direccion" placeholder="Dirección fiscal" required>
                    <input type="email" id="cliente-email" placeholder="Email para envío" required>
                </div>
            </div>

            <div class="factura-detalles">
                <h3>Detalles de la Compra</h3>
                <table class="factura-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    cart.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        const precioUnitario = producto.precios[item.unidad];
        const subtotalItem = precioUnitario * item.cantidad;
        subtotal += subtotalItem;

        facturaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${UNIDADES_TEXTO[item.unidad]}</td>
                <td>$${precioUnitario.toFixed(2)}</td>
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
                    <div class="total-line">
                        <span>Subtotal:</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="total-line">
                        <span>IVA (16%):</span>
                        <span>$${ivaMonto.toFixed(2)}</span>
                    </div>
                    <div class="total-line total-final">
                        <span><strong>Total:</strong></span>
                        <span><strong>$${total.toFixed(2)}</strong></span>
                    </div>
                </div>
            </div>

            <div class="factura-actions">
                <button class="btn btn-outline" onclick="cerrarFactura()">Cancelar</button>
                <button class="btn btn-primary" onclick="descargarFactura()">Descargar Factura PDF</button>
                <button class="btn btn-success" onclick="enviarFacturaEmail()">Enviar por Email</button>
            </div>
        </div>
    `;

    mostrarFacturaModal(facturaHTML);
}

function mostrarFacturaModal(contenido) {
    const facturaModal = document.getElementById('factura-modal');
    if (!facturaModal) return;
    
    document.getElementById('factura-content').innerHTML = contenido;
    facturaModal.style.display = 'flex';
}

function cerrarFactura() {
    ocultarModal('factura-modal');
}

function descargarFactura() {
    const nombre = document.getElementById('cliente-nombre').value;
    const rfc = document.getElementById('cliente-rfc').value;
    
    if (!nombre || !rfc) {
        alert('Por favor complete todos los datos del cliente');
        return;
    }

    alert('Factura generada correctamente. En una implementación real se descargaría el PDF.');
    cerrarFactura();
}

function enviarFacturaEmail() {
    const email = document.getElementById('cliente-email').value;
    
    if (!email) {
        alert('Por favor ingrese un email para enviar la factura');
        return;
    }

    alert(`Factura enviada correctamente a: ${email}`);
    cerrarFactura();
}

// FUNCIONES DE CALIFICACIÓN
function abrirModalCalificacion() {
    mostrarModal('rating-modal');
}

function cerrarModalCalificacion() {
    ocultarModal('rating-modal');
}

// FUNCIONES DE NAVEGACIÓN Y UI
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
   
    document.getElementById(seccionId).classList.remove('hidden');
   
    document.querySelectorAll('nav a, .hero-buttons button, .header-actions button[data-section]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === seccionId) {
            link.classList.add('active');
        }
    });
   
    if (seccionId === 'search') {
        mostrarProductos();
    }
}

function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function ocultarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// FUNCIONES DE PRODUCTOS
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
        const productCard = document.createElement('article');
        productCard.className = 'product-card';

        const preciosHTML = Object.entries(producto.precios).map(([unidad, precio]) => `
            <option value="${unidad}">${UNIDADES_TEXTO[unidad]} - $${precio.toFixed(2)}</option>
        `).join('');

        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${producto.imagen}');" role="img" aria-label="${producto.nombre}"></div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <div class="product-meta">
                    <span>Agricultor: ${producto.agricultor}</span>
                    <span>${producto.ubicacion}</span>
                </div>
                <div class="price-selector">
                    <label for="unit-${producto.id}">Selecciona presentación:</label>
                    <select id="unit-${producto.id}" class="unit-selector" data-product-id="${producto.id}">
                        ${preciosHTML}
                    </select>
                </div>
                <p>${producto.descripcion}</p>
                <button class="btn btn-primary contact-btn" data-id="${producto.id}">
                    <i class="fas fa-shopping-cart"></i> Agregar al carrito
                </button>
            </div>
        `;

        container.appendChild(productCard);

        const contactBtn = productCard.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                const id = Number(this.getAttribute('data-id'));
                const selectedUnit = productCard.querySelector('.unit-selector').value;
                openCartModal(id, selectedUnit);
            });
        }
    });
}

// EVENT LISTENERS PRINCIPALES
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización
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

    // Categorías
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            mostrarProductos(this.getAttribute('data-category'));
        });
    });

    // Búsqueda
    document.getElementById('search-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const termino = document.getElementById('product-search').value.toLowerCase();
        const ubicacion = document.getElementById('location').value;
        const categoria = document.getElementById('category').value;
       
        const productosFiltrados = productos.filter(producto => {
            const coincideNombre = !termino || producto.nombre.toLowerCase().includes(termino);
            const coincideUbicacion = !ubicacion || producto.ubicacion.toLowerCase().includes(ubicacion);
            const coincideCategoria = !categoria || producto.categoria === categoria;
           
            return coincideNombre && coincideUbicacion && coincideCategoria;
        });
       
        const container = document.getElementById('products-container');
        container.innerHTML = '';
       
        if (productosFiltrados.length === 0) {
            container.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron productos</h3>
                    <p>Intenta con otros criterios de búsqueda.</p>
                </div>
            `;
        } else {
            productosFiltrados.forEach(producto => {
                const productCard = document.createElement('article');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image" style="background-image: url('${producto.imagen}');"></div>
                    <div class="product-info">
                        <h3>${producto.nombre}</h3>
                        <div class="product-meta">
                            <span>Agricultor: ${producto.agricultor}</span>
                            <span>${producto.ubicacion}</span>
                        </div>
                        <p>${producto.descripcion}</p>
                        <button class="btn btn-primary contact-btn" data-id="${producto.id}">
                            <i class="fas fa-shopping-cart"></i> Agregar al carrito
                        </button>
                    </div>
                `;
                container.appendChild(productCard);
                
                const contactBtn = productCard.querySelector('.contact-btn');
                if (contactBtn) contactBtn.addEventListener('click', function() {
                    const id = Number(this.getAttribute('data-id'));
                    openCartModal(id);
                });
            });
        }
    });

    // Carrito y modales
    document.getElementById('header-cart-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
        } else {
            mostrarModal('cart-modal');
        }
    });

    document.getElementById('close-cart').addEventListener('click', closeCartModal);
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const qty = Number(document.getElementById('cart-quantity').value) || 1;
        const unit = document.getElementById('cart-unit').value;
        if (selectedProductId) addToCart(selectedProductId, qty, unit);
    });

    document.getElementById('clear-cart').addEventListener('click', function() {
        if (confirm('¿Deseas limpiar tu lista de compra?')) {
            cart = [];
            saveCart();
            renderCart();
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', crearPedido);
    document.getElementById('generate-invoice-btn').addEventListener('click', generarFactura);

    // Formularios de productor
    document.getElementById('producer-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        currentProducer = {
            name: document.getElementById('producer-name').value,
            email: document.getElementById('producer-email').value,
            phone: document.getElementById('producer-phone').value,
            location: document.getElementById('producer-location').value,
            address: document.getElementById('producer-address').value
        };
        alert('Información del productor guardada exitosamente.');
    });

    // Formularios de transportista
    document.getElementById('transporter-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const newTransporter = {
            id: Date.now(),
            name: document.getElementById('transporter-name').value,
            email: document.getElementById('transporter-email').value,
            phone: document.getElementById('transporter-phone').value,
            vehicle: document.getElementById('transporter-vehicle').value,
            capacity: document.getElementById('transporter-capacity').value,
            zones: Array.from(document.getElementById('transporter-zones').selectedOptions).map(opt => opt.value)
        };
        
        transportistas.push(newTransporter);
        saveTransportistas();
        alert('Información del transportista guardada exitosamente.');
    });

    // Autenticación
    document.getElementById('register-btn').addEventListener('click', () => mostrarModal('register-modal'));
    document.getElementById('login-btn').addEventListener('click', () => mostrarModal('login-modal'));
    
    document.getElementById('close-register').addEventListener('click', () => ocultarModal('register-modal'));
    document.getElementById('close-login').addEventListener('click', () => ocultarModal('login-modal'));
    document.getElementById('cancel-register').addEventListener('click', () => ocultarModal('register-modal'));
    document.getElementById('cancel-login').addEventListener('click', () => ocultarModal('login-modal'));

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
       
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
       
        currentUser = {
            name: document.getElementById('register-name').value,
            email: document.getElementById('register-email').value,
            type: document.getElementById('user-type').value,
            rating: 0
        };
        
        saveUser();
        updateUserInfo();
        alert('¡Registro exitoso!');
        ocultarModal('register-modal');
    });

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulación de login - en una app real verificarías credenciales
        currentUser = {
            name: "Usuario Demo",
            email: document.getElementById('login-email').value,
            type: "comprador",
            rating: 4.5
        };
        
        saveUser();
        updateUserInfo();
        alert('Inicio de sesión exitoso.');
        ocultarModal('login-modal');
    });

    // Métodos de pago
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            const details = document.querySelector(`.${this.value}-details`);
            if (details) details.style.display = 'block';
        });
    });

    // Métodos de entrega
    document.querySelectorAll('input[name="delivery-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const transportDetails = document.querySelector('.transport-details');
            if (this.value === 'transport') {
                transportDetails.style.display = 'block';
                cargarTransportistas();
            } else {
                transportDetails.style.display = 'none';
            }
        });
    });
});