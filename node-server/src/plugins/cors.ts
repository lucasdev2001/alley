import cors from "cors";
export default cors({
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:5174"],
});
