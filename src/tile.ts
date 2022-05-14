export type PassiveTiles = "goat" | "horse" | "bird" | "sloth";
export const passiveTiles = ["goat", "horse", "sloth"];

export type AggressiveTiles = "tiger" | "bear" | "snake" | "mantis-shrimp";
export const aggressiveTiles = [
  "tiger",
  "bear",
  "snake",
  "mantis-shrimp",
  "bird",
];

export type TileRow = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type TileCol = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export function get_tile(
  color: "w" | "o",
  name: PassiveTiles | AggressiveTiles
) {
  return "/tiles/" + color + "-" + name + ".svg";
}
export const goat_w = get_tile("w", "goat");
export const horse_w = get_tile("w", "horse");
export const bird_w = get_tile("w", "bird");
export const sloth_w = get_tile("w", "sloth");

export const tiger_w = get_tile("w", "tiger");
export const bear_w = get_tile("w", "bear");
export const snake_w = get_tile("w", "snake");
export const m_shrimp_w = get_tile("w", "mantis-shrimp");

export const goat_o = get_tile("o", "goat");
export const horse_o = get_tile("o", "horse");
export const bird_o = get_tile("o", "bird");
export const sloth_o = get_tile("o", "sloth");

export const tiger_o = get_tile("o", "tiger");
export const bear_o = get_tile("o", "bear");
export const snake_o = get_tile("o", "snake");
export const m_shrimp_o = get_tile("o", "mantis-shrimp");

export const playable_tiles = {
  w: {
    goat: goat_w,
    horse: horse_w,
    bird: bird_w,
    sloth: sloth_w,

    tiger: tiger_w,
    bear: bear_w,
    snake: snake_w,
    "mantis-shrimp": m_shrimp_w,
  },
  o: {
    goat: goat_o,
    horse: horse_o,
    bird: bird_o,
    sloth: sloth_o,

    tiger: tiger_o,
    bear: bear_o,
    snake: snake_o,
    "mantis-shrimp": m_shrimp_o,
  },
};
