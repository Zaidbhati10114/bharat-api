"use client";

import { useEffect, useState } from "react";

export function useActiveHeading(ids: string[]) {
    const [active, setActive] = useState(() => {
        if (typeof window === "undefined") return ids[0];
        return window.location.hash.replace("#", "") || ids[0];
    });

    useEffect(() => {
        const updateFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && ids.includes(hash)) {
                setActive(hash);
            }
        };

        window.addEventListener("hashchange", updateFromHash);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            (a.target as HTMLElement).offsetTop -
                            (b.target as HTMLElement).offsetTop
                    );

                if (visible.length) {
                    setActive(visible[0].target.id);
                }
            },
            {
                rootMargin: "-120px 0px -60% 0px",
                threshold: 0.15,
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("hashchange", updateFromHash);
            observer.disconnect();
        };
    }, [ids]);

    return active;
}