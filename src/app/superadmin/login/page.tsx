import { LoginForm } from "@/components/shared/LoginForm";
import { login, type LoginState } from "@/actions/auth";

async function superadminLogin(prevState: LoginState, formData: FormData) {
  "use server";
  return login(["SUPERADMIN"], prevState, formData);
}

export default function SuperadminLoginPage() {
  return <LoginForm title="Superadmin Login" demoIdentifier="superadmin" action={superadminLogin} />;
}
