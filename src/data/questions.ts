export type Dim = 'EI' | 'BN' | 'SF' | 'AD'
export type Pole = 'E' | 'I' | 'B' | 'N' | 'S' | 'F' | 'A' | 'D'

export interface Option {
  pole: Pole
  text: string
}

export interface Question {
  id: number
  dim: Dim
  scene: string
  a: Option
  b: Option
}

export const DIMENSIONS: Record<
  Dim,
  { name: string; left: Pole; right: Pole; leftLabel: string; rightLabel: string; desc: string }
> = {
  EI: {
    name: '比赛气质',
    left: 'E',
    right: 'I',
    leftLabel: '外放',
    rightLabel: '内敛',
    desc: '得分失分写在脸上，还是收在心里',
  },
  BN: {
    name: '主场位置',
    left: 'B',
    right: 'N',
    leftLabel: '底线',
    rightLabel: '网前',
    desc: '你默认站在哪，球飞过来时脚往哪走',
  },
  SF: {
    name: '击球质感',
    left: 'S',
    right: 'F',
    leftLabel: '上旋',
    rightLabel: '平击',
    desc: '你要安全边际，还是要穿透力',
  },
  AD: {
    name: '比赛取向',
    left: 'A',
    right: 'D',
    leftLabel: '进攻',
    rightLabel: '防守',
    desc: '分数是抢来的，还是等来的',
  },
}

