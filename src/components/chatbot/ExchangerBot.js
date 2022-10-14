import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import CurrencyOption from './CurrencyOption';
import CurrencyExchange from './Exchanger';
import { connect } from "react-redux"

const ExchangerBot = (props) => (
    // console.log("props", props)
    <ChatBot
        headerTitle="Currency exchanger BOT"
        recognitionEnable={true}
        botDelay={500}
        steps={[
            {
                id: '1',
                message: 'Select the currency options',
                trigger: '2',
            },
            {
                id: '2',
                component: <CurrencyOption />,
                waitAction: true,
                trigger: 'search',
            },
            {
                id: 'search',
                user: true,
                validator: (value) => {
                 if (/^[0-9\b]+$/.test(value))
                   {
                     return true;
                   }
                 else
                   {
                     return'Please input numbers only.';
                   }
              },
                trigger: '4',
            },
            {
                id: '4',
                component: <CurrencyExchange />,
                trigger: 'search',
            },
        ]}

    />
);
//  
const mapStateToProps = state => ({

})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExchangerBot)
