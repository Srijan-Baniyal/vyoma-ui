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

      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Without Labels</h3>
        <div className='rounded-lg border p-6'>
          <BeforeAfterSlider
            beforeImage='https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=675&fit=crop'
            afterImage='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=675&fit=crop'
            initialPosition={70}
          />
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Installation</h3>
        <div className='rounded-lg border p-6'>
          <pre className='overflow-x-auto'>
            <code>{`npm install clsx tailwind-merge`}</code>
          </pre>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Usage</h3>
        <div className='rounded-lg border p-6'>
          <pre className='overflow-x-auto text-sm'>
            <code>{`import { BeforeAfterSlider } from '@/components/vui/BeforeAfterSlider'

<BeforeAfterSlider
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  beforeLabel="Before"
  afterLabel="After"
  initialPosition={50}
  onPositionChange={(pos) => console.log(pos)}
/>`}</code>
          </pre>
        </div>
      </div>

      <div className='space-y-4'>
        <h3 className='text-xl font-semibold'>Props</h3>
        <div className='rounded-lg border'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-6 py-3 text-left text-sm font-medium'>
                    Prop
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>
                    Type
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>
                    Default
                  </th>
                  <th className='px-6 py-3 text-left text-sm font-medium'>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>beforeImage</td>
                  <td className='px-6 py-3 text-sm'>string</td>
                  <td className='px-6 py-3 text-sm'>-</td>
                  <td className='px-6 py-3 text-sm'>
                    URL or path to the before image
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>afterImage</td>
                  <td className='px-6 py-3 text-sm'>string</td>
                  <td className='px-6 py-3 text-sm'>-</td>
                  <td className='px-6 py-3 text-sm'>
                    URL or path to the after image
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>beforeLabel</td>
                  <td className='px-6 py-3 text-sm'>string</td>
                  <td className='px-6 py-3 text-sm'>&quot;Before&quot;</td>
                  <td className='px-6 py-3 text-sm'>
                    Label text for the before image
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>afterLabel</td>
                  <td className='px-6 py-3 text-sm'>string</td>
                  <td className='px-6 py-3 text-sm'>&quot;After&quot;</td>
                  <td className='px-6 py-3 text-sm'>
                    Label text for the after image
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>
                    initialPosition
                  </td>
                  <td className='px-6 py-3 text-sm'>number</td>
                  <td className='px-6 py-3 text-sm'>50</td>
                  <td className='px-6 py-3 text-sm'>
                    Initial slider position (0-100)
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>className</td>
                  <td className='px-6 py-3 text-sm'>string</td>
                  <td className='px-6 py-3 text-sm'>-</td>
                  <td className='px-6 py-3 text-sm'>Additional CSS classes</td>
                </tr>
                <tr>
                  <td className='px-6 py-3 text-sm font-mono'>
                    onPositionChange
                  </td>
                  <td className='px-6 py-3 text-sm'>(number) =&gt; void</td>
                  <td className='px-6 py-3 text-sm'>-</td>
                  <td className='px-6 py-3 text-sm'>
                    Callback when slider position changes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    );
}
