import express, {Express} from "express";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import routes from "../routes";
import {ErrorController} from "../controllers";

const app:Express = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN,
    optionsSuccessStatus: 200
}));
app.use(express.static(path.join(process.cwd(), "public")))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.use(ErrorController.resourceNotFound);
app.use(ErrorController.internalError);


export default app;