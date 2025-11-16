// script.js - VERSIÓN MEJORADA CON SISTEMA DE CALIFICACIONES Y COMPRAS

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
        imagen: "Tomate.jpg",
        calificacion: 4.5,
        reseñas: 12
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
        imagen: "Aguacate.jpeg",
        calificacion: 4.8,
        reseñas: 8
    },
    // AQUÍ PUEDES AGREGAR MÁS PRODUCTOS CON CALIFICACIONES
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
        imagen: "Cebolla.jpg",
        calificacion: 4.3,
        reseñas: 6
    },
    {
        id: 4,
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
        imagen: "Maiz.jpg",
        calificacion: 4.2,
        reseñas: 8
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
        imagen: "Limon.jpg",
        calificacion: 4.7,
        reseñas: 15
    }
];

// ... (el resto del código de script_new.js se mantiene igual)

// CONSTANTES GLOBALES MEJORADAS
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

// ESTADO GLOBAL MEJORADO
let cart = JSON.parse(localStorage.getItem('agrolink_cart') || '[]');
let selectedProductId = null;
let currentUser = JSON.parse(localStorage.getItem('agrolink_user') || 'null');
let currentProducer = null;
let currentTransporter = null;
let transportistas = JSON.parse(localStorage.getItem('agrolink_transportistas') || '[]');
let pedidos = JSON.parse(localStorage.getItem('agrolink_pedidos') || '[]');
let calificaciones = JSON.parse(localStorage.getItem('agrolink_calificaciones') || '[]');

