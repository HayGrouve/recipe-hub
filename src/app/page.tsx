import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Delicious food background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0"
      />
      <div className="absolute inset-0 z-10 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-20 px-4 text-center text-white sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
          Discover Culinary Delights
        </h1>
        <p className="mb-8 text-xl sm:text-2xl md:text-3xl">
          Explore a world of flavors with our handcrafted recipes
        </p>
        <Link
          href="/recipes"
          className="rounded-full bg-white px-8 py-3 text-lg font-bold text-black transition duration-300 hover:bg-opacity-90"
        >
          Start Cooking
        </Link>
      </div>

      {/* Navigation */}
      <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-white">
          RecipeHub
        </Link>
        <div className="space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
