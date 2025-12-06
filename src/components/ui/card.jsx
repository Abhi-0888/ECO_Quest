import * as React from "react";

export function Card({
    title,
    eyebrow,
    value,
    className,
    children,
    ...props
}) {
    const classes = [
        "relative overflow-hidden rounded-2xl border border-emerald-900/70 bg-gradient-to-b from-emerald-900/40 via-slate-950 to-black/95 p-5 shadow-lg shadow-emerald-950/40 backdrop-blur",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...props}>
            {eyebrow && (
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
                    {eyebrow}
                </p>
            )}
            {title && (
                <h3 className="mt-1 text-sm font-semibold text-slate-50">{title}</h3>
            )}
            {value && (
                <p className="mt-2 text-2xl font-semibold text-emerald-300">{value}</p>
            )}
            {children && <div className="mt-3 text-xs text-slate-300">{children}</div>}
        </div>
    );
}

export default Card;
