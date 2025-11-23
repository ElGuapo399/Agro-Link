// ==========================================
// SCRIPT_NEW.JS - DATOS Y LÓGICA DE PRODUCTOS
// ==========================================

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

// BASE DE DATOS DE PRODUCTOS (FUENTE DE VERDAD)
const productos = [
    {
        id: 1,
        nombre: "Tomate Rojo",
        categoria: "verduras",
        agricultor: "Juan Pérez",
        ubicacion: "Ciudad Victoria",
        precios: { kg: 25, caja: 300, saco: 180, pieza: 2, tonelada: 25000 },
        descripcion: "Tomate rojo cultivado de manera orgánica.",
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
        precios: { kg: 80, caja: 1600, saco: 1200, pieza: 12, tonelada: 80000 },
        descripcion: "Aguacate Hass de primera calidad.",
        imagen: "Aguacate.jpeg",
        calificacion: 4.8,
        reseñas: 8
    },
    {
        id: 3,
        nombre: "Cebolla Blanca",
        categoria: "verduras",
        agricultor: "Jose Perez",
        ubicacion: "Gonzales",
        precios: { kg: 23, caja: 350, saco: 200, pieza: 1.5, tonelada: 23000 },
        descripcion: "Cebolla blanca recién cosechada.",
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
        precios: { kg: 15, caja: 180, saco: 120, pieza: 1, tonelada: 15000 },
        descripcion: "Maíz blanco ideal para tortillas.",
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
        precios: { kg: 30, caja: 400, saco: 250, pieza: 3, tonelada: 30000 },
        descripcion: "Limón persa jugoso y aromático.",
        imagen: "Limon.jpg",
        calificacion: 4.7,
        reseñas: 15
    },
    // PRODUCTO NUEVO CON 5 ESTRELLAS
    {
        id: 6,
        nombre: "Chile Serrano Premium",
        categoria: "verduras",
        agricultor: "Roberto Gómez",
        ubicacion: "Altamira",
        precios: { kg: 45, caja: 550, saco: 300 },
        descripcion: "Chile serrano de calidad exportación, muy picante y fresco.",
        imagen: "Chile.jpg",
        calificacion: 5.0, // 5 Estrellas
        reseñas: 10
    }
];

let calificaciones = JSON.parse(localStorage.getItem('agrolink_calificaciones') || '[]');

// --- RENDERIZADO DE PRODUCTOS ---

// Modificado para aceptar una lista opcional (para busquedas)
function mostrarProductos(categoria = "todas", listaProductos = null) {
    const container = document.getElementById('products-container');
    if (!container) return;
   
    container.innerHTML = '';
   
    let productosAProcesar = listaProductos || productos;
    
    if (categoria !== "todas" && !listaProductos) {
        productosAProcesar = productos.filter(p => p.categoria === categoria);
    }
   
    if (productosAProcesar.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otra categoría o término de búsqueda.</p>
            </div>
        `;
        return;
    }
   
    productosAProcesar.forEach(producto => {
        const card = document.createElement('article');
        card.className = 'product-card';
        
        const preciosHTML = Object.entries(producto.precios)
            .map(([unidad, precio]) => `
                <div class="price-option">
                    <input type="radio" name="unit-${producto.id}" id="unit-${producto.id}-${unidad}" value="${unidad}" ${unidad === 'kg' ? 'checked' : ''}>
                    <label for="unit-${producto.id}-${unidad}">
                        <span class="unit-name">${UNIDADES_TEXTO[unidad]}</span>
                        <span class="unit-price">$${precio.toFixed(2)}</span>
                    </label>
                </div>
            `).join('');

        const estrellasHTML = generarEstrellas(producto.calificacion);
 
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${producto.imagen}');" role="img" aria-label="${producto.nombre}">
                <div class="product-badge">${producto.categoria}</div>
            </div>
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                
                <div class="product-rating">
                    ${estrellasHTML}
                    <span class="rating-text">${producto.calificacion} (${producto.reseñas})</span>
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
                        <i class="fas fa-shopping-cart"></i> Agregar
                    </button>
                    <button class="btn btn-outline view-details-btn" data-id="${producto.id}">
                        <i class="fas fa-info-circle"></i> Detalles
                    </button>
                </div>
            </div>
        `;

        // Listeners individuales
        const addButton = card.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => {
            const productId = parseInt(addButton.dataset.id);
            const selectedUnitEl = card.querySelector('input[type="radio"]:checked');
            // Llamamos a openCartModal que está en script.js
            if (selectedUnitEl && typeof openCartModal === 'function') {
                openCartModal(productId, selectedUnitEl.value);
            }
        });

        const detailsButton = card.querySelector('.view-details-btn');
        detailsButton.addEventListener('click', () => {
            const productId = parseInt(detailsButton.dataset.id);
            mostrarDetallesProducto(productId);
        });
 
        container.appendChild(card);
    });
}

// --- SISTEMA DE ESTRELLAS Y DETALLES ---

function generarEstrellas(calificacion) {
    const estrellasLlenas = Math.floor(calificacion);
    const mediaEstrella = calificacion % 1 >= 0.5;
    const estrellasVacias = 5 - estrellasLlenas - (mediaEstrella ? 1 : 0);
    
    let html = '';
    for(let i=0; i<estrellasLlenas; i++) html += '<i class="fas fa-star"></i>';
    if(mediaEstrella) html += '<i class="fas fa-star-half-alt"></i>';
    for(let i=0; i<estrellasVacias; i++) html += '<i class="far fa-star"></i>';
    
    return html;
}

function mostrarDetallesProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    let modal = document.getElementById('product-details-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-details-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content product-details-modal-content">
                <div class="modal-header">
                    <h2>Detalles</h2>
                    <button class="close-btn" onclick="document.getElementById('product-details-modal').style.display='none'">&times;</button>
                </div>
                <div class="modal-body" id="product-details-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const contenido = `
        <div class="product-details">
            <div class="product-details-header">
                <div class="product-details-image" style="background-image: url('${producto.imagen}'); height: 250px; background-size: cover; border-radius: 8px;"></div>
                <div class="product-details-info" style="padding: 20px;">
                    <h2>${producto.nombre}</h2>
                    <div class="product-rating large" style="font-size: 1.5em; color: #ffc107;">
                        ${generarEstrellas(producto.calificacion)}
                        <span style="font-size: 0.6em; color: #666;">${producto.calificacion}</span>
                    </div>
                    <div class="product-meta">
                        <p><strong>Agricultor:</strong> ${producto.agricultor}</p>
                        <p><strong>Ubicación:</strong> ${producto.ubicacion}</p>
                    </div>
                </div>
            </div>
            
            <div class="product-details-content">
                <h3>Descripción</h3>
                <p>${producto.descripcion}</p>
                
                <h3>Precios</h3>
                <div class="price-list">
                    ${Object.entries(producto.precios).map(([unidad, precio]) => `
                        <div class="price-item" style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;">
                            <span class="unit">${UNIDADES_TEXTO[unidad]}:</span>
                            <span class="price" style="font-weight: bold; color: var(--primary-color);">$${precio.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('product-details-content').innerHTML = contenido;
    modal.style.display = 'flex';
}