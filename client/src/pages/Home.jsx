import React, { useRef, useEffect } from "react";
import { PhaserGame } from "../Phaser.jsx";
import { useBossKeyToId } from "../game/React Hooks/useBossKeyToId";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const phaserRef = useRef(null);
  const bossKeyToId = useBossKeyToId();
  const { user } = useAuth();

  useEffect(() => {
    function handleHighscoreEvent(e) {
      const { bossId: bossKey, time } = e.detail;
      const bossId = bossKeyToId[bossKey];
      if (!bossId || !user?.id) return;

      fetch("/api/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, bossId, time }),
      });
    }

    window.addEventListener("submit-highscore", handleHighscoreEvent);
    return () =>
      window.removeEventListener("submit-highscore", handleHighscoreEvent);
  }, [bossKeyToId, user]);

  return (
    <div className="app-container">
      <PhaserGame ref={phaserRef} />
    </div>
  );
}
