type CardProps = {
  title: string;
  description: string;
  label?: string;
  imageUrl?: string;
  tone?: "light" | "dark";
};

export function Card({ title, description, label, imageUrl, tone = "light" }: CardProps) {
  const dark = tone === "dark";

  return (
    <article
      className={[
        "rounded-lg border p-6 transition",
        dark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-neutral-200 bg-gradient-to-br from-white via-yellow-50/45 to-blue-50/50 shadow-sm shadow-neutral-200/60 hover:border-yellow-300 hover:shadow-md",
      ].join(" ")}
    >
      {imageUrl ? (
        <div className="-mx-6 -mt-6 mb-5 aspect-[4/3] overflow-hidden rounded-t-lg bg-neutral-100">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      {label ? (
        <p
          className={[
            "text-xs font-semibold uppercase tracking-[0.16em]",
            dark ? "text-yellow-300" : "text-blue-700",
          ].join(" ")}
        >
          {label}
        </p>
      ) : null}
      <h3
        className={[
          "mt-3 text-xl font-semibold tracking-tight",
          dark ? "text-white" : "text-neutral-950",
        ].join(" ")}
      >
        {title}
      </h3>
      <p
        className={[
          "mt-3 text-sm leading-6",
          dark ? "text-neutral-300" : "text-neutral-600",
        ].join(" ")}
      >
        {description}
      </p>
    </article>
  );
}
