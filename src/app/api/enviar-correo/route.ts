import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, orderData, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const productosHTML = orderData.productos
      .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid rgba(59,130,246,0.2);color:#d1d5db;">${p.nombre} ${p.sku ? `(SKU: ${p.sku})` : ''} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(59,130,246,0.2);text-align:right;color:#60a5fa;">$${p.precio.toFixed(2)}</td></tr>`)
      .join('');

    const emailHTML = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#121212;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:30px;text-align:center;">
          <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? '✅ Purchase Confirmed!' : '✅ ¡Compra confirmada!'}</h1>
        </div>
        <div style="padding:30px;color:#d1d5db;">
          <p style="font-size:16px;">${isEnglish ? `Hello <strong style="color:#60a5fa;">${orderData.nombre}</strong>,` : `Hola <strong style="color:#60a5fa;">${orderData.nombre}</strong>,`}</p>
          <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
          <h2 style="color:#f8fafc;font-size:18px;border-bottom:2px solid #1e40af;padding-bottom:8px;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
          <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
          <div style="margin-top:20px;padding:20px;background:rgba(30,64,175,0.1);border-radius:8px;border:1px solid rgba(59,130,246,0.2);">
            <p style="color:#d1d5db;"><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#60a5fa;">$${orderData.subtotal.toFixed(2)}</span></p>
            ${orderData.descuento > 0 ? `<p style="color:#d1d5db;"><strong>${isEnglish ? 'Discount:' : 'Descuento:'}</strong> <span style="color:#ef4444;">-$${orderData.descuento.toFixed(2)}</span></p>` : ''}
            <p style="color:#d1d5db;"><strong>${isEnglish ? 'Tax:' : 'Impuesto:'}</strong> <span style="color:#60a5fa;">$${orderData.impuesto.toFixed(2)}</span></p>
            <p style="font-size:18px;color:#f8fafc;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#3b82f6;">$${orderData.total.toFixed(2)}</span></p>
            ${orderData.cupon ? `<p style="color:#d1d5db;"><strong>${isEnglish ? 'Coupon used:' : 'Cupón utilizado:'}</strong> ${orderData.cupon}</p>` : ''}
          </div>
          <p style="color:#9ca3af;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
          <p style="color:#d1d5db;">${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#3b82f6;">TecVox</strong>.</p>
        </div>
        <div style="background:rgba(30,64,175,0.05);padding:20px;text-align:center;border-top:1px solid rgba(59,130,246,0.1);">
          <p style="color:#6b7280;font-size:12px;margin:0;">TecVox - atencion@tecvox.com.mx</p>
        </div>
      </div>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: to,
      subject: isEnglish ? 'Purchase Confirmed! - TecVox' : '¡Compra confirmada! - TecVox',
      html: emailHTML,
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
        to: adminEmail,
        subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
        html: `<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#121212;color:#d1d5db;border-radius:12px;overflow:hidden;"><div style="background:#1e40af;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? '📦 New Purchase' : '📦 Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#3b82f6;">$${orderData.total.toFixed(2)}</span></p></div>${emailHTML}</div>`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}