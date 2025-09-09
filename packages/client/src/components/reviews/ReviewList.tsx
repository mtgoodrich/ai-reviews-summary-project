import StarRating from "./StarRating";
import { useReviews, type Review } from "../../hooks/useReviews";

type Props = {
    productId: number;
};

const ReviewList = ({ productId }: Props) => {
    const {
        data: reviewData,
        isPending,
        isError,
        isRefetching,
    } = useReviews({
        productId,
    });

    if (isRefetching) return <div>Refetching ...</div>;
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error!!!</div>;

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
