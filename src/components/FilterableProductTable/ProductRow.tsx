import * as React from 'react';

interface ProductRowProps {
  product: {
    name: string;
    stocked: boolean;
    price: string;
  };
}

class ProductRow extends React.Component<ProductRowProps, {}> {
  public render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

export default ProductRow;
