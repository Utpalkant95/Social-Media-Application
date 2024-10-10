"use client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "@/Store";
// import SocketProvider from "./SocketProvider";
import { decodeToken } from "@/helpers/userInfo";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  // const user = decodeToken();

  return (
    // <SocketProvider userId={user?.userId as string}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Provider store={store}>{children}</Provider>
        </SnackbarProvider>
      </QueryClientProvider>
    // </SocketProvider>
  );
}
