import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../../constants/ApplicationSettings';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';
import numeral from 'numeral';
import { Button, CircularProgress } from '@material-ui/core';

const PageWrapper = styled.div`
  width: 100%;
  height: ${props => `calc(100vh - ${AppNavHeight}px)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  padding: 24px;
  margin-bottom: 16px;
  text-align: left;
  & > span {
    font-size: 1.7rem;
    font-weight: 400;
  }
`;

const Wrapper = styled.div`
  width: 75%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const DataDisplay = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 32px;
  grid-template-rows: auto;
  grid-template-areas: "vehicles info";
`;

const VehiclesShow = styled.div`
  grid-area: vehicles;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const CartInfo = styled.div`
  grid-area: info;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: rgb(62, 120, 192);
  border-radius: 8px;
`;

const VehicleShow = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  margin-bottom: 12px;
`;

const VehicleImage = styled.div`
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VehicleData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 12px;
`;

const VehiclePrice = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const EmptyCart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span { 
    font-size: 1.35rem;
    font-weight: 400;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
`;

class ConstructionCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      requested: false,
      cartTotal: 0,
      requesting: false
    }
  }

  componentWillMount = () => {
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/cart`).then(data => {
      const res = data.data;
      this.setState({
        vehicles: res.vehicles,
        cartTotal: (!!res.vehicles && res.vehicles.length > 0) ? res.vehicles.reduce( (acc, v) => (acc + (v.vehicle.price * v.quantity) )) : 0,
      })
    })
  }

  requestCart = () => {
    this.setState({
      requesting: true,
    }, () => {
      axios.post(`${ApiServer}/api/v2/heavy_vehicles/cart`).then(data => {
        const res = data.data;
        this.setState({
          vehicles: res.vehicles,
          requested: true,
          requesting: false
        })
      })
    }) 
  }

  render() {
    const { vehicles, cartTotal,requesting, requested } = this.state;
    let cartTotal2 = 0;
    const ca = (!!vehicles && vehicles.length > 0) ? vehicles.forEach(v => cartTotal2 += parseFloat(v.vehicle.price)) : 0;
    return(
      <PageWrapper>
        <Wrapper>
          <Title>
            <span>Cart (Heavy vehicles)</span>
          </Title>
          <DataDisplay>
            <VehiclesShow>
              {
                vehicles.length === 0 ? (
                  <EmptyCart>
                    <span>You don't have any vehicle added to your cart.</span>
                  </EmptyCart>
                ) : (
                  vehicles.map(v => (
                    <VehicleShow>
                      <VehicleImage>
                        <img alt={v.title} src={v.vehicle.main_image} />
                      </VehicleImage>
                      <VehicleData>
                        <div>
                          <span style={{ fontWeight: '400', fontSize: '1.18rem' }}>
                            { v.vehicle.title }
                          </span>
                        </div>
                        <div>
                          <span>
                            { v.vehicle.description }
                          </span>
                        </div>
                      </VehicleData>
                      <VehiclePrice>
                        <div>
                          <span style={{ fontWeight: '600', fontSize: '1.16rem' }}>US$ {numeral(v.vehicle.price).format("0,0")}</span>
                        </div>
                      </VehiclePrice>
                    </VehicleShow>
                  ))
                )
              }
            </VehiclesShow>
            <CartInfo>
              <div style={{ width: '100%', textAlign: 'center', padding: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.16rem', fontWeight: '600', color: 'white' }}>Cart info</span>
              </div>
              <div style={{ width: '100%', textAlign: 'center', padding: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.16rem', color: 'white' }}><b>Total: <span style={{ fontWeight: '100', color: 'white' }}>US$ {numeral(cartTotal2).format("0,0")}</span></b></span>
              </div>
              <div style={{ width: '100%', textAlign: 'center', padding: '16px', marginTop: '24px' }}>
                {
                  requesting ? (<LoadingWrapper><CircularProgress /></LoadingWrapper>) : requested ? (<span style={{ color: 'white' }}>All vehicles requested.</span>) : (<Button variant="contained" onClick={this.requestCart}>Request cart</Button>)
                }
              </div>
            </CartInfo>
          </DataDisplay>
        </Wrapper>
      </PageWrapper>
    )
  }
}

export default ConstructionCart;