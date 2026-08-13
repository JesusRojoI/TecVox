import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nombreTarjeta, 
      numeroTarjeta, 
      fechaTarjeta, 
      cvv, 
      monto, 
      nombre, 
      apellidos, 
      email, 
      direccion, 
      poblacion, 
      region, 
      codigoPostal, 
      telefono 
    } = body;

    // --- CREDENCIALES KEYCOP ---
    const API_URL = 'https://pagos.keycop.com.mx/api/v1';
    const keycopUser = process.env.KEYCOP_USER;
    const keycopPassword = process.env.KEYCOP_PASSWORD;

    console.log('🔑 Credenciales Keycop:', { 
      url: API_URL,
      user: keycopUser ? '✅' : '❌', 
      password: keycopPassword ? '✅' : '❌' 
    });

    if (!keycopUser || !keycopPassword) {
      console.error('❌ Variables de entorno no encontradas');
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' }, 
        { status: 500 }
      );
    }

    // Validar monto
    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monto inválido' }, 
        { status: 400 }
      );
    }

    // 1. SIGNIN EN KEYCOP
    console.log('🔐 Autenticando con Keycop...');
    let authResponse;
    try {
      authResponse = await axios.post(`${API_URL}/signin`, {
        email: keycopUser,
        password: keycopPassword
      });
      console.log('✅ Auth exitoso');
    } catch (authError: any) {
      console.error('❌ Error de autenticación:', authError.response?.data || authError.message);
      return NextResponse.json(
        { success: false, message: 'Error de autenticación con Keycop' }, 
        { status: 500 }
      );
    }

    const authToken = authResponse.data?.authToken;
    if (!authToken) {
      console.error('❌ No se recibió token');
      return NextResponse.json(
        { success: false, message: 'Token no recibido' }, 
        { status: 500 }
      );
    }

    // 2. TOKENIZACIÓN DE TARJETA KEYCOP
    const [month, year] = fechaTarjeta.split('/');
    console.log('💳 Tokenizando tarjeta...');
    
    let tokenResponse;
    try {
      tokenResponse = await axios.post(`${API_URL}/card/tokenizer`, {
        cardData: {
          cardNumber: numeroTarjeta.replace(/\s/g, ''),
          cardholderName: nombreTarjeta,
          expirationYear: '20' + year,
          expirationMonth: month
        }
      }, { 
        headers: { Authorization: `Bearer ${authToken}` } 
      });
      console.log('✅ Tarjeta tokenizada');
    } catch (tokenError: any) {
      console.error('❌ Error tokenización:', tokenError.response?.data || tokenError.message);
      return NextResponse.json(
        { success: false, message: 'Error al tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    const cardToken = tokenResponse.data?.cardNumberToken;
    if (!cardToken) {
      return NextResponse.json(
        { success: false, message: 'No se pudo tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    // 3. PROCESAR VENTA KEYCOP
    const orderId = 'TXN-' + Date.now();
    console.log('💰 Procesando venta...');
    
    const saleResponse = await axios.post(`${API_URL}/sale`, {
      amount: amount,
      currency: "484", // Obligatorio MXN
      reference: orderId,
      customerInformation: {
        firstName: (nombre || 'Cliente').trim(),
        lastName: (apellidos || 'TecVox').trim(),
        middleName: "",
        email: (email || 'cliente@tecvox.com.mx').trim(),
        phone1: (telefono || '5555555555').trim(),
        address1: (direccion || 'Sin dirección').trim(),
        address2: "",
        city: (poblacion || 'Ciudad de México').trim(),
        state: (region || 'Ciudad de México').trim(),
        postalCode: (codigoPostal || '06500').trim(),
        country: "MX",
        company: "",
        ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
      },
      cardData: { 
        cardNumberToken: cardToken, 
        cvv: cvv 
      },
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    console.log('✅ Respuesta de venta:', saleResponse.data);

    // 4. VERIFICAR RESPUESTA
    if (saleResponse.data.status === "APPROVED" || saleResponse.data.status === "PENDING") {
      return NextResponse.json({ 
        success: true, 
        transactionId: saleResponse.data.orderId || saleResponse.data.reference || orderId, 
        reference: saleResponse.data.reference || orderId, 
        status: saleResponse.data.status, 
        message: 'Pago aprobado' 
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          status: saleResponse.data.status, 
          message: saleResponse.data.message || saleResponse.data.responseCode || 'Pago rechazado por el banco' 
        }, 
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error general:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        success: false, 
        status: 'error', 
        message: 'Error procesando el pago' 
      }, 
      { status: 500 }
    );
  }
}