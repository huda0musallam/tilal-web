import { Star } from "lucide-react";

const STARS = [1, 2, 3, 4, 5];

interface StarsProps {
  rating: number;
}

export default function Stars({ rating }: StarsProps) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`تقييم ${rating} من ${STARS.length}`}>
      {STARS.map((n) => (
        <Star
          key={n}
          size={16}
          fill={n <= rating ? "currentColor" : "none"}
          className={n <= rating ? "text-accent" : "text-line"}
        />
      ))}
    </div>
  );
}
