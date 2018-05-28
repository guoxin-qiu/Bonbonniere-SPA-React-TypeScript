import * as React from 'react';

interface ProductCategoryRowProps {
  category: string;
}

class ProductCategoryRow extends React.Component<ProductCategoryRowProps, {}> {
  public static defaultProps = {
    category: ''
  };
  public render() {
    const { category } = this.props;
    return (
      <tr>
        <th colSpan={2}>{category}</th>
      </tr>
    );
  }
}

export default ProductCategoryRow;
