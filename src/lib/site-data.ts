export type Risk = "Low" | "Medium" | "High" | "Critical";

export type Threat = {
  slug: string;
  name: string;
  icon: string;
  risk: Risk;
  short: string;
  what: string;
  how: string[];
  signs: string[];
  example: string;
  prevent: string[];
  ifAffected: string[];
};

export const threats: Threat[] = [
  {
    slug: "phishing",
    name: "Phishing",
    icon: "Fish",
    risk: "Critical",
    short:
      "Fake messages that imitate trusted brands to trick you into giving away logins or money.",
    what: "Phishing is a deception attack delivered by email, SMS, chat or calls. The message pretends to come from a bank, employer, delivery service or government office and pushes you to act quickly.",
    how: [
      "You receive a message that looks official and creates urgency or fear.",
      "It contains a link to a look-alike login page, or an attachment.",
      "Anything you type on that page is captured by the attacker.",
      "The stolen login is then used to access your real account.",
    ],
    signs: [
      "Urgent deadlines: 'your account will be closed in 24 hours'",
      "Sender address that almost matches the real domain",
      "Links whose visible text differs from the real destination",
      "Requests for OTP, PIN, password or card details",
      "Unexpected attachments, especially archives or documents with macros",
    ],
    example:
      "A student receives an email titled 'Scholarship payment on hold' with a link to 'university-portal-verify.com'. The page looks identical to the college portal, but it simply records the username and password typed into it.",
    prevent: [
      "Open sites by typing the address yourself or using a saved bookmark.",
      "Check the sender domain letter by letter before acting.",
      "Never share OTPs or passwords — no legitimate service asks for them.",
      "Turn on multi-factor authentication so a stolen password is not enough.",
      "Report suspicious mail to your provider's phishing/report button.",
    ],
    ifAffected: [
      "Change the password of the affected account from a device you trust.",
      "Sign out all other sessions and review recent login activity.",
      "Inform your bank or IT support immediately if money or work accounts are involved.",
      "Run a device scan and keep the original message as evidence.",
    ],
  },
  {
    slug: "malware",
    name: "Malware",
    icon: "Bug",
    risk: "High",
    short:
      "Harmful software that hides inside downloads and quietly damages or spies on your device.",
    what: "Malware is any unwanted program installed without informed consent — spyware, trojans, keyloggers, adware and worms all belong to this family.",
    how: [
      "It arrives with cracked software, unofficial app stores or fake 'update' popups.",
      "Once installed, it runs in the background with your permissions.",
      "It may record keystrokes, show ads, mine currency or open a backdoor.",
    ],
    signs: [
      "Sudden slowdowns, overheating or unusual battery drain",
      "New apps, toolbars or browser home pages you never installed",
      "Security software disabled or unable to update",
      "Unexpected data usage or outgoing messages",
    ],
    example:
      "A free 'PDF converter' downloaded from a search advertisement installs a background program that copies saved browser passwords.",
    prevent: [
      "Install apps only from official stores and vendor websites.",
      "Keep the operating system, browser and apps updated automatically.",
      "Keep built-in protection (Defender, Play Protect, XProtect) switched on.",
      "Avoid pirated software and 'activation' tools entirely.",
    ],
    ifAffected: [
      "Disconnect from the network to stop data leaving the device.",
      "Run a full scan with reputable, updated security software.",
      "Change important passwords from a different clean device.",
      "If the device is managed by an organisation, contact its IT team.",
    ],
  },
  {
    slug: "ransomware",
    name: "Ransomware",
    icon: "Lock",
    risk: "Critical",
    short: "Malware that locks your files and demands payment to release them.",
    what: "Ransomware encrypts personal or organisational files and displays a payment demand. Paying does not guarantee recovery and often funds further crime.",
    how: [
      "It typically enters through a phishing attachment or an exposed remote service.",
      "Files are encrypted and originals deleted.",
      "A ransom note appears with a countdown and payment instructions.",
    ],
    signs: [
      "Files renamed with unknown extensions and refusing to open",
      "A full-screen or text-file ransom note",
      "Backup drives suddenly inaccessible",
    ],
    example:
      "A small clinic opens an invoice attachment; within minutes patient records are unreadable and a note demands cryptocurrency payment.",
    prevent: [
      "Keep offline or versioned backups and test that they restore.",
      "Apply security updates promptly.",
      "Treat unexpected attachments as untrusted.",
      "Use multi-factor authentication on remote access and cloud storage.",
    ],
    ifAffected: [
      "Disconnect the device from the network and leave it powered on if advised.",
      "Do not pay — contact professional incident responders or official cybercrime authorities.",
      "Restore from a clean backup after the device is rebuilt.",
      "Preserve the ransom note and logs for investigators.",
    ],
  },
  {
    slug: "identity-theft",
    name: "Identity Theft",
    icon: "UserX",
    risk: "Critical",
    short: "Someone uses your personal details to impersonate you for loans, accounts or fraud.",
    what: "Identity theft combines leaked documents, social media details and stolen credentials to open accounts or take credit in your name.",
    how: [
      "Attackers collect ID numbers, addresses and photos from breaches or oversharing.",
      "They pass weak verification checks using those details.",
      "New accounts, SIM cards or loans are created in your name.",
    ],
    signs: [
      "Unknown loans, credit checks or account statements",
      "Verification codes you did not request",
      "Your mobile number suddenly loses service (possible SIM swap)",
    ],
    example:
      "A leaked ID copy shared in a chat group is used to obtain a duplicate SIM, which then receives banking OTPs.",
    prevent: [
      "Never post ID documents, tickets or address proofs publicly.",
      "Use unique passwords plus app-based authentication.",
      "Lock or freeze your credit file where that service exists.",
      "Shred or redact documents before sharing copies.",
    ],
    ifAffected: [
      "Report to your bank and to the official cybercrime helpline in your country.",
      "File a written complaint — it creates the record needed for disputes.",
      "Ask credit bureaus to flag your file.",
      "Keep a dated log of every call and reference number.",
    ],
  },
  {
    slug: "password-attacks",
    name: "Password Attacks",
    icon: "KeyRound",
    risk: "High",
    short: "Automated guessing and reuse testing that breaks weak or repeated passwords.",
    what: "Attackers test enormous lists of leaked and common passwords against login pages, or reuse a password leaked from one site on another.",
    how: [
      "Leaked username/password pairs are collected from old breaches.",
      "Automated tools try them across popular services.",
      "Any account sharing that password is opened.",
    ],
    signs: [
      "Login alerts from unfamiliar locations",
      "Password reset emails you did not request",
      "Being logged out of a service unexpectedly",
    ],
    example:
      "A password reused from a 2018 forum breach still unlocks the same person's shopping account today.",
    prevent: [
      "Use a long, unique passphrase for every account.",
      "Store them in a reputable password manager.",
      "Turn on multi-factor authentication, preferring an authenticator app.",
      "Check your addresses in a breach-notification service.",
    ],
    ifAffected: [
      "Change the password on the affected service and anywhere it was reused.",
      "Revoke active sessions and connected apps.",
      "Enable multi-factor authentication before finishing.",
    ],
  },
  {
    slug: "social-engineering",
    name: "Social Engineering",
    icon: "Users",
    risk: "High",
    short: "Manipulation of people — not machines — using authority, urgency and trust.",
    what: "Social engineering exploits human instincts. The attacker builds a believable story so the target willingly hands over access or money.",
    how: [
      "Research: public posts reveal your employer, colleagues and routine.",
      "Pretext: a convincing role is adopted — manager, courier, IT helpdesk.",
      "Pressure: urgency and secrecy stop you from verifying.",
    ],
    signs: [
      "Requests to bypass the normal process 'just this once'",
      "Insistence on secrecy or on staying on the call",
      "Caller who already knows some details, gaining false credibility",
    ],
    example:
      "A new employee receives a chat message from 'the director' asking for urgent gift-card purchases before a meeting.",
    prevent: [
      "Verify unusual requests through a second, known channel.",
      "Agree a family or team safe-word for urgent money requests.",
      "Limit what your public profiles reveal about work and travel.",
      "Normalise saying 'I will call you back on the official number'.",
    ],
    ifAffected: [
      "Stop all further transfers and inform your bank immediately.",
      "Tell your manager or IT team — speed limits the damage.",
      "Save chat logs and numbers for the report.",
    ],
  },
  {
    slug: "online-scams",
    name: "Online Scams",
    icon: "CircleDollarSign",
    risk: "High",
    short: "Fraud schemes promising jobs, prizes, refunds or investments that never exist.",
    what: "Scams are commercial deceptions run at scale over social platforms, marketplaces and messaging apps.",
    how: [
      "An offer far better than normal is advertised.",
      "A small 'processing fee' or wallet top-up is requested.",
      "Contact disappears once payment is made.",
    ],
    signs: [
      "Guaranteed returns or unrealistic salaries for simple tasks",
      "Payment demanded upfront to receive money",
      "Communication only through informal channels",
    ],
    example:
      "A 'work from home data entry' offer asks for a ₹1,500 registration fee and a copy of an ID card, then goes silent.",
    prevent: [
      "Verify companies through official websites and registration records.",
      "Never pay to receive a prize, refund or salary.",
      "Search the offer text — scams are usually reported already.",
    ],
    ifAffected: [
      "Report the transaction to your bank or payment provider without delay.",
      "Report the profile or advertisement to the platform.",
      "File a complaint with your national cybercrime portal.",
    ],
  },
  {
    slug: "fake-websites",
    name: "Fake Websites",
    icon: "Globe",
    risk: "Medium",
    short: "Look-alike shops and portals built to harvest cards and credentials.",
    what: "Cloned sites copy the design of a real brand on a slightly different address, often promoted through ads or short links.",
    how: [
      "A near-identical domain is registered (extra letters, different ending).",
      "Traffic is bought through ads or social posts.",
      "Card details and logins entered there are collected.",
    ],
    signs: [
      "Misspelled domain or unusual ending",
      "Prices far below market, countdown timers",
      "No verifiable address, only a contact form",
      "Payment by direct transfer or wallet only",
    ],
    example:
      "A sponsored search result for a popular sneaker brand leads to 'brand-outlet-sale.shop' with 80% discounts and bank-transfer checkout.",
    prevent: [
      "Reach shops via bookmarks or the official app.",
      "Check the padlock and the exact domain in the address bar.",
      "Prefer payment methods with buyer protection.",
    ],
    ifAffected: [
      "Block the card and dispute the charge with your bank.",
      "Change any password you typed on the fake site.",
      "Report the domain to the brand and to the platform that hosted the ad.",
    ],
  },
  {
    slug: "data-breaches",
    name: "Data Breaches",
    icon: "DatabaseZap",
    risk: "High",
    short: "Company-side leaks that expose your email, passwords or documents.",
    what: "A breach happens when an organisation storing your data is compromised. You cannot prevent it, but you can reduce its impact.",
    how: [
      "Attackers gain access to a company system or misconfigured storage.",
      "Customer records are copied and often sold or published.",
      "Those records fuel phishing, reuse attacks and identity fraud.",
    ],
    signs: [
      "A breach notice from a service you use",
      "A sudden rise in targeted spam that quotes real details",
      "Your address appearing in a breach-check service",
    ],
    example:
      "A shopping app leaks order history and phone numbers; customers then receive convincing 'delivery failed' texts quoting their real order.",
    prevent: [
      "Use unique passwords so one leak cannot spread.",
      "Give services the minimum data they truly need.",
      "Use email aliases for sign-ups where possible.",
      "Subscribe to breach notifications for your addresses.",
    ],
    ifAffected: [
      "Change the password for that service and any reuse.",
      "Enable multi-factor authentication.",
      "Watch for phishing that quotes the leaked details.",
    ],
  },
  {
    slug: "cyberbullying",
    name: "Cyberbullying",
    icon: "MessageSquareWarning",
    risk: "Medium",
    short: "Repeated online harassment, humiliation or threats, often targeting young people.",
    what: "Cyberbullying includes abusive messages, exclusion, impersonation, doxxing and sharing images without consent. The harm is emotional and can be severe.",
    how: [
      "Harassment spreads through group chats, comments and anonymous accounts.",
      "Content is screenshotted and re-shared, extending the reach.",
    ],
    signs: [
      "Withdrawal from devices or from school and social activity",
      "Anxiety after using the phone, sudden secrecy",
      "Deleted accounts or unexplained new ones",
    ],
    example:
      "A class group chat begins circulating an edited photo of a student with mocking captions.",
    prevent: [
      "Keep profiles private and review followers regularly.",
      "Talk openly with children about reporting rather than retaliating.",
      "Learn the block, mute and report tools of each platform.",
    ],
    ifAffected: [
      "Save evidence with screenshots including dates and usernames.",
      "Block the accounts and report to the platform.",
      "Tell a trusted adult, school counsellor or helpline; contact police for threats or image abuse.",
    ],
  },
  {
    slug: "financial-fraud",
    name: "Financial Fraud",
    icon: "Landmark",
    risk: "Critical",
    short: "Unauthorised payments, card misuse and fake payment requests.",
    what: "Financial fraud covers any deception that moves money out of your account — card skimming, fake refunds, collect requests and mandate abuse.",
    how: [
      "The attacker obtains card data or tricks you into approving a request.",
      "Small test transactions are followed by larger ones.",
      "Money is moved quickly through mule accounts.",
    ],
    signs: [
      "Debit alerts you cannot match to a purchase",
      "'Collect' or 'request money' notifications you did not initiate",
      "Refund offers that require you to approve a payment",
    ],
    example:
      "A seller sends a payment 'request' link instead of sending money, so accepting it debits the victim's account.",
    prevent: [
      "Read every payment prompt: receiving money never needs a PIN.",
      "Set transaction limits and enable instant alerts.",
      "Use virtual or single-use cards online where offered.",
    ],
    ifAffected: [
      "Call your bank's official fraud number and freeze the account.",
      "Dispute the transaction in writing within the reporting window.",
      "File a cybercrime complaint — early reports improve recovery chances.",
    ],
  },
  {
    slug: "account-hacking",
    name: "Account Hacking",
    icon: "ShieldAlert",
    risk: "High",
    short: "Unauthorised access to your email, social or gaming accounts.",
    what: "Account takeover usually follows a phishing page, a reused password or an approved session on a shared device.",
    how: [
      "Credentials are obtained or a session token is stolen.",
      "Recovery details are changed to lock you out.",
      "Your contacts are then targeted from your trusted account.",
    ],
    signs: [
      "Posts, messages or emails you did not send",
      "Recovery email or phone number changed",
      "Unknown devices in the security settings",
    ],
    example:
      "A gaming account is taken over after a 'free skins' login page collects the password, then used to scam friends.",
    prevent: [
      "Protect your primary email first — it controls every reset.",
      "Use multi-factor authentication and save recovery codes offline.",
      "Review connected apps and sign out unknown devices.",
    ],
    ifAffected: [
      "Use the provider's account-recovery flow immediately.",
      "Once back in, change the password, revoke sessions and re-enable MFA.",
      "Warn your contacts that messages from you may be fraudulent.",
    ],
  },
];

