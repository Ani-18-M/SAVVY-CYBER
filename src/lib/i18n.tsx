import * as React from "react";

export type Lang = "en" | "hi" | "te" | "es";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "te", label: "తెలుగు" },
  { code: "es", label: "Español" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.login": "Login",
  "page.threats.eyebrow": "Threat library",
  "page.threats.title": "Know the threats before they reach you",
  "page.threats.desc":
    "Each card links to a full explanation: what it is, how it works, warning signs, an example, prevention and recovery.",
  "page.safety.eyebrow": "Digital safety",
  "page.safety.title": "Practical habits that protect your accounts and devices",
  "page.safety.desc":
    "Passwords, devices, browsing, email and social media — the essentials, without jargon.",
  "page.privacy.eyebrow": "Privacy",
  "page.privacy.title": "Take back control of your personal data",
  "page.privacy.desc":
    "Understand tracking, permissions and data collection, then work through the privacy checklist.",
  "page.scams.eyebrow": "Scam awareness center",
  "page.scams.title": "Spot the scam before it costs you",
  "page.scams.desc":
    "Every scam follows a pattern. Learn the red flag, the attacker's move and the safe response.",
  "page.learn.eyebrow": "Learning center",
  "page.learn.title": "Learn cyber safety step by step",
  "page.learn.desc": "Beginner to advanced lessons, each with key points and a short quiz.",
  "page.checkup.eyebrow": "Cyber safety checkup",
  "page.checkup.title": "How safe are your digital habits?",
  "page.checkup.desc":
    "Seven honest answers, one score out of 100, and the actions that will help you most. Your answers stay on this device.",
  "page.incident.eyebrow": "Incident response",
  "page.incident.title": "What to do if you've been hacked or scammed",
  "page.incident.desc":
    "Follow the steps in order: contain the damage, preserve evidence, recover access, then report and monitor.",
  "page.resources.eyebrow": "Resources",
  "page.resources.title": "Guides, checklists and official help",
  "page.resources.desc": "Downloadable-style guides and trusted places to report cybercrime.",
  "page.about.eyebrow": "About",
  "page.about.title": "Awareness is the strongest firewall",
  "page.about.desc": "Our mission, vision and who this portal is built for.",
  "page.contact.eyebrow": "Contact & feedback",
  "page.contact.title": "Tell us what would help you stay safer",
  "page.contact.desc":
    "Questions, corrections and suggestions are welcome. Never include passwords, OTPs or card numbers.",
  "page.login.eyebrow": "Account",
  "page.login.title": "Log in to CyberSafe",
  "page.login.desc": "Sign in to keep your learning progress and checkup score with you.",
  "login.email": "Email",
  "login.password": "Password",
  "login.submit": "Log in",
  "login.signup": "Create an account",
  "login.forgot": "Forgot password?",
  "login.success": "Welcome back!",
  "login.invalid": "Please enter a valid email and a password of at least 6 characters.",
  "login.note": "This is a demo login for the awareness portal — no real accounts are stored yet.",
  "nav.home": "Home",
  "nav.threats": "Cyber Threats",
  "nav.safety": "Digital Safety",
  "nav.privacy": "Privacy",
  "nav.scams": "Scams",
  "nav.learn": "Learn",
  "nav.checkup": "Checkup",
  "nav.incident": "Incident Help",
  "nav.resources": "Resources",
  "nav.about": "About",
  "nav.contact": "Contact",
  "cta.start": "Start Learning",
  "cta.checkup": "Take the Safety Checkup",
  "hero.title": "Stay Safe. Stay Smart. Stay Secure.",
  "hero.sub":
    "Build your digital safety skills and protect yourself from cyber threats, scams, data theft, and online attacks.",
  "hero.badge": "Free public cyber awareness portal",
  "footer.tagline": "Empowering people to make safer digital decisions.",
  "footer.rights": "© 2026 CyberSafe. All rights reserved.",
  "footer.explore": "Explore",
  "footer.legal": "Legal",
  "footer.privacyPolicy": "Privacy Policy",
  "footer.terms": "Terms of Use",
  "common.theme": "Toggle theme",
  "common.language": "Language",
  "common.menu": "Dashboard",
};

