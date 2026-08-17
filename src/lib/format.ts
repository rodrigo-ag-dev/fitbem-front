export const pad = (num: number | string, size: number) => {
  let text = num.toString()
  while (text.length < size) text = `0${text}`
  return text
}

export const BMICalc = (weight: number, height: number) => {
  const calc = weight / (height ? (height / 100) * (height / 100) : 1)
  return calc.toFixed(2)
}

export const BMIStatus = (bmi: number | string) => {
  const value = Number(bmi)
  if (value <= 18.5) return 'Magreza'
  if (value <= 24.9) return 'Saudável'
  if (value <= 29.9) return 'Sobrepeso'
  if (value <= 34.9) return 'Obesidade Grau I'
  if (value <= 39.9) return 'Obesidade Grau II'
  return 'Obesidade Grau III'
}

export const bmiColor = (bmi: number | string) => {
  const value = Number(bmi)
  const healthyLow = 18.5
  const healthyHigh = 24.9
  const distance = value < healthyLow ? healthyLow - value : value > healthyHigh ? value - healthyHigh : 0
  const t = Math.min(distance / 15, 1)
  const healthy = { r: 47, g: 143, b: 122 }
  const unhealthy = { r: 214, g: 58, b: 58 }
  const r = Math.round(healthy.r + (unhealthy.r - healthy.r) * t)
  const g = Math.round(healthy.g + (unhealthy.g - healthy.g) * t)
  const b = Math.round(healthy.b + (unhealthy.b - healthy.b) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export const idealWeight = (height: number) => {
  if (height <= 155) return '44-58'
  if (height <= 160) return '47 - 61'
  if (height <= 165) return '50 - 65'
  if (height <= 170) return '54 - 69'
  if (height <= 175) return '57 - 74'
  if (height <= 180) return '60 - 78'
  if (height <= 185) return '64 - 83'
  if (height <= 190) return '67 - 87'
  return '71 - 89'
}

export const FormatDate = (date: string | number | Date) => {
  const dt = new Date(date)
  if (Number.isNaN(dt.getTime())) return ''
  return `${pad(dt.getDate(), 2)}/${pad(dt.getMonth() + 1, 2)}/${dt.getFullYear()}`
}
