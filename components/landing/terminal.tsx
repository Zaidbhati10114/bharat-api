import { Circle, Copy } from "lucide-react";

export function Terminal() {
  return (
    <div className="bg-background/80 relative overflow-hidden rounded-3xl border shadow-[0_30px_80px_rgba(0,0,0,.15)] backdrop-blur-xl dark:shadow-[0_30px_80px_rgba(0,0,0,.45)]">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex gap-2">
          <Circle className="size-3 fill-red-500 text-red-500" />
          <Circle className="size-3 fill-yellow-500 text-yellow-500" />
          <Circle className="size-3 fill-green-500 text-green-500" />
        </div>

        <button className="hover:bg-muted rounded-md p-2">
          <Copy className="size-4" />
        </button>
      </div>

      <div className="space-y-5 p-5 font-mono text-xs sm:p-7 sm:text-sm">
        <div className="text-green-500">
          $ curl api.bharatapi.dev/v1/pincode/421201
        </div>

        <pre className="text-foreground overflow-x-auto">
          {`{
  "success": true,
  "data": {
    "city": "Dombivli",
    "district": "Thane",
    "state": "Maharashtra"
  }
}`}
        </pre>
      </div>
    </div>
  );
}
