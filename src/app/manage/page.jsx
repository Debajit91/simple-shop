import { redirect } from "next/navigation";

// Pure legacy redirect to the new place
export default function LegacyManageRedirect() {
  redirect("/dashboard/products/new");
}
