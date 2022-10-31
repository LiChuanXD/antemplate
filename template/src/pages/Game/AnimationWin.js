import React, { useState, useEffect, useRef } from "react";
import game1 from "../../assets/images/animation/game1.png";
import game2 from "../../assets/images/animation/game2.png";
import game3 from "../../assets/images/animation/game3.png";
import game4 from "../../assets/images/animation/game4.png";
import game5 from "../../assets/images/animation/game5.png";
import game6 from "../../assets/images/animation/game6.png";

import button1 from "../../assets/images/animation/button1.png";
import button2 from "../../assets/images/animation/button2.png";
import button3 from "../../assets/images/animation/button3.png";
import button4 from "../../assets/images/animation/button4.png";
import button5 from "../../assets/images/animation/button5.png";
import button6 from "../../assets/images/animation/button6.png";

import five from "../../assets/images/animation/rm50.png";
import three from "../../assets/images/animation/rm300.png";
import eight from "../../assets/images/animation/rm800.png";

import "./index.css"

const GameStart = () => {
    const [counter, setCounter] = useState(0);
    const intervalRef = useRef(null);
    const [amt, setAmt] = useState(0);

    useEffect(() => {
        if (counter > 61) {
            stopCounter();
        }// eslint-disable-next-line
    }, [counter])
    useEffect(() => {
        if (counter > 61) {
            setAmt(50)
            // getVoucher();
        }
        // eslint-disable-next-line
    }, [counter])

    const startCounter = () => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 135);
    };
    const stopCounter = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    console.log("counter", counter)
    const showVoucher = () => {
        if (amt === 50) {
            return five;
        }
        else if (amt === 300) {
            return three;
        }
        else if (amt === 800) {
            return eight;
        }
        else if (!amt) {
            return console.log("no voucher");
        }
    }
    const calculateCounter = () => {
        if (counter >= 50) return game6
        else if (counter > 40) return game5
        else if (counter > 30) return game4
        else if (counter > 15) return game3
        else if (counter > 10) return game2
        else if (counter >= 0) return game1
    }
    const calculateButton = () => {
        if (counter >= 50) return button6
        else if (counter > 40) return button5
        else if (counter > 30 && counter <= 40) return button4
        else if (counter > 20) return button3
        else if (counter > 10) return button2
        else if (counter >= 0 && counter < 11) return button1
    }
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault()
    })

    return (
        <div >
            <div style={{ background: 'wheat' }}>
                {/* <div> */}
                <div style={{
                    padding: '125px 55px',
                    minHeight: '100vh'
                }}>
                    <center>
                        <img src={calculateCounter()} alt='' className="relative-img" />
                        {counter > 57 ? <div className="game-modal"><br />
                            <img className="prevent-select" src={showVoucher()} alt='' width='90%' height='80%' /></div> : null}

                        {counter < 58 ?
                            <div
                                className="prevent-select" style={{ background: 'none', border: 'none', position: 'relative' }}
                            >
                                <div
                                    onTouchStart={startCounter}
                                    onTouchEnd={stopCounter}
                                    className="prevent-select"
                                    style={{
                                        zIndex: '2',
                                        position: 'absolute',
                                        pointer: 'none', height: '65%', marginLeft: '33%', width: '35%',
                                        background: 'none', border: 'none',
                                    }}
                                ></div>
                                <img className="prevent-select" src={calculateButton()} alt=''
                                    style={{ zIndex: '1', width: '35%', pointer: 'none' }} />
                                <br />

                            </div>
                            : null}
                        {counter > 58 ?
                            <div style={{ background: 'white',marginTop:'50px' }} className="prevent-select">REGISTER / LOGIN</div> : null}


                    </center>
                </div>
            </div >
        </div >
    )
};

export default GameStart;
