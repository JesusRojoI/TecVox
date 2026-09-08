'use server';

interface BanxicoResponse {
  tipoDeCambio: number;
  fecha: string;
  error?: string;
}

export async function getTipoCambioDolar(): Promise<BanxicoResponse> {
  const token = process.env.BANXICO_TOKEN;
  const SERIE_DOLAR_FIX = 'SF43718'; 

  if (!token) {
    console.error('El BANXICO_TOKEN no está configurado en las variables de entorno.');
    return { tipoDeCambio: 0, fecha: '', error: 'Token no configurado' };
  }

  try {
    const res = await fetch(
      `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${SERIE_DOLAR_FIX}/datos/oportuno`,
      {
        headers: {
          'Bmx-Token': token,
        },
        // Revalida la respuesta cada 4 horas
        next: { revalidate: 14400 },
      }
    );

    if (!res.ok) {
      throw new Error(`Error en la consulta a Banxico: ${res.status}`);
    }

    const data = await res.json();
    const ultimoDato = data?.bmx?.series?.[0]?.datos?.[0];

    if (!ultimoDato) {
      throw new Error('Formato de respuesta inesperado de Banxico');
    }

    return {
      tipoDeCambio: parseFloat(ultimoDato.dato),
      fecha: ultimoDato.fecha,
    };
  } catch (error) {
    console.error('Error fetching Banxico rate:', error);
    return {
      tipoDeCambio: 0,
      fecha: '',
      error: 'No se pudo obtener el tipo de cambio de Banxico',
    };
  }
}