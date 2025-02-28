function Skeleton({ className, ...props }) {
    return (
      <div
        className={`inline-flex select-none leading-none animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
        {...props}
      >
        &zwnj;
      </div>
    );
  }
  
  const SVGSkeleton = ({ className }) => (
    <svg className={className + " animate-pulse rounded bg-gray-300"} />
  );
  
  export { Skeleton, SVGSkeleton };
  