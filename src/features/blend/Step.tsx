import type { ReactNode } from "react";
import { cardStyles } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

interface StepProps {
  n: number;
  title: string;
  hint?: string;
  children: ReactNode;
}

export default function Step({ n, title, hint, children }: StepProps) {
  return (
    <section
      className={cn(cardStyles({ tone: "page", radius: "card", padding: "none" }), "p-5 lg:p-6")}
    >
      <div className="mb-4 flex items-start gap-3.5">
        <span className="grid size-8.5 shrink-0 place-items-center rounded-full bg-primary font-bold text-on-primary">
          {n}
        </span>
        <div>
          <h2 className="text-2xl leading-normal">{title}</h2>
          {hint && <p className="text-sm">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
