import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";

const useMedicalPackageService = (params?: {
  medicalPackagesParams?: GetMedicalPackagesParams;
  medicalServicesParams?: GetMedicalServicesParams;
  medicalPackageId?: string;
  medicalServiceId?: string;
}) => {
  const queryClient = useQueryClient();
  const {
    medicalPackagesParams,
    medicalServicesParams,
    medicalPackageId,
    medicalServiceId,
  } = params ?? {};

  // Queries
  const medicalPackages = useQuery({
    queryKey: ["medical-packages", medicalPackagesParams],
    queryFn: () =>
      axiosInstance
        .get<Pagination<IMedicalPackage>>("/api/medical-package", {
          params: medicalPackagesParams,
        })
        .then((res) => res.data),
    enabled: !!medicalPackagesParams,
  });

  const medicalPackage = useQuery({
    queryKey: ["medical-package", medicalPackageId],
    queryFn: () =>
      axiosInstance
        .get<MedicalPackageDetailDTO>(`/api/medical-package/${medicalPackageId}`)
        .then((res) => res.data),
    enabled: !!medicalPackageId,
  });

  const medicalServices = useQuery({
    queryKey: ["medical-services", medicalServicesParams],
    queryFn: () =>
      axiosInstance
        .get<Pagination<MedicalServiceDTO>>("/api/medical-service", {
          params: medicalServicesParams,
        })
        .then((res) => res.data),
    enabled: !!medicalServicesParams,
  });

  const medicalService = useQuery({
    queryKey: ["medical-service", medicalServiceId],
    queryFn: () =>
      axiosInstance
        .get<MedicalServiceDTO>(`/api/medical-service/${medicalServiceId}`)
        .then((res) => res.data),
    enabled: !!medicalServiceId,
  });

  // Mutations
  const createMedicalPackage = useMutation({
    mutationFn: (request: CreateMedicalPackageRequest) =>
      axiosInstance
        .post<{ medicalPackageId: string }>("/api/medical-package", request)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-packages"] });
    },
  });

  const createMedicalService = useMutation({
    mutationFn: (request: CreateMedicalServiceRequest) =>
      axiosInstance
        .post<{ medicalServiceId: string }>("/api/medical-service", request)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-services"] });
    },
  });

  return {
    // Queries
    medicalPackages,
    medicalPackage,
    medicalServices,
    medicalService,
    // Mutations
    createMedicalPackage,
    createMedicalService,
  };
};

export default useMedicalPackageService;
