import DetailsClient from './DetailsClient';

export async function generateStaticParams() {
  const slugs = [
    'modern-apartment','city-apartment','luxury-apartment',
    'mithra-villa','palm-villa','sunset-villa',
    'downtown-office','it-office-space','startup-hub',
    'retail-shop','corner-store','shopping-unit',
    'classic-house','family-house','compact-house',
    'industrial-warehouse','storage-unit','logistics-hub',
  ];
  return slugs.map((slug) => ({ slug }));
}

export default function Page() {
  return <DetailsClient />;
}
