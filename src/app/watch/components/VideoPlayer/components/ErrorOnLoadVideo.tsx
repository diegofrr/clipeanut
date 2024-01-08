'use client';

export function ErrorOnLoadVideo() {
  return (
    <span className="text-red-500 text-center">
      Falha no carregamento :( <br />
      Recarregue a página.
    </span>
  );
}
