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
    tagline: '观众还没坐稳，你的正手已经连上三板。',
  },
  EBSD: {
    name: '永动机',
    en: 'The Human Metronome',
    tagline: '从这一角跑到那一角，你的喊声比脚步先到。',
  },
  EBFA: {
    name: '重炮',
    en: 'The Flatline Cannon',
    tagline: '球刚离拍，那声闷响已经替你说了话。',
  },
  EBFD: {
    name: '人墙',
    en: 'The Wall That Cheers',
    tagline: '球都快贴地了，你还能救回来，顺便转个身。',
  },
  ENSA: {
    name: '轰炸机',
    en: 'The Net Raider',
    tagline: '你发球后往前迈的三步，就是对手全部的时间。',
  },
  ENSD: {
    name: '钓鱼佬',
    en: 'The Drop-Shot Angler',
    tagline: '你每放一个小球都要摊手，像在说这球是风帮我放的。',
  },
  ENFA: {
    name: '刽子手',
    en: 'The Net Executioner',
    tagline: '你上网那一刀下去，整个球场都听见了。',
  },
  ENFD: {
    name: '奇幻城堡',
    en: 'The Net Wall',
    tagline: '你往网前一站，搭档就敢把整条斜线让给你。',
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
    tagline: '你打球越打越省力，第四盘还是开场那个节奏。',
  },
  INSA: {
    name: '暗器',
    en: 'The Quiet Blade',
    tagline: '你想上网这件事，对手总是最后一个知道。',
  },
  INSD: {
    name: '门神',
    en: 'The Net Magician',
    tagline: '你放短球的手很轻，像把球放在网前的地上。',
  },
  INFA: {
    name: '冷面刺客',
    en: 'The Cold Assassin',
    tagline: '你不多跑一步，也不少打一板。',
  },
  INFD: {
    name: '铁闸',
    en: 'The Silent Gate',
    tagline: '搭档回头看一眼，你还在网前那个位置上。',
  },
}
