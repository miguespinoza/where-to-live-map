export default function getWeight(d: any) {
  if (d.categoria_delito === "DELITO DE BAJO IMPACTO") {
    return 1;
  } else {
    return 10;
  }
}
