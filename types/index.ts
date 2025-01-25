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

export interface Profile {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  postCode?: string;
  id: string;
}
export interface GeoLocation {
  name: string;
  code: string
}

export interface User {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  roles: string[];
  password: string;
  passwordConfirm: string;
  id: string;
}

export interface Order {
  id: string;
  number: number;
  order_number: string;
  year: number;
  user: User;
  products: { id: string; amount: number; sale_price: number, standard_image: string, name: { es: string, en: string } }[];
  coupon_id: string;
  note: string;
  payment_method: string;
  status: string;
  subtotal_price: number;
  total_price: number;
  delivery_address_id: string;
  delivery_address: DeliveryAddress;
  createdAt: string;
  updatedAt: string;
  billing_address: {
    name: string;
    lastName: string;
    address: string;
    countryId: number;
    state: string;
    city: string;
    phone: string;
    email: string;
    postCode: string;
  };
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
  id: string,
  amount: number,
  coupon_discount: string,
  coupon_id: string,
  coupon_code: string,
  delivery_cost: string,
  delivery_method: string,
  subtotal_price: string,
  total_price: string,
  products: Product[];
}

export interface BillingAddress {
  name: string;
  last_name: string;
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
  category_id: string;
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
  amount: number
}

export interface NuxtFilter {
  slug: string;
  label?: string;
  hideEmpty: boolean;
  showCount: boolean;
  openByDefault: boolean;
}

export interface Coupon {
  id: string;
  discount_type: string;
  amount: number;
  use_limit: number;
  code: string;
  expiration_date: string;
  min_cost: string;
  max_cost: string;
}

export interface Banner {
  id: string;
  desktop_image?: string;
  tablet_image: string;
  movil_image: string;
  department_id: string;
  category_id: string;
  product_id: string;
}

export interface Customer {
  accessToken: string
  name: string;
  last_name: string;
  email: string;
  phone: string;
  roles: string[];
  password: string;
  passwordConfirm: string;
  id: string;
}