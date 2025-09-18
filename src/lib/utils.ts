export function applyPriceMask(value: string): string {
  let onlyDigits = value.replace(/\D/g, "");

  if (!onlyDigits) return "";

  const numberValue = (parseInt(onlyDigits, 10) / 100).toFixed(2);

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(numberValue));
}