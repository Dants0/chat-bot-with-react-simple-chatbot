import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import PropTypes from "prop-types";
import { ThemeProvider } from 'styled-components';
import './style.css';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.name,
            cinema: this.cinema,
            idade: this.idade
        }
    }

    componentWillUnmount() {
        const { steps } = this.props;
        const { name, cinema, idade } = steps;

        this.setState({ name, cinema, idade });

    }

    render() {

        const Name = this.props.steps.name.value
        const Cinema = this.props.steps.cinema.value
        const Idade = this.props.steps.idade.value

        return (
            <>
                <div className="chatBotReview">
                    <h3>Sumário</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Nome:</td>
                                <td>{Name}</td>
                            </tr>
                            <tr>
                                <td>Preferencia:</td>
                                <td>{Cinema}</td>
                            </tr>
                            <tr>
                                <td>Idade:</td>
                                <td>{Idade}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

Review.propTypes = {
    steps: PropTypes.object
};

Review.defaultProps = {
    steps: undefined
}


const display = {
    display: 'flex'
};

const theme = {
    background: '#e4e4e4',
    headerBgColor: '#193b7b',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
}

const config = {
    botAvatar: "img.png",
    botDelay: 2000,
    floating: true,
}


class Bot extends Component {
    render() {
        return (
            <ThemeProvider config={config} theme={theme}>
                <div className="container">
                    <div className="box">
                        <h1>Chat Bot</h1>
                    <ChatBot
                        steps={[
                            {
                                id: '1',
                                message: 'Qual é o seu nome?',
                                trigger: 'name'
                            },
                            {
                                id: 'name',
                                user: true,
                                trigger: '3'
                            },
                            {
                                id: '3',
                                message: 'Oi, {previousValue}! Qual desses te agrada mais?',
                                trigger: 'cinema',
                            },
                            {
                                id: 'cinema',
                                options: [
                                    { value: 'Filme', label: 'Filme', trigger: '5' },
                                    { value: 'Anime', label: 'Anime', trigger: '5' },
                                    { value: 'Serie', label: 'Série', trigger: '5' }
                                ]
                            },
                            {
                                id: '5',
                                message: 'Hum, notei que você tem preferência por {previousValue}. Agora me informa a sua idade.',
                                trigger: 'idade'
                            },
                            {
                                id: 'idade',
                                user: true,
                                trigger: '7',
                                validator: (value) => {
                                    if (isNaN(value || id() === null)) {
                                        return "Somente número";
                                    } else if (value < 0) {
                                        return "Idade negativa? Fala sério cara. Hahaha"
                                    } else if (value > 120) {
                                        return `${value}? Meteu essa`;
                                    }
                                    return true;
                                }
                            },
                            {
                                id: '7',
                                message: "Ok... Vamos checar seu sumário",
                                trigger: 'review'
                            },
                            {
                                id: 'review',
                                component: <Review />,
                                asMessage: true,
                                delay: 2000,
                                trigger: 'end-message'
                            },
                            {
                                id: 'end-message',
                                message: 'Obrigado, volte sempre!!',
                                end: true
                            }
                        ]}
                        headerTitle="Bip Bop 👾"
                        placeholder="Digite sua mensagem"
                        speechSynthesis={{ enable: true, lang: 'en' }}
                        botAvatar="../src/img/agent.svg"
                        userAvatar="../src/img/user.svg"
                    />
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default Bot