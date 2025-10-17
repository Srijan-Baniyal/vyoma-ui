'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
  onPositionChange?: (position: number) => void;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  initialPosition = 50,
  className,
  onPositionChange,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
    onPositionChange?.(percent);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const handleEnd = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent | TouchEvent) => handleMove(e);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full select-none overflow-hidden rounded-lg',
        className
      )}
      style={{ aspectRatio: '16/9' }}
    >
      <Image
        fill
        priority
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        src={afterImage}
        alt={afterLabel || 'After'}
        className='absolute inset-0 h-full w-full object-cover'
        draggable={false}
      />

      <div
        className='absolute inset-0'
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={beforeImage}
          alt={beforeLabel || 'Before'}
          className='h-full w-full object-cover'
          draggable={false}
        />
      </div>

      {beforeLabel && (
        <div className='absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'>
          {beforeLabel}
        </div>
      )}

      {afterLabel && (
        <div className='absolute right-4 top-4 rounded-md bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm'>
          {afterLabel}
        </div>
      )}

      <div
        className='absolute top-0 bottom-0 w-1 cursor-ew-resize'
        style={{ left: `${position}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className='absolute inset-0 -mx-1 bg-white shadow-lg' />
        <div className='absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary shadow-xl'>
          <svg
            className='h-5 w-5 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M8 9l4-4 4 4m0 6l-4 4-4-4'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSliderShowcase() {
  const [position, setPosition] = useState(50);
  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <div>
          <h2 className='text-2xl font-bold'>Before After Slider</h2>
          <p className='text-muted-foreground'>
            A beautiful image comparison slider to compare before and after
            images with smooth drag interactions
          </p>
        </div>

        <div className='rounded-lg border p-6'>
          <BeforeAfterSlider
            beforeImage='https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=675&fit=crop'
            afterImage='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop'
            beforeLabel='Mountain Day'
            afterLabel='Mountain Sunset'
            onPositionChange={setPosition}
          />
          <p className='mt-4 text-center text-sm text-muted-foreground'>
            Position: {Math.round(position)}%
          </p>
        </div>
      </div>
    </div>
    );
}
