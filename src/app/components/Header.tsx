"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const Header: FC = () => {
  const { status } = useSession();
  const pathname = usePathname();
  return (
    <header
      className={`${pathname === "/" && "absolute top-0 left-0"} w-full z-10`}
    >
      <div className="flex flex-wrap justify-center md:justify-between items-center px-8 py-4 w-full md:w-[80%] mx-auto">
        <Link href="/" className="flex items-center space-x-3 min-w-[50px]">
          <Image
            src="nasa-logo.svg"
            alt="NASA Logo"
            width={100}
            height={100}
            className="min-w-[50px] w-[100px]"
          />
        </Link>
        {status === "loading" ? null : (
          <nav className="flex flex-wrap items-center space-x-10 text-[clamp(1rem,3vw,1.7rem)]">
            <Link
              href="/apod"
              className="hover:text-blue-300 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              APOD
            </Link>
            {/* <Link
              href="/"
              className="hover:text-blue-300 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              Mars
            </Link> */}
            {status === "authenticated" ? (
              <>
                {" "}
                <Link
                  href="/log"
                  className="hover:text-blue-300 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                >
                  Log
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-blue-300 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
