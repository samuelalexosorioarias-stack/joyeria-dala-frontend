import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export const JoyaCard = ({ producto, alAgregar, alVerDetalle }) => {

  // Reemplazo en caso de desconexión o fallo de URL
  const manejarFalloImagen = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400/111111/C9A227?text=JOYERIA+DALA";
  };

  return (
    <div className="product-card">
      {producto.destacado && (
        <span className="badge-tag">{producto.destacado}</span>
      )}
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        onError={manejarFalloImagen}
        onClick={() => alVerDetalle(producto)}
        style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', marginBottom: '12px' }}
      />
      <h4 style={{ margin: '0 0 6px', fontSize: '1rem', height: '42px', overflow: 'hidden' }}>{producto.nombre}</h4>
      <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 10px' }}>
        {producto.categoria} | <span style={{ color: producto.estado === 'Stock Bajo' ? '#d9534f' : '#28a745' }}>{producto.estado}</span>
      </p>
      <p style={{ color: 'var(--accent-gold)', fontWeight: '700', fontSize: '1.1rem', margin: '0 0 16px' }}>
        ${producto.precio.toLocaleString('es-CO')} COP
      </p>
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button 
          className="btn-primary" 
          style={{ flex: 1, padding: '10px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }} 
          onClick={() => alAgregar(producto)}
        >
          <ShoppingBag size={15} /> Agregar
        </button>
        <button 
          style={{ 
            background: '#f5f5f5', 
            border: '1px solid #e0e0e0', 
            padding: '10px 14px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            color: '#333'
          }}
          onClick={() => alVerDetalle(producto)}
          title="Ver detalle"
        >
          <Eye size={16} />
        </button>
      </div>
    </div>
  );
};