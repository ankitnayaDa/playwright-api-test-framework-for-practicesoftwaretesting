//This defines the shape of a brand object
export type Brand = {
  id: string;
  name: string;
  slug: string;
};

//Expected brand names to validate against
export const expectedBrandNames = [
  'ForgeFlex Tools',
  'MightyCraft Hardware',
];

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: any;
};

export const Iaddress = {
  "street": "Espoo",
  "city": "Espoo",
  "state": "Espoo",
  "country": "Finland",
  "postal_code": "22600",
};

export const user = {
  "first_name": "Barry",
  "last_name": "Allen",
  "phone": "17204496001",
  "dob": "1990-06-08",
  "password": "Barry@Allen123",
  "email": "barry.allen8@qt.com",
  "address": Iaddress,
};

export type CreateUserResponse = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
};

export type Pdt = {
    id: string;
    name: string;
    price: string;
    is_location_offer: string;
    is_rental: string;
    co2_rating: string;
    in_stock: string;
    is_eco_friendly: string;
    product_image: string;
    category: string;
    brand: string;
};

export type GetProductResponse = {
  current_page: any;
  from: any;
  last_page:any;
  per_page:any;
  to:any;
  total:any;
  data: Pdt[];
}

export type CreateCartResponse = {
  id: any;
}
export type cart={
  id: any;
  additional_discount_percentage: any;
  lat: any;
  lng: any;
  cart_items: CartDetails[]
}
export type CartDetails = {
  id: any;
  quantity: any;
  discount_percentage: any;
  cart_id: any;
  product_id: any;
  product: any;
}

export type UpdateCart = {
  message : any;
}