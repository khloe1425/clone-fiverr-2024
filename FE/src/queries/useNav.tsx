import apiNavRequest from "@/apiRequests/nav";
import { useQuery } from "@tanstack/react-query";

export const useGetNavQuery = () => {
  return useQuery({
    queryKey: ["nav-menu"],
    queryFn: apiNavRequest.getMenu,
  });
};
