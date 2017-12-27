import React, { Component } from 'react';
import { Navbar, NavbarGroup, NavbarHeading, Card, Icon } from "@blueprintjs/core";
import './App.css';
import '@blueprintjs/core/dist/blueprint.css';

const cardStyle = {
  display: "inline-block",
  width: "20%"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, coins: []}
    this.getUpdatedData = this.getUpdatedData.bind(this);
    this.getUpdatedData()

    // Toggle the state every second
    setInterval(this.getUpdatedData, 30000);
  }
  getUpdatedData(){
    this.setState({ loading: true });
    fetch('http://localhost:3001/')
    .then(res => res.json())
    .then((res) => {
      this.setState({ loading: false, coins: res });
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar>
            <NavbarGroup>
                <NavbarHeading>Coins</NavbarHeading>
            </NavbarGroup>
            <NavbarGroup align="right">
                {this.state.loading ? 'Loading...' : ''}
            </NavbarGroup>
        </Navbar>
        {this.state.coins.map(c => (
          <div style={cardStyle}>
            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
                <h5><a href="#">{c.name}</a></h5>
                <p>Rank: <strong>{c.rank}</strong></p>
                <p>Market Cap: <strong>${c.market_cap_usd || 0}</strong></p>
                <p>Price: <strong>${c.price_usd || 0}</strong></p>
                <p>24H Volume: <strong>{c['24h_volume_usd']}</strong></p>
                <p>Available Supply: <strong>{c.available_supply || 'N/A'}</strong></p>
                <p>Max Supply: <strong>{c.max_supply || 'N/A'}</strong></p>
                <p>Weekly Change: <strong>{c.percent_change_7d}%</strong></p>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
