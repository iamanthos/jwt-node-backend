import verifySignup from '../middleware/verifySignup.js'
import { signin, signup} from '../controller/auth.controller.js'

export const authRoute = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

app.post(
    "/api/auth/signup",
    [
        verifySignup.checkDuplicateUserOrEmail,
        verifySignup.checkRolesExisted
    ],
    signup
);

app.post("/api/auth/signin", signin);
};