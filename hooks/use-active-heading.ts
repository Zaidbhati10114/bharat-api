"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(ids: string[]) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio ||
                            a.boundingClientRect.top - b.boundingClientRect.top
                    );

                if (visible[0]) {
                    setActive(visible[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: [0.1, 0.3, 0.6],
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    return active;
}