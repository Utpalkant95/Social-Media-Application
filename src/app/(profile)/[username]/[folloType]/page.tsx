"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { getFollowers, getFollowings } from "@/ApiServices/UserServices";

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
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 py-3 md:px-6 md:py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/${username}`}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              prefetch={false}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold capitalize">{folloType}</h1>
          </div>
          <div className="relative">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search followers"
              className="pl-10 pr-4 py-2 rounded-lg bg-muted text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40 ">
      {data?.map((user) => {
        return (
          
            <div className="container mx-auto">
          <div className="grid gap-6">
            <div className="bg-background rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between">
              <Link href={`/${user.userName}`} key={user.userName}>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
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
                <Button variant="outline">Follow</Button>
              </div>
            </div>
          </div>
        </div>
        )
      })}
      </main>
    </div>
  );
}
