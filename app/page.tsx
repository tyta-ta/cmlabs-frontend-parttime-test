import CategoryCard from "@/components/CategoryCard";

type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
};

async function getIngredients() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const data = await res.json();
  return data.meals as Ingredient[];
}

export default async function Home() {
  const ingredients = await getIngredients();

  return (
    <section className="min-h-screen bg-olive-400 px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-olive-900">
            Food Ingredients
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to Food Ingredients
          </h1>

          <p className="mt-5 text-sm leading-7 text-olive-950/80 sm:text-base md:text-lg">
            Discover a world of flavors with our comprehensive food ingredient
            database.
          </p>
        </div>

        <div className="rounded-3xl bg-white/80 p-4 shadow-xl backdrop-blur sm:p-6 md:p-8">
          <div className="mb-6 text-left">
            <h2 className="text-xl font-bold text-olive-800 sm:text-2xl">
              Browse Ingredients
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose an ingredient to explore meals.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {ingredients.slice(0, 24).map((item) => (
              <CategoryCard
                key={item.idIngredient}
                name={item.strIngredient}
                slug={item.strIngredient.toLowerCase().replaceAll(" ", "_")}
                image={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}