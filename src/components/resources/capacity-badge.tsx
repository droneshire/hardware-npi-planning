import { Badge } from "@/components/ui/badge"
import { CapacityStatus } from "@/types"

interface CapacityBadgeProps {
  status: CapacityStatus
}

const STATUS_CONFIG: Record<
  CapacityStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  normal: { label: "Normal", variant: "default" },
  warning: { label: "Warning", variant: "secondary" },
  critical: { label: "Critical", variant: "destructive" },
}

export function CapacityBadge({ status }: CapacityBadgeProps) {
  const config = STATUS_CONFIG[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
