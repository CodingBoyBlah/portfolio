export const COLS = 17;
export const ROWS = 9;
export const PIXELS = COLS * ROWS;
export const FPS = 30;
export const PACKED_BYTES = Math.ceil(PIXELS / 8);
export const PIXEL_ON = "#262629";
export const PIXEL_OFF = "#d9d9d6";

export const BIN_URL = "/badapple-intro-17x9.v2.bin";

export const END_CARD_CELLS: readonly (readonly [number, number])[] = [
  [0, 4], [1, 3], [2, 2], [3, 1], [4, 0],
  [5, 1], [6, 2], [7, 3], [8, 4],
  [7, 5], [6, 6], [5, 7], [4, 8], [3, 9],
  [2, 10], [1, 11], [0, 12],
  [1, 13], [2, 14], [3, 15], [4, 16],
  [5, 15], [6, 14], [7, 13], [8, 12],
];

export const END_CARD_SET = new Set(
  END_CARD_CELLS.map(([r, c]) => r * COLS + c),
);
