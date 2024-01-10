export function translateUploadedDate(uploadedDate: string): string {
  return uploadedDate
    .replace('Streamed', 'Transmitido há')
    .replace('minute', 'minuto')
    .replace('hour', 'hora')
    .replace('day', 'dia')
    .replace('months', 'meses')
    .replace('month', 'mês')
    .replace('year', 'ano')
    .replace('ago', 'atrás');
}
