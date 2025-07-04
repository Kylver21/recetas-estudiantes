import React, { useMemo } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { Card, Row, Col } from 'react-bootstrap';

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
    return recetas.reduce((max, r) => (r.valoracion > max.valoracion ? r : max), recetas[0]);
  }, [recetas]);

  return (
    <div className="stats-page container py-4">
      <h1 className="mb-3">📊 Estadísticas de Recetas</h1>
      <Row className="mb-4">
        <Col md={4} sm={12} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Total de Recetas</Card.Title>
              <Card.Text style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalRecetas}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Recetas por Categoría</Card.Title>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {Object.entries(recetasPorCategoria).map(([cat, count]) => (
                  <li key={cat}>
                    <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}:</strong> {count}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="mb-3">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Receta Más Popular</Card.Title>
              {recetaPopular ? (
                <>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{recetaPopular.nombre}</div>
                  <div>⭐ {recetaPopular.valoracion} / 5</div>
                  <div className="text-muted" style={{ fontSize: '0.95rem' }}>
                    Categoría: {recetaPopular.categoria || 'Sin categoría'}
                  </div>
                </>
              ) : (
                <div>No hay recetas</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatsPage;
