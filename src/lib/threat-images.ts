import phishing from "@/assets/threats/phishing.jpg";
import malware from "@/assets/threats/malware.jpg";
import ransomware from "@/assets/threats/ransomware.jpg";
import identityTheft from "@/assets/threats/identity-theft.jpg";
import passwordAttacks from "@/assets/threats/password-attacks.jpg";
import socialEngineering from "@/assets/threats/social-engineering.jpg";
import onlineScams from "@/assets/threats/online-scams.jpg";
import fakeWebsites from "@/assets/threats/fake-websites.jpg";
import dataBreaches from "@/assets/threats/data-breaches.jpg";
import cyberbullying from "@/assets/threats/cyberbullying.jpg";
import financialFraud from "@/assets/threats/financial-fraud.jpg";
import accountHacking from "@/assets/threats/account-hacking.jpg";

export const threatImages: Record<string, string> = {
  phishing,
  malware,
  ransomware,
  "identity-theft": identityTheft,
  "password-attacks": passwordAttacks,
  "social-engineering": socialEngineering,
  "online-scams": onlineScams,
  "fake-websites": fakeWebsites,
  "data-breaches": dataBreaches,
  cyberbullying,
  "financial-fraud": financialFraud,
  "account-hacking": accountHacking,
};

export function threatImage(slug: string): string {
  return threatImages[slug] ?? phishing;
}
