import React, { Component } from 'react';
import Board from '../components/Board';
import axios from '../axios';
import styled from 'styled-components';
import { PointsProgress, LinearProgress } from '../components/Progress';
import Button from '../helpers/Button';
import Typography from '../helpers/Typography';
import { MenuButton } from '../components/IconButtons';
import _ from 'lodash';

class SinglePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      buttonLoading: false,
      win: false,
    };
  }

  componentDidMount() {
    const onResponse = data => {
      this.setState({ ...data, loading: false });
      console.log(this.state);
    };
    this.requestHandler(onResponse);
  }

  requestHandler = func => {
    axios
      .post('/ships/')
      .then(({ data }) => {
        func(data);
      })
      .catch(() => {});
  };

  retryHandler = () => {
    this.setState({ buttonLoading: true });

    const onResponse = data => {
      this.setState({ ...data, buttonLoading: false, win: false });
      console.log(this.state);
    };
    this.requestHandler(onResponse);
  };

  hitHandler = (index, name) => {
    const copy_array = [...this.state.array];
    const copy_ships = { ...this.state.ships };
    let win = false;

    if (copy_array[index].name) {
      if (copy_ships[name] === 1) {
        delete copy_ships[name];
        if (_.isEmpty(copy_ships)) {
          win = true;
        }

        this.state.border[name].map(i => {
          copy_array[i].border = true;
        });
        copy_array[index].hit = true;
      } else {
        copy_ships[name] = copy_ships[name] - 1;
        copy_array[index].hit = true;
      }
    } else {
      copy_array[index].hit = true;
    }

    this.setState({ array: copy_array, ships: copy_ships, win });
  };

  render() {
    const { buttonLoading, win } = this.state;

    const Content = () => (
      <Container>
        <MenuButton />
        <BoardWrapper>
          <Board array={this.state.array} hit={this.hitHandler}>
            <Backdrop display={win}>
              <Typography fontSize="1.6rem" type="label" color="light">
                You win the battle.
              </Typography>
            </Backdrop>
          </Board>
          <ButtonWrapper>
            <Button onClick={buttonLoading ? null : this.retryHandler}>
              {buttonLoading ? (
                <PointsProgress size={7} />
              ) : (
                <Typography fontSize="1.2rem" color="light" type="span">
                  Retry
                </Typography>
              )}
            </Button>
          </ButtonWrapper>
        </BoardWrapper>
      </Container>
    );

    return this.state.loading ? <LinearProgress /> : <Content />;
  }
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoardWrapper = styled.div`
  max-width: 440px;
  margin: 100px auto;
`;
const ButtonWrapper = styled.div`
  margin: 15px auto;
  width: 200px;
`;
const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  display: ${({ display }) => (display ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export default SinglePlayer;
