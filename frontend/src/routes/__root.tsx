import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafcfb] px-4 py-12">
      <div className="max-w-md text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/80 bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#007cb8]">
          Error 404
        </span>
        <h1 className="mt-4 text-7xl font-black text-neutral-900 tracking-tight">404</h1>
        <h2 className="mt-2 text-2xl font-bold text-neutral-900">Page Not Found</h2>
        <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
          The page you're looking for doesn't exist, has been removed, or the link may be outdated.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0091d5] hover:bg-[#007cb8] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 cursor-pointer"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-2.5 text-sm font-semibold text-neutral-800 shadow-2xs transition-all duration-200 cursor-pointer"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
