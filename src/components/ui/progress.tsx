"use client";

const Progress = () => {
  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: "translateX(-100%)" }}
      ></div>
    </div>
  );
};

export { Progress };
