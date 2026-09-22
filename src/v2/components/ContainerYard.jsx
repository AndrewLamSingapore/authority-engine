import React from 'react';
import { Link } from 'react-router-dom';
import { evidenceHint, yardContainers, yardLegend } from '../data/content';

const HEIGHT = 96;
const RIBS = 16;

/**
 * The container yard: the memorable visual element of the V2 home hero.
 *
 * Three stacked 96-unit-high containers inside a 500 x 322 viewBox.
 * Filled containers carry corrugation ribs and end-door lines; the concept
 * container is a dashed outline with no fill.
 */
function Container({ container, index }) {
  const { x, y, width, tone, title, detail, href, ariaLabel } = container;
  const right = x + width;
  const fill = tone === 'concept' ? 'none' : `var(--bk-${tone})`;
  const ink = tone === 'concept' ? 'var(--bk-ink)' : `var(--bk-on-${tone})`;
  const ribStroke = tone === 'concept' ? 'var(--bk-concept)' : ink;
  const doorX = [right - 30, right - 18, right - 6];
  const ribStart = x + 10;
  const ribEnd = right - 38;
  const ribs = [];
  for (let rx = ribStart; rx <= ribEnd; rx += RIBS) ribs.push(rx);

  return (
    <Link
      to={href}
      className={`v2-yard-link v2-yard-link-${index + 1}`}
      aria-label={ariaLabel}
    >
      <g className="v2-yard-body">
        {/*
         * Transparent hit area: an SVG <a> is only hit-testable where its
         * children paint, so without this the empty-centred concept container
         * could not be tapped in its middle.
         */}
        <rect x={x} y={y} width={width} height={HEIGHT} rx="3" fill="transparent" />
        <rect
          className="v2-yard-outline"
          x={x}
          y={y}
          width={width}
          height={HEIGHT}
          rx="3"
          fill={fill}
          stroke={tone === 'concept' ? 'var(--bk-concept)' : 'none'}
          strokeWidth={tone === 'concept' ? 1.5 : 0}
          strokeDasharray={tone === 'concept' ? '10 7' : undefined}
        />
        {ribs.map((rx) => (
          <line
            key={rx}
            x1={rx}
            y1={y + 8}
            x2={rx}
            y2={y + HEIGHT - 8}
            stroke={ribStroke}
            strokeOpacity={tone === 'concept' ? 0.35 : 0.22}
            strokeWidth="1"
          />
        ))}
        {doorX.map((dx) => (
          <line
            key={dx}
            className="v2-yard-door"
            x1={dx}
            y1={y + 3}
            x2={dx}
            y2={y + HEIGHT - 3}
            stroke={ink}
            strokeOpacity={tone === 'concept' ? 0.45 : 0.55}
            strokeWidth="1.5"
          />
        ))}
        <text className="v2-yard-title" x={x + 16} y={y + 44} fill={ink}>
          {title}
        </text>
        <text className="v2-yard-detail" x={x + 16} y={y + 66} fill={ink} fillOpacity="0.82">
          {detail}
        </text>
      </g>
    </Link>
  );
}

export default function ContainerYard() {
  return (
    <figure className="v2-yard">
      <svg viewBox="0 0 500 322" role="group" aria-label="Evidence containers: real operating records, a synthetic prototype and a concept">
        {yardContainers.map((container, index) => (
          <Container key={container.id} container={container} index={index} />
        ))}
      </svg>
      <div className="v2-yard-key">
        {yardLegend.map(({ tone, text }) => (
          <span key={tone}>
            <span className={`v2-key-mark v2-key-${tone}`} aria-hidden="true" />
            {text}
          </span>
        ))}
      </div>
      <figcaption className="v2-yard-hint">{evidenceHint}</figcaption>
    </figure>
  );
}
