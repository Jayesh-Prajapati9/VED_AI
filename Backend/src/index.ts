import Express from "express";
import userRoutes from "./routes/userRoutes";
import cookieparse from "cookie-parser";
import servicesRoutes from "./routes/servicesRoutes";

const app = Express();

app.use(Express.json());
app.use(cookieparse());
app.use("/uploads", Express.static("uploads"));

app.use("/api/user", userRoutes);
app.use("/api/services", servicesRoutes);

let port = 8000;
app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
