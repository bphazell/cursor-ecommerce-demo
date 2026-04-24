import { Container } from "@/components/ui/Container";

const sections = [
  {
    id: "story",
    title: "Our story",
    body: "Cascade Goods started in a Portland garage in 2018 with a simple idea: make fewer things, make them better, and stand behind them forever. Six years and a lot of fabric swatches later, we're still doing exactly that.",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    body: "Every piece in our line uses recycled, organic, or responsibly sourced materials. Our shells use a PFC-free DWR finish. Our down is RDS-certified. Our wool comes from non-mulesed sources. We publish a yearly impact report so you can see exactly how we're doing.",
  },
  {
    id: "warranty",
    title: "Lifetime warranty",
    body: "If something we made fails because of a manufacturing defect, we'll repair it or replace it for as long as you own it. No receipt required, no questions asked.",
  },
  {
    id: "shipping",
    title: "Shipping & returns",
    body: "Free carbon-neutral shipping on orders over $100. Returns are free within 30 days, no questions asked. We accept exchanges for a full year.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "We're a small team and we read every email. Reach us at hello@cascadegoods.example or call us at (503) 555-0114, Monday through Friday, 9am to 5pm Pacific.",
  },
];

export function AboutPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Considered goods, built to last.
          </h1>
          <p className="mt-6 text-lg text-[var(--color-muted-foreground)]">
            We're a small Portland-based studio designing apparel, footwear, and
            home goods that we hope you'll wear, use, and return to for years.
          </p>

          <div className="mt-16 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--color-muted-foreground)]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
