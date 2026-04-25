import Link from "next/link";
import VideoModal from "@/components/VideoModal";

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
};

async function getMealDetail(id: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meal detail");
  }

  const data = await res.json();
  return data.meals?.[0] as MealDetail | null;
}

export default async function FoodDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ingredient?: string }>;
}) {
  const { id } = await params;
  const { ingredient } = await searchParams;

  const meal = await getMealDetail(id);
  const backUrl = ingredient ? `/category/${ingredient}` : "/food";

  if (!meal) {
    return (
      <main className="min-h-screen bg-olive-400 px-4 py-10">
        <h1 className="text-center text-3xl font-bold text-white">
          Food not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-olive-400 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href={backUrl} className="text-sm font-semibold text-white hover:underline">
            ← Back to food list
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-xl">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-72 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-olive-100 px-4 py-1 text-sm font-semibold text-olive-700">
                {meal.strCategory}
              </span>

              <span className="rounded-full bg-neutral-100 px-4 py-1 text-sm font-semibold text-neutral-700">
                {meal.strArea}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-olive-800 sm:text-4xl">
              {meal.strMeal}
            </h1>

            <h2 className="mt-8 text-xl font-bold text-olive-700">
              Instructions
            </h2>

            <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
              {meal.strInstructions}
            </p>

            {meal.strYoutube && <VideoModal youtubeUrl={meal.strYoutube} />}
          </div>
        </div>
      </div>
    </main>
  );
}