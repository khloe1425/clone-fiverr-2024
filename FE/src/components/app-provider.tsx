"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./ui/toaster";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import RefreshToken from "./refresh-token";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} />
      <RefreshToken /> */}
      <Toaster />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default AppProvider;
