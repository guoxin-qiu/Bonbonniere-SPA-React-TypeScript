import { Button, message } from 'antd';
import * as React from 'react';
import '../../../node_modules/antd/dist/antd.css';

interface HomeState {
  buttonName: string;
  disabled: boolean;
}

class Home extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.Oye = this.Oye.bind(this);
    this.state = {
      buttonName: 'Click me',
      disabled: false
    };
  }
  public render() {
    return (
      <div>
        <h1>Welcome to bonbonniere, built with react</h1>
        <Button onClick={this.Oye} disabled={this.state.disabled}>
          {this.state.buttonName}
        </Button>
      </div>
    );
  }

  private Oye(event: React.MouseEvent<HTMLButtonElement>) {
    message.warning('Oye...');
    this.setState({ buttonName: 'loading...', disabled: true });
    setTimeout(() => {
      this.setState({ buttonName: 'Click me', disabled: false });
    }, 3000);
  }
}

export default Home;
