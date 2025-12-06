"use client";

import * as React from "react";

const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses = {
    primary:
        "bg-emerald-500 text-white shadow-sm hover:bg-emerald-400 active:bg-emerald-500",
    secondary:
        "border border-emerald-500/60 bg-transparent text-emerald-200 hover:bg-emerald-500/10",
    ghost: "text-emerald-200 hover:bg-emerald-500/10",
};

const sizeClasses = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    className,
    ...props
}) {
    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return <button className={classes} {...props} />;
}
