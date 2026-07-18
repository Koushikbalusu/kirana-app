import { LoginForm } from "@/components/shared/LoginForm";
import { login, type LoginState } from "@/actions/auth";

async function adminLogin(prevState: LoginState, formData: FormData) {
  "use server";
  return login(["ADMIN", "STAFF"], prevState, formData);
}

export default function AdminLoginPage() {
  return <LoginForm title="Admin / Staff Login" demoEmail="admin@kirana.app" action={adminLogin} />;
}
