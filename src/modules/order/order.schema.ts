import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const schema = z.object({
  dateOfTransportation: z.date(),
  typeOfOperation: z.string().min(1),
  typeOfContainer: z.string().min(1),
  heightOfContainer: z.string().min(1),
  nameOfCargo: z.string().min(1),
  weightOfCargo: z.string().min(1),
  signOfCargoDanger: z.string().min(1),
  warehouseAddress: z.string().min(1),
  warehouseCity: z.string().min(1),
  containerReceivingAddress: z.string().min(1),
  containerReceivingCity: z.string().min(1),
  containerDeliveryAddress: z.string().min(1),
  containerDeliveryCity: z.string().min(1),
});

export const orderResponseZodSchema = z.object({
  id: z.string().min(1),
  dateOfTransportation: z.date(),
  typeOfOperation: z.string().min(1),
  typeOfContainer: z.string().min(1),
  heightOfContainer: z.string().min(1),
  nameOfCargo: z.string().min(1),
  weightOfCargo: z.string().min(1),
  signOfCargoDanger: z.string().min(1),
  warehouseAddress: z.string().min(1),
  warehouseCity: z.string().min(1),
  containerReceivingCity: z.string().min(1),
  containerDeliveryCity: z.string().min(1),
  user: z.object({ email: z.string().min(1) }),
});

export const ordersResponseZodSchema = z.array(orderResponseZodSchema);

export type CreateOrderInput = z.infer<typeof schema>;

export const createOrderJsonSchema = zodToJsonSchema(schema);

export const ordersResponseJsonSchema = zodToJsonSchema(
  ordersResponseZodSchema,
);
