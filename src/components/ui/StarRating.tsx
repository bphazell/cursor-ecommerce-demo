import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  size = "sm",
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= Math.round(rating)
                ? "fill-[var(--color-rating)] text-[var(--color-rating)]"
                : "fill-transparent text-[var(--color-border)]"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-[var(--color-muted-foreground)]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
