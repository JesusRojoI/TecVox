'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PoliticaReembolsoPage() {
  const { language } = useLanguage()

  return (
    <section className="min-h-screen pt-32 pb-16 bg-tecvox-black">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {language === 'en' ? 'Refund Policy' : 'Política de reembolso'}
        </h1>

        <div className="glass rounded-2xl p-8 space-y-6 text-tecvox-gray-light leading-relaxed">
          {language === 'es' ? (
            <>
              <p>En TECVOX nos comprometemos a brindar servicios de calidad en mantenimiento de sistemas TI, mantenimiento de equipo de cómputo y consultoría tecnológica. Sabemos que pueden surgir imprevistos, por lo que hemos establecido la siguiente política para garantizar claridad, transparencia y una buena relación con nuestros clientes.</p>

              <h2 className="text-xl font-bold text-white mt-8">Servicios contratados</h2>
              <p>Los servicios que ofrecemos son contratados a través de nuestro sitio web, donde el cliente selecciona el plan que más se ajuste a sus necesidades, realiza el pago y recibe una confirmación por correo electrónico. Todos los precios están en pesos mexicanos (MXN) e incluyen el IVA desglosado.</p>

              <h2 className="text-xl font-bold text-white mt-8">Casos en los que aplica un reembolso</h2>
              <p>Se podrá solicitar un reembolso total o parcial en los siguientes casos:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Cuando el servicio contratado no haya sido prestado por causas imputables a TECVOX.</li>
                <li>Si el cliente cancela el servicio antes de su ejecución y con al menos 48 horas de anticipación a la fecha pactada para su inicio.</li>
                <li>En caso de errores en el cobro o duplicidad de pago comprobada.</li>
                <li>Si por razones técnicas o logísticas TECVOX no puede prestar el servicio y no se logra una reprogramación viable para el cliente.</li>
              </ol>
              <p>En estos casos, el cliente deberá enviar un correo a atencion@tecvox.com.mx con el asunto "Aplicación de Política de Reembolso" explicando el motivo de la solicitud, junto con su nombre completo, número de pedido o referencia de pago, y comprobante del cargo.</p>

              <h2 className="text-xl font-bold text-white mt-8">Casos en los que no aplica reembolso</h2>
              <p>No se realizarán reembolsos en los siguientes supuestos:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Cuando el servicio ya haya sido prestado total o parcialmente a plena satisfacción.</li>
                <li>Si el cliente no se presenta, no responde o impide la ejecución del servicio por causas ajenas a TECVOX.</li>
                <li>Cuando la solicitud de reembolso se realice fuera del plazo de 5 días hábiles posteriores a la fecha de compra o de la cancelación del servicio.</li>
                <li>Por inconformidad subjetiva con el contenido o enfoque del servicio si éste fue entregado conforme a lo contratado.</li>
              </ol>

              <h2 className="text-xl font-bold text-white mt-8">Procedimiento y plazos</h2>
              <p>Una vez recibida la solicitud de reembolso con los datos completos, TECVOX evaluará el caso en un plazo entre 5 a 7 días hábiles y notificará al cliente si procede o no el reembolso. En caso favorable, el reembolso se realizará dentro de los 7 a 10 días hábiles siguientes, en la cuenta que usted haya utilizado para realizar el pago. Si es necesario se corroborará su número de tarjeta o clabe interbancaria. El reembolso de su pago solo aplica cuando usted ha aplicado su solicitud de reembolso y esta es resulta de manera positiva.</p>

              <h2 className="text-xl font-bold text-white mt-8">Facturación y reembolsos</h2>
              <p>En caso de que ya se haya emitido una factura fiscal por el servicio y se autorice el reembolso, será necesario que el cliente emita una nota de crédito correspondiente para poder proceder con la devolución del monto.</p>
            </>
          ) : (
            <>
              <p>At TECVOX we are committed to providing quality services in IT systems maintenance, computer equipment maintenance and technology consulting. We know that unforeseen events may arise, so we have established the following policy to guarantee clarity, transparency and a good relationship with our clients.</p>

              <h2 className="text-xl font-bold text-white mt-8">Contracted Services</h2>
              <p>The services we offer are contracted through our website, where the client selects the plan that best suits their needs, makes the payment and receives a confirmation by email. All prices are in Mexican pesos (MXN) and include broken down VAT.</p>

              <h2 className="text-xl font-bold text-white mt-8">Cases in Which a Refund Applies</h2>
              <p>A full or partial refund may be requested in the following cases:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>When the contracted service has not been provided due to causes attributable to TECVOX.</li>
                <li>If the client cancels the service before its execution and at least 48 hours in advance of the agreed start date.</li>
                <li>In case of billing errors or proven duplicate payment.</li>
                <li>If for technical or logistical reasons TECVOX cannot provide the service and a viable rescheduling is not achieved for the client.</li>
              </ol>
              <p>In these cases, the client must send an email to atencion@tecvox.com.mx with the subject "Refund Policy Application" explaining the reason for the request, along with their full name, order number or payment reference, and proof of charge.</p>

              <h2 className="text-xl font-bold text-white mt-8">Cases in Which a Refund Does Not Apply</h2>
              <p>Refunds will not be made in the following cases:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>When the service has already been fully or partially provided to full satisfaction.</li>
                <li>If the client does not show up, does not respond or prevents the execution of the service due to causes beyond TECVOX's control.</li>
                <li>When the refund request is made outside the period of 5 business days after the purchase date or service cancellation.</li>
                <li>For subjective disagreement with the content or approach of the service if it was delivered according to what was contracted.</li>
              </ol>

              <h2 className="text-xl font-bold text-white mt-8">Procedure and Timeframes</h2>
              <p>Once the refund request is received with complete data, TECVOX will evaluate the case within a period of 5 to 7 business days and will notify the client whether the refund proceeds or not. If approved, the refund will be made within the following 7 to 10 business days, to the account you used to make the payment. If necessary, your card number or interbank CLABE will be verified. The refund of your payment only applies when you have submitted your refund request and it is resolved positively.</p>

              <h2 className="text-xl font-bold text-white mt-8">Invoicing and Refunds</h2>
              <p>In the event that a tax invoice has already been issued for the service and the refund is authorized, the client must issue a corresponding credit note in order to proceed with the refund of the amount.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}