import { useEffect, useState } from "react";

export function useBossKeyToId() {
  const [bossKeyToId, setBossKeyToId] = useState({});

  useEffect(() => {
    fetch("/api/bosses")
      .then((res) => res.json())
      .then((bosses) => {
        const mapping = {};
        bosses.forEach((boss) => {
          mapping[boss.key] = boss.id;
        });
        setBossKeyToId(mapping);
      });
  }, []);

  return bossKeyToId;
}