export const riskOrder: Risk[] = ["Low", "Medium", "High", "Critical"];

export type Scam = {
  name: string;
  redFlag: string;
  attacker: string;
  stayySafe: string;
  sample: string;
};

export const scams: Scam[] = [
  {
    name: "OTP scams",
    redFlag: "Anyone asking you to read out a code.",
    attacker:
      "Poses as bank, delivery or support staff and says a code is needed to 'verify' or 'cancel' something.",
    stayySafe: "Codes only ever confirm actions you started. Never read one aloud or forward it.",
    sample:
      '"Sir, your account update failed. Please share the 6-digit code sent to you to cancel the request."',
  },
  {
    name: "Bank scams",
    redFlag: "Caller ID that looks official plus extreme urgency.",
    attacker:
      "Claims your card is blocked or KYC has expired and walks you through 'verification' that authorises a payment.",
    stayySafe: "Hang up and call the number printed on your card or in the official app.",
    sample: '"Your KYC expires today. Complete it in 10 minutes or the account will be frozen."',
  },
  {
    name: "UPI / payment scams",
    redFlag: "A 'request' link instead of an incoming payment.",
    attacker: "Sends a collect request or QR code and insists you approve it to receive money.",
    stayySafe:
      "Receiving money never requires your PIN or scanning a code. Reject unknown requests.",
    sample: '"I\'ve sent the refund — just scan this QR and enter your PIN to accept it."',
  },
  {
    name: "Job scams",
    redFlag: "Payment demanded before employment.",
    attacker:
      "Advertises easy remote work, then charges registration, training or 'security deposit' fees.",
    stayySafe: "Verify the company independently. Genuine employers never charge candidates.",
    sample: '"Selected for data entry, ₹35,000/month. Pay ₹1,499 registration to receive your ID."',
  },
  {
    name: "Investment scams",
    redFlag: "Guaranteed, fixed high returns.",
    attacker:
      "Runs a fake trading app showing rising profits; withdrawals require ever-larger 'taxes'.",
    stayySafe: "Check the platform against your national regulator's register before investing.",
    sample: '"Daily 4% assured profit. Withdraw anytime after paying the 12% clearance fee."',
  },
  {
    name: "Shopping scams",
    redFlag: "Prices far below the market with transfer-only payment.",
    attacker: "Sets up a cloned store or marketplace listing and vanishes after payment.",
    stayySafe: "Use official apps and payment methods with buyer protection.",
    sample: '"Flat 85% off, today only. Pay by direct transfer for an extra discount."',
  },
  {
    name: "Lottery scams",
    redFlag: "You won a competition you never entered.",
    attacker: "Requests processing fees or bank details to release imaginary winnings.",
    stayySafe: "Delete and report. No legitimate prize needs an upfront payment.",
    sample: '"Congratulations! You won a car. Pay the ₹6,500 delivery tax to claim it."',
  },
  {
    name: "Fake customer support",
    redFlag: "Support numbers found through search ads or comments.",
    attacker:
      "Answers as the brand, asks you to install a screen-sharing app, then watches you log in.",
    stayySafe: "Get support contacts from inside the official app or website only.",
    sample: '"Install this remote support app so I can fix your refund from my side."',
  },
  {
    name: "Romance scams",
    redFlag: "Fast affection, no video calls, then a money emergency.",
    attacker: "Builds a months-long relationship before a medical or customs crisis appears.",
    stayySafe:
      "Never send money or crypto to someone you have not met. Reverse-search their photos.",
    sample: '"My package is stuck at customs. Please send the clearance fee, I\'ll repay you."',
  },
  {
    name: "Social media scams",
    redFlag: "A friend's account asking for money or a code.",
    attacker: "Takes over one account and uses its trust to reach the whole contact list.",
    stayySafe: "Verify by calling the person. Report the compromised profile to the platform.",
    sample:
      "\"Hey, I'm in trouble and can't call. Can you send ₹5,000 now? I'll return it tonight.\"",
  },
];

