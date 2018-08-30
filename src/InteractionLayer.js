import React from 'react';
import { Delaunay } from 'd3-delaunay';

class InteractionLayer extends React.Component {
  render() {
    const { size, points, onHover } = this.props;

    const delaunayPoints = points.map(d => [d.x, d.y]);
    const delaunay = Delaunay.from(delaunayPoints);
    const voronoi = delaunay.voronoi([0, 0, size[0], size[1]]);
    const voronoiCells = [...voronoi.cellPolygons()];

    return (
      <g>
        {voronoiCells.map((d, i) => (
          <path
            key={`voronoi-${i}`}
            fillOpacity={0}
            onMouseEnter={() => onHover(points[i])}
            onMouseLeave={() => onHover()}
            d={`M${d.map(p => p.join(',')).join('L')}Z`}
          />
        ))}
      </g>
    );
  }
}

export default InteractionLayer;
