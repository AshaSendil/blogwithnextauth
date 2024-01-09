import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogSection() {
  const [apiPosts, setApiPosts] = useState([]);
  const session = useSession()

  const handleBlog = async () => {
    const url = "api/write"
    try {
      axios.get(url).then((res) => setApiPosts(res?.data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleBlog();
  }, []);


  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {apiPosts.map((posts) => (
            <Link href={`/blogdetail?title=${posts?.title}`}>
              <article
                // key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={moment(posts.createdBy).format("MMMM Do YYYY, h:mm")} className="text-gray-500">
                    {moment(posts.createdBy).format("MMMM Do YYYY, h:mm")}
                  </time>
                  {/* {posts.category && (
                    <a
                      href={posts.href || "#"}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {posts.title}
                    </a>
                  )} */}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {/* <a href={posts.href || "#"}> */}
                    <span className="absolute inset-0" />
                    {posts.title}
                    {/* </a> */}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {posts.content}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={posts?.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  {console.log(session,"session")}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={session?.user?.email}>
                        <span className="absolute inset-0 text-black" />
                        {session?.user?.email}
                      </a>
                    </p>
                    <p className="text-gray-600">{posts?.title}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
