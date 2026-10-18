// Decoratieve fototegels in de paginakop; de tekst ernaast draagt de inhoud.
export default function HeaderMosaic({ images }: { images: string[] }) {
  return (
    <ul className="k-page-header__mosaic" aria-hidden="true">
      {images.map((src) => (
        <li key={src}><img src={src} alt="" width={206} height={206} /></li>
      ))}
    </ul>
  );
}
