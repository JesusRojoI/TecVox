'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TerminosPage() {
  const { language } = useLanguage()

  return (
    <section className="min-h-screen pt-32 pb-16 bg-tecvox-black">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {language === 'en' ? 'Terms and Conditions' : 'Términos y condiciones'}
        </h1>

        <div className="glass rounded-2xl p-8 space-y-6 text-tecvox-gray-light leading-relaxed">
          {language === 'es' ? (
            <>
              <p>Gracias por visitar nuestro sitio web. Al acceder, utilizar, navegar o contratar alguno de nuestros servicios de Nuestro Sitio Web, usted acepta expresamente cumplir con los presentes términos y condiciones (en adelante "Términos y Condiciones"). Por favor, léalos detenidamente. Si no está de acuerdo con estos, no podrá acceder al servicio ni utilizarlo.</p>
              <p>El sitio web ubicado en tecvox.com.mx (en adelante, el "Sitio") es operado por GRUPO LISBOA 12 ESTRATEGIAS EN CREATIVIDAD S.A. DE C.V., con domicilio en la Ciudad de México (en adelante, "TECVOX").</p>
              <p>TECVOX se reserva el derecho de modificar en cualquier momento el contenido de estos Términos y Condiciones, los cuales entrarán en vigor desde su publicación. El uso continuado del Sitio implica la aceptación plena de cualquier modificación.</p>

              <h2 className="text-xl font-bold text-white mt-8">Capacidad Legal</h2>
              <p>Solo podrán contratar nuestros servicios personas mayores de edad con plena capacidad jurídica. Si el Usuario actúa en representación de una persona moral, declara contar con facultades suficientes para obligarla conforme a estos términos.</p>

              <h2 className="text-xl font-bold text-white mt-8">Uso del Sitio</h2>
              <p>El Sitio podrá ser utilizado exclusivamente para explorar y contratar los servicios de TECVOX. El Usuario se obliga a no emplearlo para fines ilícitos, fraudulentos o contrarios a estos Términos y Condiciones.</p>
              <p>Es responsabilidad del Usuario asegurarse de estar navegando en un sitio seguro, verificando el certificado HTTPS del dominio correspondiente.</p>

              <h2 className="text-xl font-bold text-white mt-8">Servicios Ofertados</h2>
              <p>Nuestro Sitio principalmente se dedica a proporcionar información acerca de nuestros servicios profesionales especializados en:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Planes de mantenimiento de sistemas de tecnologías de la información (TI);</li>
                <li>Mantenimiento preventivo y correctivo de equipo de cómputo;</li>
                <li>Consultoría tecnológica personalizada.</li>
              </ol>
              <p>Los servicios se presentan en distintos planes que pueden ser seleccionados por el Usuario y agregados a un carrito de compra. Todos los precios están en pesos mexicanos (MXN) e integran el Impuesto al Valor Agregado (IVA), el cual se desglosa al momento de la compra.</p>

              <h2 className="text-xl font-bold text-white mt-8">Privacidad y Protección de Datos</h2>
              <p>El uso del Sitio puede requerir el suministro de datos personales por parte del Usuario. Estos serán tratados conforme al Aviso de Privacidad de TECVOX, disponible en el Sitio. La información se utiliza únicamente para fines relacionados con la prestación del servicio y no será compartida sin consentimiento, salvo requerimiento legal.</p>

              <h2 className="text-xl font-bold text-white mt-8">Proceso de Compra y Confirmación</h2>
              <p>Una vez que el Usuario seleccione su plan, el sistema generará un resumen de la compra con los detalles del servicio contratado, el costo total (con IVA desglosado) y el método de pago. TECVOX enviará al correo electrónico del Usuario una confirmación del pedido con esta información.</p>

              <h2 className="text-xl font-bold text-white mt-8">Formas de Pago</h2>
              <p>TECVOX acepta diversos métodos de pago, como tarjetas de débito y crédito, los cuales serán claramente mostrados durante el proceso de compra. Su procesamiento de pago pasará por un proceso de protección de datos y de seguridad para que su compra sea efectuada de forma exitosa. TECVOX no almacena información bancaria del Usuario.</p>
              <p>En caso de error en el procesamiento, se notificará al Usuario y, si aplica, se le recomendará contactar directamente con su banco emisor.</p>

              <h2 className="text-xl font-bold text-white mt-8">Prohibiciones</h2>
              <p>El Usuario se compromete a no utilizar el Sitio para:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Realizar actividades ilegales o fraudulentas;</li>
                <li>Alterar o dañar el funcionamiento del sitio web;</li>
                <li>Infringir derechos de terceros;</li>
                <li>Difundir software malicioso o contenido ofensivo;</li>
                <li>Suplantar identidad o interferir en los procesos de compra de otros usuarios.</li>
              </ol>
              <p>El incumplimiento puede dar lugar a la suspensión del acceso y, en su caso, a acciones legales.</p>

              <h2 className="text-xl font-bold text-white mt-8">Sanciones y Suspensión del Servicio</h2>
              <p>TECVOX podrá suspender temporal o permanentemente el acceso del Usuario cuando:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Incumpla estos Términos y Condiciones;</li>
                <li>Proporcione información falsa o imposible de verificar;</li>
                <li>Realice actos dolosos o que generen responsabilidad para terceros.</li>
              </ol>
              <p>La suspensión será notificada al Usuario mediante correo electrónico.</p>

              <h2 className="text-xl font-bold text-white mt-8">Propiedad Intelectual</h2>
              <p>Todos los contenidos del Sitio, incluyendo textos, logotipos, diseños, gráficos y software, son propiedad exclusiva de TECVOX o se encuentran licenciados para su uso. Se prohíbe su reproducción, distribución o modificación sin autorización previa y por escrito.</p>
              <p>El Sitio puede contener enlaces a sitios de terceros. TECVOX no se hace responsable por los contenidos, políticas o prácticas de dichos sitios.</p>

              <h2 className="text-xl font-bold text-white mt-8">Soporte Técnico</h2>
              <p>Para dudas técnicas, errores en el servicio o necesidades operativas, el Usuario podrá comunicarse al correo: atencion@tecvox.com.mx. Nuestro equipo de soporte responderá en un plazo no mayor a 48 horas hábiles.</p>

              <h2 className="text-xl font-bold text-white mt-8">Modificaciones</h2>
              <p>TECVOX podrá modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será notificado mediante publicación en el Sitio y surtirá efectos desde ese momento.</p>

              <h2 className="text-xl font-bold text-white mt-8">Jurisdicción y Solución de Controversias</h2>
              <p>Cualquier conflicto derivado de la interpretación o cumplimiento de este documento será resuelto conforme a las leyes mexicanas, y en su caso, ante la Procuraduría Federal del Consumidor en la vía administrativa.</p>
            </>
          ) : (
            <>
              <p>Thank you for visiting our website. By accessing, using, browsing or contracting any of our services from Our Website, you expressly agree to comply with these terms and conditions (hereinafter "Terms and Conditions"). Please read them carefully. If you do not agree with these, you may not access or use the service.</p>
              <p>The website located at tecvox.com.mx (hereinafter, the "Site") is operated by GRUPO LISBOA 12 ESTRATEGIAS EN CREATIVIDAD S.A. DE C.V., with address in Mexico City (hereinafter, "TECVOX").</p>
              <p>TECVOX reserves the right to modify the content of these Terms and Conditions at any time, which will become effective upon publication. Continued use of the Site implies full acceptance of any modification.</p>

              <h2 className="text-xl font-bold text-white mt-8">Legal Capacity</h2>
              <p>Only persons of legal age with full legal capacity may contract our services. If the User acts on behalf of a legal entity, they declare they have sufficient authority to bind it under these terms.</p>

              <h2 className="text-xl font-bold text-white mt-8">Use of the Site</h2>
              <p>The Site may be used exclusively to explore and contract TECVOX services. The User agrees not to use it for illegal, fraudulent purposes or contrary to these Terms and Conditions.</p>
              <p>It is the User's responsibility to ensure they are browsing on a secure site, verifying the HTTPS certificate of the corresponding domain.</p>

              <h2 className="text-xl font-bold text-white mt-8">Services Offered</h2>
              <p>Our Site is mainly dedicated to providing information about our specialized professional services in:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Information technology (IT) systems maintenance plans;</li>
                <li>Preventive and corrective computer equipment maintenance;</li>
                <li>Personalized technology consulting.</li>
              </ol>
              <p>Services are presented in different plans that can be selected by the User and added to a shopping cart. All prices are in Mexican pesos (MXN) and include Value Added Tax (VAT), which is broken down at the time of purchase.</p>

              <h2 className="text-xl font-bold text-white mt-8">Privacy and Data Protection</h2>
              <p>Use of the Site may require the provision of personal data by the User. These will be processed in accordance with TECVOX's Privacy Notice, available on the Site. The information is used solely for purposes related to the provision of the service and will not be shared without consent, except by legal requirement.</p>

              <h2 className="text-xl font-bold text-white mt-8">Purchase Process and Confirmation</h2>
              <p>Once the User selects their plan, the system will generate a purchase summary with the details of the contracted service, the total cost (with VAT broken down) and the payment method. TECVOX will send an order confirmation to the User's email with this information.</p>

              <h2 className="text-xl font-bold text-white mt-8">Payment Methods</h2>
              <p>TECVOX accepts various payment methods, such as debit and credit cards, which will be clearly displayed during the purchase process. Your payment processing will go through a data protection and security process so that your purchase is successfully completed. TECVOX does not store the User's banking information.</p>
              <p>In case of processing error, the User will be notified and, if applicable, will be advised to contact their issuing bank directly.</p>

              <h2 className="text-xl font-bold text-white mt-8">Prohibitions</h2>
              <p>The User agrees not to use the Site to:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Carry out illegal or fraudulent activities;</li>
                <li>Alter or damage the website's operation;</li>
                <li>Infringe third-party rights;</li>
                <li>Spread malicious software or offensive content;</li>
                <li>Impersonate identity or interfere with other users' purchase processes.</li>
              </ol>
              <p>Non-compliance may result in suspension of access and, where appropriate, legal action.</p>

              <h2 className="text-xl font-bold text-white mt-8">Sanctions and Service Suspension</h2>
              <p>TECVOX may temporarily or permanently suspend the User's access when:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>They breach these Terms and Conditions;</li>
                <li>They provide false or unverifiable information;</li>
                <li>They carry out fraudulent acts or acts that generate liability for third parties.</li>
              </ol>
              <p>The suspension will be notified to the User via email.</p>

              <h2 className="text-xl font-bold text-white mt-8">Intellectual Property</h2>
              <p>All contents of the Site, including texts, logos, designs, graphics and software, are the exclusive property of TECVOX or are licensed for its use. Reproduction, distribution or modification without prior written authorization is prohibited.</p>
              <p>The Site may contain links to third-party sites. TECVOX is not responsible for the content, policies or practices of such sites.</p>

              <h2 className="text-xl font-bold text-white mt-8">Technical Support</h2>
              <p>For technical questions, service errors or operational needs, the User may contact: atencion@tecvox.com.mx. Our support team will respond within no more than 48 business hours.</p>

              <h2 className="text-xl font-bold text-white mt-8">Modifications</h2>
              <p>TECVOX may modify these Terms and Conditions at any time. Any change will be notified by publication on the Site and will take effect from that moment.</p>

              <h2 className="text-xl font-bold text-white mt-8">Jurisdiction and Dispute Resolution</h2>
              <p>Any conflict arising from the interpretation or compliance with this document will be resolved in accordance with Mexican laws, and where appropriate, before the Federal Consumer Protection Agency through administrative channels.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}