import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold">{siteConfig.displayName}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Portfolio project structure initialized.
      </p>
    </main>
  );
}
