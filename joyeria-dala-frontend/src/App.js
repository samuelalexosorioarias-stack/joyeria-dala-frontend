import React, { useState } from 'react';
import './App.css';
import { PRODUCTOS_DALA } from './data/productos';
import { JoyaCard } from './components/JoyaCard';
import { CartDrawer } from './components/CartDrawer';
import { 
  ShoppingBag, Search, MapPin, Phone, Mail, MessageSquare, 
  ShieldCheck, Truck, Award, Clock 
} from 'lucide-react';

function App() {
  const [seccion, setSeccion] = useState('inicio');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODAS');
  const [orden, setOrden] = useState('DEFECTO');
  const [carrito, setCarrito] = useState([]);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [productoModal, setProductoModal] = useState(null);
  const [checkoutModal, setCheckoutModal] = useState(false);

  const [cliente, setCliente] = useState({ nombre: '', telefono: '', direccion: '', metodo: 'Nequi / Daviplata' });

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  // Filtrado y ordenamiento de productos
  let productosFiltrados = PRODUCTOS_DALA.filter(p => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaFiltro === 'TODAS' || p.categoria === categoriaFiltro;
    return coincideTexto && coincideCat;
  });

  if (orden === 'MENOR_MAYOR') {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'MAYOR_MENOR') {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    const resumen = carrito.map(c => `- ${c.nombre} ($${c.precio.toLocaleString('es-CO')})`).join('\n');
    const total = carrito.reduce((a, b) => a + b.precio, 0);

    const mensaje = `*NUEVO PEDIDO - JOYERÍA DALA*\n\n` +
      `*Cliente:* ${cliente.nombre}\n` +
      `*Teléfono:* ${cliente.telefono}\n` +
      `*Dirección:* ${cliente.direccion}\n` +
      `*Método de Pago:* ${cliente.metodo}\n\n` +
      `*Productos:*\n${resumen}\n\n` +
      `*Total:* $${total.toLocaleString('es-CO')} COP`;

    window.open(`https://wa.me/573145033726?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div>
          <h1 className="brand-title">JOYERÍA DALA</h1>
          <span className="brand-sub">Alta Joyería & Orfebrería</span>
        </div>

        <nav className="nav-menu">
          <button className={seccion === 'inicio' ? 'active' : ''} onClick={() => setSeccion('inicio')}>Inicio</button>
          <button className={seccion === 'productos' ? 'active' : ''} onClick={() => setSeccion('productos')}>Catálogo (20)</button>
          <button className={seccion === 'categorias' ? 'active' : ''} onClick={() => setSeccion('categorias')}>Categorías</button>
          <button className={seccion === 'contacto' ? 'active' : ''} onClick={() => setSeccion('contacto')}>Contacto</button>
        </nav>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', color: '#888' }} />
            <input 
              type="text" 
              placeholder="Buscar joya..." 
              className="search-bar" 
              style={{ paddingLeft: '34px' }}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <button 
            className="cart-icon-btn" 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={() => setDrawerAbierto(true)}
          >
            <ShoppingBag size={17} />
            <span>{carrito.length}</span>
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container">
        
        {/* INICIO */}
        {seccion === 'inicio' && (
          <section>
            <div style={{ 
              background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200') center/cover",
              color: 'white',
              textAlign: 'center',
              padding: '5rem 2rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem', letterSpacing: '1px' }}>Colección Exclusiva Oro 18K</h2>
              <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem', color: '#ddd' }}>
                Piezas de orfebrería fina certificadas con garantía de por vida.
              </p>
              <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={() => setSeccion('productos')}>
                Ver Catálogo Completo
              </button>
            </div>

            {/* Banner de Garantías */}
            <div className="features-banner">
              <div className="feature-item">
                <Truck size={28} color="var(--accent-gold)" />
                <div>
                  <h5>Envíos Asegurados</h5>
                  <p>A toda Colombia</p>
                </div>
              </div>
              <div className="feature-item">
                <ShieldCheck size={28} color="var(--accent-gold)" />
                <div>
                  <h5>Garantía de Por Vida</h5>
                  <p>Certificado en Oro 18K</p>
                </div>
              </div>
              <div className="feature-item">
                <Award size={28} color="var(--accent-gold)" />
                <div>
                  <h5>Alta Orfebrería</h5>
                  <p>Acabados a mano</p>
                </div>
              </div>
              <div className="feature-item">
                <Clock size={28} color="var(--accent-gold)" />
                <div>
                  <h5>Atención 24/7</h5>
                  <p>Asesoría personalizada</p>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Joyas Destacadas</h3>
            <div className="products-grid">
              {PRODUCTOS_DALA.slice(0, 4).map(p => (
                <JoyaCard key={p.id} producto={p} alAgregar={agregarAlCarrito} alVerDetalle={setProductoModal} />
              ))}
            </div>
          </section>
        )}

        {/* CATALOGO & CATEGORIAS */}
        {(seccion === 'productos' || seccion === 'categorias') && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '15px' }}>
              <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Catálogo de Joyas</h2>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <select 
                  value={categoriaFiltro} 
                  onChange={(e) => setCategoriaFiltro(e.target.value)} 
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  <option value="TODAS">Todas las Categorías</option>
                  <option value="Anillos">Anillos (5)</option>
                  <option value="Cadenas">Cadenas (5)</option>
                  <option value="Pulseras">Pulseras (5)</option>
                  <option value="Aretes">Aretes (5)</option>
                </select>

                <select 
                  value={orden} 
                  onChange={(e) => setOrden(e.target.value)} 
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  <option value="DEFECTO">Ordenar por: Relevancia</option>
                  <option value="MENOR_MAYOR">Precio: Menor a Mayor</option>
                  <option value="MAYOR_MENOR">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {productosFiltrados.map(p => (
                <JoyaCard key={p.id} producto={p} alAgregar={agregarAlCarrito} alVerDetalle={setProductoModal} />
              ))}
            </div>
          </section>
        )}

        {/* CONTACTO */}
        {seccion === 'contacto' && (
          <section style={{ maxWidth: '650px', margin: '2rem auto', background: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h2 style={{ textAlign: 'center', marginTop: 0 }}>Atención al Cliente</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', margin: '2rem 0' }}>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                <MapPin size={20} color="var(--accent-gold)" /> <strong>Sede Principal:</strong> Cali, Colombia
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                <Phone size={20} color="var(--accent-gold)" /> <strong>Línea Directa:</strong> +57 314 5033726
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                <Mail size={20} color="var(--accent-gold)" /> <strong>Correo Corporativo:</strong> contacto@joyeriadala.co
              </p>
            </div>
            <button 
              className="btn-primary" 
              style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px 0' }} 
              onClick={() => window.open('https://wa.me/573145033726', '_blank')}
            >
              <MessageSquare size={18} /> Escribir por WhatsApp Directo
            </button>
          </section>
        )}

      </main>

      {/* Footer Corporativo */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4>JOYERÍA DALA</h4>
            <p>Casa de alta orfebrería especializada en piezas exclusivas de oro de 18K y piedras preciosas certificadas.</p>
          </div>
          <div className="footer-col">
            <h4>Navegación</h4>
            <a href="#inicio" onClick={() => setSeccion('inicio')}>Inicio</a>
            <a href="#productos" onClick={() => setSeccion('productos')}>Catálogo Completo</a>
            <a href="#contacto" onClick={() => setSeccion('contacto')}>Atención al Cliente</a>
          </div>
          <div className="footer-col">
            <h4>Garantía & Soporte</h4>
            <p>Certificación de Metalidad</p>
            <p>Política de Envíos</p>
            <p>Mantenimiento de Joyas</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Joyería Dala - Todos los derechos reservados. Samuel Alexander Osorio Arias.</p>
        </div>
      </footer>

      {/* Drawer Carrito */}
      <CartDrawer 
        abierto={drawerAbierto} 
        alCerrar={() => setDrawerAbierto(false)} 
        carrito={carrito} 
        alEliminar={eliminarDelCarrito} 
        alProcederPago={() => { setDrawerAbierto(false); setCheckoutModal(true); }}
      />

      {/* Modal Detalle Producto */}
      {productoModal && (
        <div className="modal-overlay" onClick={() => setProductoModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{productoModal.nombre}</h3>
            <img 
              src={productoModal.imagen} 
              alt={productoModal.nombre} 
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} 
            />
            <p style={{ color: '#555', lineHeight: '1.5' }}>{productoModal.descripcion}</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--accent-gold)' }}>
              ${productoModal.precio.toLocaleString('es-CO')} COP
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                onClick={() => { agregarAlCarrito(productoModal); setProductoModal(null); }}
              >
                <ShoppingBag size={18} /> Agregar al Carrito
              </button>
              <button 
                onClick={() => setProductoModal(null)} 
                style={{ padding: '0 18px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Checkout Formulario */}
      {checkoutModal && (
        <div className="modal-overlay" onClick={() => setCheckoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Confirmar Orden de Compra</h3>
            <form onSubmit={enviarWhatsApp}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Nombre Completo</label>
                <input type="text" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} onChange={e => setCliente({...cliente, nombre: e.target.value})} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Teléfono de Contacto</label>
                <input type="tel" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} onChange={e => setCliente({...cliente, telefono: e.target.value})} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Dirección de Entrega</label>
                <input type="text" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} onChange={e => setCliente({...cliente, direccion: e.target.value})} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: '#555' }}>Método de Pago Preferido</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }} onChange={e => setCliente({...cliente, metodo: e.target.value})}>
                  <option value="Nequi / Daviplata">Nequi / Daviplata</option>
                  <option value="Bancolombia / PSE">Bancolombia / PSE</option>
                  <option value="Tarjeta de Crédito / Débito">Tarjeta de Crédito / Débito</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px 0' }}>
                  Enviar Pedido a WhatsApp
                </button>
                <button type="button" onClick={() => setCheckoutModal(false)} style={{ padding: '0 15px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;