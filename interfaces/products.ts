export interface ProductInterface {
  _id: string;
  product_id: string;
  name: string;
  price: number;
  description: string;
  content: string;
  image: Image;
  category: string;
  checked: boolean;
  sold: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  public_id: string;
  url: string;
}
