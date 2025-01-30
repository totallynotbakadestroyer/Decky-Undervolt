import React from "react";

interface ManualPoint {
  point: number;
  value: number;
}

function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2;
    d += ` Q ${p0.x},${p0.y} ${midX},${midY}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x},${last.y}`;

  return d;
}

const UndervoltingPreview = ({ data }: { data: ManualPoint[] }) => {
  const MARGIN = 10;
  const CHART_MIN = MARGIN;
  const CHART_MAX = 100 - MARGIN;
  const CHART_SIZE = CHART_MAX - CHART_MIN; // 80

  const normalizedData = data.map((pt) => ({
    x: CHART_MIN + (pt.point / 100) * CHART_SIZE,
    y: CHART_MAX - (pt.value / 100) * CHART_SIZE,
  }));

  const smoothPath = getSmoothPath(normalizedData);

  return (
    <div style={{ width: "100%", height: "250px", position: "relative" }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          border: "1px solid #1e90ff",
          display: "block",
        }}
      >
        {[...Array(11)].map((_, i) => {
          const val = (i * 100) / 10; // 0,10,20,...,100
          const xPos = CHART_MIN + (val / 100) * CHART_SIZE;
          const yPos = CHART_MAX - (val / 100) * CHART_SIZE;

          return (
            <React.Fragment key={i}>
              <line
                x1={CHART_MIN}
                y1={yPos}
                x2={CHART_MAX}
                y2={yPos}
                stroke="#1e90ff"
                strokeWidth="0.2"
              />
              <line
                x1={xPos}
                y1={CHART_MIN}
                x2={xPos}
                y2={CHART_MAX}
                stroke="#1e90ff"
                strokeWidth="0.2"
              />
            </React.Fragment>
          );
        })}

        {[...Array(11)].map((_, i) => {
          const val = i * 10;
          const xPos = CHART_MIN + (val / 100) * CHART_SIZE;
          return (
            <text
              key={`x-label-${val}`}
              x={xPos}
              y={CHART_MAX + 5}
              fontSize="2"
              fill="#ccc"
              textAnchor="middle"
              style={{ fontFamily: "sans-serif" }}
            >
              {val}%
            </text>
          );
        })}

        {[...Array(11)].map((_, i) => {
          const val = i * 10;
          const yPos = CHART_MAX - (val / 100) * CHART_SIZE;
          return (
            <text
              key={`y-label-${val}`}
              x={CHART_MIN - 2}
              y={yPos}
              fontSize="2"
              fill="#ccc"
              textAnchor="end"
              alignmentBaseline="middle"
              style={{ fontFamily: "sans-serif" }}
            >
              {val}
            </text>
          );
        })}

        <text
          x={(CHART_MIN + CHART_MAX) / 2}
          y={CHART_MAX + 9}
          fontSize="4"
          fill="white"
          textAnchor="middle"
          style={{ fontFamily: "sans-serif" }}
        >
          CPU Load %
        </text>
        <text
          x={CHART_MIN - 9}
          y={(CHART_MIN + CHART_MAX) / 2}
          fontSize="4"
          fill="white"
          textAnchor="middle"
          style={{ fontFamily: "sans-serif" }}
          transform={`
            rotate(-90, 
              ${CHART_MIN - 9}, 
              ${(CHART_MIN + CHART_MAX) / 2}
            )
          `}
        >
          CO Step
        </text>

        <path d={smoothPath} stroke="#1e90ff" strokeWidth="0.7" fill="none" />
      </svg>
    </div>
  );
};

export default UndervoltingPreview;
