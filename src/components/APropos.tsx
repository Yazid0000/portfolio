import Image from "next/image";
import { useTranslations } from "next-intl";
import portrait from "../../public/yazid.jpg";

export default function APropos() {
  const t = useTranslations("APropos");
  const paragraphes = t.raw("paragraphes") as string[];

  const groupes = [
    { titre: "Front-end", techs: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
    { titre: "Back-end", techs: ["PHP", "MySQL", "Node.js"] },
    { titre: t("outils"), techs: ["Git", "GitHub", "VS Code", "Vercel"] },
  ];

  // Le portrait à gauche, le texte à droite sur ordinateur ; sur mobile, le portrait passe au-dessus.
  return (
    <section
      id="apropos"
      className="px-6 py-24 max-w-5xl mx-auto grid gap-10 md:grid-cols-[2fr_3fr] md:gap-16 md:items-start"
    >
      <div className="relative aspect-4/5 w-full max-w-56 md:max-w-none overflow-hidden rounded-xl border border-current/15">
        <Image
          src={portrait}
          alt={t("photo")}
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 360px, 224px"
          className="object-cover object-[50%_30%]"
        />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">{t("titre")}</h2>

        <div className="space-y-4 text-lg opacity-80 max-w-[60ch]">
          {paragraphes.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-12 mb-4">{t("competences")}</h3>
        <dl className="space-y-3">
          {groupes.map((g) => (
            <div key={g.titre} className="grid sm:grid-cols-[8rem_1fr] gap-x-6">
              <dt className="opacity-60">{g.titre}</dt>
              <dd>{g.techs.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
