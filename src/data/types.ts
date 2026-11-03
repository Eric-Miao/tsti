import { TYPE_NAMES } from './names'

export interface PlayerRef {
  name: string
  /** 最有分量的一行身份：三巨头 / 23 座大满贯 / 红土之王 */
  title: string
  note: string
}

export interface TennisType {
  code: string
  name: string
  en: string
  tagline: string
  summary: string
  players: PlayerRef[]
  /** 能核实的球员原话，没有就不写，不编 */
  quote?: { text: string; by: string }
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
      '你站在底线后面，但不是在那儿等。球还没落地你已经在想要打哪个角。上旋把球压得又高又深，节奏一板比一板快，对手刚适应一个速度，你换了个方向。打得顺的时候整片球场都跟着你动，打不顺的时候，那团火也烧自己。',
    players: [
      { name: '拉斐尔·纳达尔', title: '三巨头', note: '左手重上旋，把红土打成了自家后院' },
      { name: '卡洛斯·阿尔卡拉斯', title: '世界第一', note: '把上旋和爆发力混在一起的下一代答案' },
      { name: '塞雷娜·威廉姆斯', title: '23 座大满贯', note: '底线一板一板压过来，声音比球还先到' },
      { name: '郑钦文', title: '2024 巴黎奥运金牌', note: '正手重上旋，敢在关键分下手' },
    ],
    quote: {
      text: 'A champion is defined not by their wins but by how they can recover when they fall.',
      by: 'Serena Williams',
    },
    profile: [
      { label: '站位', value: '底线后一米，比看起来还靠后' },
      { label: '得分来源', value: '正手大角度，同一套连打三板' },
      { label: '过网高度', value: '高，落地之后还在往上跳' },
      { label: '节奏', value: '一板比一板快' },
    ],
    strengths: ['上旋球到对面肩上还在往上顶', '不怕多拍，第七拍才是你的第一拍', '你在场上的动静能把搭档一起带起来'],
    weaknesses: ['情绪掉下去，整盘球跟着掉', '这么打很费腿，第三盘容易掉速', '遇到会变节奏的人容易急'],
    gear: [
      { label: '球拍', value: '100 平方英寸，偏头重' },
      { label: '拍线', value: '聚酯 1.25' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '红土最舒服' },
    ],
    doubles: '底线主攻，把球打到对方网前那个人脚下',
    bestPartner: 'ENFD',
    nightmare: 'IBFD',
    training: '练第三板。第一板重不稀奇，第二板还能一样重才算数。',
  },

  EBSD: {
    code: 'EBSD',
    summary:
      '你是那种让对手打到怀疑人生的人。球永远能回来，回来的时候还带着旋。你不想一拍打死，你想的是"再来一板"。全场都听得见你的声音，那不是紧张，是你在给自己充电。',
    players: [
      { name: '迭戈·施瓦茨曼', title: '地表最强 170', note: '2020 年罗马站救赛点赢过纳达尔' },
      { name: '可可·高芙', title: '2023 美网冠军', note: '十五岁就在温网把大威打下去' },
    ],
    profile: [
      { label: '站位', value: '底线后两米，几乎贴着挡板' },
      { label: '得分来源', value: '靠覆盖范围把每一分拖长' },
      { label: '过网高度', value: '很高，落下来也慢' },
      { label: '节奏', value: '每板都一样，像节拍器' },
    ],
    strengths: ['覆盖范围大，角度再大也能追到', '落后两局也不会变形', '防守球带旋，回到你脚下很难打'],
    weaknesses: ['主动得分手段少，赢一分要打很多拍', '碰到一直上网的人会被压住', '体能见底的那一局会崩得很快'],
    gear: [
      { label: '球拍', value: '285–300g，轻一点好跑' },
      { label: '拍线', value: '多纤维或软聚酯' },
      { label: '磅数', value: '46–50' },
      { label: '场地', value: '红土、慢硬地' },
    ],
    doubles: '底线兜底，把球吊深让搭档抢网',
    bestPartner: 'ENFA',
    nightmare: 'ENFA',
    training: '每周打一次"只许进攻"的练习赛。你需要长出一两个能自己结束分数的球。',
  },

  EBFA: {
    code: 'EBFA',
    summary:
      '你的字典里没有过渡球。每一板都当最后一板打，平击、低平、穿透。进的时候球场会安静一秒，失误的时候你自己先喊出来。',
    players: [
      { name: '胡安·马丁·德尔波特罗', title: '大菠萝', note: '那届连胜纳达尔和费德勒，正手一板过' },
      { name: '亚历山大·兹维列夫', title: '2021 奥运金牌', note: '发球和反手都平，底线一站就是两小时' },
      { name: '张之臻', title: '2024 巴黎奥运混双银牌', note: '一米九三，发球和正手都是重炮' },
      { name: '阿丽娜·萨巴伦卡', title: '世界第一', note: '发球和正手都用同一个音量' },
      { name: '李娜', title: '两座大满贯', note: '正手平击，敢在关键分变线' },
    ],
    profile: [
      { label: '站位', value: '底线内半步，抢上升期' },
      { label: '得分来源', value: '正手一板过' },
      { label: '过网高度', value: '低，贴着网带过去' },
      { label: '节奏', value: '从头到尾一个速度' },
    ],
    strengths: ['单板质量顶级，接住的人不多', '抢点早，对手没时间引拍', '气势压人，对面会先缩'],
    weaknesses: ['失误率高，关键分尤其明显', '碰到高球和磨人的容易急', '二发是明摆着的短板'],
    gear: [
      { label: '球拍', value: '98–100，头轻好挥' },
      { label: '拍线', value: '聚酯 1.25–1.30' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '快速硬地' },
    ],
    doubles: '底线重炮，接发直接抢攻',
    bestPartner: 'ENFD',
    nightmare: 'IBSD',
    training: '关键分只用七成力。你需要的是"可控的重"，不是每板都赌。',
  },

  EBFD: {
    code: 'EBFD',
    summary:
      '你是表演型防守。别人以为你在挨打，其实你在等他累。那些几乎救不到的球你能救回来，还顺手做个动作。观众喜欢你，对面恨你。',
    players: [
      { name: '加埃尔·孟菲尔斯', title: '两次大满贯四强', note: '跑动范围出了名的不讲道理' },
      { name: '丹尼尔·梅德韦杰夫', title: '2021 美网冠军', note: '站位深到摄像机后，回球永远又深又平' },
      { name: '卡罗琳·沃兹尼亚奇', title: '丹麦甜心', note: '把防守打成一套完整战术的人' },
    ],
    profile: [
      { label: '站位', value: '底线后很远，经常跑出转播画面' },
      { label: '得分来源', value: '救回来，再救回来' },
      { label: '过网高度', value: '看情况，切削和上旋混着来' },
      { label: '节奏', value: '忽快忽慢，故意打乱对手' },
    ],
    strengths: ['身体条件好，能做出别人做不出的动作', '防守转攻那一下爆发力惊人', '越打越有戏，心理不容易塌'],
    weaknesses: ['这种打法很吃身体', '有时候为了好看多打一板', '不太愿意主动结束一分'],
    gear: [
      { label: '球拍', value: '100，偏头轻便于挥速' },
      { label: '拍线', value: '软聚酯' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线兜底，偶尔上网偷袭',
    bestPartner: 'ENFA',
    nightmare: 'EBFA',
    training: '练"该结束就结束"。防守反击的最后一板，你要敢下手。',
  },

  ENSA: {
    code: 'ENSA',
    summary:
      '你把网前当终点线。发球上网、接发上网、相持里突然上网。截击不是挡过去，是带着旋往下砸。你打球的样子像在往前扑。',
    players: [
      { name: '帕特·拉夫特', title: '两届美网冠军', note: '发球上网配一手带旋的截击' },
      { name: '本·谢尔顿', title: '2023 美网四强', note: '左手大炮，发完球就往网前冲' },
      { name: '玛蒂娜·纳芙拉蒂洛娃', title: '女金刚', note: '把网前变成主场的第一人' },
    ],
    quote: {
      text: "Whoever said, 'It's not whether you win or lose that counts,' probably lost.",
      by: 'Martina Navratilova',
    },
    profile: [
      { label: '站位', value: '发球线附近，随时准备往前扑' },
      { label: '得分来源', value: '上网截击' },
      { label: '过网高度', value: '截击压得低，挑高球放得高' },
      { label: '节奏', value: '一直在往前赶' },
    ],
    strengths: ['上网时机判断得准', '截击落点刁，还带旋', '压迫感强，对手会提前慌'],
    weaknesses: ['被穿越之后回不来', '挑高球是死穴', '底线相持没什么耐心'],
    gear: [
      { label: '球拍', value: '97–100，平衡偏头轻' },
      { label: '拍线', value: '天然肠或软聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '快速硬地、草地' },
    ],
    doubles: '网前主攻，抢网积极',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练被穿越之后的回位路线。你现在会站在原地看。',
  },

  ENSD: {
    code: 'ENSD',
    summary:
      '你不靠力量，你靠让对方跑错方向。短球、挑高、切削、突然上网，每一拍都在问同一个问题：你现在站哪儿？你最爱看对手冲出去再回头找球。',
    players: [
      { name: '达斯汀·布朗', title: '2015 温网淘汰纳达尔', note: '上网和小球混着用，全靠手感' },
      { name: '阿兰查·桑切斯·维卡里奥', title: '4 座大满贯', note: '挑高球和防守反击的教科书' },
      { name: '米拉·安德列娃', title: '2024 法网四强', note: '手感细，敢在关键分放小球' },
    ],
    profile: [
      { label: '站位', value: '中场游走，没有固定位置' },
      { label: '得分来源', value: '小球、挑高、突然上网' },
      { label: '过网高度', value: '一球一样' },
      { label: '节奏', value: '慢，然后突然快一下' },
    ],
    strengths: ['手感极好，小球和挑高都是武器', '战术想法多，不按套路来', '很会打乱别人的节奏'],
    weaknesses: ['碰到力量型容易被压死', '手感球失误的代价很高', '这种打法比看起来更耗体力'],
    gear: [
      { label: '球拍', value: '98–100，控制型' },
      { label: '拍线', value: '天然肠或多纤维' },
      { label: '磅数', value: '50–55' },
      { label: '场地', value: '红土、草地' },
    ],
    doubles: '网前变化，负责给搭档制造机会',
    bestPartner: 'EBFA',
    nightmare: 'EBFA',
    training: '每局至少打一板正常球。变化是武器，不是躲的地方。',
  },

  ENFA: {
    code: 'ENFA',
    summary:
      '你的网球只有两个区域：网前，和正在去网前的路上。发球上网、截击、扑上去，动作大、声音大、决心大。你上网那一下，对手会下意识往后退半步。',
    players: [
      { name: '鲍里斯·贝克尔', title: 'Boom Boom', note: '17 岁拿温网，鱼跃截击是他的标志' },
      { name: '维纳斯·威廉姆斯', title: '7 座大满贯', note: '发球之后第一拍就往网前压' },
    ],
    profile: [
      { label: '站位', value: '发球线以内' },
      { label: '得分来源', value: '截击和高压' },
      { label: '过网高度', value: '低平，压向对手身体' },
      { label: '节奏', value: '快得让对手来不及引拍' },
    ],
    strengths: ['网前终结能力顶级', '气势压人，一分还没打对面已经退了', '敢在关键分上网'],
    weaknesses: ['被穿越之后情绪波动大', '底线相持很吃亏', '二发上网风险高'],
    gear: [
      { label: '球拍', value: '95–98，头轻好挥' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地、快速硬地' },
    ],
    doubles: '网前猎手，从第一分抢到最后',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练上网第一拍。发球之后那个截击，决定你这一分还有没有第二拍。',
  },

  ENFD: {
    code: 'ENFD',
    summary:
      '你是双打的骨架。不抢镜、不冒险，但对方的每一个斜线都会撞上你。你的价值不在精彩球，在于对手根本不敢往你这边打。',
    players: [
      { name: '迈克·布莱恩', title: '16 座大满贯双打', note: '双打网前封网的黄金标准' },
      { name: '利泽尔·胡贝尔', title: '双打世界第一', note: '网前覆盖面积大到对面放弃斜线' },
    ],
    profile: [
      { label: '站位', value: '网前正中，微微侧身' },
      { label: '得分来源', value: '封死斜线，逼对手打直线' },
      { label: '过网高度', value: '低' },
      { label: '节奏', value: '稳，几乎不出错' },
    ],
    strengths: ['封网面积大', '站位意识好，总是出现在该在的地方', '情绪稳定，搭档的定心丸'],
    weaknesses: ['放到单打场上价值会掉一半', '主动变线少', '被挑高球容易失位'],
    gear: [
      { label: '球拍', value: '100+，偏头轻' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '网前后场全覆盖，负责封死斜线',
    bestPartner: 'EBSA',
    nightmare: 'ENSD',
    training: '练半步。网前不是站死，是每一拍都要微调站位。',
  },

  IBSA: {
    code: 'IBSA',
    summary:
      '你话不多，但你的球在说话。引拍大、旋转足、落点深，一板一板往上加。别人打到第三盘开始喘，你的球反而更重了。',
    players: [
      { name: '多米尼克·蒂姆', title: '2020 美网冠军', note: '单反重上旋，安静但每板都在加码' },
      { name: '斯特凡诺斯·西西帕斯', title: '2021 法网亚军', note: '单反重上旋，正手一开就是大角度' },
      { name: '伊加·斯瓦泰克', title: '世界第一', note: '把上旋和滑步都练到极致的人' },
    ],
    profile: [
      { label: '站位', value: '底线后一米' },
      { label: '得分来源', value: '正手或单反的重上旋' },
      { label: '过网高度', value: '高，落点深' },
      { label: '节奏', value: '一板一板往上加' },
    ],
    strengths: ['单板质量高，接住的人手会麻', '体能储备好，第五盘还有球', '不轻易情绪化'],
    weaknesses: ['启动慢，怕快节奏', '碰到一直上网的人反应会慢半拍', '关键分缺少变化'],
    gear: [
      { label: '球拍', value: '100，偏头重' },
      { label: '拍线', value: '聚酯 1.30' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '红土' },
    ],
    doubles: '底线重炮，负责把球打死',
    bestPartner: 'ENFD',
    nightmare: 'ENFA',
    training: '练接发抢点。别每次都让球把你推到三米外再开始打。',
  },

  IBSD: {
    code: 'IBSD',
    summary:
      '你不喊、不笑、不解释。你只是把球回到一个让对手难受的位置，然后再来一次。他打到第二盘会开始想：这个人到底会不会累？',
    players: [
      { name: '诺瓦克·德约科维奇', title: '三巨头', note: '接发、防守、反击，全都不动声色' },
      { name: '克里斯·埃弗特', title: '冰公主', note: '连续十三年每年至少一个大满贯' },
      { name: '王蔷', title: '2019 美网八强', note: '防守反击，回球深，很少送分' },
    ],
    profile: [
      { label: '站位', value: '底线内半步，接发站得很靠前' },
      { label: '得分来源', value: '把每一分都拖到第十拍' },
      { label: '过网高度', value: '中等，落点永远在深处' },
      { label: '节奏', value: '稳，但每一板都在变线' },
    ],
    strengths: ['接发顶级，你的二发在他眼里不算发球', '防守转攻没有缝', '心理强度高，两个赛点也翻得回来'],
    weaknesses: ['主动进攻的欲望不高', '碰到极端上网型会难受', '这种打法很吃体能和专注'],
    gear: [
      { label: '球拍', value: '100，平衡型' },
      { label: '拍线', value: '聚酯或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线核心，负责不丢',
    bestPartner: 'ENFA',
    nightmare: 'ENFA',
    training: '机会球必须下手。你太容易把优势球也打成相持。',
  },

  IBFA: {
    code: 'IBFA',
    summary:
      '你不喊不叫，但每一板都在往前推。平击、低平、落点深，表情从第一分到最后都没变过。对手经常打完才发现：刚才那四局，自己一分都没主动拿到。',
    players: [
      { name: '扬尼克·辛纳', title: '世界第一', note: '平击干净，节奏快，脸上没表情' },
      { name: '吴易昺', title: '2023 达拉斯站冠军', note: '中国男网第一个 ATP 单打冠军' },
      { name: '大坂直美', title: '4 座大满贯', note: '平击重炮，全程一个表情' },
      { name: '叶莲娜·莱巴金娜', title: '2022 温网冠军', note: '发球和正手都平，也是一张扑克脸' },
    ],
    quote: { text: "It's okay to not be okay.", by: 'Naomi Osaka' },
    profile: [
      { label: '站位', value: '底线内' },
      { label: '得分来源', value: '平击直线' },
      { label: '过网高度', value: '低' },
      { label: '节奏', value: '快，不给对手调整' },
    ],
    strengths: ['出球干净，速度快', '脸上什么都看不出来，很难读', '关键分敢打'],
    weaknesses: ['情绪一低，状态是断崖式的', '变化少，打久了会被适应', '被拖进多拍容易失去耐心'],
    gear: [
      { label: '球拍', value: '98–100' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '底线主攻',
    bestPartner: 'ENFD',
    nightmare: 'IBSD',
    training: '练被动球的过渡。不是每一板都要用同一种力度。',
  },

  IBFD: {
    code: 'IBFD',
    summary:
      '你没有一项技术特别吓人，但也没有一项能被针对。回球平、深、稳，跑动不声不响。对手往往打到一半才发现，自己已经跟着你的节奏走了。',
    players: [
      { name: '尼古拉·达维登科', title: '2009 年终总决赛冠军', note: '平击、深球、零表情，纯效率' },
      { name: '金·克里斯特尔斯', title: '4 座大满贯', note: '复出第一站就拿了美网' },
      { name: '杰西卡·佩古拉', title: '2024 美网亚军', note: '回球又平又深，很少送分' },
    ],
    profile: [
      { label: '站位', value: '底线后半步' },
      { label: '得分来源', value: '靠落点深度让对手先乱' },
      { label: '过网高度', value: '中低，落点稳定' },
      { label: '节奏', value: '从头到尾一样' },
    ],
    strengths: ['失误率极低', '回球深度稳定，很少给短球', '不挑场地，什么条件都能打'],
    weaknesses: ['缺一锤定音的能力', '碰到重炮容易被压住', '打法不讨喜，容易被低估'],
    gear: [
      { label: '球拍', value: '100，控制型' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '任何场地' },
    ],
    doubles: '底线保底',
    bestPartner: 'ENFA',
    nightmare: 'EBFA',
    training: '练一记必须要有的得分手段。哪怕是发球也行。',
  },

  INSA: {
    code: 'INSA',
    summary:
      '你上网的时候没有声音，也没有预兆。kick serve 把对手顶起来，第二拍你已经站在网前了。截击不追求力量，追求角度。你更愿意让对手跑，而不是让对手怕。',
    players: [
      { name: '斯蒂芬·埃德伯格', title: '6 座大满贯', note: '发球上网配优雅截击，安静地结束比赛' },
      { name: '玛蒂娜·辛吉斯', title: '瑞士公主', note: '16 岁登顶世界第一，网前手感极细' },
      { name: '芭博拉·克雷吉茨科娃', title: '2021 法网冠军', note: '网前手感好，双打出身' },
    ],
    profile: [
      { label: '站位', value: '发球线内' },
      { label: '得分来源', value: '发球上网，角度截击' },
      { label: '过网高度', value: '中' },
      { label: '节奏', value: '突然加速' },
    ],
    strengths: ['发球落点准', '截击角度刁钻', '情绪稳定，关键分手不抖'],
    weaknesses: ['力量不占优', '被强接发压住就很难上网', '底线相持不是强项'],
    gear: [
      { label: '球拍', value: '95–98，头轻' },
      { label: '拍线', value: '天然肠或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地、快速硬地' },
    ],
    doubles: '网前技术流',
    bestPartner: 'IBSD',
    nightmare: 'IBFA',
    training: '练二发的旋转和落点。那是你上网的门票。',
  },

  INSD: {
    code: 'INSD',
    summary:
      '你是那种让对手打完说"难受"的人。切削、放短、挑高、突然上网，你用最小的力量制造最大的麻烦。你从不着急，因为着急的总是对面。',
    players: [
      { name: '法布里斯·桑托罗', title: '魔术师', note: '正反手两种握拍，职业赛场打了 21 年' },
      { name: '洛伦佐·穆塞蒂', title: '2024 温网四强', note: '单反优雅，网前手感是加分项' },
      { name: '阿什莉·巴蒂', title: '3 座大满贯', note: '切削加网前，安静地把对手拆掉' },
      { name: '达莉亚·卡萨金娜', title: '2022 法网四强', note: '切削和变化多，节奏慢下来就赢' },
    ],
    profile: [
      { label: '站位', value: '中场游走' },
      { label: '得分来源', value: '切削、放短、挑高' },
      { label: '过网高度', value: '变化最大' },
      { label: '节奏', value: '慢' },
    ],
    strengths: ['手感和想象力都是顶级', '削球质量高，能把节奏压下来', '情绪极稳，落后也不慌'],
    weaknesses: ['力量不足', '碰到高压型容易被动', '这套打法很难教给别人'],
    gear: [
      { label: '球拍', value: '98–100，控制型' },
      { label: '拍线', value: '天然肠或多纤维' },
      { label: '磅数', value: '48–52' },
      { label: '场地', value: '草地、红土' },
    ],
    doubles: '网前变化，负责制造机会',
    bestPartner: 'EBFA',
    nightmare: 'EBFA',
    training: '练一板硬的。不能所有球都用巧劲。',
  },

  INFA: {
    code: 'INFA',
    summary:
      '你的网球很安静，也很锋利。不多跑一步，也不多打一板。机会出现的那一下，你已经在前场，动作干净，落点精准，然后转身走回发球线。',
    players: [
      { name: '罗杰·费德勒', title: '三巨头', note: '效率、手感、优雅，一次上网解决一切' },
      { name: '格里戈尔·迪米特洛夫', title: '2017 年终总决赛冠军', note: '单反加网前，动作好看且高效' },
      { name: '贾斯汀·海宁', title: '7 座大满贯', note: '单反加网前，个子不高但从不退' },
    ],
    quote: {
      text: 'There is no way around hard work. Embrace it.',
      by: 'Roger Federer',
    },
    profile: [
      { label: '站位', value: '发球线附近' },
      { label: '得分来源', value: '一次上网，一次结束' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '快而省力' },
    ],
    strengths: ['效率高，不浪费体力', '手法细腻，截击落点很准', '关键分不手软'],
    weaknesses: ['需要前面铺垫，被动时不好翻', '对体能分配要求高', '碰到磨王容易失去耐心'],
    gear: [
      { label: '球拍', value: '97，平衡型' },
      { label: '拍线', value: '天然肠或混合线' },
      { label: '磅数', value: '52–56' },
      { label: '场地', value: '草地' },
    ],
    doubles: '网前终结者',
    bestPartner: 'IBSD',
    nightmare: 'IBSD',
    training: '练被动情况下的防守。你现在的球，只在顺风时好看。',
  },

  INFD: {
    code: 'INFD',
    summary:
      '你不抢戏，也不失误。网前一站，斜线全封，偶尔一个反手截击直接结束。整场你说话不超过十句，但搭档知道后面有人。',
    players: [
      { name: '丹尼尔·内斯特', title: '12 座大满贯双打', note: '双打网前的长期统治者，安静而稳定' },
      { name: '郑洁', title: '两座大满贯双打', note: '2006 年澳网和温网，网前站位极准' },
      { name: '张帅', title: '2019 澳网双打冠军', note: '双打网前扎实，底线也能磨' },
    ],
    profile: [
      { label: '站位', value: '网前，偏反手侧' },
      { label: '得分来源', value: '第一截击的深度' },
      { label: '过网高度', value: '低平' },
      { label: '节奏', value: '稳' },
    ],
    strengths: ['封网稳定，几乎不送分', '站位纪律性极强', '不抢功，搭档压力小'],
    weaknesses: ['单打场上价值有限', '缺少主动变化', '被挑高球容易被动'],
    gear: [
      { label: '球拍', value: '100+，头轻' },
      { label: '拍线', value: '聚酯' },
      { label: '磅数', value: '50–54' },
      { label: '场地', value: '硬地' },
    ],
    doubles: '网前铁闸，负责所有斜线',
    bestPartner: 'IBSA',
    nightmare: 'ENSD',
    training: '练第一截击的深度。别只求过网。',
  },
}

export const TYPES: Record<string, TennisType> = Object.fromEntries(
  Object.entries(PROFILES).map(([code, profile]) => [
    code,
    { ...profile, code, ...TYPE_NAMES[code] },
  ]),
)

export const ALL_CODES = Object.keys(TYPES)
