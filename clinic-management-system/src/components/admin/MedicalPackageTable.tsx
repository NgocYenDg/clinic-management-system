import { Edit2, Trash2 } from "lucide-react";

interface MedicalPackageTableProps {
  packages: IMedicalPackage[];
  onEdit: (pkg: IMedicalPackage) => void;
  onDelete: (pkg: IMedicalPackage) => void;
}

export default function MedicalPackageTable({
  packages,
  onEdit,
  onDelete,
}: MedicalPackageTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4">Tên gói</th>
            <th className="text-left py-3 px-4">Mô tả</th>
            <th className="text-left py-3 px-4">Giá</th>
            <th className="text-left py-3 px-4">Hình ảnh</th>
            <th className="text-right py-3 px-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {packages.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-400">
                Không có gói khám nào
              </td>
            </tr>
          ) : (
            packages.map((pkg) => (
              <tr
                key={pkg.medicalPackageId}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4">{pkg.name}</td>
                <td className="py-3 px-4">
                  <div className="max-w-md truncate">{pkg.description}</div>
                </td>
                <td className="py-3 px-4">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(pkg.price)}
                </td>
                <td className="py-3 px-4">
                  {pkg.image && (
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onEdit(pkg)}
                      className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(pkg)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
