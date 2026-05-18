import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import ProductManager from "@/components/admin/ProductManager";
import { getAdminCategories } from "@/lib/api";
import { isBackendUnavailableError } from "@/lib/backend-error";
import { getProtectedAdminProducts } from "@/lib/server-api";

export default async function ProductsPage() {
  let products;
  let categories;

  try {
    [products, categories] = await Promise.all([
      getProtectedAdminProducts(),
      getAdminCategories(),
    ]);
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error;
    }

    return (
      <div className="admin-page">
        <section className="admin-card admin-card-pad">
          <p className="admin-eyebrow">Catalog</p>
          <h1 className="admin-title">Manage Products</h1>
        </section>
        <BackendUnavailableNotice />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">Catalog</p>
        <h1 className="admin-title">Manage Products</h1>
      </section>

      <ProductManager products={products.data} categories={categories.data} />
    </div>
  );
}
