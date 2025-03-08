import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [targetIncome, setTargetIncome] = useState();
    const [years, setYears] = useState();
    const [interestRate, setInterestRate] = useState();
    const [housePrice, setHousePrice] = useState();
    const [initialDeposit, setInitialDeposit] = useState();
    const [euribor, setEuribor] = useState();
    const [targetMoney, setTargetMoney] = useState();
    const [monthly, setMonthly] = useState();
    const [timeYears, setTimeYears] = useState();
    const [timeMonths, setTimeMonths] = useState();
    const inputHandler = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'targetIncome':
                setTargetIncome(value);
                break;
            case 'years':
                setYears(value);
                break;
            case 'interestRate':
                setInterestRate(value);
                break;
            case 'housePrice':
                setHousePrice(value);
                break;
            case 'euribor':
                setEuribor(value);
                break;
            case 'initialDeposit':
                setInitialDeposit(value);
                break;
            case 'targetMoney':
                setTargetMoney(value);
                break;
        }
    }

    const calcHandler = () => {
        const loanAmount = housePrice - initialDeposit;
        const interestRateNumber = parseFloat(interestRate) || 0;
        const euriborNumber = parseFloat(euribor) || 0;
        const interest = (interestRateNumber + euriborNumber) / 12;
        const months = years * 12;
        const monthlyPayment = loanAmount * (((interest/100)
                                        * Math.pow(1 + (interest/100), months))
                                        / (Math.pow(1 + (interest/100), months) - 1));
        const targetIncomeNumber = parseFloat(targetIncome) || 0;
        const targetMoneyNumber = parseFloat(targetMoney) || 0;
        console.log(targetIncomeNumber);
        const rentPrice = monthlyPayment + targetIncomeNumber;
        const totalMonths = targetMoney / targetIncome;
        const timeRequiredYears = totalMonths / 12;
        const timeRequiredMonths = totalMonths % 12;
        setMonthly(rentPrice.toFixed(2));
        setTimeYears(Math.trunc(timeRequiredYears));
        setTimeMonths(Math.trunc(timeRequiredMonths));

    }
    return (
        <>
            <div className={"columnContainer"}>
                <div className={"input-container"}>
                    <label>Būsto kaina: </label>
                    <br/>
                    <input type="number" value={housePrice}
                           onChange={inputHandler}
                           name={"housePrice"}/>
                    <br/>

                    <label>Paskolos laikotarpis (metai): </label>
                    <br/>
                    <input type="number" value={years}
                           onChange={inputHandler}
                           name={"years"}/>
                    <br/>

                    <label>Palukanų norma (Euribor procentais): </label>
                    <br/>
                    <input type="number" value={euribor}
                           onChange={inputHandler}
                           name={"euribor"} />
                    <br/>
                    <label>Norima sukaupta pinigų suma: </label>
                    <br/>
                    <input type="number" value={targetMoney}
                           onChange={inputHandler}
                           name={"targetMoney"} />
                    <br/>

                </div>
                <div >
                    <label>Pradinis įnašas: </label>
                    <br/>
                    <input type="number" value={initialDeposit}
                           onChange={inputHandler}
                           name={"initialDeposit"}/>
                    <br/>
                    <label>Palukanų norma (procentais): </label>
                    <br/>
                    <input type="number" value={interestRate}
                           onChange={inputHandler}
                           name={"interestRate"}/>
                    <br/>
                    <label>Siekiami nuompinigiai: </label>
                    <br/>
                    <input type="number" value={targetIncome}
                           onChange={inputHandler}
                           name={"targetIncome"}/>
                    <br/>
                </div>
            </div>
            <div className={"buttonContainer"}>
                <button className={"calcButton"}
                        disabled={!targetIncome
                            && !years
                            && !interestRate
                            && !housePrice
                            && !initialDeposit
                            && !targetMoney
                            && !euribor}
                        onClick={calcHandler}>
                    Skaičiuoti
                </button>
            </div>
            {timeYears &&
                <div className={"resultContainer"}>
                    <div className={"resultContainerMoney"}>
                        <label className={"resultText"}>Nuomos kaina: </label>
                        {monthly && (<h2>{monthly} eur</h2>)}
                    </div>
                    <div className={"resultContainerMoney"}>
                        <label className={"resultText"}>Kiek laiko taupyti: </label>
                        {timeYears !== 0 && timeMonths !== 0 &&
                            <h2>{timeYears} m. ir {timeMonths} mėn.</h2>}
                        {timeYears !== 0 && timeMonths === 0 &&
                            <h2>{timeYears} m.</h2>}
                        {timeYears === 0 && timeMonths !== 0 &&
                            <h2>{timeMonths} mėn.</h2>}
                    </div>
                </div>
            }
        </>
    )
}

export default App
