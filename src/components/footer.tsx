export function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} Gustavo Augusto. Todos os direitos
          reservados.
        </p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/ferrgusttavo"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gustavoaugustof"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:gustavo.augusto.f@outlook.com">Contato</a>
        </div>
      </div>
    </footer>
  )
}