export const QUESTIONS: Question[] = [
  // ── 比赛气质 E / I ─────────────────────────────
  {
    id: 1,
    dim: 'EI',
    scene: '打出一记漂亮的制胜分之后，你通常',
    a: { pole: 'E', text: '握拳喊一声，顺势看一眼搭档或者场边' },
    b: { pole: 'I', text: '转身走回底线，脑子里过一遍刚才的动作' },
  },
  {
    id: 2,
    dim: 'EI',
    scene: '对手打出一记你完全够不到的压线球',
    a: { pole: 'E', text: '“好球”脱口而出，甚至会笑一下' },
    b: { pole: 'I', text: '低头理一下拍线，什么也不说' },
  },
  {
    id: 3,
    dim: 'EI',
    scene: '双打里你一记截击下网，送了破发点',
    a: { pole: 'E', text: '马上说“我的我的，下个球给我”' },
    b: { pole: 'I', text: '摆摆手示意，把注意力收回到站位上' },
  },
  {
    id: 4,
    dim: 'EI',
    scene: '换边休息的九十秒，你更可能在',
    a: { pole: 'E', text: '和对手或搭档聊两句，哪怕之前不认识' },
    b: { pole: 'I', text: '喝水、擦汗，想下一局第一个发球落哪' },
  },
  {
    id: 5,
    dim: 'EI',
    scene: '让认识你的人形容你场上的表情',
    a: { pole: 'E', text: '很丰富，赢一分输一分都看得出来' },
    b: { pole: 'I', text: '基本没有，得分失分一个样' },
  },
  {
    id: 6,
    dim: 'EI',
    scene: '连丢三分之后，你的第一个动作是',
    a: { pole: 'E', text: '大声给自己打气，或者拍一下大腿' },
    b: { pole: 'I', text: '深呼吸，把节奏放慢，一句话不说' },
  },
  {
    id: 7,
    dim: 'EI',
    scene: '有人夸你“打球很有气势”',
    a: { pole: 'E', text: '对，我就是靠气场压人的' },
    b: { pole: 'I', text: '我更希望别人说我“球很扎实”' },
  },

  // ── 主场位置 B / N ─────────────────────────────
  {
    id: 8,
    dim: 'BN',
    scene: '你一发进区，对手回了一个中场球',
    a: { pole: 'B', text: '上前打一记大角度，然后退回底线' },
    b: { pole: 'N', text: '直接冲上去，能截就截' },
  },
  {
    id: 9,
    dim: 'BN',
    scene: '你更享受哪一种得分',
    a: { pole: 'B', text: '底线对拉十几拍，最后一记反斜线打死' },
    b: { pole: 'N', text: '上网一记截击，对手连反应都没有' },
  },
  {
    id: 10,
    dim: 'BN',
    scene: '双打，搭档问你想打哪一边',
    a: { pole: 'B', text: '我在后面打底，你上网' },
    b: { pole: 'N', text: '我站网前，那是我的地盘' },
  },
  {
    id: 11,
    dim: 'BN',
    scene: '一个下午只能练一项技术',
    a: { pole: 'B', text: '底线正反手的稳定性和深度' },
    b: { pole: 'N', text: '截击手感和第一反应' },
  },
  {
    id: 12,
    dim: 'BN',
    scene: '你在场上的“舒适区”是',
    a: { pole: 'B', text: '底线后一米，整个场地都在视线里' },
    b: { pole: 'N', text: '发球线以内，越靠近网越踏实' },
  },
  {
    id: 13,
    dim: 'BN',
    scene: '对手开始频繁放小球',
    a: { pole: 'B', text: '觉得烦，但宁愿退回去继续打相持' },
    b: { pole: 'N', text: '正好，我本来就想往前压' },
  },
  {
    id: 14,
    dim: 'BN',
    scene: '你的身体最习惯的启动方向是',
    a: { pole: 'B', text: '横向，左右移动去救球' },
    b: { pole: 'N', text: '向前，往网口那一步' },
  },

  // ── 击球质感 S / F ─────────────────────────────
  {
    id: 15,
    dim: 'SF',
    scene: '你更信任哪一种球',
    a: { pole: 'S', text: '过网高一点，落点深一点，安全' },
    b: { pole: 'F', text: '过网低一点，速度快一点，穿过去' },
  },
  {
    id: 16,
    dim: 'SF',
    scene: '关键分，你更愿意',
    a: { pole: 'S', text: '加一转，把球压到对方反手深区' },
    b: { pole: 'F', text: '平击打直线，赌他接不回来' },
  },
  {
    id: 17,
    dim: 'SF',
    scene: '看自己的慢动作回放，你的引拍',
    a: { pole: 'S', text: '幅度大，明显从下往上刷' },
    b: { pole: 'F', text: '幅度小，拍头几乎直接从后往前' },
  },
  {
    id: 18,
    dim: 'SF',
    scene: '你更不能接受的失误是',
    a: { pole: 'S', text: '球出界——旋转没压住' },
    b: { pole: 'F', text: '球下网——过网高度不够' },
  },
  {
    id: 19,
    dim: 'SF',
    scene: '球友形容你的球',
    a: { pole: 'S', text: '“很重”“弹起来顶人”' },
    b: { pole: 'F', text: '“很快”“贴地就过去了”' },
  },
  {
    id: 20,
    dim: 'SF',
    scene: '面对一个一米九的对手',
    a: { pole: 'S', text: '打到他肩膀以上，让他难受' },
    b: { pole: 'F', text: '打他脚下，让他弯不下去' },
  },
  {
    id: 21,
    dim: 'SF',
    scene: '换线的时候，你最在意',
    a: { pole: 'S', text: '能不能吃住球、给足旋转' },
    b: { pole: 'F', text: '出球干不干脆、控不控得住' },
  },

  // ── 比赛取向 A / D ─────────────────────────────
  {
    id: 22,
    dim: 'AD',
    scene: '这一球你有七成把握打出制胜分',
    a: { pole: 'A', text: '打，这种机会不常有' },
    b: { pole: 'D', text: '不打，先保证这一分不丢' },
  },
  {
    id: 23,
    dim: 'AD',
    scene: '你的分数主要来自',
    a: { pole: 'A', text: '自己打出来的制胜分' },
    b: { pole: 'D', text: '对手在我这儿磨出来的失误' },
  },
  {
    id: 24,
    dim: 'AD',
    scene: '2-5 落后，你还有发球局',
    a: { pole: 'A', text: '加大风险，反正也是输' },
    b: { pole: 'D', text: '一分一分磨，等他自己乱' },
  },
  {
    id: 25,
    dim: 'AD',
    scene: '你更不能接受哪种输法',
    a: { pole: 'A', text: '太保守，一直被压着打完' },
    b: { pole: 'D', text: '太冒险，失误送掉整场' },
  },
  {
    id: 26,
    dim: 'AD',
    scene: '对手明显比你稳',
    a: { pole: 'A', text: '必须主动变线，不能跟他耗' },
    b: { pole: 'D', text: '先跟上他的节奏，再等他松' },
  },
  {
    id: 27,
    dim: 'AD',
    scene: '双打里你更愿意',
    a: { pole: 'A', text: '抢网、抢攻，把压力扔给对方' },
    b: { pole: 'D', text: '稳住底线，让搭档去冒险' },
  },
  {
    id: 28,
    dim: 'AD',
    scene: '你希望一场比赛',
    a: { pole: 'A', text: '四十分钟结束，快刀斩乱麻' },
    b: { pole: 'D', text: '打满三盘，我耗得起' },
  },
]

export const QUESTIONS_PER_DIM = 7
