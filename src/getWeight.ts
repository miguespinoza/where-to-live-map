type Rules = {
  [word: string]: number;
};

export default function getWeight(d: any, rules: Rules) {
  const score = Object.entries(rules).reduce<number>((out, v) => {
    if (new RegExp(v[0]).test(d.delito)) {
      return out + v[1];
    }
    return out;
  }, 0);
  if (score != null) {
    return score;
  }
  if (d.categoria_delito === "DELITO DE BAJO IMPACTO") {
    return 1;
  }
  return 2;
}