const hi: Dict = {
  "nav.login": "लॉगिन",
  "page.threats.eyebrow": "खतरा पुस्तकालय",
  "page.threats.title": "खतरों को पहचानें, उनके पहुँचने से पहले",
  "page.threats.desc":
    "प्रत्येक कार्ड पूरी जानकारी देता है: यह क्या है, कैसे काम करता है, चेतावनी संकेत, उदाहरण, बचाव और रिकवरी।",
  "page.safety.eyebrow": "डिजिटल सुरक्षा",
  "page.safety.title": "आपके खातों और डिवाइस की रक्षा करने वाली आदतें",
  "page.safety.desc":
    "पासवर्ड, डिवाइस, ब्राउज़िंग, ईमेल और सोशल मीडिया — आसान भाषा में ज़रूरी बातें।",
  "page.privacy.eyebrow": "प्राइवेसी",
  "page.privacy.title": "अपने निजी डेटा पर नियंत्रण पाएँ",
  "page.privacy.desc":
    "ट्रैकिंग, अनुमतियाँ और डेटा संग्रह समझें, फिर प्राइवेसी चेकलिस्ट पूरी करें।",
  "page.scams.eyebrow": "धोखाधड़ी जागरूकता केंद्र",
  "page.scams.title": "नुकसान से पहले धोखाधड़ी पहचानें",
  "page.scams.desc":
    "हर ठगी एक पैटर्न पर चलती है। चेतावनी संकेत, ठग की चाल और सुरक्षित प्रतिक्रिया सीखें।",
  "page.learn.eyebrow": "लर्निंग सेंटर",
  "page.learn.title": "कदम-दर-कदम साइबर सुरक्षा सीखें",
  "page.learn.desc": "शुरुआती से उन्नत पाठ, हर पाठ में मुख्य बिंदु और छोटा क्विज़।",
  "page.checkup.eyebrow": "साइबर सुरक्षा जाँच",
  "page.checkup.title": "आपकी डिजिटल आदतें कितनी सुरक्षित हैं?",
  "page.checkup.desc":
    "सात ईमानदार उत्तर, 100 में स्कोर, और सबसे उपयोगी कदम। उत्तर आपके डिवाइस पर ही रहते हैं।",
  "page.incident.eyebrow": "घटना प्रतिक्रिया",
  "page.incident.title": "हैक या ठगी होने पर क्या करें",
  "page.incident.desc":
    "क्रम से कदम उठाएँ: नुकसान रोकें, सबूत सुरक्षित रखें, पहुँच बहाल करें, फिर रिपोर्ट और निगरानी करें।",
  "page.resources.eyebrow": "संसाधन",
  "page.resources.title": "गाइड, चेकलिस्ट और आधिकारिक सहायता",
  "page.resources.desc": "उपयोगी गाइड और साइबर अपराध रिपोर्ट करने के भरोसेमंद स्थान।",
  "page.about.eyebrow": "हमारे बारे में",
  "page.about.title": "जागरूकता सबसे मजबूत सुरक्षा है",
  "page.about.desc": "हमारा उद्देश्य, दृष्टि और यह पोर्टल किसके लिए है।",
  "page.contact.eyebrow": "संपर्क और सुझाव",
  "page.contact.title": "बताइए, सुरक्षित रहने में क्या मदद करेगा",
  "page.contact.desc": "प्रश्न और सुझाव आमंत्रित हैं। पासवर्ड, OTP या कार्ड नंबर कभी न भेजें।",
  "page.login.eyebrow": "खाता",
  "page.login.title": "CyberSafe में लॉगिन करें",
  "page.login.desc": "अपनी सीखने की प्रगति और स्कोर सुरक्षित रखने के लिए साइन इन करें।",
  "login.email": "ईमेल",
  "login.password": "पासवर्ड",
  "login.submit": "लॉगिन",
  "login.signup": "नया खाता बनाएँ",
  "login.forgot": "पासवर्ड भूल गए?",
  "login.success": "वापसी पर स्वागत है!",
  "login.invalid": "कृपया सही ईमेल और कम से कम 6 अक्षरों का पासवर्ड दर्ज करें।",
  "login.note": "यह जागरूकता पोर्टल का डेमो लॉगिन है — अभी वास्तविक खाते संग्रहित नहीं होते।",
  "nav.home": "होम",
  "nav.threats": "साइबर खतरे",
  "nav.safety": "डिजिटल सुरक्षा",
  "nav.privacy": "प्राइवेसी",
  "nav.scams": "धोखाधड़ी",
  "nav.learn": "सीखें",
  "nav.checkup": "जाँच",
  "nav.incident": "सहायता",
  "nav.resources": "संसाधन",
  "nav.about": "हमारे बारे में",
  "nav.contact": "संपर्क",
  "cta.start": "सीखना शुरू करें",
  "cta.checkup": "सुरक्षा जाँच करें",
  "hero.title": "सतर्क रहें। समझदार बनें। सुरक्षित रहें।",
  "hero.sub":
    "अपनी डिजिटल सुरक्षा कौशल बढ़ाएँ और साइबर खतरों, धोखाधड़ी, डेटा चोरी तथा ऑनलाइन हमलों से बचें।",
  "hero.badge": "निःशुल्क साइबर जागरूकता पोर्टल",
  "footer.tagline": "लोगों को सुरक्षित डिजिटल निर्णय लेने में सक्षम बनाना।",
  "footer.rights": "© 2026 CyberSafe. सर्वाधिकार सुरक्षित।",
  "footer.explore": "खोजें",
  "footer.legal": "कानूनी",
  "footer.privacyPolicy": "प्राइवेसी नीति",
  "footer.terms": "उपयोग की शर्तें",
  "common.theme": "थीम बदलें",
  "common.language": "भाषा",
  "common.menu": "डैशबोर्ड",
};

