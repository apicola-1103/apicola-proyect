import React, { useState } from 'react';
import { Advice } from '../types';

interface AdviceSectionProps {
  consejos: Advice[];
  onAddAdvice: (nuevo: Advice) => void;
  onToggleLike: (id: number) => void;
}

const STAR_LABELS: Record<number, string> = {
  1: '1 de 5 estrellas (Poco Efectivo)',
  2: '2 de 5 estrellas (Regular)',
  3: '3 de 5 estrellas (Bueno / Aceptable)',
  4: '4 de 5 estrellas (Muy Efectivo)',
  5: '5 de 5 estrellas (Altamente Recomendado)'
};

const CATEGORIAS_FILTRO = [
  { id: 'Todos', label: 'Todos los Métodos' },
  { id: 'Sanidad y Varroa', label: '🩺 Sanidad y Varroa' },
  { id: 'Nutrición y Alimentación', label: '🍯 Nutrición' },
  { id: 'Clima y Protección', label: '🌧️ Clima' },
  { id: 'Reinas y Enjambres', label: '👑 Reinas' },
  { id: 'Piqueras y Manejo', label: '🛠️ Piqueras y Manejo' }
];

export const AdviceSection: React.FC<AdviceSectionProps> = ({ consejos, onAddAdvice, onToggleLike }) => {
  const [filtro, setFiltro] = useState<string>('Todos');

  // Form State
  const [nombre, setNombre] = useState<string>('');
  const [ubicacion, setUbicacion] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('Sanidad y Varroa');
  const [metodo, setMetodo] = useState<string>('Método Preventivo');
  const [rating, setRating] = useState<number>(5);
  const [texto, setTexto] = useState<string>('');
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'success'; texto: string } | null>(null);

  // Summary Metrics
  const total = consejos.length;
  const sumaRatings = consejos.reduce((acc, c) => acc + (c.rating || 5), 0);
  const ratingPromedio = total > 0 ? (sumaRatings / total).toFixed(1) : '5.0';

  const consejosFiltrados =
    filtro === 'Todos' ? consejos : consejos.filter((c) => c.categoria === filtro);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMensaje({ tipo: 'error', texto: '⚠️ Por favor escribe tu nombre o seudónimo de apicultor.' });
      return;
    }
    if (!texto.trim() || texto.trim().length < 12) {
      setMensaje({
        tipo: 'error',
        texto: '⚠️ Por favor detalla un poco más tu consejo o método (mínimo 12 caracteres).'
      });
      return;
    }

    const nuevo: Advice = {
      id: Date.now(),
      nombre: nombre.trim(),
      ubicacion: ubicacion.trim() || 'Apicultor Independiente',
      categoria,
      metodo,
      rating,
      texto: texto.trim(),
      fecha: 'Recién compartido',
      likes: 1,
      likedByUser: true
    };

    onAddAdvice(nuevo);
    setNombre('');
    setUbicacion('');
    setTexto('');
    setRating(5);
    setMensaje({ tipo: 'success', texto: '✅ ¡Tu consejo de cuidado de colmenas fue publicado exitosamente!' });
    setTimeout(() => setMensaje(null), 4000);
  };

  return (
    <section className="comments-section" id="consejos">
      <div className="section-container">
        <div className="section-head">
          <div className="hero-kicker" style={{ margin: '0 auto 12px', display: 'inline-flex' }}>
            <span>💡</span>
            <span>Intercambio de Consejos Apícolas</span>
          </div>
          <h2>Consejos y Métodos para el Cuidado de Colmenas</h2>
          <p>
            Un espacio colaborativo donde apicultores comparten técnicas, métodos tradicionales e innovadores, manejo
            sanitario y diversas formas de proteger y fortalecer tus colmenas.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="comments-summary-card">
          <div className="summary-metric">
            <div className="summary-rating">
              <span className="rating-number">{ratingPromedio}</span>
              <div className="stars-display">★★★★★</div>
            </div>
            <div className="summary-label">Efectividad promedio de las técnicas compartidas</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-metric">
            <div className="summary-value">{total}</div>
            <div className="summary-label">Consejos y métodos de cuidado activos</div>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-metric">
            <div className="summary-value" style={{ color: '#16a34a' }}>
              100%
            </div>
            <div className="summary-label">Técnicas probadas en campo por apicultores</div>
          </div>
        </div>

        {/* Form and List Layout */}
        <div className="comments-layout">
          {/* Column Left: Form */}
          <div className="comment-form-card">
            <div className="form-card-header">
              <h3>💡 Compartir Consejo de Cuidado</h3>
              <p>Publica tus métodos de manejo, trucos prácticos o recetas para mantener tus colmenas fuertes.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="consejoNombre">Tu Nombre o Seudónimo *</label>
                <input
                  type="text"
                  id="consejoNombre"
                  placeholder="Ej: Don Carlos Mendoza"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="consejoUbicacion">Apiario y Departamento / Municipio</label>
                <input
                  type="text"
                  id="consejoUbicacion"
                  placeholder="Ej: Apiario El Roble · Boyacá"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="consejoCategoria">Área o Tipo de Cuidado *</label>
                <select
                  id="consejoCategoria"
                  className="form-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="Sanidad y Varroa">🩺 Sanidad, Varroa y Enfermedades</option>
                  <option value="Nutrición y Alimentación">🍯 Nutrición y Alimentación Artificial</option>
                  <option value="Clima y Protección">🌧️ Clima, Humedad y Aislamiento Térmico</option>
                  <option value="Reinas y Enjambres">👑 Manejo de Reinas y Enjambrazón</option>
                  <option value="Métodos Ecológicos">🌿 Métodos Ecológicos y Naturales</option>
                  <option value="Piqueras y Manejo">🛠️ Piqueras, Trampas y Manejo de Apiario</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="consejoMetodo">Enfoque o Técnica de Cuidado</label>
                <select
                  id="consejoMetodo"
                  className="form-select"
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value)}
                >
                  <option value="Método Preventivo">🛡️ Método Preventivo</option>
                  <option value="Método Orgánico / Natural">🌿 Método Orgánico / Natural</option>
                  <option value="Manejo Tradicional de Campo">🪵 Manejo Tradicional de Campo</option>
                  <option value="Técnica de Estimulación">⚡ Técnica de Estimulación</option>
                  <option value="Control Físico y Sanitario">🩺 Control Físico y Sanitario</option>
                </select>
              </div>

              <div className="form-group">
                <label>Efectividad Comprobada de este Consejo</label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star-btn ${star <= rating ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      role="button"
                      aria-label={`Calificar con ${star} estrellas`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="star-rating-text">{STAR_LABELS[rating]}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="consejoTexto">Detalle del Consejo y Pasos para Realizarlo *</label>
                <textarea
                  id="consejoTexto"
                  rows={4}
                  maxLength={600}
                  placeholder="Describe con claridad tu forma de cuidar las colmenas: ¿qué materiales o insumos usas?, ¿cómo y cuándo lo aplicas?, ¿qué precauciones tomar y qué resultados da?..."
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  required
                />
                <div className="char-count">{texto.length} / 600 caracteres</div>
              </div>

              <button type="submit" className="btn-primary" id="btnPublicarConsejo">
                <span>💡 Publicar Consejo</span>
              </button>

              {mensaje && (
                <div className={`message-box ${mensaje.tipo}`} style={{ display: 'block' }}>
                  {mensaje.texto}
                </div>
              )}
            </form>
          </div>

          {/* Column Right: List and Filters */}
          <div className="comments-feed-wrapper">
            <div className="feed-header">
              <div className="feed-title-wrap">
                <h3>Consejos de la Comunidad</h3>
                <span className="feed-badge">{total} consejos</span>
              </div>

              <div className="comment-filter-pills">
                {CATEGORIAS_FILTRO.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`filter-pill ${filtro === c.id ? 'active' : ''}`}
                    onClick={() => setFiltro(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="comments-list">
              {consejosFiltrados.length === 0 ? (
                <div className="empty-comments-state">
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>💡</span>
                  <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                    No hay consejos en el área "{filtro}"
                  </p>
                  <p style={{ fontSize: '13px' }}>
                    ¡Sé el primero en aportar una técnica o método de cuidado en este tema!
                  </p>
                </div>
              ) : (
                consejosFiltrados.map((c) => {
                  const partes = c.nombre.trim().split(' ');
                  let iniciales = partes[0] ? partes[0].charAt(0).toUpperCase() : 'A';
                  if (partes.length > 1 && partes[1]) iniciales += partes[1].charAt(0).toUpperCase();

                  const estrellasNum = Math.min(5, Math.max(1, c.rating || 5));
                  const estrellasTexto = '★'.repeat(estrellasNum) + '☆'.repeat(5 - estrellasNum);

                  return (
                    <article className="comment-card" key={c.id}>
                      <div className="comment-card-top">
                        <div className="comment-author-info">
                          <div className="comment-avatar">{iniciales}</div>
                          <div className="author-meta">
                            <h4>{c.nombre}</h4>
                            <p>{c.ubicacion || 'Apicultor en Campo'}</p>
                          </div>
                        </div>
                        <div className="comment-badge-row">
                          {c.metodo && <span className="method-tag">{c.metodo}</span>}
                          <span className="category-tag">{c.categoria}</span>
                        </div>
                      </div>

                      <div className="comment-card-stars" aria-label={`Efectividad: ${estrellasNum} de 5 estrellas`}>
                        {estrellasTexto}
                      </div>

                      <div className="comment-body-text">{c.texto}</div>

                      <div className="comment-card-footer">
                        <span>📅 {c.fecha}</span>
                        <button
                          type="button"
                          className={`btn-like-comment ${c.likedByUser ? 'liked' : ''}`}
                          onClick={() => onToggleLike(c.id)}
                        >
                          <span>💡 Me fue útil</span>
                          <strong>{c.likes || 0}</strong>
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
