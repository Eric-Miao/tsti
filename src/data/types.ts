import { TYPE_NAMES } from './names'

export interface PlayerRef {
  name: string
  note: string
}

export interface TennisType {
  code: string
  name: string
  en: string
  tagline: string
  summary: string
  players: PlayerRef[]
  profile: { label: string; value: string }[]
  strengths: string[]
  weaknesses: string[]
  gear: { label: string; value: string }[]
  doubles: string
  bestPartner: string
  nightmare: string
  training: string
}

type TypeProfile = Omit<TennisType, 'name' | 'en' | 'tagline'>

const PROFILES: Record<string, TypeProfile> = {
  EBSA: {
    code: 'EBSA',
    summary:
      '你站在底线后方，但你不是在等——你是在找下一板。上旋把球压得又高又深，节奏一板比一板快，对手刚适应一个速度，你已经换了个角度。你的情绪是燃料：打顺了能把整片球场点燃，打不顺的时候，那团火也会烧到自己。',
    players: [
      { name: '拉斐尔·纳达尔', note: '左手重上旋 + 底线压迫，模板级 EBSA' },
      { name: '卡洛斯·阿尔卡拉斯', note: '把上旋和爆发力混在一起的下一代版本' },
    ],
    profile: [
      { label: '站位', value: '底线后 1–2 米，偏反手侧' },
      { label: '得分来源', value: '正手大角度 + 连续压制' },
      { label: '过网高度', value: '高，安全边际优先' },
      { label: '节奏', value: '一板比一板快' },
    ],
    strengths: ['上旋质量高，球到对面肩上还在往上跳', '连续进攻能力强，不怕多拍', '场上感染力强，能把搭档一起带起来'],
    weaknesses: ['情绪一旦掉下去，整盘球跟着掉', '体能消耗大，第三盘容易掉速', '遇到会变节奏的人容易急'],
    gear: [
      { label: '球拍', value: '100 平方英寸，偏头重' },
      { label: '拍线', value: '聚酯 1.25' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '红土最舒服' },
    ],
    doubles: '底线主攻，负责把球打到对方网前脚下',
    bestPartner: 'ENFD',
    nightmare: 'IBFD',
    training: '练“第三板”——不是练第一板有多重，是练第二板还能不能保持同样的质量。',
  },

  EBSD: {
    code: 'EBSD',
    summary:
      '你是那种让对手打到怀疑人生的人。球永远能回来，而且回来的时候还带着旋。你不追求一拍打死，你追求的是“你再打一板”。全场都能听见你的声音，但那不是紧张，那是你在给自己充电。',
    players: [
      { name: '迭戈·施瓦茨曼', note: '一米七的身高，跑出两米八的覆盖范围' },
      { name: '可可·高芙', note: '用防守和跑动把比赛拖进自己的节奏' },
    ],
    profile: [
      { label: '站位', value: '底线后两米开外' },
      { label: '得分来源', value: '对手先崩' },
      { label: '过网高度', value: '很高' },
      { label: '节奏', value: '稳定重复' },
    ],
    strengths: ['覆盖范围大，救球能力强', '心理韧性强，落后也不变形', '防守型上旋球质量高'],
    weaknesses: ['主动得分手段少', '遇到上网型容易被压制', '体能一旦见底就崩得很快'],
    gear: [
      { label: '球拍', value: '轻量化 285–300g' },
      { label: '拍线', value: '多纤维或软聚酯' },
      { label: '磅数', value: '46–50' },
      { label: '场地', value: '红土、慢硬地' },
    ],
    doubles: '底线保底，把球吊深让搭档抢网',
    bestPartner: 'ENFA',
    nightmare: 'ENFA',
    training: '每周一次“只许进攻”的对打，逼自己长出主动得分的手段。',
  },

  EBFA: {
    code: 'EBFA',
    summary:
      '你的字典里没有“过渡球”。每一板都当最后一板打，平击、低平、穿透。你进球的时候，球场会安静一秒；你失误的时候，你自己会先喊出来。',
    players: [
      { name: '阿丽娜·萨巴伦卡', note: '用平击和音量同时压制对手' },
      { name: '胡安·马丁·德尔波特罗', note: '正手一板过，不需要第二拍' },
    ],
    profile: [
      { label: '站位', value: '底线内半步' },
      { label: '得分来源', value: '正手平击' },
      { label: '过网高度', value: '低' },
      { label: '节奏', value: '快而重' },
    ],
    strengths: ['单板杀伤力顶级', '抢点早，压缩对手时间', '气势压制，对手会主动缩'],
    weaknesses: ['失误率高，尤其关键分', '面对高球和防守型容易急', '二发是明显短板'],
    gear: [
      { label: '球拍', value: '98–100，偏头轻好挥速' },
      { label: '拍线', value: '聚酯 1.25–1.30' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '快速硬地' },
    ],
    doubles: '底线重炮，接发直接抢攻',
    bestPartner: 'ENFD',
    nightmare: 'IBSD',
    training: '关键分只打七成力，练“可控的重”。',
  },

  EBFD: {
    code: 'EBFD',
    summary:
      '你是表演型防守。别人以为你在被动挨打，其实你在等他打累。你能把几乎不可能的球救回来，还顺手做个动作。观众喜欢你，对手恨你。',
    players: [{ name: '加埃尔·孟菲尔斯', note: '把防守打成表演，把救球打成集锦' }],
    profile: [
      { label: '站位', value: '底线后很远' },
      { label: '得分来源', value: '防守反击 + 对手失误' },
      { label: '过网高度', value: '中等' },
      { label: '节奏', value: '忽快忽慢' },
    ],
    strengths: ['身体素质顶级', '防守转攻的爆发力惊人', '心理不易崩，越打越有戏'],
    weaknesses: ['打法消耗身体', '有时为了好看多打一板', '主动结束分数的意愿低'],
    gear: [
      { label: '球拍', value: '100，偏头轻便于挥速' },
      { label: '拍线', value: '软聚酯' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线兜底，偶尔上网偷袭',
    bestPartner: 'ENFA',
    nightmare: 'EBFA',
    training: '练“该结束就结束”——防守反击的最后一板要敢下手。',
  },

  ENSA: {
    code: 'ENSA',
    summary:
      '你把网前当成终点线。发球上网、接发上网、相持中突然上网。你的截击不是挡过去，是带着旋转往下砸。你打球的样子很像在往前扑。',
    players: [
      { name: '帕特·拉夫特', note: '发球上网 + 上旋截击的标准答案' },
      { name: '玛蒂娜·纳芙拉蒂洛娃', note: '把网前变成主场的第一人' },
    ],
    profile: [
      { label: '站位', value: '发球线附近' },
      { label: '得分来源', value: '上网截击' },
      { label: '过网高度', value: '截击高吊都能打' },
      { label: '节奏', value: '持续前压' },
    ],
    strengths: ['上网时机判断好', '截击带旋，落点刁', '压迫感极强，对手会提前慌'],
    weaknesses: ['被穿越后回不来', '挑高球是死穴', '底线相持耐心不足'],
    gear: [
      { label: '球拍', value: '97–100，平衡偏头轻' },
      { label: '拍线', value: '天然肠或软聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '快速硬地、草地' },
    ],
    doubles: '网前主攻，抢网积极',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练被穿越之后的回位路线，别站在原地看。',
  },

  ENSD: {
    code: 'ENSD',
    summary:
      '你不靠力量，你靠让对方跑错方向。短球、挑高、切削、突然上网，你的每一拍都在问同一个问题：你现在站在哪？你最喜欢看对手冲刺之后再回头找球。',
    players: [
      { name: '阿兰查·桑切斯·维卡里奥', note: '挑高球和防守反击的教科书' },
      { name: '卡拉·苏亚雷斯·纳瓦罗', note: '手感与变化流的天花板' },
    ],
    profile: [
      { label: '站位', value: '中场游走' },
      { label: '得分来源', value: '调动 + 手感球' },
      { label: '过网高度', value: '变化极大' },
      { label: '节奏', value: '慢，然后突然快' },
    ],
    strengths: ['手感极佳，小球和挑高是武器', '战术想象力强', '擅长打乱对手节奏'],
    weaknesses: ['遇到力量型容易被压死', '手感球失误代价高', '体能消耗常被低估'],
    gear: [
      { label: '球拍', value: '98–100，控制型' },
      { label: '拍线', value: '天然肠或多纤维' },
      { label: '磅数', value: '50–55' },
      { label: '场地', value: '红土、草地' },
    ],
    doubles: '网前变化，负责制造机会',
    bestPartner: 'EBFA',
    nightmare: 'EBFA',
    training: '每局至少打一板“正常球”，别让变化变成逃避。',
  },

  ENFA: {
    code: 'ENFA',
    summary:
      '你的网球只有两个区域：网前，和正在去网前的路上。发球上网、截击、扑上去，动作大、声音大、决心大。你上网的时候，对手会下意识往后退半步。',
    players: [
      { name: '鲍里斯·贝克尔', note: '鱼跃截击，网前就是他的地盘' },
      { name: '约翰·麦肯罗', note: '手感、嘴和上网，三样都是顶级' },
    ],
    profile: [
      { label: '站位', value: '发球线以内' },
      { label: '得分来源', value: '截击 + 高压' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '极快' },
    ],
    strengths: ['网前终结能力顶级', '气势压倒性强', '敢于在关键分上网'],
    weaknesses: ['被穿越后情绪波动大', '底线相持能力弱', '二发上网风险高'],
    gear: [
      { label: '球拍', value: '95–98，头轻好挥' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地、快速硬地' },
    ],
    doubles: '网前猎手，从第一分抢到最后',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练“上网第一拍”——发球之后那个截击决定一切。',
  },

  ENFD: {
    code: 'ENFD',
    summary:
      '你是双打的骨架。不抢镜、不冒险，但对方的每一个斜线都会撞上你。你的价值不在精彩球，在于对手根本不敢往你这边打。',
    players: [{ name: '迈克·布莱恩', note: '双打网前封网的黄金标准' }],
    profile: [
      { label: '站位', value: '网前正中，略微侧身' },
      { label: '得分来源', value: '封网 + 逼迫对方失误' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '稳定' },
    ],
    strengths: ['封网面积大', '站位意识顶级', '情绪稳定，是搭档的定心丸'],
    weaknesses: ['单打场景价值下降', '主动变线少', '被高吊容易失位'],
    gear: [
      { label: '球拍', value: '100+，偏头轻' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '网前后场全覆盖，负责封死斜线',
    bestPartner: 'EBSA',
    nightmare: 'ENSD',
    training: '练“半步”——网前不是站死，是每一拍微调。',
  },

  IBSA: {
    code: 'IBSA',
    summary:
      '你不多话，但你的球在说话。引拍大、旋转足、落点深，一板一板往上加。别人打到第三盘开始喘，你的球反而更重了。',
    players: [
      { name: '多米尼克·蒂姆', note: '单反重上旋，安静但每板都在加码' },
      { name: '古斯塔沃·库尔滕', note: '红土上的旋转大师' },
    ],
    profile: [
      { label: '站位', value: '底线后一米' },
      { label: '得分来源', value: '正手或单反的重上旋' },
      { label: '过网高度', value: '高' },
      { label: '节奏', value: '稳定加速' },
    ],
    strengths: ['单板质量高', '体能储备好', '不轻易情绪化'],
    weaknesses: ['启动慢，怕快节奏', '面对上网型反应偏慢', '关键分缺少变化'],
    gear: [
      { label: '球拍', value: '100，偏头重' },
      { label: '拍线', value: '聚酯 1.30' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '红土' },
    ],
    doubles: '底线重炮，负责打死',
    bestPartner: 'ENFD',
    nightmare: 'ENFA',
    training: '练接发抢点，别让球把你推到三米外。',
  },

  IBSD: {
    code: 'IBSD',
    summary:
      '你不喊、不笑、不解释。你只是把球回到一个让你难受的位置，然后再来一次。对手打到第二盘会开始怀疑：这个人到底会不会累？',
    players: [
      { name: '诺瓦克·德约科维奇', note: '接发、防守、反击，全都不动声色' },
      { name: '安迪·穆雷', note: '用回球把你磨到失去耐心' },
    ],
    profile: [
      { label: '站位', value: '底线内半步' },
      { label: '得分来源', value: '对手失误 + 反击' },
      { label: '过网高度', value: '中高' },
      { label: '节奏', value: '稳定压制' },
    ],
    strengths: ['接发顶级', '防守转攻无缝衔接', '心理强度极高'],
    weaknesses: ['主动进攻欲望低', '遇到极端上网型会难受', '打法对体能要求高'],
    gear: [
      { label: '球拍', value: '100，平衡型' },
      { label: '拍线', value: '聚酯或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线核心，负责不丢',
    bestPartner: 'ENFA',
    nightmare: 'ENFA',
    training: '练“机会球必须下手”，别把优势球也打成相持。',
  },

  IBFA: {
    code: 'IBFA',
    summary:
      '你不喊不叫，但每一板都在推进。平击、低平、落点深，表情从头到尾没变过。对手经常打完才发现：刚才那四局，自己一分都没主动拿到。',
    players: [
      { name: '大坂直美', note: '平击重炮 + 全程无表情' },
      { name: '托马斯·伯蒂奇', note: '干净利落的平击，情绪从不外露' },
    ],
    profile: [
      { label: '站位', value: '底线内' },
      { label: '得分来源', value: '平击制胜分' },
      { label: '过网高度', value: '低' },
      { label: '节奏', value: '快' },
    ],
    strengths: ['出球干净，速度快', '心理不外露，很难被读', '关键分敢打'],
    weaknesses: ['情绪低落时状态断崖', '变化少，容易被适应', '被拖入多拍容易失去耐心'],
    gear: [
      { label: '球拍', value: '98–100' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线主攻',
    bestPartner: 'ENFD',
    nightmare: 'IBSD',
    training: '练被动球的过渡，不要每一板都用同一种力度。',
  },

  IBFD: {
    code: 'IBFD',
    summary:
      '你没有一项技术特别吓人，但也没有一项能被针对。你回球平、深、稳，跑动不声不响。对手往往打到一半才发现，自己已经不自觉地在跟着你的节奏走。',
    players: [
      { name: '尼古拉·达维登科', note: '平击、深球、零表情，纯效率流' },
      { name: '张德培', note: '用稳定和跑动耗死比他强壮的对手' },
    ],
    profile: [
      { label: '站位', value: '底线后半步' },
      { label: '得分来源', value: '稳定 + 反击' },
      { label: '过网高度', value: '中低' },
      { label: '节奏', value: '均匀' },
    ],
    strengths: ['失误率极低', '回球深度稳定', '不挑场地，什么条件都能打'],
    weaknesses: ['缺少一锤定音的能力', '遇到重炮容易被压', '打法不讨喜，容易被低估'],
    gear: [
      { label: '球拍', value: '100，控制型' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '任何场地' },
    ],
    doubles: '底线保底',
    bestPartner: 'ENFA',
    nightmare: 'EBFA',
    training: '练一记“必须要有的得分手段”，哪怕只是发球。',
  },

  INSA: {
    code: 'INSA',
    summary:
      '你上网的时候没有声音，也没有预兆。kick serve 把对手顶起来，第二拍你已经站在网前了。你的截击不追求力量，追求角度——你更愿意让对手跑，而不是让对手怕。',
    players: [
      { name: '斯蒂芬·埃德伯格', note: '发球上网 + 优雅截击，安静地杀死比赛' },
      { name: '皮特·桑普拉斯', note: '用发球和第一截击解决问题' },
    ],
    profile: [
      { label: '站位', value: '发球线内' },
      { label: '得分来源', value: '发球上网 + 角度截击' },
      { label: '过网高度', value: '中' },
      { label: '节奏', value: '突然加速' },
    ],
    strengths: ['发球落点精准', '截击角度刁钻', '情绪稳定，关键分不抖'],
    weaknesses: ['力量不占优', '被强接发压制时难上网', '底线相持不是强项'],
    gear: [
      { label: '球拍', value: '95–98，头轻' },
      { label: '拍线', value: '天然肠或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地、快速硬地' },
    ],
    doubles: '网前技术流',
    bestPartner: 'IBSD',
    nightmare: 'IBFA',
    training: '练二发的旋转和落点，那是你上网的门票。',
  },

  INSD: {
    code: 'INSD',
    summary:
      '你是那种让对手打完说“难受”的人。切削、放短、挑高、突然上网，你用最小的力量制造最大的麻烦。你从不着急，因为着急的总是对面。',
    players: [
      { name: '法布里斯·桑托罗', note: '被叫做“魔术师”，靠手感生活' },
      { name: '阿什莉·巴蒂', note: '切削 + 网前，安静地拆掉对手' },
    ],
    profile: [
      { label: '站位', value: '中场游走' },
      { label: '得分来源', value: '手感 + 对手失误' },
      { label: '过网高度', value: '变化极大' },
      { label: '节奏', value: '慢' },
    ],
    strengths: ['手感与想象力顶级', '削球质量高，能压住节奏', '情绪极其稳定'],
    weaknesses: ['力量不足', '遇到高压型容易被动', '打法难以复制，教学价值低'],
    gear: [
      { label: '球拍', value: '98–100，控制型' },
      { label: '拍线', value: '天然肠或多纤维' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '草地、红土' },
    ],
    doubles: '网前变化，负责制造机会',
    bestPartner: 'EBFA',
    nightmare: 'EBFA',
    training: '练一板“硬的”——不能所有球都用巧劲。',
  },

  INFA: {
    code: 'INFA',
    summary:
      '你的网球很安静，也很锋利。你不多跑一步，也不多打一板。机会出现的那一下，你已经在前场，动作干净，落点精准，然后转身走回发球线。',
    players: [
      { name: '罗杰·费德勒', note: '效率、手感、优雅，一次上网解决一切' },
      { name: '蒂姆·亨曼', note: '教科书级发球上网' },
    ],
    profile: [
      { label: '站位', value: '发球线附近' },
      { label: '得分来源', value: '上网终结' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '快而省力' },
    ],
    strengths: ['效率极高，不浪费体力', '手法细腻，截击落点精准', '关键分不手软'],
    weaknesses: ['需要前期铺垫，被动时难翻盘', '对体能管理要求高', '遇到磨王容易失去耐心'],
    gear: [
      { label: '球拍', value: '97，平衡型' },
      { label: '拍线', value: '天然肠或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地' },
    ],
    doubles: '网前终结者',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练被动情况下的防守，别只会打顺风球。',
  },

  INFD: {
    code: 'INFD',
    summary:
      '你不抢戏，也不失误。网前一站，斜线全封，偶尔一个反手截击直接结束。整场比赛你说话不超过十句，但搭档知道：后面有人。',
    players: [
      { name: '丹尼尔·内斯特', note: '双打网前的长期统治者，安静而稳定' },
      { name: '郑洁', note: '网前手感与站位纪律的代表' },
    ],
    profile: [
      { label: '站位', value: '网前，偏反手侧' },
      { label: '得分来源', value: '封网 + 高质量第一截击' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '稳定' },
    ],
    strengths: ['封网稳定，几乎不送分', '站位纪律性极强', '不抢功，搭档压力小'],
    weaknesses: ['单打价值有限', '缺少主动变化', '遇到挑高球容易被动'],
    gear: [
      { label: '球拍', value: '100+，头轻' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '网前铁闸，负责所有斜线',
    bestPartner: 'IBSA',
    nightmare: 'ENSD',
    training: '练第一截击的深度，别只求过网。',
  },
}

export const TYPES: Record<string, TennisType> = Object.fromEntries(
  Object.entries(PROFILES).map(([code, profile]) => [
    code,
    { ...profile, code, ...TYPE_NAMES[code] },
  ]),
)

export const ALL_CODES = Object.keys(TYPES)
