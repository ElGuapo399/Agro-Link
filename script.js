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
        precio: "$25/kg", // Mantener para compatibilidad
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
        precio: "$80/kg", // Mantener para compatibilidad
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
        precio: "$23/kg", // Mantener para compatibilidad
        descripcion: "Cebolla blanca recién cosechada, disponible en grandes cantidades.",
        imagen: "Cebolla.jpg"
    },
    {
        id: 4,
        nombre: "Chile Serrano",
        categoria: "verduras",
        agricultor: "Ana Rodríguez",
        ubicacion: "Matamoros",
        precios: {
            kg: 35,
            caja: 700,
            saco: 450,
            pieza: 0.8,
            tonelada: 35000
        },
        precio: "$35/kg", // Mantener para compatibilidad
        descripcion: "Chile serrano fresco, ideal para salsas y guisos.",
        imagen: "Chile.jpg"
    },
    {
        id: 5,
        nombre: "Naranja Navel",
        categoria: "frutas",
        agricultor: "Carlos Mendoza",
        ubicacion: "Tampico",
        precios: {
            kg: 18,
            caja: 250,
            saco: 150,
            pieza: 1.2,
            tonelada: 18000
        },
        precio: "$18/kg", // Mantener para compatibilidad
        descripcion: "Naranjas dulces y jugosas, recién cosechadas.",
        imagen: "Naranja.jpg"
    },
    {
        id: 6,
        nombre: "Limón Italiano",
        categoria: "frutas",
        agricultor: "Roberto Sánchez",
        ubicacion: "Reynosa",
        precios: {
            kg: 15,
            caja: 300,
            saco: 750,
            pieza: 1,
            tonelada: 15000
        },
        precio: "$15/kg", // Mantener para compatibilidad
        descripcion: "Limón persa recién cosechado, ideal para bebidas y cocina.",
        imagen: "Limon.jpeg"
    },
    {
        id: 7,
        nombre: "Mango",
        categoria: "frutas",
        agricultor: "Fernando López",
        ubicacion: "Gomez Farias",
        precios: {
            kg: 45,
            caja: 900,
            saco: 600,
            pieza: 5,
            tonelada: 45000
        },
        precio: "$45/kg", // Mantener para compatibilidad
        descripcion: "Mango ataulfo dulce y jugoso, cosechado en su punto óptimo de maduración.",
        imagen: "Mango.jpg"
    },
    {
        id: 8,
        nombre: "Cebolla Amarilla",
        categoria: "verduras",
        agricultor: "Miguel Ángel Ruiz",
        ubicacion: "Padilla",
        precios: {
            kg: 28,
            caja: 420,
            saco: 250,
            pieza: 1.8,
            tonelada: 28000
        },
        precio: "$28/kg", // Mantener para compatibilidad
        descripcion: "Cebolla amarilla de sabor suave, ideal para guisos y ensaladas.",
        imagen: "Cebolla-amarilla.jpg"
    },
    {
        id: 9,
        nombre: "Nopal",
        categoria: "verduras",
        agricultor: "Sofia Hernández",
        ubicacion: "Jaumave",
        precios: {
            kg: 18,
            caja: 220,
            saco: 140,
            pieza: 2.5,
            tonelada: 18000
        },
        precio: "$18/kg", // Mantener para compatibilidad
        descripcion: "Nopal fresco sin espinas, listo para cocinar. Rico en fibra y nutrientes.",
        imagen: "Nopal.jpg"
    },
    {
        id: 10,
        nombre: "Sandía",
        categoria: "frutas",
        agricultor: "Ricardo Torres",
        ubicacion: "Soto la Marina",
        precios: {
            kg: 12,
            caja: 180,
            saco: 100,
            pieza: 15,
            tonelada: 12000
        },
        precio: "$12/kg", // Mantener para compatibilidad
        descripcion: "Sandía dulce y refrescante, perfecta para el clima cálido de Tamaulipas.",
        imagen: "Sandia.jpg"
    },
    {
        id: 11,
        nombre: "Calabacita",
        categoria: "verduras",
        agricultor: "Laura Martínez",
        ubicacion: "Xicoténcatl",
        precios: {
            kg: 22,
            caja: 350,
            saco: 200,
            pieza: 3,
            tonelada: 22000
        },
        precio: "$22/kg", // Mantener para compatibilidad
        descripcion: "Calabacita tierna recién cosechada, ideal para guisados y sopas.",
        imagen: "Calabacita.jpg"
    },
    {
        id: 12,
        nombre: "Pitahaya",
        categoria: "frutas",
        agricultor: "Javier Ramírez",
        ubicacion: "Jaumave",
        precios: {
            kg: 95,
            caja: 2000,
            saco: 1500,
            pieza: 18,
            tonelada: 95000
        },
        precio: "$95/kg", // Mantener para compatibilidad
        descripcion: "Pitahaya o fruta del dragón, exótica y nutritiva con alto contenido de antioxidantes.",
        imagen: "Pitahaya.jpg"
    },
    {
        id: 13,
        nombre: "Melón Cantaloupe",
        categoria: "frutas",
        agricultor: "Patricia Castro",
        ubicacion: "Altamira",
        precios: {
            kg: 30,
            caja: 450,
            saco: 300,
            pieza: 12,
            tonelada: 30000
        },
        precio: "$30/kg", // Mantener para compatibilidad
        descripcion: "Melón cantaloupe dulce y aromático, perfecto para postres y jugos.",
        imagen: "Melon.jpg"
    },
    {
        id: 14,
        nombre: "Papaya",
        categoria: "frutas",
        agricultor: "Oscar Díaz",
        ubicacion: "Ciudad Victoria",
        precios: {
            kg: 40,
            caja: 600,
            saco: 400,
            pieza: 8,
            tonelada: 40000
        },
        precio: "$40/kg", // Mantener para compatibilidad
        descripcion: "Rica Papaya.",
        imagen: "Papaya.jpg"
    },
    {
        id: 15,
        nombre: "Toronja",
        categoria: "frutas",
        agricultor: "Gabriela Morales",
        ubicacion: "Mante",
        precios: {
            kg: 20,
            caja: 280,
            saco: 180,
            pieza: 3,
            tonelada: 20000
        },
        precio: "$20/kg", // Mantener para compatibilidad
        descripcion: "Toronja fresca con balance perfecto entre dulce y ácido.",
        imagen: "Toronja.jpg"
    },
    {
        id: 16,
        nombre: "Zanahoria",
        categoria: "verduras",
        agricultor: "Raúl Vargas",
        ubicacion: "Casas",
        precios: {
            kg: 18,
            caja: 220,
            saco: 140,
            pieza: 1.5,
            tonelada: 18000
        },
        precio: "$18/kg", // Mantener para compatibilidad
        descripcion: "Zanahoria crujiente y dulce, cultivada en suelo fértil de Tamaulipas.",
        imagen: "Zanahoria.jpg"
    },
    {
        id: 17,
        nombre: "Guayaba",
        categoria: "frutas",
        agricultor: "Isabel Flores",
        ubicacion: "Ciudad Victoria",
        precios: {
            kg: 40,
            caja: 600,
            saco: 400,
            pieza: 4,
            tonelada: 40000
        },
        precio: "$40/kg", // Mantener para compatibilidad
        descripcion: "Guayaba aromática con alto contenido de vitamina C, ideal para dulces y jugos.",
        imagen: "Guayaba.jpg"
    },
    {
        id: 18,
        nombre: "Nuez",
        categoria: "verduras",
        agricultor: "Héctor Silva",
        ubicacion: "Jaumave",
        precios: {
            kg: 180,
            caja: 3600,
            saco: 2500,
            pieza: 5,
            tonelada: 180000
        },
        precio: "$180/kg", // Mantener para compatibilidad
        descripcion: "Nuez Cascara de Papel.",
        imagen: "Nuez.jpg"
    }
];
 
