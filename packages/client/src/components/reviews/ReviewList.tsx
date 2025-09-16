import { useState } from "react";
import axios from "axios";
import { HiSparkles } from "react-icons/hi2";
import { useReviews, type Review } from "../../hooks/useReviews";
import Skeleton from "react-loading-skeleton";
import StarRating from "./StarRating";

import "react-loading-skeleton/dist/skeleton.css";

type Props = {
    productId: number;
};

type SummarizeResponse = {
    summary: string;
};

const ReviewList = ({ productId }: Props) => {
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState("");

    const {
        data: reviewData,
        isLoading,
        error,
        isRefetching,
    } = useReviews({
        productId,
    });

    const handleSummarize = async () => {
        try {
            setLoadingSummary(true);
            setSummaryError("");

            const { data } = await axios.post<SummarizeResponse>(
                `/api/products/${productId}/reviews/summarize`
            );

            setSummary(data.summary);
        } catch (error) {
            console.error(error);
            setSummaryError("Could not summarize reviews. Try again");
        } finally {
            setLoadingSummary(false);
        }
    };

    if (isRefetching)
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton width={350} count={2} />
                    </div>
                ))}
            </div>
        );
    if (isLoading)
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                    <div key={i}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton width={350} count={2} />
                    </div>
                ))}
            </div>
        );
    if (error)
        return (
            <div className="bg-red-500">Error!!! Could not fetch reviews.</div>
        );

    if (!reviewData?.reviews.length) {
        return null;
    }

    const currentSummary = reviewData?.summary || summary;

    return (
        <div>
            <div className="mt-2 mb-5">
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ) : (
                    <>
                        <button
                            onClick={handleSummarize}
                            disabled={loadingSummary}
                            className="px-4 py-2 flex items-center justify-center gap-2 text-white bg-black rounded-lg cursor-pointer disabled:bg-gray-400 disabled:opacity-65"
                        >
                            <HiSparkles /> Summarize
                        </button>
                        {loadingSummary && (
                            <div className="py-2">
                                <Skeleton count={2} />
                            </div>
                        )}
                        {summaryError && (
                            <p className="text-red-500 py-2">{summaryError}</p>
                        )}
                    </>
                )}
            </div>
            <div className="flex flex-col gap-5">
                {reviewData?.reviews.map((review: Review) => (
                    <div key={review.id}>
                        <div className="font-semibold">{review.author}</div>
                        <div>
                            <StarRating value={review.rating} />
                        </div>
                        <p className="py-2">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
