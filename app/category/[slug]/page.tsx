import Link from "next/link";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function getMealsByIngredient(slug: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch meals");
  }

  const data = await res.json();
  return (data.meals || []) as Meal[];
}

export default async function CategoryFoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meals = await getMealsByIngredient(slug);

  const title = slug.replaceAll("_", " ");

  return (
    <main className="min-h-screen bg-olive-400 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-white hover:underline">
          ← Back to ingredients
        </Link>

        <div className="mb-10 mt-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-olive-900">
            Ingredient
          </p>

          <h1 className="mt-2 capitalize text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>

          <p className="mt-3 text-olive-950/80">
            Meal list based on selected ingredient
          </p>
        </div>

        {meals.length === 0 ? (
          <p className="text-center text-white">
            No meals found for this ingredient.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {meals.map((meal) => (
              <Link
                key={meal.idMeal}
                href={`/food/${meal.idMeal}?ingredient=${slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-olive-800">
                    {meal.strMeal}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    View meal detail →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}