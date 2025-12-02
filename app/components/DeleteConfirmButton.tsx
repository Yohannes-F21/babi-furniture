// components/DeleteConfirmButton.tsx
import { useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { deleteProduct, clearProductsError } from "@/app/store/productSlice";
// import { deleteProduct } from "@/app/store/productSlice";

interface Props {
  productId: string;
  productTitle: string;
  onDeleteSuccess: () => void;
  setToast: (toast: { type: "success" | "error"; message: string }) => void;
  onDeleteComplete?: () => void;
}

export default function DeleteConfirmButton({
  productId,
  productTitle,
  onDeleteSuccess,
  setToast,
  onDeleteComplete,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async () => {
    setIsDeleting(true);

    const result = await dispatch(deleteProduct(productId));

    if (deleteProduct.fulfilled.match(result)) {
      onDeleteSuccess(); // show toast, close modal and refresh products
      setToast({
        type: "success",
        message: `"${productTitle}" deleted successfully`,
      });
    } else {
      // Show error toast, but do NOT refresh products list
      const errorMsg = result.payload as string;
      setToast({ type: "error", message: errorMsg || "Delete failed" });
      dispatch(clearProductsError());
    }

    if (onDeleteComplete) onDeleteComplete();

    setIsDeleting(false);
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <span className="text-sm text-red-700 font-medium">Delete?</span>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-xs font-bold text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Yes"}
        </button>

        <button
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="text-xs font-bold text-gray-600 hover:text-gray-800"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-110"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
