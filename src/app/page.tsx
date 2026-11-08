import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { getByCategory, getFeatured } from "@/data/products";

export default function HomePage() {
  const featured = getFeatured();
  const men = getByCategory("men").length;
  const women = getByCategory("women").length;

  return (
    <>
      <section className="relative min-h-[88svh]">
        <Image
          src="/watches/meridian.jpg"
          alt="Steel chronograph with a blue dial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl items-end px-5 pb-16 sm:items-center sm:pb-0">
          <div className="max-w-xl text-ivory">
            <p className="text-[11px] tracking-[0.28em] uppercase text-brass-soft">
              The atelier
            </p>
            <h1 className="mt-4 font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
              Watches for the hours that matter.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-ivory/80 sm:text-base">
              A small collection of men’s sports watches and women’s dress
              pieces. Steel, leather, and dials chosen for everyday wear.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="bg-ivory px-7 py-4 text-center text-xs tracking-[0.2em] text-ink uppercase"
              >
                Shop the collection
              </Link>
              <Link
                href="/shop/women"
                className="border border-ivory/70 px-7 py-4 text-center text-xs tracking-[0.2em] uppercase"
              >
                Women’s edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:-mt-16 md:grid-cols-2 md:py-0">
        <CollectionCard
          href="/shop/men"
          image="/watches/atlas.jpg"
          eyebrow="Men"
          title="Sports and field"
          count={`${men} watches`}
        />
        <CollectionCard
          href="/shop/women"
          image="/watches/ivory.jpg"
          eyebrow="Women"
          title="Dress and jewelry"
          count={`${women} watches`}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-brass">
              Featured
            </p>
            <h2 className="mt-2 font-serif text-5xl sm:text-6xl">This season</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.18em] uppercase underline underline-offset-4"
          >
            View all
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe4d8]">
            <Image
              src="/watches/nocturne.jpg"
              alt="Cream dial chronograph on leather"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-brass">
              How it is made
            </p>
            <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
              Cases finished by hand. Dials kept simple.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-stone sm:text-base">
              Each listing is a sample piece with movement, case size, and
              water resistance so you can compare the men’s and women’s lines
              the way you would in a shop. Add anything to the bag and complete
              a sample checkout — no payment is processed.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 text-center sm:text-left">
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">
                  Pieces
                </dt>
                <dd className="mt-2 font-serif text-4xl">12</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">
                  Warranty
                </dt>
                <dd className="mt-2 font-serif text-4xl">2 yr</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-stone">
                  Shipping
                </dt>
                <dd className="mt-2 font-serif text-4xl">Free</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function CollectionCard({
  href,
  image,
  eyebrow,
  title,
  count,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  count: string;
}) {
  return (
    <Link href={href} className="group relative block min-h-72 overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
        <p className="text-[11px] tracking-[0.22em] uppercase text-brass-soft">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-4xl">{title}</h2>
        <p className="mt-1 text-sm text-ivory/80">{count}</p>
      </div>
    </Link>
  );
}
