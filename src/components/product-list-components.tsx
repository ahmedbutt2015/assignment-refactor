import * as React from "react";
import { Product } from "./Product";

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}


export default class Posts extends React.Component<IPostsProps, {}> {

  render() {

    return <div>
          {this.props.products.map((p: any, i: any) => (
            <Product key={i} index={i} product={p} onFav={this.props.onFav} />
          )).reverse()}
          </div>
  }
}