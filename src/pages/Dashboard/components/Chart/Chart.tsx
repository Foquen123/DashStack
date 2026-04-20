import { useEffect, useRef, useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 31 }, (_, i) => {
  return { name: String(i+1), pv: Math.round(Math.random() * (100 - 20) + 20) };
});

// Кастомный тултип с возможностью статичного позиционирования
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, coordinate }: any) => {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const nodeDots = document.querySelectorAll('.recharts-line-dot');
    const dots = Array.from(nodeDots);
    let targetDot: Element | null = null;
    dots.forEach(dot => {
      if (dot) {

        if (String(dot.getAttribute('cx')) === String(coordinate?.x || '0')) {
          // console.log(dot.getAttribute('cx'));
          // console.log(coordinate.x);
          targetDot = dot;
        }
      }
    });
    if (active && tooltipRef.current && coordinate && targetDot) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTooltipPosition({
        top: parseFloat((targetDot as Element).getAttribute('cy') || '0') - 60, // Смещаем немного вверх от точки
        left: coordinate.x
      });
    }
  }, [active, coordinate]);

  if (!active || !payload?.length) return null;

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        backgroundColor: 'var(--accent)',
        padding: '10px',
        borderRadius: '4px',
        pointerEvents: 'none',
        transform: 'translateX(-50%)', // Центрируем по горизонтали
        color: 'var(--accent-text)'
      }}
    >
      <p>{payload[0].value}</p>
      <div
        style={{
          position: 'absolute',
          bottom: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid var(--accent)'
        }}
      />
    </div >

  );
};

export default function Chart() {
  const formatPercent = (value: number) => {
    return `${value}%`;
  };
  return (
    <ResponsiveContainer width="100%" minWidth={900} height={400}>
      <AreaChart
        style={{ height: '400px', minHeight: '350px' }}
        data={data}
        margin={{
          top: 30,
          right: 10,
          left: 35,
          bottom: 25,
        }}
      >
        {/* Определяем градиент */}
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="var(--text-secondary)"
          strokeWidth={0.2}
        />

        {/* Настройка Y-оси */}
        <YAxis
          axisLine={false}
          tickLine={false}
          stroke="var(--text-secondary)"
          tickMargin={40}
          width={60}
          orientation="left"
          tickFormatter={formatPercent}
          domain={[20, 100]}
          tickCount={5}
          tickSize={20}
          tick={{
            fontFamily: 'var(--font-family)',
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '75%',
            fill: 'var(--text-secondary)'
          }}
        />

        <XAxis
          dataKey="name"
          stroke="var(--text-primary)"
          tickLine={false}
          axisLine={false}
          tickMargin={25}
          tick={{
            fontFamily: 'var(--font-family)',
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '75%',
            fill: 'var(--text-secondary)'
          }}
        />

        <Tooltip
          content={<CustomTooltip></CustomTooltip>}
          cursor={{
            stroke: 'var(--color-border-2)',
          }}
          position={{ y: -30 }}  // 👈 Фиксированное смещение вверх
          wrapperStyle={{ zIndex: 1000 }}
          contentStyle={{
            backgroundColor: 'var(--color-surface-raised)',
            borderColor: 'var(--color-border-2)',
          }}
        />

        {/* Добавляем область с градиентом - ИСПРАВЛЕНО */}
        <Area
          type="linear"
          dataKey="pv"
          stroke="none"
          fill="url(#colorGradient)"  // 👈 Исправлено: используем градиент
          fillOpacity={1}
        />

        <Line
          type="linear"
          dataKey="pv"
          stroke="var(--accent)"
          strokeWidth={2}
          dot={{
            fill: 'var(--accent)',
            r: 4,
            strokeWidth: 0
          }}
          activeDot={{ r: 8, stroke: 'var(--accent)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}