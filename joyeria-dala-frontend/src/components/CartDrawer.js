import React from 'react';
import { X, Trash2 } from 'lucide-react';

export const CartDrawer = ({ abierto, alCerrar, carrito, alEliminar, alProcederPago }) => {
  if (!abierto) return null;

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div className="cart-overlay" onClick={alCerrar}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Carrito de Compras</h3>
          <button 
            onClick={alCerrar} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
          >
            <X size={20} />
          </button>
        </div>
        <hr style={{ border: '0.5px solid #eee', margin: '15px 0' }} />

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {carrito.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>El carrito está vacío</p>
          ) : (
            carrito.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  justify: 'space-between', 
                  marginBottom: '12px', 
                  alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f5f5f5'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#1a1a1a' }}>{item.nombre}</strong>
                  <p style={{ margin: '2px 0 0', color: '#777', fontSize: '0.8rem' }}>
                    ${item.precio.toLocaleString('es-CO')} COP
                  </p>
                </div>
                <button 
                  onClick={() => alEliminar(index)} 
                  style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '4px' }}
                  title="Eliminar producto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ color: '#555' }}>Subtotal:</span>
            <strong>${total.toLocaleString('es-CO')} COP</strong>
          </div>
          <button 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px 0' }}
            disabled={carrito.length === 0}
            onClick={alProcederPago}
          >
            Proceder al Pago / WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};