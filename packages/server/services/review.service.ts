import { readFileSync } from "fs";
import { join } from "path";
import { llmClient } from "../llm/client";
import { reviewRepository } from "../repositories/review.repository";

const template = readFileSync(
    join(__dirname, "../prompts/summarize-reviews.txt"),
    "utf-8"
);

export const reviewService = {
    async summarizeReviews(productId: number): Promise<string> {
        const existingSummary = await reviewRepository.getReviewSummary(
            productId
        );

        if (existingSummary) {
            return existingSummary;
        }

        // Get the last 10 reviews
        const reviews = await reviewRepository.getReviews(productId, 10);
        const joinedReviews = reviews.map((r) => r.content).join("\n\n");
        const prompt = template.replace("{{ reviews }}", joinedReviews);

        // Send the reviews to a LLM
        const { text: summary } = await llmClient.generateText({
            model: "gpt-4o-mini",
            prompt,
            temperature: 0.2,
            maxTokens: 500,
        });

        await reviewRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};
