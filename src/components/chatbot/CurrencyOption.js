import React, { Component } from 'react'
import { connect } from "react-redux"
import { fromCurrency, toCurrency } from "../../Action"
import currencyData from "../../../src/currencies.json"
class CurrencyOption extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fromCurrency: "",
            toCurrency: "",
            loading: true,
            trigger: false,
        }

        this.triggetNext = this.triggerNext.bind(this);
    }

    fromChange = (e) => {
        this.setState({ fromCurrency: e.target.value })
    }

    toChange = (e) => {
        this.setState({ toCurrency: e.target.value })
    }

    triggerNext = () => {
        this.props.fromCurrency(this.state.fromCurrency);
        this.props.toCurrency(this.state.toCurrency);

        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    render() {

        const { trigger, loading } = this.state;

        const optionData = currencyData.map(
            (data) => {
                return (
                    <option key={data.code} value={data.code}>{`${data.name} (${data.symbol})`}</option>
                )
            }
        )

        return (
            <div className='currency-option'>
                <select onChange={(e) => this.fromChange(e)}>
                    <option value="">Select</option>
                    {optionData}
                </select>
                &nbsp;
                to
                &nbsp;
                <select onChange={(e) => this.toChange(e)}>
                <option value="">Select</option>
                    {optionData}
                </select>
                &nbsp;
                <button onClick={() => this.triggerNext()}>Set</button>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {
    fromCurrency,
    toCurrency
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencyOption)