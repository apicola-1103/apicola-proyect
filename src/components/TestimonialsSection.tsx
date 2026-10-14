import React from 'react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="section-container" id="testimonios">
      <div className="section-head">
        <h2>Respaldado por apicultores en el territorio</h2>
        <p>Historias de productores que transformaron la gestión técnica y económica de sus apiarios.</p>
      </div>

      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p className="testimonial-quote">
            "Antes anotaba las cosechas en una libreta de papel que se llenaba de propóleo y humedad. Con Control Apícola sé exactamente cuánto produjo cada grupo de colmenas y el valor neto al instante."
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">CM</div>
            <div className="author-info">
              <h4>Carlos Mendoza</h4>
              <p>Apiario El Roble · Boyacá (34 colmenas)</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p className="testimonial-quote">
            "Saber el desglose de gastos en combustible y alimentación suplementaria frente al precio por kilo nos permitió negociar mejor con los distribuidores mayoristas de miel pura."
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">ML</div>
            <div className="author-info">
              <h4>Marta Lucía Gómez</h4>
              <p>Apicultura de Montaña · Antioquia (50 colmenas)</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <p className="testimonial-quote">
            "El control riguroso de pérdidas nos ayudó a identificar qué apiarios tenían más ataque de hormigas y humedad. Redujimos la mortalidad de colmenas un 60% esta temporada."
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">JR</div>
            <div className="author-info">
              <h4>Javier Ramos</h4>
              <p>Finca La Reina · Santander (80 colmenas)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
