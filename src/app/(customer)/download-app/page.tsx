import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export default function DownloadAppPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
        <Smartphone className="h-8 w-8" />
      </div>
      <div>
        <h1 className="text-xl font-semibold">Kirana Commerce — Android App</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Install the app for a faster, native ordering experience with GPS
          address picking and camera-based payment proof uploads.
        </p>
      </div>

      <Card>
        <CardBody className="space-y-3 text-left text-sm">
          <p className="font-medium">Current status</p>
          <p className="text-neutral-500">
            The Android build is produced by wrapping this website with
            Capacitor (remote mode against this deployed URL). The signed
            APK is not attached yet for this submission — the build step is
            tracked in <code>docs/CURRENT_STATE.md</code> as the next task
            after the web MVP.
          </p>
        </CardBody>
      </Card>

      <Button size="lg" disabled className="w-full">
        Download APK (coming soon)
      </Button>
    </div>
  );
}
