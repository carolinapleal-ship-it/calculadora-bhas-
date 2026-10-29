export function calcDelta(a: number, b: number, c: number) {
  return b ** 2 - 4 * a * c;
}

export function calcBhaskara(a: number, b: number, c: number) {
  const delta = calcDelta(a, b, c);

  if (a === 0) {
    return { delta, x1: null, x2: null, error: "O coeficiente a não pode ser zero." };
  }

  if (delta < 0) {
    return { delta, x1: null, x2: null, error: "Delta negativo, não há raízes reais." };
  }

  if (delta === 0) {
    return { delta, x1: (-b) / (2 * a), x2: null, error: "" };
  }

  const raiz = Math.sqrt(delta);

  return {
    delta,
    x1: (-b + raiz) / (2 * a),
    x2: (-b - raiz) / (2 * a),
    error: "",
  };
}