export type Lesson = {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  summary: string;
  keyPoints: string[];
  checklist: string[];
  quiz: { question: string; options: string[]; answer: number; explain: string };
};

export const lessons: Lesson[] = [
  {
    slug: "cybersecurity-basics",
    title: "Cybersecurity Basics",
    level: "Beginner",
    minutes: 6,
    summary:
      "Security is about protecting three things: your accounts, your devices and your data. Most everyday harm comes from a handful of repeated mistakes — reused passwords, delayed updates and acting on urgent messages without checking.",
    keyPoints: [
      "Attackers prefer easy targets, so basic habits remove most risk.",
      "Your email account is the master key to everything else.",
      "Updates fix the exact flaws attackers rely on.",
    ],
    checklist: [
      "Unique password on your primary email",
      "Automatic updates enabled on phone and computer",
      "Screen lock active on every device",
    ],
    quiz: {
      question: "Which account should you protect first?",
      options: ["Social media", "Primary email", "Gaming account", "Shopping app"],
      answer: 1,
      explain:
        "Password resets for other services are delivered to your email, so it is the master key.",
    },
  },
  {
    slug: "password-safety",
    title: "Password Safety",
    level: "Beginner",
    minutes: 7,
    summary:
      "Length beats complexity. A memorable passphrase of four or more unrelated words is far stronger than a short password with symbols, and a password manager lets every account have its own.",
    keyPoints: [
      "Never reuse a password across services.",
      "Prefer passphrases of 14+ characters.",
      "Authenticator apps beat SMS codes.",
    ],
    checklist: [
      "Password manager installed",
      "Multi-factor authentication on email, bank and social accounts",
      "Recovery codes saved offline",
    ],
    quiz: {
      question: "Which is the stronger choice?",
      options: ["P@ss1!", "quiet-harbour-lamp-42", "yourname2026", "123456789"],
      answer: 1,
      explain:
        "A long multi-word passphrase has far more possible combinations than a short symbol password.",
    },
  },
  {
    slug: "phishing-awareness",
    title: "Phishing Awareness",
    level: "Beginner",
    minutes: 8,
    summary:
      "Phishing works through emotion. Learn the three-second check: who really sent it, where does the link really go, and what is it pushing me to do quickly?",
    keyPoints: [
      "Verify the sender domain character by character.",
      "Hover or long-press a link to see its real destination.",
      "Legitimate organisations never request OTPs or passwords.",
    ],
    checklist: [
      "I open banking sites only from bookmarks or official apps",
      "I report phishing instead of deleting it silently",
      "I know how my bank actually contacts me",
    ],
    quiz: {
      question: "An SMS says your parcel is held and links to a payment page. What is safest?",
      options: [
        "Pay the small fee to release it",
        "Open the link to check details",
        "Track the parcel in the courier's official app",
        "Reply asking for confirmation",
      ],
      answer: 2,
      explain:
        "Verify through the official app or website; never use the link in an unexpected message.",
    },
  },
  {
    slug: "safe-browsing",
    title: "Safe Browsing",
    level: "Beginner",
    minutes: 5,
    summary:
      "Your browser is the main door to the internet. HTTPS protects the connection but not the owner's honesty, so check the domain too, and be sceptical of download prompts and permission requests.",
    keyPoints: [
      "The padlock means encrypted, not trustworthy.",
      "Extensions can read everything you see — install very few.",
      "Public Wi-Fi is fine for browsing, risky for anything you would not shout aloud.",
    ],
    checklist: [
      "Browser set to update automatically",
      "Unused extensions removed",
      "Pop-up and tracker protection enabled",
    ],
    quiz: {
      question: "A site shows a padlock. What does that guarantee?",
      options: [
        "The company is legitimate",
        "The connection is encrypted",
        "The site is virus-free",
        "Your data will not be sold",
      ],
      answer: 1,
      explain: "HTTPS only encrypts traffic in transit. Fake sites can obtain certificates too.",
    },
  },
  {
    slug: "social-engineering",
    title: "Social Engineering",
    level: "Intermediate",
    minutes: 9,
    summary:
      "Attackers study you before they contact you. Recognising the pattern — authority, urgency, secrecy — is more reliable than trying to spot a perfect fake.",
    keyPoints: [
      "Any request to skip a process is a red flag.",
      "Verification through a second channel defeats most attempts.",
      "Public posts about work, travel and family are research material.",
    ],
    checklist: [
      "A family or team verification word agreed",
      "Public profile reviewed for work details",
      "Official numbers for bank and IT saved in contacts",
    ],
    quiz: {
      question:
        "Your 'manager' messages from a new number requesting an urgent payment. First step?",
      options: [
        "Send it — the request is urgent",
        "Reply on that number to confirm",
        "Call the manager on the number you already have",
        "Forward it to a colleague to decide",
      ],
      answer: 2,
      explain:
        "Verify out-of-band using a contact you already trust, never the channel that made the request.",
    },
  },
  {
    slug: "malware-defence",
    title: "Malware",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Malware rarely breaks in — it is invited by a download. Source discipline, updates and least-privilege accounts remove most of the risk.",
    keyPoints: [
      "Official stores and vendor sites only.",
      "Use a standard, non-administrator account for daily work.",
      "Keep backups so recovery does not depend on the attacker.",
    ],
    checklist: [
      "Built-in protection enabled and updating",
      "Daily account is not an administrator",
      "Recent backup verified",
    ],
    quiz: {
      question: "Which practice most reduces malware risk?",
      options: [
        "Two antivirus programs at once",
        "Installing software only from official sources",
        "Turning off automatic updates",
        "Using an admin account daily",
      ],
      answer: 1,
      explain:
        "Most infections come from unofficial downloads; source discipline is the strongest control.",
    },
  },
  {
    slug: "privacy-protection",
    title: "Privacy Protection",
    level: "Intermediate",
    minutes: 7,
    summary:
      "Privacy is data minimisation. Every permission granted, form filled and app installed widens the picture others can build about you.",
    keyPoints: [
      "Review app permissions quarterly, especially location and microphone.",
      "Prefer 'while using the app' over 'always'.",
      "Old accounts you no longer use are still leaking data.",
    ],
    checklist: [
      "Location set to 'while using' for non-map apps",
      "Ad personalisation reviewed",
      "Unused accounts deleted",
    ],
    quiz: {
      question: "What is the most effective privacy habit?",
      options: [
        "Using incognito mode",
        "Sharing only the data a service truly needs",
        "Clearing cookies weekly",
        "Changing your username often",
      ],
      answer: 1,
      explain: "Data you never share cannot be leaked, sold or subpoenaed.",
    },
  },
  {
    slug: "network-security",
    title: "Network Security",
    level: "Intermediate",
    minutes: 8,
    summary:
      "Home routers and public hotspots are the plumbing of your digital life. Default passwords, outdated firmware and open guest networks are common weak points.",
    keyPoints: [
      "Change the router's admin password and keep firmware updated.",
      "Use WPA2/WPA3 encryption and a separate guest network.",
      "On public Wi-Fi, rely on HTTPS and consider a reputable VPN.",
    ],
    checklist: [
      "Router admin password changed",
      "Wi-Fi encryption set to WPA2 or WPA3",
      "Guest network separated from personal devices",
    ],
    quiz: {
      question: "What is the safest habit on public Wi-Fi?",
      options: [
        "Disable HTTPS for speed",
        "Bank only through mobile data or a trusted VPN",
        "Use the network with the strongest signal",
        "Share files openly",
      ],
      answer: 1,
      explain: "Sensitive sessions belong on a network you control, or inside an encrypted tunnel.",
    },
  },
  {
    slug: "identity-protection",
    title: "Identity Protection",
    level: "Advanced",
    minutes: 10,
    summary:
      "Your identity is assembled from documents, phone numbers and history. Protecting it means controlling document copies, hardening your mobile number and monitoring credit activity.",
    keyPoints: [
      "Ask for masked or reference-numbered document copies.",
      "Set a SIM/port-out PIN with your mobile operator.",
      "Monitor credit reports for accounts you did not open.",
    ],
    checklist: [
      "SIM lock or port-out PIN enabled",
      "No ID documents stored in chat apps or gallery",
      "Credit report checked in the last six months",
    ],
    quiz: {
      question: "Which step best protects against SIM-swap fraud?",
      options: [
        "Using SMS for all codes",
        "Setting a port-out PIN with your operator",
        "Sharing your number publicly",
        "Turning off airplane mode",
      ],
      answer: 1,
      explain: "A port-out PIN stops attackers moving your number to their SIM.",
    },
  },
  {
    slug: "data-breaches",
    title: "Data Breaches",
    level: "Advanced",
    minutes: 8,
    summary:
      "You cannot stop a company being breached, but you can ensure one leak does not cascade. Unique credentials, MFA and alias addresses contain the blast radius.",
    keyPoints: [
      "Assume any data you hand over may one day be public.",
      "Breach-notification services give you early warning.",
      "After a breach, expect very convincing targeted phishing.",
    ],
    checklist: [
      "Breach alerts enabled for your addresses",
      "No password shared between two services",
      "MFA on every account that supports it",
    ],
    quiz: {
      question: "A service you use reports a breach. What comes first?",
      options: [
        "Delete the app",
        "Change that password and any place you reused it",
        "Wait for more news",
        "Post about it",
      ],
      answer: 1,
      explain: "Stopping credential reuse prevents the leak spreading to other accounts.",
    },
  },
  {
    slug: "cybercrime-awareness",
    title: "Cybercrime Awareness",
    level: "Advanced",
    minutes: 9,
    summary:
      "Cybercrime is an organised economy with specialised roles. Understanding how reports, evidence and jurisdiction work helps victims act effectively.",
    keyPoints: [
      "Fast reporting materially improves the chance of freezing funds.",
      "Evidence means timestamps, transaction IDs and unedited screenshots.",
      "Official cybercrime portals and bank fraud desks are the correct channels.",
    ],
    checklist: [
      "You know your country's cybercrime reporting channel",
      "Bank fraud number saved offline",
      "You keep a written incident log template",
    ],
    quiz: {
      question: "What matters most after a fraudulent transfer?",
      options: [
        "Posting on social media",
        "Reporting to the bank and cybercrime portal immediately",
        "Waiting a week",
        "Confronting the scammer",
      ],
      answer: 1,
      explain:
        "Funds can sometimes be frozen in the first hours; delay usually makes recovery impossible.",
    },
  },
  {
    slug: "incident-response",
    title: "Incident Response",
    level: "Advanced",
    minutes: 10,
    summary:
      "A calm sequence beats panic: contain, preserve, recover, review. Knowing the steps in advance turns a crisis into a checklist.",
    keyPoints: [
      "Contain first — disconnect or freeze before cleaning up.",
      "Preserve evidence before wiping a device.",
      "Review afterwards and close the gap that allowed it.",
    ],
    checklist: [
      "You know how to disconnect and isolate a device",
      "Backups exist and have been test-restored",
      "Emergency contacts documented",
    ],
    quiz: {
      question: "What is the correct order?",
      options: [
        "Recover, contain, review",
        "Contain, preserve evidence, recover, review",
        "Review, recover, contain",
        "Ignore, then rebuild",
      ],
      answer: 1,
      explain: "Containment stops the damage; evidence is lost if you rebuild first.",
    },
  },
];

