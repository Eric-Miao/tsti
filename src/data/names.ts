// ─────────────────────────────────────────────────────────────
// 16 型命名表 —— 想改名字 / 英文名 / 一句话标语，只改这个文件
// 代码（EBSA 这种四个字母）不要改，那是计分结果
// ─────────────────────────────────────────────────────────────

export interface TypeName {
  /** 中文名，2–6 个字最好念 */
  name: string
  /** 英文名，分享卡片上会用 */
  en: string
  /** 一句话标语，结果页和卡片上都会出现 */
  tagline: string
}

export const TYPE_NAMES: Record<string, TypeName> = {
  EBSA: {
    name: '底线机关枪',
    en: 'The Baseline Machine Gun',
    tagline: '火力全开，一拍接一拍，不给你喘气',
  },
  EBSD: {
    name: '底线永动机',
    en: 'The Human Metronome',
    tagline: '跑得比你多，笑得比你早',
  },
  EBFA: {
    name: '底线重炮手',
    en: 'The Flatline Cannon',
    tagline: '不转，就是快、就是沉',
  },
  EBFD: {
    name: '底线人形墙',
    en: 'The Wall That Cheers',
    tagline: '全场都在喊，球全给你打回来',
  },
  ENSA: {
    name: '网前轰炸机',
    en: 'The Net Raider',
    tagline: '一有短球就冲，截击还要带旋',
  },
  ENSD: {
    name: '网前钓鱼佬',
    en: 'The Drop-Shot Angler',
    tagline: '放小球、挑高球，钓你上来再解决',
  },
  ENFA: {
    name: '网前刽子手',
    en: 'The Net Executioner',
    tagline: '上来就是一刀，绝不给你第二拍',
  },
  ENFD: {
    name: '奇幻城堡',
    en: 'The Net Wall',
    tagline: '双打里那个把半场焊死的人',
  },
  IBSA: {
    name: '底线闷炮',
    en: 'The Quiet Howitzer',
    tagline: '不说话，一板比一板重',
  },
  IBSD: {
    name: '底线沉默大魔王',
    en: 'The Silent Overlord',
    tagline: '面无表情把每一球都还给你，直到你先崩',
  },
  IBFA: {
    name: '底线冷面重炮',
    en: 'The Ice Cannon',
    tagline: '你还没热身，第一盘已经 0-4',
  },
  IBFD: {
    name: '底线扫地僧',
    en: 'The Baseline Monk',
    tagline: '看着不起眼，一打就是三小时',
  },
  INSA: {
    name: '网前暗器',
    en: 'The Quiet Blade',
    tagline: '悄无声息地往上压，用旋转解决你',
  },
  INSD: {
    name: '网前门神',
    en: 'The Net Magician',
    tagline: '不吼不叫，站那儿就是一堵墙',
  },
  INFA: {
    name: '网前冷面刺客',
    en: 'The Cold Assassin',
    tagline: '一次上网，一次结束',
  },
  INFD: {
    name: '网前静默铁闸',
    en: 'The Silent Gate',
    tagline: '双打里的隐形支柱，回头比分已经 6-2',
  },
}
