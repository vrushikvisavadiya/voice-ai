"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewInterviewPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/job-prep/create");
  }, [router]);

  return (
    <div className="p-8 text-center text-sm text-muted-foreground">
      Redirecting to Mock Interview Creation...
    </div>
  );
}
