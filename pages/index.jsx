import React from "react";
import Link from "next/link";

function Index() {
  return (
    <div>
      <h1>Hello from nextjs serverless side rendered!</h1>
      <ul>
        <li>
          <Link href="/post?id=1" as="/post/1">
            <a>Post 1</a>
          </Link>
        </li>
        <li>
          <Link href="/post?id=1" as="/post/1">
            <a>Post 2</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;
