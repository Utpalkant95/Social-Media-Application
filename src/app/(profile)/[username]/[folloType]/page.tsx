"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getFollowers, getFollowings } from "@/ApiServices/UserServices";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  params,
}: {
  params: { username: string; folloType: string };
}) {
  const { username, folloType } = params;

  const fetchFollowersOrFollowings =
    folloType === "followers"
      ? () => getFollowers(username)
      : () => getFollowings(username);

  const { data, isLoading } = useQuery({
    queryKey: ["user", folloType, username],
    queryFn: fetchFollowersOrFollowings,
    enabled: !!username,
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-background border-b px-4 py-3 md:px-6 md:py-4">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/${username}`}
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                prefetch={false}
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className=" text-xl md:text-2xl font-bold capitalize">
                {folloType}
              </h1>
            </div>
            <div className="">
              <Input type="text" placeholder="Search followers" className="" />
            </div>
          </div>
        </header>
        <main className="flex-1 bg-muted/40 ">
          {isLoading && (
            <div className="grid grid-rows-3 gap-x-1 gap-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton className=" py-3 md:px-6 md:py-4 h-16" key={index} />
              ))}
            </div>
          )}
          {data?.map((user) => {
            return (
              <div
                className="px-4 py-2 mx-auto cursor-pointer"
                key={user.userName}
              >
                <div className="grid gap-6">
                  <div className="bg-background rounded-lg">
                    <div className="flex items-center justify-between">
                      <Link href={`/${user.userName}`} key={user.userName}>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage
                              src="/placeholder-user.jpg"
                              alt="@shadcn"
                            />
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.fullName}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.userName}
                            </div>
                          </div>
                        </div>
                      </Link>
                      {folloType === "following" && (
                        <Button variant="outline">Unfollow</Button>
                      )}
                      {folloType === "followers" && (
                        <Button variant="outline">Remove</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
}