const te: Dict = {
  "nav.login": "లాగిన్",
  "page.threats.eyebrow": "ముప్పుల గ్రంథాలయం",
  "page.threats.title": "ముప్పులు మీ దగ్గరకు రాకముందే తెలుసుకోండి",
  "page.threats.desc":
    "ప్రతి కార్డులో పూర్తి వివరణ: ఏమిటి, ఎలా జరుగుతుంది, హెచ్చరిక సంకేతాలు, ఉదాహరణ, నివారణ, రికవరీ.",
  "page.safety.eyebrow": "డిజిటల్ భద్రత",
  "page.safety.title": "మీ ఖాతాలు, పరికరాలను కాపాడే అలవాట్లు",
  "page.safety.desc": "పాస్‌వర్డ్‌లు, పరికరాలు, బ్రౌజింగ్, ఈమెయిల్, సోషల్ మీడియా — సులభ భాషలో.",
  "page.privacy.eyebrow": "గోప్యత",
  "page.privacy.title": "మీ వ్యక్తిగత డేటాపై నియంత్రణ తీసుకోండి",
  "page.privacy.desc":
    "ట్రాకింగ్, అనుమతులు, డేటా సేకరణ అర్థం చేసుకోండి, తర్వాత చెక్‌లిస్ట్ పూర్తి చేయండి.",
  "page.scams.eyebrow": "మోసాల అవగాహన కేంద్రం",
  "page.scams.title": "నష్టం జరగకముందే మోసాన్ని గుర్తించండి",
  "page.scams.desc":
    "ప్రతి మోసానికి ఒక నమూనా ఉంటుంది. హెచ్చరిక సంకేతం, మోసగాడి ఎత్తుగడ, సురక్షిత స్పందన నేర్చుకోండి.",
  "page.learn.eyebrow": "లెర్నింగ్ సెంటర్",
  "page.learn.title": "దశలవారీగా సైబర్ భద్రత నేర్చుకోండి",
  "page.learn.desc": "ప్రారంభ నుండి అధునాతన పాఠాలు, ప్రతిదానిలో ముఖ్యాంశాలు మరియు చిన్న క్విజ్.",
  "page.checkup.eyebrow": "సైబర్ భద్రతా తనిఖీ",
  "page.checkup.title": "మీ డిజిటల్ అలవాట్లు ఎంత సురక్షితం?",
  "page.checkup.desc":
    "ఏడు నిజాయితీ సమాధానాలు, 100కి స్కోరు, మరియు ఉపయోగపడే చర్యలు. సమాధానాలు మీ పరికరంలోనే ఉంటాయి.",
  "page.incident.eyebrow": "సంఘటన స్పందన",
  "page.incident.title": "హ్యాక్ లేదా మోసం జరిగితే ఏం చేయాలి",
  "page.incident.desc":
    "క్రమంగా అనుసరించండి: నష్టం ఆపండి, ఆధారాలు భద్రపరచండి, యాక్సెస్ తిరిగి పొందండి, రిపోర్ట్ చేయండి.",
  "page.resources.eyebrow": "వనరులు",
  "page.resources.title": "గైడ్‌లు, చెక్‌లిస్ట్‌లు, అధికారిక సహాయం",
  "page.resources.desc": "ఉపయోగకరమైన గైడ్‌లు మరియు సైబర్ నేరాలను నివేదించే విశ్వసనీయ చిరునామాలు.",
  "page.about.eyebrow": "మా గురించి",
  "page.about.title": "అవగాహనే బలమైన రక్షణ",
  "page.about.desc": "మా లక్ష్యం, దృష్టి, ఈ పోర్టల్ ఎవరి కోసం.",
  "page.contact.eyebrow": "సంప్రదింపు & అభిప్రాయం",
  "page.contact.title": "మీరు సురక్షితంగా ఉండేందుకు ఏమి సహాయపడుతుందో చెప్పండి",
  "page.contact.desc":
    "ప్రశ్నలు, సూచనలు స్వాగతం. పాస్‌వర్డ్‌లు, OTP, కార్డు నంబర్లు ఎప్పుడూ పంపవద్దు.",
  "page.login.eyebrow": "ఖాతా",
  "page.login.title": "CyberSafeలో లాగిన్ అవ్వండి",
  "page.login.desc": "మీ నేర్చుకునే పురోగతి, స్కోరు భద్రంగా ఉంచడానికి సైన్ ఇన్ చేయండి.",
  "login.email": "ఈమెయిల్",
  "login.password": "పాస్‌వర్డ్",
  "login.submit": "లాగిన్",
  "login.signup": "కొత్త ఖాతా సృష్టించండి",
  "login.forgot": "పాస్‌వర్డ్ మర్చిపోయారా?",
  "login.success": "తిరిగి స్వాగతం!",
  "login.invalid": "సరైన ఈమెయిల్ మరియు కనీసం 6 అక్షరాల పాస్‌వర్డ్ నమోదు చేయండి.",
  "login.note": "ఇది అవగాహన పోర్టల్ డెమో లాగిన్ — ఇంకా నిజమైన ఖాతాలు నిల్వ చేయబడవు.",
  "nav.home": "హోమ్",
  "nav.threats": "సైబర్ ముప్పులు",
  "nav.safety": "డిజిటల్ భద్రత",
  "nav.privacy": "గోప్యత",
  "nav.scams": "మోసాలు",
  "nav.learn": "నేర్చుకోండి",
  "nav.checkup": "తనిఖీ",
  "nav.incident": "సహాయం",
  "nav.resources": "వనరులు",
  "nav.about": "మా గురించి",
  "nav.contact": "సంప్రదించండి",
  "cta.start": "నేర్చుకోవడం ప్రారంభించండి",
  "cta.checkup": "భద్రతా తనిఖీ చేయండి",
  "hero.title": "అప్రమత్తంగా ఉండండి. తెలివిగా ఉండండి. సురక్షితంగా ఉండండి.",
  "hero.sub":
    "మీ డిజిటల్ భద్రతా నైపుణ్యాలను పెంచుకోండి, సైబర్ ముప్పులు, మోసాలు, డేటా చోరీ నుండి రక్షణ పొందండి.",
  "hero.badge": "ఉచిత సైబర్ అవగాహన పోర్టల్",
  "footer.tagline": "సురక్షితమైన డిజిటల్ నిర్ణయాలు తీసుకునేలా ప్రజలను సన్నద్ధం చేయడం.",
  "footer.rights": "© 2026 CyberSafe. అన్ని హక్కులు reserved.",
  "footer.explore": "అన్వేషించండి",
  "footer.legal": "చట్టపరమైన",
  "footer.privacyPolicy": "గోప్యతా విధానం",
  "footer.terms": "ఉపయోగ నిబంధనలు",
  "common.theme": "థీమ్ మార్చండి",
  "common.language": "భాష",
  "common.menu": "డ్యాష్‌బోర్డ్",
};

