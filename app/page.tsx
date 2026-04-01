export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-foreground mb-2">QuranLab</h1>
        <p className="font-arabic text-3xl text-gold" dir="rtl">
          تعلم العربية القرآنية
        </p>
      </div>

      <p className="max-w-md text-lg text-text-secondary mb-8">
        Apprends l&apos;arabe coranique de maniere interactive. Progression
        intelligente, exercices immersifs, zero punition.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a
          href="/dashboard"
          className="block w-full rounded-lg bg-primary py-3.5 text-center text-lg font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Commencer gratuitement
        </a>
        <a
          href="/vocabulary"
          className="block w-full rounded-lg border border-border bg-surface py-3.5 text-center text-lg font-medium text-text-secondary transition-colors hover:bg-surface-warm"
        >
          Explorer le vocabulaire
        </a>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm text-center">
        <div>
          <p className="text-2xl font-bold text-primary">482</p>
          <p className="text-xs text-text-muted">Mots</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gold">29</p>
          <p className="text-xs text-text-muted">Lecons</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-premium">6</p>
          <p className="text-xs text-text-muted">Types d&apos;exercices</p>
        </div>
      </div>
    </div>
  );
}
