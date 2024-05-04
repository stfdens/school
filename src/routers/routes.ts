import Express, { Request, Response } from "express";
import muridController from "../controller/MuridController";
import AuththenticationsController from "../controller/AuthenticationController";
import { validationsRequest } from "../validations/validationSchema";
import { jwtMiddleware } from "../middleware/jwtMiddleware";
import { RequestAll } from "../interface/interfaceAllData";

export const routesServer = (): void => {
  const app = Express();
  app.use(Express.json());

  // admin area
  app.get("/murid", jwtMiddleware, (req: RequestAll, res: Response): void =>
    muridController.getAllMurid(req, res)
  );
  app.get("/murid/:nama", jwtMiddleware, (req: Request, res: Response): void =>
    muridController.getMuridByName(req, res)
  );
  app.post(
    "/murid",
    jwtMiddleware,
    validationsRequest,
    (req: Request, res: Response): void => muridController.postMurid(req, res)
  );
  app.put(
    "/murid/:id",
    jwtMiddleware,
    validationsRequest,
    (req: Request, res: Response): void => muridController.updateMurid(req, res)
  );
  app.delete(
    "/murid/:id",
    jwtMiddleware,
    validationsRequest,
    (req: Request, res: Response): void => muridController.deleteMurid(req, res)
  );

  // register && authentications
  app.post("/register", (req: Request, res: Response): void =>
    AuththenticationsController.register(req, res)
  );
  app.post("/login", (req: Request, res: Response): void =>
    AuththenticationsController.login(req, res)
  );

  app.listen(process.env.PORT, (): void => {
    console.log(`server running on localhost:${process.env.PORT}`);
  });
};
