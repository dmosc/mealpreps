import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-5">
        <strong>mealpreps</strong> — Fresh. Local. Made Just for You.
      </p>
      <p className="mb-5">
        Say goodbye to boring meal prep. At mealpreps, we team up with top local
        chefs near you to create fresh, handcrafted dishes that taste as good as
        they look. Every meal is made from scratch with just the right amount of
        high-quality, minimal ingredients — no shortcuts, no fillers, just pure
        flavor. From crave-worthy international plates to clean, wholesome
        classics, everything’s customizable to match your mood (or your macros).
        And with our smart online ordering agent, designing your perfect meal is
        as easy as a few clicks — fast, secure, and tailored exactly to you.
        This is meal prep with a dash of luxury — because you deserve it.
      </p>
      <p>Thank you for choosing us.</p>
      <Link
        href="/"
        className="text-blue-600 underline font-semibold hover:text-blue-800 transition-colors"
      >
        Place an order.
      </Link>
    </main>
  );
}
