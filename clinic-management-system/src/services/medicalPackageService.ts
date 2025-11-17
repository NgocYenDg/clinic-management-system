import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";

const useMedicalPackageService = () => {
  const medicalPackages = useQuery({
    queryKey: ["medical-packages"],
    queryFn: () =>
      axiosInstance
        .get<Pagination<IMedicalPackage>>("/api/medical-package")
        .then((res) => res.data),
  });

  return {
    medicalPackages,
  };
};

export default useMedicalPackageService;
