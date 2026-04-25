import Link from "next/link";

type Props = {
  name: string;
  slug: string;
  image: string;
};

export default function CategoryCard({ name, slug, image }: Props) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-olive-800">{name}</h2>
        <p className="mt-1 text-sm text-gray-500">View meals →</p>
      </div>
    </Link>
  );
}