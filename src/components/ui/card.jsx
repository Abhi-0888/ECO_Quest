"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function Card({
    title,
    eyebrow,
    value,
    className,
    children,
    ...props
}) {
    const classes = [
        "relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-slate-900/40 p-5 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-emerald-900/20",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.4)" }}
            className={classes}
            {...props}
        >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" />

            {eyebrow && (
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400/80">
                    {eyebrow}
                </p>
            )}
            {title && (
                <h3 className="mt-1 text-base font-semibold text-slate-50">{title}</h3>
            )}
            {value && (
                <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">{value}</p>
            )}
            {children && <div className="mt-3 text-xs leading-relaxed text-slate-300">{children}</div>}
        </motion.div>
    );
}

export default Card;
