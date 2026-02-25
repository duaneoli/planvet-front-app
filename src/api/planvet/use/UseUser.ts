import { UserServices } from "@/api/planvet/services/UserService";
import { useQuery } from "@tanstack/react-query";

class UseByUser {
  static me() {
    return useQuery({
      queryKey: ["me"],
      queryFn: UserServices.me,
      staleTime: Infinity,
    });
  }
}

export class UseUserService {
  static user = UseByUser;
}
