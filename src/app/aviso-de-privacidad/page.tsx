'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AvisoPrivacidadPage() {
  const { language } = useLanguage()

  return (
    <section className="min-h-screen pt-32 pb-16 bg-tecvox-black">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {language === 'en' ? 'Privacy Notice' : 'Aviso de privacidad'}
        </h1>

        <div className="glass rounded-2xl p-8 space-y-6 text-tecvox-gray-light leading-relaxed">
          {language === 'es' ? (
            <>
              <p>
                En cumplimiento con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, GRUPO LISBOA 12 ESTRATEGIAS EN CREATIVIDAD S.A. DE C.V. (en lo sucesivo, "Tecvox"), con domicilio en la Ciudad de México y correo electrónico atencion@tecvox.com.mx, es el responsable del uso y protección de los datos que usted, como titular, nos proporciona de manera voluntaria, ya que en Tecvox, estamos comprometidos al tratamiento legítimo, controlado e informado de los datos personales de nuestros usuarios cuando utilizan nuestros servicios.
              </p>

              <h2 className="text-xl font-bold text-white mt-8">Datos personales que recabamos</h2>
              <p>Para el correcto funcionamiento de nuestros servicios y la gestión adecuada de nuestra relación con usted, recabamos los siguientes datos personales:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Número telefónico</li>
                <li>Correo electrónico</li>
                <li>Domicilio</li>
              </ol>
              <p>Estos datos pueden ser recabados a través de nuestro sitio web, formularios electrónicos, comunicación directa o medios digitales de contacto. No solicitamos ni tratamos datos personales sensibles, ni de personas que no sean mayores de edad.</p>

              <h2 className="text-xl font-bold text-white mt-8">Finalidades del tratamiento</h2>
              <p>Sus datos personales serán tratados en los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad, y responsabilidad en términos de la LFPDPPP. Por lo anterior, sus datos personales serán utilizados exclusivamente para proporcionarle el tratamiento adecuado de acuerdo con lo siguiente:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Registrar y dar seguimiento a contrataciones de servicios y beneficios.</li>
                <li>Para mantener contacto directo con usted y estar en posibilidad de darle seguimiento continuo en la emisión de sus CFDI, así como respuesta y atención oportuna en relación a los mismos.</li>
                <li>Cumplir con obligaciones derivadas de una relación jurídica presente o futura.</li>
                <li>Brindar atención técnica, seguimiento postventa y soporte al cliente.</li>
                <li>Para fines administrativos de la empresa.</li>
                <li>Para efectos de análisis y planeación estratégica.</li>
              </ol>
              <p>De forma adicional, utilizaremos sus datos para finalidades secundarias, que nos ayudan a mejorar su experiencia como cliente:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Envío de promociones, encuestas de satisfacción, actualizaciones de servicios o noticias de interés tecnológico.</li>
                <li>Invitaciones a eventos, cursos o nuevos lanzamientos de productos o servicios relacionados.</li>
              </ol>
              <p>En caso de que no desee que sus datos personales se utilicen para los fines secundarios por favor de indicarnos al correo: atencion@tecvox.com.mx.</p>

              <h2 className="text-xl font-bold text-white mt-8">Transferencia de datos</h2>
              <p>Tecvox no realiza transferencias de sus datos personales a terceros, salvo cuando exista un requerimiento legal de alguna autoridad competente, o cuando dicha transferencia sea necesaria para cumplir con nuestras obligaciones contractuales con usted. Antes de transferirles información a estos proveedores, nos aseguramos de firmar contratos que obliguen a estas empresas a proteger los datos personales de nuestros usuarios. Y estas empresas declararon cumplir con los mínimos estándares de seguridad de la información y protección de datos personales, por lo que la seguridad de sus datos está asegurada por parte de estos terceros.</p>

              <h2 className="text-xl font-bold text-white mt-8">Ejercicio de Derechos ARCO</h2>
              <p>Usted tiene derecho a ejercer, en todo momento, sus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) respecto al uso de sus datos personales.</p>
              <p>Para ejercer dichos derechos, deberá enviar una solicitud al correo electrónico atencion@tecvox.com.mx con la siguiente información:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Nombre completo del titular</li>
                <li>Especificación clara del derecho que desea ejercer</li>
                <li>Correo electrónico o medio para comunicar la respuesta</li>
                <li>Copia simple de su identificación oficial (INE, pasaporte u otra válida)</li>
              </ol>
              <p>Una vez recibida la solicitud completa, responderemos en un plazo máximo de 20 días hábiles, siendo estos contados de conformidad con el Acuerdo mediante el cual se establece el calendario oficial de días inhábiles del Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales del año correspondiente.</p>

              <h2 className="text-xl font-bold text-white mt-8">Medios para limitar el uso o divulgación de sus datos</h2>
              <p>Si desea dejar de recibir correos electrónicos promocionales o limitar el uso de sus datos para fines mercadotécnicos, puede enviar su solicitud directamente a: atencion@tecvox.com.mx.</p>

              <h2 className="text-xl font-bold text-white mt-8">Seguridad de la información</h2>
              <p>Tecvox ha adoptado las medidas de seguridad físicas, técnicas y administrativas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.</p>
              <p>La seguridad y la confidencialidad de los datos que los usuarios proporcionen al contratar un servicio en línea estarán protegidos por un servidor seguro bajo el protocolo SSL, de tal forma que los datos enviados se transmitirán encriptados para asegurar su resguardo.</p>

              <h2 className="text-xl font-bold text-white mt-8">Cambios al Aviso de Privacidad</h2>
              <p>Este Aviso de Privacidad puede ser modificado en cualquier momento, derivado de actualizaciones legales, políticas internas o nuevos servicios. El Aviso modificado será publicado en nuestro sitio web o se le hará llegar a través de su correo electrónico registrado si así lo desea. Usted podrá verificar que el Aviso ha sido modificado ya que haremos notar siempre la fecha de última actualización.</p>
            </>
          ) : (
            <>
              <p>
                In compliance with the provisions of the Federal Law on Protection of Personal Data Held by Private Parties, GRUPO LISBOA 12 ESTRATEGIAS EN CREATIVIDAD S.A. DE C.V. (hereinafter "Tecvox"), with address in Mexico City and email atencion@tecvox.com.mx, is responsible for the use and protection of the data that you, as the owner, voluntarily provide us, as Tecvox is committed to the legitimate, controlled and informed processing of our users' personal data when they use our services.
              </p>

              <h2 className="text-xl font-bold text-white mt-8">Personal Data We Collect</h2>
              <p>For the proper functioning of our services and the adequate management of our relationship with you, we collect the following personal data:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Address</li>
              </ol>
              <p>These data may be collected through our website, electronic forms, direct communication or digital contact means. We do not request or process sensitive personal data, nor data from persons who are not of legal age.</p>

              <h2 className="text-xl font-bold text-white mt-8">Purposes of Processing</h2>
              <p>Your personal data will be processed under the principles of lawfulness, consent, information, quality, purpose, loyalty, proportionality, and responsibility under the terms of the LFPDPPP. Therefore, your personal data will be used exclusively to provide you with adequate treatment in accordance with the following:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Register and follow up on service contracts and benefits.</li>
                <li>To maintain direct contact with you and be able to provide continuous follow-up on the issuance of your CFDI, as well as timely response and attention in relation to them.</li>
                <li>Comply with obligations derived from a present or future legal relationship.</li>
                <li>Provide technical assistance, after-sales follow-up and customer support.</li>
                <li>For administrative purposes of the company.</li>
                <li>For analysis and strategic planning purposes.</li>
              </ol>
              <p>Additionally, we will use your data for secondary purposes, which help us improve your experience as a customer:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Sending promotions, satisfaction surveys, service updates or technology-related news.</li>
                <li>Invitations to events, courses or new product or service launches.</li>
              </ol>
              <p>If you do not wish your personal data to be used for secondary purposes, please indicate so by emailing: atencion@tecvox.com.mx.</p>

              <h2 className="text-xl font-bold text-white mt-8">Data Transfer</h2>
              <p>Tecvox does not transfer your personal data to third parties, except when there is a legal requirement from a competent authority, or when such transfer is necessary to fulfill our contractual obligations with you. Before transferring information to these providers, we ensure to sign contracts that obligate these companies to protect the personal data of our users. And these companies declared to comply with the minimum information security and personal data protection standards, so the security of your data is assured by these third parties.</p>

              <h2 className="text-xl font-bold text-white mt-8">Exercise of ARCO Rights</h2>
              <p>You have the right to exercise, at any time, your rights of Access, Rectification, Cancellation or Opposition (ARCO) regarding the use of your personal data.</p>
              <p>To exercise these rights, you must send a request to the email address atencion@tecvox.com.mx with the following information:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Full name of the owner</li>
                <li>Clear specification of the right you wish to exercise</li>
                <li>Email or means to communicate the response</li>
                <li>Simple copy of your official identification (INE, passport or other valid ID)</li>
              </ol>
              <p>Once the complete request is received, we will respond within a maximum of 20 business days, counted in accordance with the Agreement establishing the official calendar of non-business days of the National Institute of Transparency, Access to Information and Personal Data Protection of the corresponding year.</p>

              <h2 className="text-xl font-bold text-white mt-8">Means to Limit the Use or Disclosure of Your Data</h2>
              <p>If you wish to stop receiving promotional emails or limit the use of your data for marketing purposes, you can send your request directly to: atencion@tecvox.com.mx.</p>

              <h2 className="text-xl font-bold text-white mt-8">Information Security</h2>
              <p>Tecvox has adopted the necessary physical, technical and administrative security measures to protect your personal information against damage, loss, alteration, destruction or unauthorized use, access or processing.</p>
              <p>The security and confidentiality of the data that users provide when contracting an online service will be protected by a secure server under the SSL protocol, so that the data sent will be transmitted encrypted to ensure its safeguarding.</p>

              <h2 className="text-xl font-bold text-white mt-8">Changes to the Privacy Notice</h2>
              <p>This Privacy Notice may be modified at any time, derived from legal updates, internal policies or new services. The modified Notice will be published on our website or will be sent to you through your registered email if you wish. You may verify that the Notice has been modified as we will always note the date of last update.</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}