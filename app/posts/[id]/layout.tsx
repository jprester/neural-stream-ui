import React, { Suspense } from "react";
import Link from "next/link";
import { Spinner } from "flowbite-react";

import Loading from "./loading";

function Layout({ children }: any) {
  return (
    <div>
      <Link
        className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
        href="/">
        Home
      </Link>
      <Suspense fallback={<Spinner />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}

export default Layout;
