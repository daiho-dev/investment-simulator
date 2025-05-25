import React, { useEffect, useRef } from 'react';

interface BreakdownChartProps {
  principal: number;
  interest: number;
}

export const BreakdownChart: React.FC<BreakdownChartProps> = ({ principal, interest }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = principal + interest;
    const principalPercentage = (principal / total) * 100;
    const interestPercentage = (interest / total) * 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Draw title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillText('資産構成', centerX, 20);

    // Draw pie chart
    const startAngle = -0.5 * Math.PI;
    const principalEndAngle = (principalPercentage / 100) * 2 * Math.PI;
    const interestEndAngle = 2 * Math.PI;

    // Principal slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, principalEndAngle);
    ctx.fillStyle = '#60A5FA';
    ctx.fill();

    // Interest slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, principalEndAngle, interestEndAngle);
    ctx.fillStyle = '#10B981';
    ctx.fill();

    // Add labels
    const formatCurrency = (value: number) => 
      '¥' + value.toLocaleString('ja-JP', { maximumFractionDigits: 0 });

    const formatPercentage = (value: number) => 
      value.toFixed(1) + '%';

    // Principal label
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('元本', centerX - radius / 2, centerY - 20);
    
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText(formatCurrency(principal), centerX - radius / 2, centerY + 10);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText(formatPercentage(principalPercentage), centerX - radius / 2, centerY + 30);

    // Interest label
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillText('運用益', centerX + radius / 2, centerY - 20);
    
    ctx.font = '14px system-ui, -apple-system, sans-serif';
    ctx.fillText(formatCurrency(interest), centerX + radius / 2, centerY + 10);
    
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText(formatPercentage(interestPercentage), centerX + radius / 2, centerY + 30);

    // Total value at bottom
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.fillText('合計資産: ' + formatCurrency(total), centerX, centerY + radius + 30);

  }, [principal, interest]);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={400}
    />
  );
};