import type { Dim, Pole } from './questions'

export const DIMENSIONS_EN: Record<Dim, { name: string; leftLabel: string; rightLabel: string; desc: string }> = {
  EI: { name: "Court Presence", leftLabel: "Expressive", rightLabel: "Reserved", desc: "Whether every point shows on your face, or stays locked inside." },
  BN: { name: "Home Base", leftLabel: "Baseline", rightLabel: "Net", desc: "Where you stand by default, and which way your feet go when the ball comes." },
  SF: { name: "Ball Flight", leftLabel: "Topspin", rightLabel: "Flat", desc: "Whether you want margin over the net, or pace through it." },
  AD: { name: "Match Approach", leftLabel: "Attack", rightLabel: "Defend", desc: "Whether points are taken from him, or waited out." },
}

interface QEN { id: number; dim: Dim; scene: string; a: { pole: Pole; text: string }; b: { pole: Pole; text: string } }

export const QUESTIONS_EN: QEN[] = [
  { id: 1, dim: 'EI', scene: "You just hit a clean winner. What happens next?", a: { pole: 'E', text: "Fist pump and a shout, then a glance at your partner or the sideline." }, b: { pole: 'I', text: "Turn and walk back to the baseline, replaying the swing in your head." } },
  { id: 2, dim: 'EI', scene: "Your opponent paints the line and you are nowhere near it.", a: { pole: 'E', text: "\"Too good\" comes out before you can stop it. You might even laugh." }, b: { pole: 'I', text: "Look down, straighten a string, say nothing." } },
  { id: 3, dim: 'EI', scene: "Doubles. You dump a volley into the net and hand over break point.", a: { pole: 'E', text: "\"Mine, mine. Give me the next one,\" right away." }, b: { pole: 'I', text: "A quick wave of the hand, then your attention goes back to your positioning." } },
  { id: 4, dim: 'EI', scene: "Ninety seconds at the changeover. You are more likely to be", a: { pole: 'E', text: "Chatting with your opponent or partner, even if you just met." }, b: { pole: 'I', text: "Drinking, toweling off, planning where the first serve of the next game goes." } },
  { id: 5, dim: 'EI', scene: "Ask anyone who has played with you to describe your face on court.", a: { pole: 'E', text: "Very readable. They can tell every point won or lost." }, b: { pole: 'I', text: "Basically nothing. Winners and errors look the same." } },
  { id: 6, dim: 'EI', scene: "Three points dropped in a row. Your first move is", a: { pole: 'E', text: "Talk yourself up out loud, maybe a slap on the thigh." }, b: { pole: 'I', text: "Deep breath, slow everything down, not a word." } },
  { id: 7, dim: 'EI', scene: "Someone tells you that you have great presence on court.", a: { pole: 'E', text: "\"Yeah. I win with presence.\"" }, b: { pole: 'I', text: "\"I would rather they said my ball is solid.\"" } },
  { id: 8, dim: 'BN', scene: "First serve in, and the return lands short in the middle.", a: { pole: 'B', text: "Step in, drive it to the open corner, then retreat to the baseline." }, b: { pole: 'N', text: "Keep coming. If it is there, I am volleying it." } },
  { id: 9, dim: 'BN', scene: "Which point do you enjoy more?", a: { pole: 'B', text: "A fifteen-shot rally from the baseline, ended with an inside-out backhand." }, b: { pole: 'N', text: "One step in, one volley, and he never moves." } },
  { id: 10, dim: 'BN', scene: "Doubles. Your partner asks which side you want.", a: { pole: 'B', text: "\"I will hold the baseline, you take the net.\"" }, b: { pole: 'N', text: "\"I am at the net. That is my territory.\"" } },
  { id: 11, dim: 'BN', scene: "One afternoon, one thing to practice.", a: { pole: 'B', text: "Forehand and backhand consistency and depth from the baseline." }, b: { pole: 'N', text: "Volley feel and first-step reactions." } },
  { id: 12, dim: 'BN', scene: "Your comfort zone on court is", a: { pole: 'B', text: "A meter behind the baseline, the whole court in front of me." }, b: { pole: 'N', text: "Inside the service line. The closer to the net, the better." } },
  { id: 13, dim: 'BN', scene: "Your opponent starts dropping shot after drop shot.", a: { pole: 'B', text: "Annoying, but I would rather back up and keep rallying." }, b: { pole: 'N', text: "Perfect. I wanted to move forward anyway." } },
  { id: 14, dim: 'BN', scene: "Which way does your body want to go first?", a: { pole: 'B', text: "Sideways. Chasing balls off both wings." }, b: { pole: 'N', text: "Forward. That one step into the net." } },
  { id: 15, dim: 'SF', scene: "Which ball do you trust more?", a: { pole: 'S', text: "Higher over the net, deeper in the court. Safe." }, b: { pole: 'F', text: "Lower over the net, faster through the court. Right through him." } },
  { id: 16, dim: 'SF', scene: "On a big point, you would rather", a: { pole: 'S', text: "Add topspin and pin it deep to his backhand." }, b: { pole: 'F', text: "Flatten it down the line and bet he cannot handle it." } },
  { id: 17, dim: 'SF', scene: "Watch your own slow-mo replay. Your backswing is", a: { pole: 'S', text: "Long, and you can see the low-to-high brush." }, b: { pole: 'F', text: "Short, with the racquet head going almost straight from back to front." } },
  { id: 18, dim: 'SF', scene: "Which miss bothers you more?", a: { pole: 'S', text: "Long. The topspin did not bring it down." }, b: { pole: 'F', text: "Into the net. Not enough height over it." } },
  { id: 19, dim: 'SF', scene: "How do your hitting partners describe your ball?", a: { pole: 'S', text: "\"Heavy.\" \"It kicks up at you.\"" }, b: { pole: 'F', text: "\"Quick.\" \"It skids through low.\"" } },
  { id: 20, dim: 'SF', scene: "You are playing a guy who is six-foot-three.", a: { pole: 'S', text: "Get it above his shoulders and make him miserable." }, b: { pole: 'F', text: "Put it at his feet so he cannot get down." } },
  { id: 21, dim: 'SF', scene: "When you get a restring, what matters most?", a: { pole: 'S', text: "Whether it grabs the ball and gives me spin." }, b: { pole: 'F', text: "Whether it releases clean and stays controlled." } },
  { id: 22, dim: 'AD', scene: "You have a seventy percent look at a winner.", a: { pole: 'A', text: "Take it. You do not get many of those." }, b: { pole: 'D', text: "Pass. Keep the point alive first." } },
  { id: 23, dim: 'AD', scene: "Where do your points mostly come from?", a: { pole: 'A', text: "Winners I hit myself." }, b: { pole: 'D', text: "Errors he grinds out against me." } },
  { id: 24, dim: 'AD', scene: "Down 2-5, and you still have a service game.", a: { pole: 'A', text: "Crank up the risk. You are losing anyway." }, b: { pole: 'D', text: "Grind out one point at a time and wait for him to crack." } },
  { id: 25, dim: 'AD', scene: "Which loss would sit worse?", a: { pole: 'A', text: "Playing too safe, pushed around for two sets." }, b: { pole: 'D', text: "Playing too loose, handing the match away on errors." } },
  { id: 26, dim: 'AD', scene: "He is clearly steadier than you.", a: { pole: 'A', text: "I have to change direction first. I cannot out-rally him." }, b: { pole: 'D', text: "Match his rhythm first, then wait for him to loosen up." } },
  { id: 27, dim: 'AD', scene: "In doubles, you would rather", a: { pole: 'A', text: "Poach and attack, put the pressure on them." }, b: { pole: 'D', text: "Hold the baseline and let your partner take the risk." } },
  { id: 28, dim: 'AD', scene: "You want a match to be", a: { pole: 'A', text: "Over in forty minutes. Cut it clean." }, b: { pole: 'D', text: "Three sets. I can outlast anybody." } },
]
