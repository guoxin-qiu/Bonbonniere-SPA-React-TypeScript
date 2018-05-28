import * as React from 'react';

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (textValue: string) => void;
  onInStockChange: (isChecked: boolean) => void;
}

class SearchBar extends React.Component<SearchBarProps, {}> {
  private textInput: HTMLInputElement | null;
  constructor(props: SearchBarProps) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  public componentDidMount() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  public render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
          ref={ref => {
            this.textInput = ref;
          }}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }

  private handleFilterTextChange(event: React.FormEvent<HTMLInputElement>) {
    this.props.onFilterTextChange(event.currentTarget.value);
  }

  private handleInStockChange(event: React.FormEvent<HTMLInputElement>) {
    this.props.onInStockChange(event.currentTarget.checked);
  }
}

export default SearchBar;
