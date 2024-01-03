import React, { Suspense } from "react";
import Link from "next/link";

import Loading from "./loading";

function Layout({ children }: any) {
  return (
    <div>
      <Link href="/">Home</Link>
      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}

export default Layout;