let currentProducer = null;
let producerProducts = [];
let cart = JSON.parse(localStorage.getItem('agrolink_cart') || '[]');
let selectedProductId = null;
 
function saveCart() {
    localStorage.setItem('agrolink_cart', JSON.stringify(cart));
}
 
function openCartModal(productId, selectedUnit = 'kg') {
    selectedProductId = productId;
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
   
    // Establecer valores iniciales
    document.getElementById('cart-quantity').value = 1;
    const unitSelect = document.getElementById('cart-unit');
    if (unitSelect) {
        // Limpiar opciones existentes
        unitSelect.innerHTML = '';
       
        // Crear nuevas opciones basadas en los precios disponibles
        Object.keys(producto.precios).forEach(unidad => {
            const option = document.createElement('option');
            option.value = unidad;
            option.textContent = {
                kg: 'Kilogramo (kg)',
                caja: 'Caja',
                saco: 'Saco/Costal',
                pieza: 'Pieza',
                tonelada: 'Tonelada'
            }[unidad] || unidad;
            if (unidad === selectedUnit) {
                option.selected = true;
            }
            unitSelect.appendChild(option);
        });
    }
   
    mostrarModal('cart-modal');
}
 
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = 'none';
        selectedProductId = null;
        const qtyInput = document.getElementById('cart-quantity');
        if (qtyInput) qtyInput.value = 1;
        const unitSelect = document.getElementById('cart-unit');
        if (unitSelect) unitSelect.value = 'kg';
    }
}
 
