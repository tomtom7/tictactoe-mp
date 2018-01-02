import { canvas } from './constants';

export function getCursorPosition(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return {x: x, y: y};
}