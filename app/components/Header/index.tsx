'use client';

import Link from 'next/link';
import { UserButton, useUser, SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Header() {
  const { user } = useUser();

  const tier = user?.publicMetadata?.tier?.toString()?.toLowerCase() ?? 'free';
  const displayTier = tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-3xl font-bold text-gray-800">
        Eventify
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-right">
              <p className="font-semibold text-gray-700">Welcome back,</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-800 font-semibold">{user.fullName}</span>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
              {displayTier} Member
            </span>
          </>
        ) : (
          <div className="flex gap-2">
            <SignInButton mode="redirect">
              <button className="text-m px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="text-m px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
    </header>
  );
}