function addToCart(productId, cantidad, unidad) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;
    
    // Obtener el precio específico para la unidad seleccionada
    const precioPorUnidad = producto.precios[unidad];
    if (precioPorUnidad === undefined) return;
    
    const existing = cart.find(item => item.id === productId && item.unidad === unidad);
    if (existing) {
        existing.cantidad = Number(existing.cantidad) + Number(cantidad);
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: precioPorUnidad, // ← GUARDAR EL PRECIO CORRECTO
            cantidad: Number(cantidad),
            unidad: unidad
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
    
    // Actualizar el precio desde el producto original
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
 
function updateScrollIndicators() {
    const container = document.getElementById('cart-contents');
    const scrollUpIndicator = document.querySelector('.scroll-indicator.scroll-up');
    const scrollDownIndicator = document.querySelector('.scroll-indicator.scroll-down');
   
    if (container && scrollUpIndicator && scrollDownIndicator) {
        if (container.scrollTop > 20) {
            scrollUpIndicator.style.display = 'flex';
        } else {
            scrollUpIndicator.style.display = 'none';
        }
       
        if (container.scrollTop + container.clientHeight < container.scrollHeight - 20) {
            scrollDownIndicator.style.display = 'flex';
        } else {
            scrollDownIndicator.style.display = 'none';
        }
    }
}
 
function calcularTotal(item) {
    // Buscar el producto original para obtener el precio correcto por unidad
    const producto = productos.find(p => p.id === item.id);
    if (!producto || !producto.precios) {
        console.error('Producto no encontrado:', item.id);
        return 0;
    }
    
    // Obtener el precio específico para la unidad seleccionada
    const precioPorUnidad = producto.precios[item.unidad];
    if (precioPorUnidad === undefined) {
        console.error('Precio no encontrado para unidad:', item.unidad, 'en producto:', item.id);
        return 0;
    }
    
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
        const totalElement = document.getElementById('cart-total-amount');
        if (totalElement) {
            totalElement.textContent = '$0.00';
        }
        return;
    }
 
    let total = 0;
    const sortedCart = [...cart].sort((a, b) => a.nombre.localeCompare(b.nombre));
 
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'cart-items-list';
   
    sortedCart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.gap = '12px';
        const subtotal = calcularTotal(item);
        total += subtotal;
       
        row.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-main">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">
                        <span class="price">${item.precio}</span>
                        <span class="subtotal">Subtotal: $${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <input type="number"
                        min="1"
                        value="${item.cantidad}"
                        data-id="${item.id}"
                        data-unit="${item.unidad}"
                        class="cart-qty">
                    <span class="cart-unit">${item.unidad}</span>
                </div>
                <button class="remove-from-cart" data-id="${item.id}" data-unit="${item.unidad}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        container.appendChild(row);
        container.appendChild(row);
    });
    // AGREGAR estas funciones NUEVAS al script.js

