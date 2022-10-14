export interface CategoryInterface {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  image?: Image;
}

export interface Image {
  public_id: string;
  url: string;
}
