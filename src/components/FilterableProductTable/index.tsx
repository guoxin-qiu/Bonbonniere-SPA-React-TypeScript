import * as React from 'react';
import ProductTable from './ProductTable';
import SearchBar from './SearchBar';

interface Product {
  name: string;
  stocked: boolean;
  price: string;
  category: string;
}

interface FilterableProductTableProps {
  products: Product[];
}

interface FilterableProductTableState {
  filterText: string;
  inStockOnly: boolean;
  products: Product[];
}

class FilterableProductTable extends React.Component<
  FilterableProductTableProps,
  FilterableProductTableState
> {
  private PRODUCTS: Product[] = [
    {
      category: 'Sporting Goods',
      price: '$49.99',
      stocked: true,
      name: 'Football'
    },
    {
      category: 'Sporting Goods',
      price: '$9.99',
      stocked: true,
      name: 'Baseball'
    },
    {
      category: 'Sporting Goods',
      price: '$29.99',
      stocked: false,
      name: 'Basketball'
    },
    {
      category: 'Electronics',
      price: '$99.99',
      stocked: true,
      name: 'iPod Touch'
    },
    {
      category: 'Electronics',
      price: '$399.99',
      stocked: false,
      name: 'iPhone 5'
    },
    {
      category: 'Electronics',
      price: '$199.99',
      stocked: true,
      name: 'Nexus 7'
    }
  ];
  constructor(props: FilterableProductTableProps) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: this.PRODUCTS
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  public render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }

  private handleFilterTextChange(filterText: string) {
    this.setState({
      filterText
    });
  }

  private handleInStockChange(inStockOnly: boolean) {
    this.setState({
      inStockOnly
    });
  }
}

export default FilterableProductTable;
