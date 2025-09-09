// Generics
type MyGenericType<TData> = {
    data: TData;
};

type Example1 = MyGenericType<{
    firstName: string;
}>;

type Example2 = MyGenericType<string>;
type Example3 = MyGenericType<number>;

const Ex2: Example2 = { data: "Help" };
const Ex3: Example3 = { data: 42 };

const makeFetch = <TData>(url: string): Promise<TData> => {
    return fetch(url).then((res) => res.json() as Promise<TData>);
};

makeFetch<{ firstName: string; lastName: string }>("/api/endpoint").then(
    (res) => {
        console.log(res);
        // res is 'any'?
    }
);

const set = new Set<number>();

set.add(1);

// set.add("abc"); // errors because "abc" is not a number

export {};
