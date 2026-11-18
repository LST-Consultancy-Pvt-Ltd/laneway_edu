import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bg-paper py-28 sm:py-36">
      <Container size="narrow" className="text-center">
        <p className="font-heading text-7xl font-semibold text-brand sm:text-8xl">404</p>
        <h1 id="not-found-title" className="mt-6 text-3xl font-semibold text-ink sm:text-4xl">
          This laneway leads nowhere.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" icon={<ArrowRight />}>
            Back to home
          </Button>
          <Button href="/#courses" variant="outline">
            Explore courses
          </Button>
        </div>
      </Container>
    </section>
  );
}
