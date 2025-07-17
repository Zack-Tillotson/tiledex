import { Suspense } from "react";
import { SkeletonPage } from "@repo/ui";

/**
 * Layout for adventure routes with Suspense boundary
 * Provides loading states for adventure components that may have async data fetching
 */
export default function AdventureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adventure-layout">
      <Suspense fallback={<SkeletonPage />}>
        {children}
      </Suspense>
    </div>
  );
} 