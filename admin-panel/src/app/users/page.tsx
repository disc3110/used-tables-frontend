import BackendUnavailableNotice from "@/components/admin/BackendUnavailableNotice";
import UserManager from "@/components/admin/UserManager";
import { isBackendUnavailableError } from "@/lib/backend-error";
import { getProtectedAdminUsers } from "@/lib/server-api";

export default async function UsersPage() {
  let users;

  try {
    users = await getProtectedAdminUsers();
  } catch (error) {
    if (!isBackendUnavailableError(error)) {
      throw error;
    }

    return (
      <div className="admin-page">
        <section className="admin-card admin-card-pad">
          <p className="admin-eyebrow">Permissions</p>
          <h1 className="admin-title">Manage Users</h1>
        </section>
        <BackendUnavailableNotice />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">Permissions</p>
        <h1 className="admin-title">Manage Users</h1>
      </section>

      <UserManager users={users.data} />
    </div>
  );
}
