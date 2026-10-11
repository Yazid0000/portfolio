import { useTranslations } from "next-intl";
import FormulaireContact from "@/components/FormulaireContact";
import { plein, contour } from "@/components/boutons";

const WHATSAPP = "https://wa.me/212663093386";
const EMAIL = "mailto:yazidbennouna5@gmail.com";

// WhatsApp d'abord : c'est le canal le plus direct pour une grande partie des clients.
// GitHub et LinkedIn sont dans le pied de page : ce sont des références, pas des moyens de contact.
export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contact"
      className="px-6 py-24 flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-6">{t("titre")}</h2>
      <p className="text-xl opacity-70 mb-10">{t("sousTitre")}</p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className={`${plein} px-6 py-3`}
        >
          {t("whatsapp")}
        </a>
        <a
          href={EMAIL}
          className={`${contour} px-6 py-3`}
        >
          {t("email")}
        </a>
      </div>

      <p className="text-sm opacity-60 mt-14 mb-8">{t("ou")}</p>

      <FormulaireContact />
    </section>
  );
}
