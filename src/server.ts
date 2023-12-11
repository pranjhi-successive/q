import express from "express";
import router from "./routes/Route";
import Database from "./lib/Database";

interface ServerConfig {
  port: number;
  host: string;
  secretKey: string;
  customHeaderName: string;
  customHeaderValue: string;
  mongoUrl: string;
}
class Server {
  private readonly app: express.Application;
  private readonly config: ServerConfig;

  constructor(config: ServerConfig) {
    console.log(config);
    this.config = config;
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();

    //  await  database.connect();
  }

  private configureMiddleware(): any {
    this.app.use(express.json());
  }

  private configureRoutes(): any {
    this.app.use("/", router);
  }

  run = async (): Promise<void> => {
    const database = new Database();
    await database.connect();
    // await database.seed();
    // console.log(database.seed());
  };

  public listen(): any {
    this.app.listen(this.config.port, () => {
      console.log(`App listening on port ${this.config.port}`);
    });
  }
}

export default Server;