import * as React from "react";
import lodash from 'lodash';
import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import styles from "./shopApp.module.css";
import AddProductModal from "./components/add-product-modal";
import Header from './components/header';

interface Product {
  title: string;
  description: string;
  price: string;
  isFavorite: boolean;
}

interface ShopAppState {
  products: Product[];
  isOpen: boolean;
  isShowingMessage: boolean;
  message: string;
  numFavorites: number;
  prodCount: number;
}
const fakeApiBaseUrl = 'https://fakestoreapi.com';


export class ShopApp extends React.Component<{}, ShopAppState> {
  constructor(props: any) {

    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { 
      products: [],
      isOpen: false,
      isShowingMessage: false,
      message: '',
      numFavorites: 0,
      prodCount: 0 
    };
  }

  componentDidMount() {

    document.title = "Droppe refactor app";
    this.getProducts();
  }

  getProducts() {
    
    fetch(`${fakeApiBaseUrl}/products`)
    .then((response) => response.json())
    .then((rawData) => {
      const data = rawData.map((data: Object) => ({
        ...data,
        isFavorite: false,
      }));
      this.setState({ products: data, prodCount: data.length });
    });
  }

  favClick(title: string) {
    const prods = this.state.products.map((prod) => {
      if (prod.title === title) {
        return {
          ...prod,
          isFavorite: !prod.isFavorite,
        };
      }
      return prod;
    });

    const numFavorites = prods.filter((prod) => prod.isFavorite).length;

    this.setState({ products: prods, numFavorites });
  }

  onSubmit(payload: { title: string; description: string, price: string }) {
    const updated = [
      ...this.state.products,
      {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        isFavorite: false,
      },
    ];

    this.setState({
      products: updated,
      prodCount: lodash.size(this.state.products) + 1,
      isOpen: false,
      isShowingMessage: true,
      message: 'Adding product...'
    });

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(
        {
          title: payload.title,
          price: payload.price,
          description: payload.description,
        }
      )
    })
      .then(res => res.json())
      .then(json => {
        (function (t) {
          setTimeout(() => {
            t.setState({
              isShowingMessage: false,
              message: ''
            })
          }, 2000)
        })(this);
      })
  }

  render() {
    const { products, isOpen } = this.state;
    return (
      <>
        <Header />
        <div className={['container', styles.main].join(' ')} style={{ paddingTop: 0 }}>
          <div className={styles.buttonWrapper}>
            <span role="button">
              <Button
                onClick={function (this: any) {
                  this.setState({
                    isOpen: true,
                  });
                }.bind(this)}
              >Send product proposal</Button>
            </span>
            {this.state.isShowingMessage && <div className={styles.messageContainer}>
              <i>{this.state.message}</i>
            </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {this.state.prodCount}</span>
            {' - '}
            <span>Number of favorites: {this.state.numFavorites}</span>
          </div>

          {products && !!products.length ? <ProductList products={products} onFav={this.favClick} /> : <div></div>}
        </div>

        <AddProductModal isOpen={isOpen} onSubmit={this.onSubmit} />
      </>
    );
  }
}
