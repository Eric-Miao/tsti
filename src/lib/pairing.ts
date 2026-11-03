/**
 * 搭子 / 天敌的生成规则。
 *
 * 两条规则都是对合（取反两次回到自己），所以关系天然互惠，
 * 而且永远不可能出现「搭子 == 天敌」。
 *
 *   最佳搭子 = E/I 取反 · B/N 取反 · S/F 不变 · A/D 不变
 *     位置互补（一前一后）、性格互补（一个点火一个压火），
 *     但旋转和攻守取向一致，否则双打战术会打结。
 *
 *   最怕遇到 = E/I 不变 · B/N 不变 · S/F 取反 · A/D 取反
 *     同位置、反着打。底线磨王最怕平击重炮，网前快攻最怕挑高放短。
 */

const PAIRS: Record<string, string> = {
  E: 'I',
  I: 'E',
  B: 'N',
  N: 'B',
  S: 'F',
  F: 'S',
  A: 'D',
  D: 'A',
}

const flip = (code: string, indices: number[]) =>
  code
    .split('')
    .map((ch, i) => (indices.includes(i) ? PAIRS[ch] ?? ch : ch))
    .join('')

export function bestPartner(code: string): string {
  return flip(code, [0, 1])
}

export function nightmare(code: string): string {
  return flip(code, [2, 3])
}
