import { useReviews, type Review } from "../../hooks/useReviews";
import Skeleton from "react-loading-skeleton";
import StarRating from "./StarRating";

import "react-loading-skeleton/dist/skeleton.css";

type Props = {
    productId: number;
};

const ReviewList = ({ productId }: Props) => {
    const {
        data: reviewData,
        isLoading,
        error,
        isRefetching,
    } = useReviews({
        productId,
    });

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

    return (
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
    );
};

export default ReviewList;
