import { LoginForm } from "@/components/shared/LoginForm";
import { login, type LoginState } from "@/actions/auth";

async function deliveryLogin(prevState: LoginState, formData: FormData) {
  "use server";
  return login(["DELIVERY_PARTNER"], prevState, formData);
}

export default function DeliveryLoginPage() {
  return <LoginForm title="Delivery Partner Login" demoEmail="delivery@kirana.app" action={deliveryLogin} />;
}
