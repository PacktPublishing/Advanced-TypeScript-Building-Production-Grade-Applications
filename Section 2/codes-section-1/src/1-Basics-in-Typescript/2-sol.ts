import { Equal, Expect } from "..";

export const orderDetails: {
  orderId: string;
  quantity: number;
  price: number;
} = JSON.parse('{"orderId": "ORD456", "quantity": 3, "price": 29.99}');

type test = Expect<
  Equal<
    typeof orderDetails,
    {
      orderId: string;
      quantity: number;
      price: number;
    }
  >
>;
