export default function Footer() {
  return (
    <footer className="bg-olive-800 p-2 mt-auto">
      <div className="container mx-auto text-center text-gray-300 text-sm">
        &copy; {new Date().getFullYear()} Food Ingredients. All rights reserved.
        <p className="text-xs text-gray-400">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}