import Link from "next/link";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

async function getAllFoods() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
  );

  const data = await res.json();
  return (data.meals || []) as Meal[];
}

export default async function FoodPage() {
  const meals = await getAllFoods();

  return (
    <main className="min-h-screen bg-olive-400 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            All Foods
          </h1>
          <p className="mt-3 text-olive-950/80">
            Explore available food items from TheMealDB
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/food/${meal.idMeal}`}
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
      </div>
    </main>
  );
}