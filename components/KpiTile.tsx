import { TrendingUp, TrendingDown, Minus, ExternalLink, Download, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type SLAStatus = "on-target" | "vulnerable" | "jeopardy" | "neutral";

interface KpiTileProps {
  label: string;
  labelTamil?: string;
  value: string;
  target?: string;
  delta?: number;          // positive = up, negative = down
  deltaLabel?: string;
  status?: SLAStatus;
  source?: string;
  lastUpdated?: string;
  auditHref?: string;
  downloadHref?: string;
  methodologyHref?: string;
  icon?: React.ReactNode;
  className?: string;
}

const statusConfig: Record<SLAStatus, { bg: string; fg: string; label: string }> = {
  "on-target":  { bg: "bg-sla-on-target-bg",  fg: "text-sla-on-target-fg",  label: "On Target" },
  "vulnerable": { bg: "bg-sla-vulnerable-bg", fg: "text-sla-vulnerable-fg", label: "At Risk" },
  "jeopardy":   { bg: "bg-sla-jeopardy-bg",   fg: "text-sla-jeopardy-fg",   label: "Jeopardy" },
  "neutral":    { bg: "bg-slate-100",          fg: "text-slate-600",          label: "" },
};

export default function KpiTile({
  label, labelTamil, value, target, delta, deltaLabel,
  status = "neutral", source, lastUpdated, auditHref,
  downloadHref, methodologyHref, icon, className,
}: KpiTileProps) {
  const cfg = statusConfig[status];
  const isUp   = delta !== undefined && delta > 0;
  const isDown = delta !== undefined && delta < 0;

  return (
    <div className={cn("kpi-tile", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary-600">{icon}</span>}
          <div>
            <p className="text-sm font-semibold text-slate-700 leading-tight">{label}</p>
            {labelTamil && (
              <p className="text-xs text-slate-400 font-tamil mt-0.5">{labelTamil}</p>
            )}
          </div>
        </div>
        {status !== "neutral" && (
          <span className={cn("badge text-xs flex-shrink-0", cfg.bg, cfg.fg)}>
            {cfg.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-1">
        <span className="text-2xl font-bold text-slate-900 font-data tabular-nums">{value}</span>
        {target && (
          <span className="text-xs text-slate-400 ml-2">/ {target}</span>
        )}
      </div>

      {/* Delta */}
      {delta !== undefined && (
        <div className={cn("flex items-center gap-1 text-xs font-medium", isUp ? "text-success-600" : isDown ? "text-danger-600" : "text-slate-400")}>
          {isUp   ? <TrendingUp  className="w-3.5 h-3.5" /> :
           isDown ? <TrendingDown className="w-3.5 h-3.5" /> :
                    <Minus className="w-3.5 h-3.5" />}
          <span>{delta > 0 ? "+" : ""}{delta}%</span>
          {deltaLabel && <span className="text-slate-400 font-normal">{deltaLabel}</span>}
        </div>
      )}

      {/* Trust strip */}
      {(source || lastUpdated || auditHref || downloadHref || methodologyHref) && (
        <div className="trust-strip">
          {source && <span>📊 {source}</span>}
          {lastUpdated && <span>🕐 {lastUpdated}</span>}
          {auditHref && (
            <a href={auditHref} className="flex items-center gap-0.5 hover:text-primary-600 transition-colors">
              <ExternalLink className="w-3 h-3" /> Audit
            </a>
          )}
          {downloadHref && (
            <a href={downloadHref} className="flex items-center gap-0.5 hover:text-primary-600 transition-colors">
              <Download className="w-3 h-3" /> Data
            </a>
          )}
          {methodologyHref && (
            <a href={methodologyHref} className="flex items-center gap-0.5 hover:text-primary-600 transition-colors">
              <HelpCircle className="w-3 h-3" /> How?
            </a>
          )}
        </div>
      )}
    </div>
  );
}