// SISTEMA MEJORADO DE PRODUCTOS (basado en script_new.js)
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
       
        // Generar opciones de precio para cada unidad (sistema mejorado)
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

        // Sistema de estrellas para calificación
        const estrellasHTML = generarEstrellas(producto.calificacion);
 
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${producto.imagen}');" 
                 role="img" aria-label="${producto.nombre}">
                <div class="product-badge">${producto.categoria}</div>
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                
                <div class="product-rating">
                    ${estrellasHTML}
                    <span class="rating-text">${producto.calificacion} (${producto.reseñas} reseñas)</span>
                </div>
                
                <div class="product-meta">
                    <span><i class="fas fa-user"></i> ${producto.agricultor}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${producto.ubicacion}</span>
                </div>
                
                <div class="price-selector" data-product-id="${producto.id}">
                    <h4>Selecciona presentación:</h4>
                    <div class="price-options">
                        ${preciosHTML}
                    </div>
                </div>
                
                <p class="product-description">${producto.descripcion}</p>
                
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" data-id="${producto.id}">
                        <i class="fas fa-shopping-cart"></i> Agregar al carrito
                    </button>
                    <button class="btn btn-outline view-details-btn" data-id="${producto.id}">
                        <i class="fas fa-info-circle"></i> Detalles
                    </button>
                </div>
            </div>
        `;
 
        // Event listeners para los radio buttons de unidades
        const priceSelector = card.querySelector('.price-selector');
        priceSelector.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                // Actualizar visualización del precio seleccionado
                const selectedPrice = producto.precios[e.target.value];
                const unitName = UNIDADES_TEXTO[e.target.value];
                // Podemos mostrar feedback visual si es necesario
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

        // Event listener para ver detalles
        const detailsButton = card.querySelector('.view-details-btn');
        detailsButton.addEventListener('click', () => {
            const productId = parseInt(detailsButton.dataset.id);
            mostrarDetallesProducto(productId);
        });
 
        container.appendChild(card);
    });
}

// SISTEMA DE CALIFICACIONES MEJORADO
function generarEstrellas(calificacion) {
    const estrellasLlenas = Math.floor(calificacion);
    const mediaEstrella = calificacion % 1 >= 0.5;
    const estrellasVacias = 5 - estrellasLlenas - (mediaEstrella ? 1 : 0);
    
    return '★'.repeat(estrellasLlenas) + 
           (mediaEstrella ? '½' : '') + 
           '☆'.repeat(estrellasVacias);
}

function calificarProducto(productoId, calificacion, comentario = '') {
    const calificacionObj = {
        id: Date.now(),
        productoId: productoId,
        usuarioId: currentUser ? currentUser.id : 'anonimo',
        calificacion: calificacion,
        comentario: comentario,
        fecha: new Date().toISOString()
    };
    
    calificaciones.push(calificacionObj);
    localStorage.setItem('agrolink_calificaciones', JSON.stringify(calificaciones));
    
    // Actualizar calificación promedio del producto
    actualizarCalificacionProducto(productoId);
    
    return calificacionObj;
}

function actualizarCalificacionProducto(productoId) {
    const calificacionesProducto = calificaciones.filter(c => c.productoId === productoId);
    
    if (calificacionesProducto.length > 0) {
        const promedio = calificacionesProducto.reduce((sum, c) => sum + c.calificacion, 0) / calificacionesProducto.length;
        const producto = productos.find(p => p.id === productoId);
        
        if (producto) {
            producto.calificacion = Math.round(promedio * 10) / 10; // Redondear a 1 decimal
            producto.reseñas = calificacionesProducto.length;
        }
    }
}

function mostrarDetallesProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    const modal = document.getElementById('product-details-modal') || crearModalDetalles();
    const contenido = `
        <div class="product-details">
            <div class="product-details-header">
                <div class="product-details-image" style="background-image: url('${producto.imagen}')"></div>
                <div class="product-details-info">
                    <h2>${producto.nombre}</h2>
                    <div class="product-rating large">
                        ${generarEstrellas(producto.calificacion)}
                        <span>${producto.calificacion} (${producto.reseñas} reseñas)</span>
                    </div>
                    <div class="product-meta">
                        <p><strong>Agricultor:</strong> ${producto.agricultor}</p>
                        <p><strong>Ubicación:</strong> ${producto.ubicacion}</p>
                        <p><strong>Categoría:</strong> ${producto.categoria}</p>
                    </div>
                </div>
            </div>
            
            <div class="product-details-content">
                <h3>Descripción</h3>
                <p>${producto.descripcion}</p>
                
                <h3>Precios disponibles</h3>
                <div class="price-list">
                    ${Object.entries(producto.precios).map(([unidad, precio]) => `
                        <div class="price-item">
                            <span class="unit">${UNIDADES_TEXTO[unidad]}:</span>
                            <span class="price">$${precio.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <h3>Reseñas</h3>
                <div class="reviews-section">
                    ${generarListaReseñas(productoId)}
                </div>
                
                ${currentUser ? `
                <div class="add-review-section">
                    <h4>Agregar tu reseña</h4>
                    <div class="rating-input">
                        <span>Calificación:</span>
                        <div class="star-rating" data-product-id="${productoId}">
                            ${[1,2,3,4,5].map(i => `<i class="far fa-star" data-rating="${i}"></i>`).join('')}
                        </div>
                    </div>
                    <textarea id="review-comment-${productoId}" placeholder="Comparte tu experiencia con este producto..." class="review-textarea"></textarea>
                    <button class="btn btn-primary submit-review" data-product-id="${productoId}">
                        Enviar Reseña
                    </button>
                </div>
                ` : '<p>Inicia sesión para agregar una reseña</p>'}
            </div>
        </div>
    `;
    
    document.getElementById('product-details-content').innerHTML = contenido;
    modal.style.display = 'flex';
    
    // Configurar event listeners para las estrellas
    configurarRatingEstrellas();
}

function crearModalDetalles() {
    const modal = document.createElement('div');
    modal.id = 'product-details-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content product-details-modal-content">
            <div class="modal-header">
                <h2>Detalles del Producto</h2>
                <button class="close-btn" onclick="cerrarModalDetalles()">&times;</button>
            </div>
            <div class="modal-body" id="product-details-content">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function cerrarModalDetalles() {
    const modal = document.getElementById('product-details-modal');
    if (modal) modal.style.display = 'none';
}

function configurarRatingEstrellas() {
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            const container = this.parentElement;
            container.querySelectorAll('i').forEach((s, index) => {
                if (index < rating) {
                    s.className = 'fas fa-star';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            const productId = parseInt(this.parentElement.dataset.productId);
            const comentario = document.getElementById(`review-comment-${productId}`).value;
            
            calificarProducto(productId, rating, comentario);
            alert('¡Gracias por tu calificación!');
            cerrarModalDetalles();
            mostrarDetallesProducto(productId); // Recargar para mostrar la nueva reseña
        });
    });
}

function generarListaReseñas(productoId) {
    const reseñasProducto = calificaciones.filter(c => c.productoId === productoId);
    
    if (reseñasProducto.length === 0) {
        return '<p>No hay reseñas aún. ¡Sé el primero en opinar!</p>';
    }
    
    return reseñasProducto.map(reseña => `
        <div class="review-item">
            <div class="review-header">
                <div class="review-rating">${generarEstrellas(reseña.calificacion)}</div>
                <div class="review-date">${new Date(reseña.fecha).toLocaleDateString('es-MX')}</div>
            </div>
            ${reseña.comentario ? `<p class="review-comment">"${reseña.comentario}"</p>` : ''}
        </div>
    `).join('');
}

// SISTEMA DE COMPRAS MEJORADO
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
    
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (!paymentMethod) {
        alert('Por favor selecciona un método de pago');
        return;
    }
    
    if (deliveryMethod === 'transport') {
        const selectedTransporter = document.getElementById('transporter-select').value;
        if (!selectedTransporter) {
            alert('Por favor selecciona un transportista');
            return;
        }
    }
    
    // Crear pedido
    const pedido = {
        id: 'PED-' + Date.now().toString().slice(-6),
        fecha: new Date().toISOString(),
        productos: [...cart],
        total: calcularTotalCarrito(),
        metodoPago: paymentMethod.value,
        metodoEntrega: deliveryMethod,
        transportistaId: deliveryMethod === 'transport' ? document.getElementById('transporter-select').value : null,
        estado: 'confirmado',
        comprador: currentUser,
        vendedores: [...new Set(cart.map(item => {
            const producto = productos.find(p => p.id === item.id);
            return producto.agricultor;
        }))]
    };
    
    pedidos.push(pedido);
    localStorage.setItem('agrolink_pedidos', JSON.stringify(pedidos));
    
    // Mostrar confirmación
    mostrarConfirmacionCompra(pedido);
    
    // Limpiar carrito
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
}

