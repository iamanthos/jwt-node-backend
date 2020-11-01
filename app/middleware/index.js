import { authJwt } from "./authJwt";
import { verifySignUp } from "./verifySignup";

const appMiddleware = {
    authJwt,
    verifySignUp
}
export default appMiddleware;