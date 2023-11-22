import useSWR from "swr";

const useUsers = (limit: number) => {
  const {} = useSWR(`/api/users?limit=${limit}`);
};

export default useUsers;