export type Resource = {
  title: string;
  category: string;
  description: string;
  type: "Guide" | "Checklist" | "Emergency" | "Official";
  to: string;
};

export const resources: Resource[] = [
  {
    title: "Cybersecurity starter guide",
    category: "Guides",
    description: "A short walkthrough of the habits that remove most everyday risk.",
    type: "Guide",
    to: "/learn",
  },
  {
    title: "Password safety checklist",
    category: "Passwords",
    description: "Passphrases, managers, MFA and recovery codes in one printable list.",
    type: "Checklist",
    to: "/safety",
  },
  {
    title: "Password strength checker",
    category: "Passwords",
    description: "Test a sample passphrase pattern locally — nothing is sent anywhere.",
    type: "Guide",
    to: "/safety",
  },
  {
    title: "Spot the scam handbook",
    category: "Scams",
    description: "Ten common scams with red flags and realistic sample messages.",
    type: "Guide",
    to: "/scams",
  },
  {
    title: "Digital privacy checklist",
    category: "Privacy",
    description: "Seven actions to reduce tracking, oversharing and permission creep.",
    type: "Checklist",
    to: "/privacy",
  },
  {
    title: "Hacked or scammed: emergency steps",
    category: "Emergency",
    description: "The ten-step response guide, plus when to involve professionals.",
    type: "Emergency",
    to: "/incident",
  },
  {
    title: "Cyber safety checkup",
    category: "Assessment",
    description: "Answer seven questions and get a 0–100 safety score with actions.",
    type: "Checklist",
    to: "/checkup",
  },
  {
    title: "Threat library",
    category: "Guides",
    description: "Twelve threats explained: how they work, warning signs, prevention.",
    type: "Guide",
    to: "/threats",
  },
  {
    title: "Official cybercrime reporting",
    category: "Emergency",
    description:
      "Report through your national cybercrime portal or police cyber cell, and your bank's official fraud desk. Use numbers printed on your card or official website.",
    type: "Official",
    to: "/incident",
  },
  {
    title: "Government awareness material",
    category: "Official",
    description:
      "National cyber agencies publish free advisories and posters for schools and workplaces — search for your country's computer emergency response team (CERT).",
    type: "Official",
    to: "/resources",
  },
];

export const stats = [
  { value: "12", label: "Cyber threats explained" },
  { value: "25+", label: "Digital safety tips" },
  { value: "13", label: "Learning topics" },
  { value: "0–100", label: "Interactive safety score" },
];