const es: Dict = {
  "nav.login": "Iniciar sesión",
  "page.threats.eyebrow": "Biblioteca de amenazas",
  "page.threats.title": "Conoce las amenazas antes de que lleguen",
  "page.threats.desc":
    "Cada tarjeta enlaza a una explicación completa: qué es, cómo funciona, señales de alerta, ejemplo, prevención y recuperación.",
  "page.safety.eyebrow": "Seguridad digital",
  "page.safety.title": "Hábitos que protegen tus cuentas y dispositivos",
  "page.safety.desc":
    "Contraseñas, dispositivos, navegación, correo y redes sociales — lo esencial, sin tecnicismos.",
  "page.privacy.eyebrow": "Privacidad",
  "page.privacy.title": "Recupera el control de tus datos personales",
  "page.privacy.desc":
    "Entiende el rastreo, los permisos y la recolección de datos, y completa la lista de privacidad.",
  "page.scams.eyebrow": "Centro de estafas",
  "page.scams.title": "Detecta la estafa antes de que te cueste",
  "page.scams.desc":
    "Toda estafa sigue un patrón. Aprende la señal de alerta, la jugada del estafador y la respuesta segura.",
  "page.learn.eyebrow": "Centro de aprendizaje",
  "page.learn.title": "Aprende seguridad paso a paso",
  "page.learn.desc":
    "Lecciones de nivel básico a avanzado, cada una con puntos clave y un test corto.",
  "page.checkup.eyebrow": "Chequeo de seguridad",
  "page.checkup.title": "¿Qué tan seguros son tus hábitos digitales?",
  "page.checkup.desc":
    "Siete respuestas honestas, una puntuación sobre 100 y las acciones que más te ayudarán. Tus respuestas se quedan en este dispositivo.",
  "page.incident.eyebrow": "Respuesta a incidentes",
  "page.incident.title": "Qué hacer si te han hackeado o estafado",
  "page.incident.desc":
    "Sigue los pasos en orden: contén el daño, conserva pruebas, recupera el acceso, denuncia y vigila.",
  "page.resources.eyebrow": "Recursos",
  "page.resources.title": "Guías, listas y ayuda oficial",
  "page.resources.desc": "Guías útiles y lugares de confianza para denunciar ciberdelitos.",
  "page.about.eyebrow": "Acerca de",
  "page.about.title": "La concienciación es el mejor cortafuegos",
  "page.about.desc": "Nuestra misión, visión y para quién es este portal.",
  "page.contact.eyebrow": "Contacto y comentarios",
  "page.contact.title": "Cuéntanos qué te ayudaría a estar más seguro",
  "page.contact.desc":
    "Preguntas y sugerencias son bienvenidas. Nunca incluyas contraseñas, códigos OTP ni números de tarjeta.",
  "page.login.eyebrow": "Cuenta",
  "page.login.title": "Inicia sesión en CyberSafe",
  "page.login.desc": "Inicia sesión para conservar tu progreso y tu puntuación.",
  "login.email": "Correo electrónico",
  "login.password": "Contraseña",
  "login.submit": "Iniciar sesión",
  "login.signup": "Crear una cuenta",
  "login.forgot": "¿Olvidaste tu contraseña?",
  "login.success": "¡Bienvenido de nuevo!",
  "login.invalid": "Introduce un correo válido y una contraseña de al menos 6 caracteres.",
  "login.note":
    "Este es un inicio de sesión de demostración — todavía no se guardan cuentas reales.",
  "nav.home": "Inicio",
  "nav.threats": "Amenazas",
  "nav.safety": "Seguridad digital",
  "nav.privacy": "Privacidad",
  "nav.scams": "Estafas",
  "nav.learn": "Aprender",
  "nav.checkup": "Chequeo",
  "nav.incident": "Ayuda",
  "nav.resources": "Recursos",
  "nav.about": "Acerca de",
  "nav.contact": "Contacto",
  "cta.start": "Empezar a aprender",
  "cta.checkup": "Hacer el chequeo",
  "hero.title": "Mantente seguro. Mantente alerta. Mantente protegido.",
  "hero.sub":
    "Desarrolla tus habilidades de seguridad digital y protégete de amenazas, estafas y robo de datos.",
  "hero.badge": "Portal gratuito de concienciación",
  "footer.tagline": "Ayudamos a las personas a tomar decisiones digitales más seguras.",
  "footer.rights": "© 2026 CyberSafe. Todos los derechos reservados.",
  "footer.explore": "Explorar",
  "footer.legal": "Legal",
  "footer.privacyPolicy": "Política de privacidad",
  "footer.terms": "Términos de uso",
  "common.theme": "Cambiar tema",
  "common.language": "Idioma",
  "common.menu": "Panel",
};

const dicts: Record<Lang, Dict> = { en, hi, te, es };

const LangContext = React.createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => en[k] ?? k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    const stored = localStorage.getItem("cybersafe-lang") as Lang | null;
    if (stored && stored in dicts) setLangState(stored);
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("cybersafe-lang", l);
  }, []);

  const t = React.useCallback((key: string) => dicts[lang][key] ?? en[key] ?? key, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useI18n() {
  return React.useContext(LangContext);
}
