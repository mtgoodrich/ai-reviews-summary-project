import { useQuery } from "@tanstack/react-query";

type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

export type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

interface ProductId {
    productId: number;
}

export const useReviews = ({ productId }: ProductId) =>
    useQuery({
        queryKey: ["reviews", { productId }],
        queryFn: () => getReviews(productId),
    });

const getReviews = async (productId: number): Promise<GetReviewsResponse> => {
    const response = await fetch(`/api/products/${productId}/reviews`);
    const data = await response.json();
    return data;
};
