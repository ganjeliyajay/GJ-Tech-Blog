let lockCount = 0;
let originalOverflow = '';

export function lockScroll(): void {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

export function unlockScroll(): void {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow || '';
  }
}
