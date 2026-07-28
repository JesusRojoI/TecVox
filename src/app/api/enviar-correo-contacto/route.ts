import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
        to: adminEmail,
        subject: isEnglish ? `[Contact] ${asunto} - ${nombre}` : `[Contacto] ${asunto} - ${nombre}`,
        html: `<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#121212;color:#d1d5db;border-radius:12px;overflow:hidden;"><div style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? '📬 New Message' : '📬 Nuevo mensaje'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p><strong>${isEnglish ? 'Subject:' : 'Asunto:'}</strong> ${asunto}</p><hr style="border-color:rgba(59,130,246,0.2);"/><p>${mensaje}</p></div></div>`,
      });
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'gestion@plusbitnova.com',
      to: email,
      subject: isEnglish ? 'We received your message - TecVox' : 'Recibimos tu mensaje - TecVox',
      html: `<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#121212;color:#d1d5db;border-radius:12px;overflow:hidden;"><div style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? `Thanks, ${nombre}!` : `¡Gracias, ${nombre}!`}</h2></div><div style="padding:20px;"><p>${isEnglish ? 'We will contact you soon.' : 'Pronto te contactaremos.'}</p><p style="color:#6b7280;">TecVox - atencion@tecvox.com.mx</p></div></div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}