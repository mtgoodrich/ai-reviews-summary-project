import express, { Request, Response } from "express";
import { reviewController } from "./controllers/review.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.get("/api/hello", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" });
});

router.get("/api/products/:id/reviews", reviewController.getReviews);

router.post(
    "/api/products/:id/reviews/summarize",
    reviewController.summarizeReviews
);

export default router;
