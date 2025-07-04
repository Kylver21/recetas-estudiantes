import React, { useMemo } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {

  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;
  
  const recetasPorCategoria = useMemo(() => {
    const counts: Record<string, number> = {};
    recetas.forEach(receta => {
      const cat = receta.categoria || 'Sin categoría';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [recetas]);

  const recetaPopular = useMemo(() => {
    if (recetas.length === 0) return null;
    return [...recetas].reduce((max, r) => (r.valoracion > max.valoracion ? r : max), recetas[0]);
  }, [recetas]);

  return (
    <div className="stats-page">
      <div className="container">
        <h1>📊 Estadísticas de Recetas</h1>
        <p className="page-subtitle">
          Aquí tienes las estadisticas de recetas, recetas por categoría, y receta más popular
        </p>
        
        <Row className="g-4">
          {/* Tarjeta de Total de Recetas */}
          <Col md={4} sm={12}>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Total de Recetas</Card.Title>
                <div className="stats-total">{totalRecetas}</div>
                <div className="text-center text-muted">
                  {totalRecetas === 1 ? 'Receta en total' : 'Recetas en total'}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta de Recetas por Categoría */}
          <Col md={4} sm={12}>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Recetas por Categoría</Card.Title>
                <ul className="category-list">
                  {Object.entries(recetasPorCategoria).map(([cat, count]) => (
                    <li key={cat}>
                      <span className="category-name">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </span>
                      <span className="category-count">{count}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Tarjeta de Receta Más Popular */}
          <Col md={4} sm={12}>
            <Card className="stats-card">
              <Card.Body>
                <Card.Title>Receta Destacada</Card.Title>
                {recetaPopular ? (
                  <div className="popular-recipe">
                    <div className="recipe-name">
                      {recetaPopular.nombre}
                    </div>
                    <div className="recipe-rating">
                      {'★'.repeat(Math.floor(recetaPopular.valoracion || 0))}
                      {'☆'.repeat(5 - Math.floor(recetaPopular.valoracion || 0))}
                      <span className="ms-2">{recetaPopular.valoracion?.toFixed(1)}</span>
                    </div>
                    <div className="recipe-category">
                      {recetaPopular.categoria || 'Sin categoría'}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3">No hay recetas disponibles</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StatsPage;
