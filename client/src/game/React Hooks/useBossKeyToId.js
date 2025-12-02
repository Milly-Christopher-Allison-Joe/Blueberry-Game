import { useEffect, useState } from "react";

export function useBossKeyToId() {
  const [bossKeyToId, setBossKeyToId] = useState({});

  useEffect(() => {
    console.log("Fetching /api/bosses...");
    fetch("/api/bosses")
      .then((res) => res.json())
      .then((bosses) => {
        // console.log("Bosses response:", bosses);
        const mapping = {};
        bosses.forEach((boss) => {
          mapping[boss.key] = boss.id;
        });
        setBossKeyToId(mapping);
        // console.log("Loaded bossKeyToId mapping:", mapping);
      });
  }, []);

  return bossKeyToId;
}