function calcularTotalCarrito() {
    return cart.reduce((total, item) => {
        const producto = productos.find(p => p.id === item.id);
        return total + (producto.precios[item.unidad] * item.cantidad);
    }, 0);
}

function mostrarConfirmacionCompra(pedido) {
    const modal = document.getElementById('order-confirmation-modal') || crearModalConfirmacion();
    
    const contenido = `
        <div class="order-confirmation">
            <div class="confirmation-header">
                <i class="fas fa-check-circle success-icon"></i>
                <h2>¡Compra Exitosa!</h2>
            </div>
            
            <div class="order-details">
                <p><strong>Número de pedido:</strong> ${pedido.id}</p>
                <p><strong>Fecha:</strong> ${new Date(pedido.fecha).toLocaleDateString('es-MX')}</p>
                <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
                <p><strong>Método de entrega:</strong> ${pedido.metodoEntrega === 'pickup' ? 'Recoger en punto de venta' : 'Entrega a domicilio'}</p>
            </div>
            
            <div class="order-products">
                <h3>Productos comprados:</h3>
                <ul>
                    ${pedido.productos.map(item => `
                        <li>${item.cantidad} ${UNIDADES_TEXTO[item.unidad]} de ${item.nombre}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="generarFacturaDesdePedido('${pedido.id}')">
                    <i class="fas fa-file-invoice"></i> Generar Factura
                </button>
                <button class="btn btn-outline" onclick="cerrarModalConfirmacion()">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('order-confirmation-content').innerHTML = contenido;
    modal.style.display = 'flex';
}

function crearModalConfirmacion() {
    const modal = document.createElement('div');
    modal.id = 'order-confirmation-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content confirmation-modal-content">
            <div class="modal-body" id="order-confirmation-content">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function cerrarModalConfirmacion() {
    const modal = document.getElementById('order-confirmation-modal');
    if (modal) modal.style.display = 'none';
}

function generarFacturaDesdePedido(pedidoId) {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) return;
    
    // Aquí iría la lógica para generar factura específica del pedido
    generarFactura();
    cerrarModalConfirmacion();
}

// FUNCIONES EXISTENTES ACTUALIZADAS (mantener las anteriores pero actualizar event listeners)
document.addEventListener('DOMContentLoaded', function() {
    // ... (código de inicialización existente)
    
    // Actualizar event listener del botón de compra
    document.getElementById('checkout-btn').addEventListener('click', procesarCompra);
    
    // Inicializar sistema de calificaciones
    inicializarSistemaCalificaciones();
});

function inicializarSistemaCalificaciones() {
    // Cargar calificaciones existentes y actualizar productos
    productos.forEach(producto => {
        actualizarCalificacionProducto(producto.id);
    });
}

// Mantener todas las otras funciones existentes (gestión de usuarios, transportistas, etc.)
// ... (el resto del código anterior se mantiene)