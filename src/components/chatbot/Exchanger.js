import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'react-simple-chatbot';
import { connect } from "react-redux";
import { fromCurrency, toCurrency } from "../../Action"

class CurrencyExchange extends Component {
  constructor(props) {
    super(props);

    this.state = {

      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;
    const from_currency = this.props.from_currency;
    const to_currency = this.props.to_currency;

    let current = new Date();
    var currentData = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const queryUrl = `https://exchange-rates.abstractapi.com/v1/convert?api_key=d2792394e3c14e81a0d5907970be01ca&base=${from_currency}&target=${to_currency}&base_amount=${search}`;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        if (data) {
          if (data.base) {
            var resultTxt = "<p>"+data.base+" to "+data.target+"</p>"
            resultTxt+= "<p>Exchange Rate: "+data.exchange_rate+"</p>";
            resultTxt+= "<p>Converted Amount:"+parseFloat(data.converted_amount).toFixed(2)+"</p>";
            self.setState({ loading: false, result: resultTxt });
          } else {
            self.setState({ loading: false, result: "" });
          }
        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }
    xhr.open('GET', queryUrl);
    xhr.send();
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="exchanger-div">
        {loading ? <Loading /> : <div className="result" dangerouslySetInnerHTML={{__html: result}}></div>}
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {/* {
              !trigger &&
              <button
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            } */}
          </div>
        }
      </div>
    );
  }
}

CurrencyExchange.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

CurrencyExchange.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const mapStateToProps = state => {
  return {
    from_currency: state.currencyValue.fromCurrency,
    to_currency: state.currencyValue.toCurrency
  }
}

const mapDispatchToProps = {
  fromCurrency,
  toCurrency
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyExchange)

