import { useState, useEffect, ImgHTMLAttributes } from 'react';

interface ImageOptimizerProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  fallbackSrc?: string;
  quality?: number; // 1-100
  sizes?: string; // Responsive sizes
  priority?: boolean; // For above-the-fold images
}

const ImageOptimizer = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = '#f3f4f6',
  fallbackSrc = '/images/placeholder.jpg',
  quality = 85,
  sizes = '100vw',
  priority = false,
  ...props 
}: ImageOptimizerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    const optimizeImagePath = (originalSrc: string) => {
      // Convert to WebP if supported
      if (typeof window !== 'undefined' && 'imageDecoding' in HTMLImageElement.prototype) {
        const extension = originalSrc.split('.').pop()?.toLowerCase();
        if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
          return originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        }
      }
      return originalSrc;
    };

    const loadImage = async () => {
      try {
        const optimized = optimizeImagePath(src);
        setOptimizedSrc(optimized);
        
        const img = new Image();
        img.src = optimized;
        
        img.onload = () => {
          setIsLoading(false);
        };
        
        img.onerror = () => {
          console.warn(`WebP failed, falling back to: ${src}`);
          setOptimizedSrc(src); // Fallback to original
          setIsLoading(false);
        };
        
        // Force load
        if (img.complete) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error optimizing image:', err);
        setOptimizedSrc(src);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src]);

  // Generate srcSet for responsive images
  const generateSrcSet = (imagePath: string) => {
    const sizes = [480, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${imagePath.replace(/(\.\w+)$/, `-${size}w$1`)} ${size}w`)
      .join(', ');
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ 
            backgroundColor: placeholderColor,
            width: props.width ? `${props.width}px` : '100%',
            height: props.height ? `${props.height}px` : '100%'
          }}
        />
      )}
      
      {/* Optimized image */}
      <img
        src={optimizedSrc || src}
        srcSet={generateSrcSet(optimizedSrc || src)}
        sizes={sizes}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.warn(`Image failed to load: ${src}`);
          setError(true);
          if (e.currentTarget.src !== fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
          }
        }}
        {...props}
      />
    </div>
  );
};

// Helper component for hero/important images
export const PriorityImage = (props: ImageOptimizerProps) => (
  <ImageOptimizer priority={true} {...props} />
);

// Helper component for background images
export const BackgroundImage = ({ src, alt, className, ...props }: ImageOptimizerProps) => (
  <div 
    className={`relative ${className}`}
    style={{
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <img 
      src={src} 
      alt={alt} 
      className="sr-only" // Screen reader only
      {...props}
    />
  </div>
);

export default ImageOptimizer;


