import { useState } from "react";
import { UserCog, Users, UserPlus, Building2 } from "lucide-react";
import LogoutButton from "../../components/LogoutButton";
import StatsCard from "./components/StatsCard";
import SearchFilter from "./components/SearchFilter";
import StaffTable from "./components/StaffTable";
import DepartmentTable from "../../components/admin/DepartmentTable";
import Pagination from "./components/Pagination";
import StaffFormModal from "./components/StaffFormModal";
import DepartmentFormModal from "../../components/admin/DepartmentFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import UserInfoCard from "./components/UserInfoCard";
import useStaffService from "../../services/staffService";
import useAuthService from "@/services/authService";

type TabType = "staff" | "department";

export default function Admin() {
  const { account } = useAuthService();
  const [activeTab, setActiveTab] = useState<TabType>("staff");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  // Fetch staffs with filters
  const {
    staffs,
    departments,
    createStaff,
    updateStaff,
    deleteStaff,
    createDepartment,
  } = useStaffService({
    staffsParams:
      activeTab === "staff"
        ? {
            keyword: searchKeyword || undefined,
            role: selectedRole,
            page: currentPage,
            sort: "ASC",
          }
        : undefined,
    departmentsParams:
      activeTab === "department"
        ? { page: currentPage, keyword: searchKeyword || undefined }
        : { page: 1 },
  });

  // Form state for create/edit staff
  const [staffFormData, setStaffFormData] = useState<CreateStaffRequest>({
    name: "",
    email: "",
    phone: "",
    description: "",
    image: "",
    role: 0,
    eSignature: "",
    departmentId: "",
  });

  // Form state for create/edit department
  const [departmentFormData, setDepartmentFormData] =
    useState<CreateDepartmentRequest>({
      name: "",
      description: "",
    });

  // Staff handlers
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStaff.mutateAsync(staffFormData);
      setShowCreateModal(false);
      resetStaffForm();
      staffs.refetch();
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  const handleUpdateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff) return;

    try {
      await updateStaff.mutateAsync({
        staffId: selectedStaff.id,
        request: {
          name: staffFormData.name,
          phone: staffFormData.phone,
          description: staffFormData.description,
          image: staffFormData.image,
          role: staffFormData.role,
          eSignature: staffFormData.eSignature,
          departmentId: staffFormData.departmentId || "",
        },
      });
      setShowEditModal(false);
      setSelectedStaff(null);
      resetStaffForm();
      staffs.refetch();
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;

    try {
      await deleteStaff.mutateAsync(selectedStaff.id);
      setShowDeleteModal(false);
      setSelectedStaff(null);
      staffs.refetch();
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  // Department handlers
  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDepartment.mutateAsync(departmentFormData);
      setShowCreateModal(false);
      resetDepartmentForm();
      departments.refetch();
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;

    try {
      // TODO: Add delete department mutation when API is ready
      // await deleteDepartment.mutateAsync(selectedDepartment.id);
      setShowDeleteModal(false);
      setSelectedDepartment(null);
      departments.refetch();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const resetStaffForm = () => {
    setStaffFormData({
      name: "",
      email: "",
      phone: "",
      description: "",
      image: "",
      role: 0,
      eSignature: "",
      departmentId: "",
    });
  };

  const resetDepartmentForm = () => {
    setDepartmentFormData({
      name: "",
      description: "",
    });
  };

  const openEditStaffModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setStaffFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      description: staff.description,
      image: staff.image,
      role: staff.role,
      eSignature: staff.eSignature,
      departmentId: staff.departmentId,
    });
    setShowEditModal(true);
  };

  const openDeleteStaffModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  const openEditDepartmentModal = (department: Department) => {
    setSelectedDepartment(department);
    setDepartmentFormData({
      name: department.name,
      description: department.description || "",
    });
    setShowEditModal(true);
  };

  const openDeleteDepartmentModal = (department: Department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handleStaffFormChange = (
    data: Partial<CreateStaffRequest | UpdateStaffRequest>
  ) => {
    setStaffFormData((prev) => ({ ...prev, ...data }));
  };

  const handleDepartmentFormChange = (
    data: Partial<CreateDepartmentRequest>
  ) => {
    setDepartmentFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <UserCog className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Bảng điều khiển quản trị viên
              </h1>
              <p className="text-sm text-slate-400">
                {/* {account?.displayName || "Admin"} */}
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard
            icon={Users}
            iconColor="text-blue-400"
            title="Tổng số nhân viên"
            value={staffs.data?.total || 0}
            subtitle="Nhân viên đang hoạt động"
          />

          <StatsCard
            icon={Building2}
            iconColor="text-green-400"
            title="Tổng số phòng ban"
            value={departments.data?.total || 0}
            subtitle="Phòng ban hoạt động"
          />
        </div>

        {/* Tabs with Add Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setActiveTab("staff");
                setSearchKeyword("");
                setSelectedRole(undefined);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "staff"
                  ? "bg-cyan-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Nhân viên</span>
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("department");
                setSearchKeyword("");
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "department"
                  ? "bg-green-500 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Phòng ban</span>
              </div>
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>
              {activeTab === "staff" ? "Thêm nhân viên" : "Thêm phòng ban"}
            </span>
          </button>
        </div>

        {/* Search and Filter - Only show for staff tab */}
        {activeTab === "staff" && (
          <SearchFilter
            searchKeyword={searchKeyword}
            selectedRole={selectedRole}
            onSearchChange={setSearchKeyword}
            onRoleChange={setSelectedRole}
            onClearFilters={() => {
              setSearchKeyword("");
              setSelectedRole(undefined);
              setCurrentPage(1);
            }}
          />
        )}

        {/* Search for Department */}
        {activeTab === "department" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mb-6">
            <h2 className="text-xl font-bold mb-4">Tìm kiếm phòng ban</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phòng ban..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={() => {
                  setSearchKeyword("");
                  setCurrentPage(1);
                }}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-4">
            {activeTab === "staff"
              ? "Danh sách nhân viên"
              : "Danh sách phòng ban"}
          </h2>

          {activeTab === "staff" ? (
            <>
              <StaffTable
                staffsQuery={staffs}
                onEdit={openEditStaffModal}
                onDelete={openDeleteStaffModal}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={staffs.data?.totalPages || 1}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <>
              <DepartmentTable
                departmentsQuery={departments}
                onEdit={openEditDepartmentModal}
                onDelete={openDeleteDepartmentModal}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={departments.data?.totalPages || 1}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>

        {/* User Info Card */}
        <UserInfoCard
          currentUser={null}
          userRole={account.data?.role?.toString() || null}
        />
      </main>

      {/* Modals for Staff */}
      {activeTab === "staff" && (
        <>
          <StaffFormModal
            isOpen={showCreateModal}
            title="Tạo nhân viên mới"
            formData={staffFormData}
            isSubmitting={createStaff.isPending}
            showEmailField={true}
            departments={departments.data?.content || []}
            onClose={() => {
              setShowCreateModal(false);
              resetStaffForm();
            }}
            onSubmit={handleCreateStaff}
            onChange={handleStaffFormChange}
          />

          <StaffFormModal
            isOpen={showEditModal && !!selectedStaff}
            title="Chỉnh sửa nhân viên"
            formData={staffFormData}
            isSubmitting={updateStaff.isPending}
            showEmailField={false}
            departments={departments.data?.content || []}
            onClose={() => {
              setShowEditModal(false);
              setSelectedStaff(null);
              resetStaffForm();
            }}
            onSubmit={handleUpdateStaff}
            onChange={handleStaffFormChange}
          />

          <DeleteConfirmModal
            isOpen={showDeleteModal && !!selectedStaff}
            staffName={selectedStaff?.name || ""}
            isDeleting={deleteStaff.isPending}
            onConfirm={handleDeleteStaff}
            onCancel={() => {
              setShowDeleteModal(false);
              setSelectedStaff(null);
            }}
          />
        </>
      )}

      {/* Modals for Department */}
      {activeTab === "department" && (
        <>
          <DepartmentFormModal
            isOpen={showCreateModal}
            title="Tạo phòng ban mới"
            formData={departmentFormData}
            isSubmitting={createDepartment.isPending}
            onClose={() => {
              setShowCreateModal(false);
              resetDepartmentForm();
            }}
            onSubmit={handleCreateDepartment}
            onChange={handleDepartmentFormChange}
          />

          <DepartmentFormModal
            isOpen={showEditModal && !!selectedDepartment}
            title="Chỉnh sửa phòng ban"
            formData={departmentFormData}
            isSubmitting={false}
            onClose={() => {
              setShowEditModal(false);
              setSelectedDepartment(null);
              resetDepartmentForm();
            }}
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Implement update department when API is ready
              setShowEditModal(false);
              setSelectedDepartment(null);
              resetDepartmentForm();
            }}
            onChange={handleDepartmentFormChange}
          />

          <DeleteConfirmModal
            isOpen={showDeleteModal && !!selectedDepartment}
            staffName={selectedDepartment?.name || ""}
            isDeleting={false}
            onConfirm={handleDeleteDepartment}
            onCancel={() => {
              setShowDeleteModal(false);
              setSelectedDepartment(null);
            }}
          />
        </>
      )}
    </div>
  );
}