function generarFactura() {
    if (cart.length === 0) {
        alert('No hay productos en el carrito para facturar');
        return;
    }

    const fecha = new Date().toLocaleDateString('es-MX');
    const numeroFactura = 'AGR-' + Date.now().toString().slice(-6);
    
    let total = 0;
    let subtotal = 0;
    const iva = 0.16; // 16% IVA en México

    // Crear contenido de la factura
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

    // Agregar productos a la factura
    cart.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        const precioUnitario = producto.precios[item.unidad];
        const subtotalItem = precioUnitario * item.cantidad;
        subtotal += subtotalItem;

        facturaHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${item.unidad}</td>
                <td>$${precioUnitario.toFixed(2)}</td>
                <td>$${subtotalItem.toFixed(2)}</td>
            </tr>
        `;
    });

    const ivaMonto = subtotal * iva;
    total = subtotal + ivaMonto;

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

    let facturaModal = document.getElementById('factura-modal');
    if (!facturaModal) {
        facturaModal = document.createElement('div');
        facturaModal.id = 'factura-modal';
        facturaModal.className = 'modal';
        facturaModal.innerHTML = `
            <div class="modal-content factura-modal-content">
                <div class="modal-header">
                    <h2>Generar Factura</h2>
                    <button class="close-btn" onclick="cerrarFactura()">&times;</button>
                </div>
                <div class="modal-body" id="factura-content">
                    ${contenido}
                </div>
            </div>
        `;
        document.body.appendChild(facturaModal);
    } else {
        document.getElementById('factura-content').innerHTML = contenido;
    }

    facturaModal.style.display = 'flex';
}

function cerrarFactura() {
    const facturaModal = document.getElementById('factura-modal');
    if (facturaModal) {
        facturaModal.style.display = 'none';
    }
}

function descargarFactura() {

    const nombre = document.getElementById('cliente-nombre').value;
    const rfc = document.getElementById('cliente-rfc').value;
    
    if (!nombre || !rfc) {
        alert('Por favor complete todos los datos del cliente');
        return;
    }

    alert('Factura generada correctamente. En una implementación real se descargaría el PDF.');
    
    const fecha = new Date().toLocaleDateString('es-MX');
    const blob = new Blob(['Factura generada el ' + fecha], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factura-agrolink-' + fecha + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
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
 
            const newTotal = cart.reduce((sum, item) => sum + calcularTotal(item), 0);
            const totalElement = document.getElementById('cart-total-amount');
            if (totalElement) {
                totalElement.textContent = `$${newTotal.toFixed(2)}`;
            }
        });
    });
 
    const totalElement = document.getElementById('cart-total-amount');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}
 
function mostrarProductos(categoria = "todas") {
    const container = document.getElementById('products-container');
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
 
        // Crear las opciones de precio para cada unidad
        const unidadesTexto = {
            kg: 'Kilogramo',
            caja: 'Caja',
            saco: 'Saco/Costal',
            pieza: 'Pieza',
            tonelada: 'Tonelada'
        };
 
        const preciosHTML = Object.entries(producto.precios || {}).map(([unidad, precio]) => {
            const unidadTexto = unidadesTexto[unidad] || unidad;
            return `<option value="${unidad}">$${precio.toFixed(2)} por ${unidadTexto}</option>`;
        }).join('');
 
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
 
        // Agregar event listener para el selector de unidades
        const unitSelector = productCard.querySelector('.unit-selector');
        if (unitSelector) {
            unitSelector.addEventListener('change', function() {
                const selectedUnit = this.value;
                const productId = Number(this.getAttribute('data-product-id'));
                // Actualizar el precio mostrado según la unidad seleccionada
                const price = producto.precios[selectedUnit];
                this.parentElement.querySelector('label').textContent =
                    `Presentación: $${price.toFixed(2)} por ${unidadesTexto[selectedUnit]}`;
            });
        }
 
        // Event listener para el botón de agregar al carrito
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
 
function mostrarSeccion(seccionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
   
    document.getElementById(seccionId).classList.remove('hidden');
   
    document.querySelectorAll('nav a').forEach(link => {
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
 
function mostrarMensajeExito() {
    const mensaje = document.getElementById('success-message');
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000);
}
 
document.addEventListener('DOMContentLoaded', function() {
    mostrarSeccion('home');
 
    updateCartCount();
 
    document.querySelector('.inicio-btn').addEventListener('click', function(e) {
        e.preventDefault();
        mostrarSeccion('home');
    });
 
    const headerCartBtn = document.getElementById('header-cart-btn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
            } else {
                mostrarModal('cart-modal');
            }
        });
    }
 
    const closeCartBtn = document.getElementById('close-cart');
    const cartModalElement = document.getElementById('cart-modal');
   
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeCartModal();
        });
    }
   
    if (cartModalElement) {
        cartModalElement.addEventListener('click', function(e) {
            if (e.target === cartModalElement) {
                closeCartModal();
            }
        });
 
        const cartModalContent = cartModalElement.querySelector('.modal-content');
        if (cartModalContent) {
            cartModalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    document.querySelectorAll('nav a, .auth-buttons button[data-section], [data-section]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.getAttribute('data-section');
            mostrarSeccion(seccion);
        });
    });
   
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
            });
           
            this.classList.add('active');
           
            const categoria = this.getAttribute('data-category');
            mostrarProductos(categoria);
        });
    });
 
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
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
                        <div class="product-image" style="background-image: url('${producto.imagen}');" role="img" aria-label="${producto.nombre}"></div>
                        <div class="product-info">
                            <h3>${producto.nombre}</h3>
                            <div class="product-meta">
                                <span>Agricultor: ${producto.agricultor}</span>
                                <span>${producto.ubicacion}</span>
                            </div>
                            <div class="product-price">${producto.precio}</div>
                            <p>${producto.descripcion}</p>
                            <button class="btn btn-primary contact-btn" data-id="${producto.id}" style="width: 100%; margin-top: 15px;">Contactar Productor</button>
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
    }
   
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
   
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();
       
        if (!currentProducer) {
            alert('Por favor, primero completa tu información como productor.');
            return;
        }
       
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: document.getElementById('product-name').value,
            categoria: document.getElementById('product-category').value,
            agricultor: currentProducer.name,
            ubicacion: currentProducer.location,
            precio: document.getElementById('product-price').value,
            descripcion: document.getElementById('product-description').value,
            imagen: "default-product.jpg"
        };
       
        productos.push(nuevoProducto);
        producerProducts.push(nuevoProducto);
       
        mostrarMensajeExito();
       
        document.getElementById('product-name').value = '';
        document.getElementById('product-category').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-unit').value = 'kg';
        document.getElementById('product-description').value = '';
    });
   
    document.getElementById('clear-product-form').addEventListener('click', function() {
        document.getElementById('product-name').value = '';
        document.getElementById('product-category').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-unit').value = 'kg';
        document.getElementById('product-description').value = '';
    });
   
    document.getElementById('register-btn').addEventListener('click', function() {
        mostrarModal('register-modal');
    });
   
    document.getElementById('login-btn').addEventListener('click', function() {
        mostrarModal('login-modal');
    });
   
    document.getElementById('close-register').addEventListener('click', function() {
        ocultarModal('register-modal');
    });
   
    document.getElementById('close-login').addEventListener('click', function() {
        ocultarModal('login-modal');
    });
   
    document.getElementById('cancel-register').addEventListener('click', function() {
        ocultarModal('register-modal');
    });
   
    document.getElementById('cancel-login').addEventListener('click', function() {
        ocultarModal('login-modal');
    });
   
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
       
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
       
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        ocultarModal('register-modal');
        document.getElementById('register-form').reset();
    });
   
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Inicio de sesión exitoso.');
        ocultarModal('login-modal');
        document.getElementById('login-form').reset();
    });
 
    const closeCart = document.getElementById('close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', closeCartModal);
    }
 
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
 
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) addToCartBtn.addEventListener('click', function() {
        const qtyInput = document.getElementById('cart-quantity');
        const unitSelect = document.getElementById('cart-unit');
        const qty = Number(qtyInput ? qtyInput.value : 1) || 1;
        const unit = unitSelect ? unitSelect.value : 'kg';
        if (selectedProductId) addToCart(selectedProductId, qty, unit);
    });
 
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) clearCartBtn.addEventListener('click', function() {
        if (confirm('¿Deseas limpiar tu lista de compra?')) {
            cart = [];
            saveCart();
            renderCart();
        }
    });
 
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
 
            const details = document.querySelector(`.${this.value}-details`);
            if (details) {
                details.style.display = 'block';
            }
        });
    });
 
    const generatePaymentBtn = document.getElementById('generate-payment');
    if (generatePaymentBtn) {
        generatePaymentBtn.addEventListener('click', function() {
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
            if (!selectedMethod) {
                alert('Por favor selecciona un método de pago');
                return;
            }
 
            const method = selectedMethod.value;
            let total = cart.reduce((sum, item) => {
                const price = parseFloat(item.precio.replace(/[^0-9.]/g, ''));
                return sum + (price * item.cantidad);
            }, 0);
 
            switch (method) {
                case 'card':
                    const cardNum = document.querySelector('.card-details input[placeholder="Número de Tarjeta"]').value;
                    const expiry = document.querySelector('.card-details input[placeholder="MM/AA"]').value;
                    const cvv = document.querySelector('.card-details input[placeholder="CVV"]').value;
                   
                    if (!cardNum || !expiry || !cvv) {
                        alert('Por favor completa todos los datos de la tarjeta');
                        return;
                    }
                    alert('Procesando pago con tarjeta...');
                    break;
                   
                case 'transfer':
                    alert(`Por favor realiza una transferencia por $${total.toFixed(2)} MXN a los datos bancarios mostrados`);
                    break;
                   
                case 'oxxo':
                    const barcode = Math.random().toString().slice(2, 18);
                    const barcodeDisplay = document.querySelector('#oxxo-barcode p:last-child');
                    if (barcodeDisplay) {
                        barcodeDisplay.textContent = barcode.match(/.{1,4}/g).join(' ');
                    }
                    alert('Código de pago OXXO generado. Válido por 24 horas.');
                    break;
            }
        });
    }
 
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) { alert('Tu lista está vacía.'); return; }
       
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedMethod) {
            alert('Por favor selecciona un método de pago');
            return;
        }
 
        const subject = 'Solicitud de compra - AgroLink';
        let body = 'Hola,\n\nMe interesa solicitar los siguientes productos:\n\n';
        cart.forEach(item => {
            body += `- ${item.cantidad} ${item.unidad} de ${item.nombre} (${item.precio})\n`;
        });
        body += '\nDatos del comprador:\nNombre:\nTeléfono:\nEmail:\n\nGracias.\n';
 
 
        const firstProduct = productos.find(p => p.id === cart[0].id);
        let producerEmail = '';
        if (firstProduct) {
            if (firstProduct.email) {
                producerEmail = firstProduct.email;
            } else if (firstProduct.agricultor) {
 
                const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/(^\.|\.$)/g, '');
                const localPart = normalize(firstProduct.agricultor) || 'productor';
                producerEmail = `${localPart}@agrolinktamaulipas.mx`;
            }
        }
 
        let mailto = '';
        if (producerEmail) {
            mailto = `mailto:${encodeURIComponent(producerEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
 
    window.location.href = mailto;
    cart = [];
    saveCart();
    renderCart();
    alert('Se abrió tu cliente de correo para enviar la solicitud. Revisa y envía el mensaje desde tu aplicación de correo.');
    });

    document.getElementById('generate-invoice-btn').addEventListener('click', function() {
    generarFactura();
});
 
    renderCart();
 
    mostrarSeccion('home');
});