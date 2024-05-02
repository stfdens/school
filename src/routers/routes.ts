import Express, { Request, Response } from "express";
import muridController from "../controller/MuridController";
import AuththenticationsController from "../controller/AuthenticationController";

export const routesServer = (): void => {
  const app = Express();
  app.use(Express.json());

  app.get("/murid", (req: Request, res: Response): void =>
    muridController.getAllMurid(res)
  );

  app.get("/murid/:nama", (req: Request, res: Response): void =>
    muridController.getMuridByName(req, res)
  );

  app.post("/murid", (req: Request, res: Response): void =>
    muridController.postMurid(req, res)
  );

  app.put("/murid/:id", (req: Request, res: Response): void =>
    muridController.updateMurid(req, res)
  );

  app.delete("/murid/:id", (req: Request, res: Response): void =>
    muridController.deleteMurid(req, res)
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
