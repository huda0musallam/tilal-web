import StampLogo from "@/components/logo/StampLogo";
import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="grid min-h-page place-items-center py-16">
      <div className="container grid justify-items-center text-center">
        <StampLogo className="mb-4 h-auto w-37.5 animate-spin-slow" />
        <p className="text-xl font-bold tracking-code text-accent">404</p>
        <h1 className="mt-1 mb-3 text-fluid-title">ضيّعنا الطريق بين التلال</h1>
        <p className="mb-7 max-w-105">
          الصفحة اللي عم تدوّر عليها مش موجودة، بس القهوة موجودة دايماً.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">ارجع للرئيسية</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            تسوّق القهوة
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
