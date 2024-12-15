export interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  identifier: string;
  config: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  image: string;
  name: { es: string; en: string };
  order: number;
  department_id: string;
}

export interface DeliveryAddress {
  name: string;
  last_name: string;
  title: string;
  dni: string;
  email: string;
  phone_number: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  deliveryAddress_street: string;
  id: string;
}

export interface User {
  name: string
  last_name: string
  email: string
  phone: string
  roles: string[],
  password: string
  passwordConfirm: string
  id: string;
}
export interface Login {
  email: string;
  password: string;
}

export interface ProductCart {
  id: string;
  amount: number;
}
export interface Cart {
  products: ProductCart[];
}

export interface BillingAddress {
  name: string;
  lastName: string;
  address: string;
  countryId: number;
  country: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  postCode: string;
  id: string;
}

export default interface Product {
  visible: boolean;
  standard_image: string;
  big_image: string;
  format: string;
  order: number;
  stock: number;
  category_id: string
  measure_unit: string;
  measure_unit_amount: number;
  createdAt: string;
  updatedAt: string;
  sale_percent: number;
  percent: number;
  price: string;
  sale_price: string;
  categoryId: string;
  expireAt: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  available: boolean;
  featured: boolean;
  favorite: boolean;
  id: string;
  category: Category;
}

export interface Order {
  delivery_address: DeliveryAddress;
  billing_address: BillingAddress;
  visible: boolean;
  payment_method: string;
  product_price: number;
  delivery_price: number;
  subtotal_price: number;
  total_price: number;
  status: string;
  createdAt: string;
  order_number: string;
  id: string;
}

export interface NuxtFilter {
  slug: string;
  label?: string;
  hideEmpty: boolean;
  showCount: boolean;
  openByDefault: boolean;
}
