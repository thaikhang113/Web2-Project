export const GAME_META = {
  1: {
    emoji: "C5",
    shortcut: "C5",
    title: "Caro 5",
    instructions: "Dat 5 quan lien tiep theo hang, cot hoac duong cheo de thang may.",
  },
  2: {
    emoji: "C4",
    shortcut: "C4",
    title: "Connect 4",
    instructions: "Dat 4 quan lien tiep tren luoi 7 cot va danh bai AI ngau nhien.",
  },
  3: {
    emoji: "TT",
    shortcut: "TTT",
    title: "Tic Tac Toe",
    instructions: "Ban co 3x3, dat 3 dau lien tiep de chien thang.",
  },
  4: {
    emoji: "SN",
    shortcut: "SNK",
    title: "Snake",
    instructions: "Dieu khien ran bang mui ten, an moi va tranh tu dam vao than.",
  },
  5: {
    emoji: "M3",
    shortcut: "M3",
    title: "Match 3",
    instructions: "Chon cum tu 3 o cung mau tro len de xoa va nhan diem.",
  },
  6: {
    emoji: "MM",
    shortcut: "MEM",
    title: "Memory Match",
    instructions: "Lat 2 the moi luot va ghi nho vi tri de ghep dung cac cap.",
  },
  7: {
    emoji: "FD",
    shortcut: "DRW",
    title: "Free Draw",
    instructions: "Chon mau, di chuyen con tro va to pixel de tao tranh mini.",
  },
};

export const GAME_IDS = Object.keys(GAME_META).map(Number);
