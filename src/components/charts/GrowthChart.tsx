import React, { useEffect, useRef } from 'react';
import { YearlyData } from '../../types/investment';

interface GrowthChartProps {
  data: YearlyData[];
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) ctx.fontreturn;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = { top: 40, right: 160, bottom: 40, left: 80 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;

    // Extract values for scales
    const years = data.map(d => d.year);
    const values = data.map(d => d.balance);
    const principalValues = data.map(d => d.totalContributions);

    const maxValue = Math.max(...values) * 1.1; // Add 10% padding

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, canvas.height - padding.bottom);
    
    // X-axis
    ctx.moveTo(padding.left, canvas.height - padding.bottom);
    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#6B7280';
    ctx.font = '14px system-ui, -apple-system, sans-serif';

    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = padding.top + (chartHeight * (yTicks - i)) / yTicks;
      const value = (maxValue * i) / yTicks;
      
      ctx.fillText(
        '¥' + value.toLocaleString('ja-JP', { maximumFractionDigits: 0 }), 
        padding.left - 10, 
        y
      );
      
      // Grid line
      ctx.beginPath();
      ctx.strokeStyle = '#F3F4F6';
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
    }

    // Draw X-axis labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const xTicksCount = Math.min(10, years.length);
    const xTickStep = Math.ceil(years.length / xTicksCount);
    
    for (let i = 0; i < years.length; i += xTickStep) {
      const x = padding.left + (chartWidth * i) / (years.length - 1);
      const year = years[i];
      
      ctx.fillText(`${year}年目`, x, canvas.height - padding.bottom + 10);
    }

    // Draw title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.fillText('資産残高の推移', canvas.width / 2, 20);

    // Draw principal line
    ctx.beginPath();
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < principalValues.length; i++) {
      const x = padding.left + (chartWidth * i) / (principalValues.length - 1);
      const y = canvas.height - padding.bottom - (chartHeight * principalValues[i]) / maxValue;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw balance line
    ctx.beginPath();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < values.length; i++) {
      const x = padding.left + (chartWidth * i) / (values.length - 1);
      const y = canvas.height - padding.bottom - (chartHeight * values[i]) / maxValue;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw legend on the right side
    const legendX = canvas.width - padding.right + 20;
    const legendY = padding.top + 20;
    const legendSpacing = 60;
    
    // Principal legend
    ctx.beginPath();
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 2;
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 40, legendY);
    ctx.stroke();
    
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6B7280';
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText('元本', legendX + 50, legendY);
    
    // Balance legend
    ctx.beginPath();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    ctx.moveTo(legendX, legendY + legendSpacing);
    ctx.lineTo(legendX + 40, legendY + legendSpacing);
    ctx.stroke();
    
    ctx.fillText('運用後残高', legendX + 50, legendY + legendSpacing);
  }, [data]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={400}
    />
  );
};