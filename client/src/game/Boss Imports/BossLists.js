export const bosses = [
  { name: "Plexus Sentinel", sceneKey: "Plexus", id: "plexus" },
  { name: "Placeholder", sceneKey: "Placeholder", id: "placeholder" },
];

// Helper: get boss name from sceneKey
export function getBossNameFromSceneKey(sceneKey) {
  const boss = bosses.find((b) => b.sceneKey === sceneKey);
  return boss ? boss.name : sceneKey;
}

// Helper: get boss ID from sceneKey (for backend)
export function getBossIdFromSceneKey(sceneKey) {
  const boss = bosses.find((b) => b.sceneKey === sceneKey);
  return boss ? boss.id : null;
}
