import { Star } from "lucide-react";
import styles from "./Stars.module.css";

const STARS = [1, 2, 3, 4, 5];

interface StarsProps {
  rating: number;
}

export default function Stars({ rating }: StarsProps) {
  return (
    <div className={styles.stars} role="img" aria-label={`تقييم ${rating} من ${STARS.length}`}>
      {STARS.map((n) => (
        <Star
          key={n}
          size={16}
          fill={n <= rating ? "currentColor" : "none"}
          className={n <= rating ? styles.starOn : styles.starOff}
        />
      ))}
    </div>
  );
}
