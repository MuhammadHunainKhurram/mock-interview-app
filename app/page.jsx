import Link from "next/link";
import Header from "./dashboard/_components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <div className="flex-grow flex items-center justify-center">
            <Link href="/dashboard">
              <button className="text-4xl text-center text-primary mb-8 font-bold hover:text-white">
                Click Me
              </button>
            </Link>
      </div>
    </div>
  );
}
