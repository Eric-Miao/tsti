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
    name: '机关枪',
    en: 'The Baseline Machine Gun',
    tagline: '「再打一板」，是你这场最常说的话。',
  },
  EBSD: {
    name: '永动机',
    en: 'The Human Metronome',
    tagline: '别人第三盘开始喘，你才开始热身。',
  },
  EBFA: {
    name: '重炮',
    en: 'The Flatline Cannon',
    tagline: '你从不打过渡球。打丢了也认。',
  },
  EBFD: {
    name: '人墙',
    en: 'The Wall That Cheers',
    tagline: '救球救出集锦，观众比对手先站起来。',
  },
  ENSA: {
    name: '轰炸机',
    en: 'The Net Raider',
    tagline: '你上网的速度，比他抬头的速度快。',
  },
  ENSD: {
    name: '钓鱼佬',
    en: 'The Drop-Shot Angler',
    tagline: '你放的小球，落点离网不到一米。',
  },
  ENFA: {
    name: '刽子手',
    en: 'The Net Executioner',
    tagline: '你往前压那一下，对面会退半步。',
  },
  ENFD: {
    name: '奇幻城堡',
    en: 'The Net Wall',
    tagline: '双打里没人记得你的名字，只记得打不穿你。',
  },
  IBSA: {
    name: '闷炮',
    en: 'The Quiet Howitzer',
    tagline: '你赢球的样子，像刚下班。',
  },
  IBSD: {
    name: '大魔王',
    en: 'The Silent Overlord',
    tagline: '打完两个小时，他还是不知道你累不累。',
  },
  IBFA: {
    name: '狙击手',
    en: 'The Sniper',
    tagline: '第一盘 4-0 的时候，你脸上什么也没有。',
  },
  IBFD: {
    name: '扫地僧',
    en: 'The Baseline Monk',
    tagline: '你打球像在还房贷，一期一期，绝不逾期。',
  },
  INSA: {
    name: '暗器',
    en: 'The Quiet Blade',
    tagline: '你想上网这件事，对手总是最后一个知道。',
  },
  INSD: {
    name: '门神',
    en: 'The Net Magician',
    tagline: '你每一拍都在问他：你现在站哪？',
  },
  INFA: {
    name: '冷面刺客',
    en: 'The Cold Assassin',
    tagline: '你不多跑一步，也不少打一板。',
  },
  INFD: {
    name: '铁闸',
    en: 'The Silent Gate',
    tagline: '比分到 6-2，对面才发现你一直在那儿。',
  },
}
