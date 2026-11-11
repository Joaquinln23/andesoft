/* ============================================================
   AndeSoft — Modelo (capa de datos)
   Todo el contenido del sitio vive aquí; las vistas solo lo leen.

   FORMATO DE TEXTO (se escapa siempre; no escribas HTML aquí):
     {{palabra}}  → palabra destacada con degradado
     \n           → salto de línea

   CÓMO AGREGAR UN SERVICIO: añade un objeto a `services.items`.
   Aparece solo en las tarjetas, el menú, y las listas de los formularios.
   `id` es el código estable que viajará al servidor (letras minúsculas).

   SEO: title, description, Open Graph y JSON-LD viven en
   public/index.html (los rastreadores los leen sin ejecutar JS).
   ============================================================ */
(function (A) {
  'use strict';

  const logo = { src: 'assets/logo-andesoft.png', width: 640, height: 140, alt: 'AndeSoft' };

  // ---------------------------------------------------------- Navegación
  const nav = {
    logo,
    links: [
      { href: '#inicio', label: 'Inicio', icon: 'home' },
      { href: '#servicios', label: 'Servicios', dropdown: true },
      { href: '#nosotros', label: 'Nosotros' },
      { href: '#proceso', label: 'Proceso' },
      { href: '#stack', label: 'Tecnología' },
      { href: '#contacto', label: 'Contacto' }
    ],
    cta: { href: '#contacto', label: 'Hablemos', icon: 'send', trailingIcon: 'arrowRight' }
  };

  // ---------------------------------------------------------------- Hero
  const hero = {
    badge: { icon: 'code', text: 'Desarrollo de Software a tu Medida' },
    title: ['Aplicaciones y', 'servicios informáticos', 'para {{empresas y pymes}}'],
    subtitle: 'Creamos soluciones tecnológicas innovadoras, escalables y seguras. Potenciamos tu negocio con desarrollo de software, automatización y soporte TI en Chile y el mundo.',
    actions: [
      { href: '#contacto', label: 'Cotizar proyecto', variant: 'primary', icon: 'rocket', trailingIcon: 'arrowRight' },
      { href: '#servicios', label: 'Conocer más', variant: 'outline', icon: 'playCircle' }
    ],
    features: [
      { icon: 'code', title: 'Soluciones a medida', text: 'Diseño y desarrollo personalizado' },
      { icon: 'bolt', title: 'Tecnología de vanguardia', text: 'C# .NET, React, IA y más' },
      { icon: 'shieldCheck', title: 'Compromiso y soporte', text: 'Acompañamiento en todo el proceso' },
      { icon: 'globe', title: 'Alcance global', text: 'Desde Chile para el mundo' }
    ]
  };

  // ------------------------------------------------------------ Servicios
  const services = {
    eyebrow: 'Nuestros servicios',
    title: 'Servicios informáticos y\naplicaciones para tu {{empresa}}',
    lead: 'Te explicamos todo en lenguaje simple, de la idea a la entrega. Trabajamos con pymes en Chile y con empresas de cualquier país, de forma remota y adaptándonos a tu equipo y tus plazos.',
    otherOption: { id: 'otro', label: 'Otro' },
    items: [
      {
        id: 'web', icon: 'web',
        title: 'Aplicaciones web y de escritorio a medida',
        short: 'Aplicaciones web y de escritorio',
        optionLabel: 'Aplicación web o de escritorio a medida',
        desc: 'Sistemas internos, plataformas web y aplicaciones de gestión diseñadas para el flujo real de tu empresa: ventas, inventario, clientes, reportes.',
        tags: ['C# / .NET', 'React', 'Next.js']
      },
      {
        id: 'mobile', icon: 'mobile',
        title: 'Aplicaciones móviles y multiplataforma',
        short: 'Aplicaciones móviles',
        optionLabel: 'Aplicación móvil',
        desc: 'Apps que funcionan en el celular y en el computador, listas para tus clientes o tu equipo en terreno, con diseño responsivo.',
        tags: ['React', 'PWA', 'Responsive']
      },
      {
        id: 'ai', icon: 'ai',
        title: 'Soluciones con IA y Big Data',
        short: 'IA y Big Data',
        optionLabel: 'IA y Big Data',
        desc: 'Análisis de datos, dashboards, asistentes con inteligencia artificial y modelos que ayudan a decidir mejor con la información que ya tienes.',
        tags: ['IA', 'Big Data', 'Python']
      },
      {
        id: 'consulting', icon: 'shield',
        title: 'Servicios informáticos para empresas',
        short: 'Servicios informáticos y consultoría TI',
        optionLabel: 'Servicios informáticos / consultoría TI',
        desc: 'Consultoría y soporte TI, diagnóstico de sistemas, migración de plataformas y acompañamiento en la transformación digital de tu pyme.',
        tags: ['Consultoría TI', 'Soporte', 'Migraciones']
      },
      {
        id: 'automation', icon: 'gears',
        title: 'Automatización e integraciones',
        short: 'Automatización e integraciones',
        optionLabel: 'Automatización e integraciones',
        desc: 'Conectamos tus sistemas (facturación, pagos, CRM, planillas) y eliminamos tareas manuales repetitivas para ahorrarte horas cada mes.',
        tags: ['APIs REST', 'Automatización']
      },
      {
        id: 'cloud', icon: 'cloud',
        title: 'Cloud, bases de datos y DevOps',
        short: 'Cloud, bases de datos y DevOps',
        optionLabel: 'Cloud y bases de datos',
        desc: 'Bases de datos bien modeladas, respaldos, despliegues en la nube y CI/CD para que tu software funcione estable y escale.',
        tags: ['SQL', 'Docker', 'CI/CD']
      }
    ],
    itemCta: 'Cotizar este servicio →',
    cta: {
      title: '¿Tienes un proyecto en mente?',
      text: 'Escríbenos y te respondemos con una propuesta concreta, adaptada a tu empresa, sea en Chile o en cualquier parte del mundo.',
      label: 'Escríbenos ahora',
      href: '#contacto'
    }
  };

  // ------------------------------------------------------------ Nosotros
  const about = {
    eyebrow: 'Quiénes somos',
    title: 'Una empresa comprometida\ncon tu {{resultado}}',
    lead: 'Combinamos experiencia técnica y visión de negocio para entregar soluciones que realmente importan a pymes en Chile y empresas de todo el mundo.',
    photo: {
      src: 'assets/oficina-andesoft.webp', width: 1200, height: 675,
      alt: 'Equipo de AndeSoft trabajando en la oficina frente a sus monitores, con el logo de AndeSoft en la pared'
    },
    chips: [
      { icon: 'shield', label: 'Calidad\ngarantizada' },
      { icon: 'bolt', label: 'Entrega\noportuna' },
      { icon: 'headphones', label: 'Soporte\ncontinuo' }
    ],
    points: [
      { title: 'Equipo dedicado a tu proyecto', text: 'Asignamos un equipo específico a cada cliente. Siempre tienes un punto de contacto claro y responsable.' },
      { title: 'Código que se puede mantener', text: 'Escribimos para el siguiente desarrollador, no solo para hoy. Documentación incluida.' },
      { title: 'Entregas predecibles', text: 'Usamos iteraciones cortas y demos frecuentes para que siempre sepas en qué estamos.' }
    ]
  };

  // ------------------------------------------------------------- Proceso
  const process = {
    eyebrow: 'Cómo trabajamos',
    title: 'De la idea al producto\nen cuatro pasos',
    steps: [
      { title: 'Descubrimiento', text: 'Entendemos tu problema, tu usuario y tus limitaciones reales antes de escribir una sola línea.' },
      { title: 'Arquitectura', text: 'Proponemos la solución técnica más simple que resuelve el problema. Sin sobreingeniería.' },
      { title: 'Desarrollo', text: 'Sprints cortos con demos frecuentes. Siempre tienes visibilidad de lo que se está construyendo.' },
      { title: 'Entrega', text: 'Desplegamos, documentamos y te dejamos con todo lo necesario para seguir por tu cuenta.' }
    ]
  };

  // --------------------------------------------------------------- Stack
  const stack = {
    eyebrow: 'Stack tecnológico',
    title: 'Las herramientas\nque dominamos',
    lead: 'Elegimos herramientas con soporte real y comunidad grande: menos sorpresas, más continuidad para tu proyecto.',
    logos: [
      { img: 'assets/logos/dotnet.svg', label: '.NET / C#' },
      { img: 'assets/logos/react.svg', label: 'React' },
      { img: 'assets/logos/nextdotjs.svg', label: 'Next.js' },
      { img: 'assets/logos/typescript.svg', label: 'TypeScript' },
      { img: 'assets/logos/javascript.svg', label: 'JavaScript' },
      { img: 'assets/logos/microsoftsqlserver.svg', label: 'SQL Server' },
      { img: 'assets/logos/postgresql.svg', label: 'PostgreSQL' },
      { img: 'assets/logos/python.svg', label: 'Python' },
      { img: 'assets/logos/tensorflow.svg', label: 'IA / Machine Learning' },
      { img: 'assets/logos/apachespark.svg', label: 'Big Data' },
      { img: 'assets/logos/microsoftazure.svg', label: 'Azure' },
      { img: 'assets/logos/amazonaws.svg', label: 'AWS' },
      { img: 'assets/logos/docker.svg', label: 'Docker' },
      { img: 'assets/logos/git.svg', label: 'Git' },
      { img: 'assets/logos/githubactions.svg', label: 'GitHub Actions' },
      { img: 'assets/logos/tailwindcss.svg', label: 'Tailwind CSS' }
    ]
  };

  // ----------------------------------------------------------------- FAQ
  const faq = {
    eyebrow: 'Preguntas frecuentes',
    title: 'Resolvemos tus dudas',
    items: [
      { q: '¿Necesito saber de tecnología para trabajar con ustedes?', a: 'No. Te explicamos cada paso en lenguaje simple y tú solo nos cuentas qué necesita tu negocio.' },
      { q: '¿Cómo empiezo?', a: 'Eliges el servicio que te interesa y nos cuentas tu necesidad en el formulario. Te enviamos una propuesta clara, sin compromiso.' },
      { q: '¿Trabajan con empresas fuera de Chile?', a: 'Sí. Trabajamos de forma remota con pymes de Chile y con empresas de cualquier país, coordinando horarios contigo.' },
      { q: '¿Hacen soporte y consultoría informática?', a: 'Sí. Además de crear aplicaciones, ofrecemos soporte, consultoría TI y migración de sistemas para tu empresa.' },
      { q: '¿Cuánto cuesta un proyecto?', a: 'Depende de lo que necesites. Por eso primero conversamos y te entregamos una cotización según el alcance real de tu proyecto.' }
    ]
  };

  // ------------------------------------------------------------ Formularios
  // type: 'text' | 'email' | 'textarea' | 'service' (lista de servicios).
  // Los límites (minLength/maxLength) se aplican en el navegador Y deben
  // repetirse en el servidor: el navegador nunca es una barrera de seguridad.
  const forms = {
    quick: {
      title: 'Cotiza en 30 segundos',
      text: 'Cuéntanos qué necesitas y te enviamos una propuesta clara.',
      submit: 'Quiero mi cotización',
      note: 'Usaremos tus datos solo para responder tu consulta.',
      fields: [
        { name: 'servicio', type: 'service', label: '¿Qué necesitas?', emptyLabel: 'Selecciona un servicio', icon: 'grid', required: true },
        { name: 'nombre', type: 'text', label: 'Tu nombre', placeholder: 'Tu nombre', icon: 'user', autocomplete: 'name', required: true, minLength: 2, maxLength: 80 },
        { name: 'email', type: 'email', label: 'Tu email', placeholder: 'Tu email', icon: 'mail', autocomplete: 'email', required: true, maxLength: 120 }
      ]
    },
    contact: {
      submit: 'Enviar mensaje',
      fields: [
        { name: 'nombre', type: 'text', label: 'Nombre', placeholder: 'Juan Pérez', icon: 'user', autocomplete: 'name', required: true, minLength: 2, maxLength: 80 },
        { name: 'email', type: 'email', label: 'Email', placeholder: 'juan@empresa.com', icon: 'mail', autocomplete: 'email', required: true, maxLength: 120 },
        { name: 'servicio', type: 'service', label: 'Servicio que te interesa', emptyLabel: 'Selecciona una opción', icon: 'briefcase', required: false },
        { name: 'mensaje', type: 'textarea', label: 'Cuéntanos sobre tu proyecto', placeholder: 'Describe brevemente qué necesitas, tu país o ciudad, y tu plazo estimado…', icon: 'chat', required: true, minLength: 10, maxLength: 2000 }
      ]
    }
  };

  // ------------------------------------------------------------ Contacto
  // Cuando la empresa tenga correo corporativo, agrégalo en `info`
  // como otra tarjeta (icon: 'mail') — la vista la dibuja sola.
  const contact = {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu {{proyecto}}',
    lead: 'Completa el formulario y te respondemos. Sin compromiso.',
    info: [
      { icon: 'pin', title: 'Ubicación', text: 'Chile — atención remota a empresas del mundo' },
      { icon: 'clock', title: 'Horario', text: 'Lunes a viernes, hora de Chile (CLT); coordinamos con otras zonas horarias' }
    ]
  };

  // -------------------------------------------------------------- Footer
  const footer = {
    logo,
    description: 'Desarrollo de software y servicios informáticos para pymes y empresas de Chile y el mundo.',
    columns: [
      {
        title: 'Servicios',
        links: [
          { href: '#servicios', label: 'Aplicaciones a medida' },
          { href: '#servicios', label: 'IA y Big Data' },
          { href: '#servicios', label: 'Servicios informáticos' },
          { href: '#servicios', label: 'Automatización y Cloud' }
        ]
      },
      {
        title: 'Secciones',
        links: [
          { href: '#nosotros', label: 'Nosotros' },
          { href: '#proceso', label: 'Cómo trabajamos' },
          { href: '#stack', label: 'Tecnología' }
        ]
      },
      { title: 'Contacto', links: [{ href: '#contacto', label: 'Formulario de contacto' }] }
    ],
    copyright: '© {year} AndeSoft. Todos los derechos reservados.'
  };

  A.model = A.util.deepFreeze({ nav, hero, services, about, process, stack, faq, forms, contact, footer });
})(window.AndeSoft);
