import { Redirect } from "react-router";
import { getLoggedUser } from "../services/authService";


export function AuthenticatedRoute(props) {
  const user = getLoggedUser();

  if (user) {
    if (props.admin && user.isAdmin) {
      return <props.component {...props} />;
    } else if (!props.admin) {
      return <props.component {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <Redirect to="/login" />;
}