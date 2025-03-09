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
    const [time, setTime] = useState();
    const [payBank, setPayBank] = useState();

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
        let monthlyPayment = 0;
        if (interest !== 0){
            monthlyPayment = loanAmount * (((interest/100)
                                            * Math.pow(1 + (interest/100), months))
                                            / (Math.pow(1 + (interest/100), months) - 1));
        } else {
            monthlyPayment = loanAmount / months;
        }
        const targetIncomeNumber = parseFloat(targetIncome) || 0;
        const rentPrice = monthlyPayment + targetIncomeNumber;
        const totalMonths = Math.ceil(targetMoney / targetIncome);
        const timeRequiredYears = totalMonths / 12;
        const timeRequiredMonths = totalMonths % 12;
        setMonthly(rentPrice.toFixed(2));
        setPayBank(monthlyPayment.toFixed(2));
        console.log(timeRequiredYears);
        if (Math.trunc(timeRequiredYears) > 0 && timeRequiredMonths > 0){
            setTime(`${Math.trunc(timeRequiredYears)} m. ir ${Math.trunc(timeRequiredMonths)} mėn.`);
            return;
        }
        if (Math.trunc(timeRequiredYears) > 0 && timeRequiredMonths === 0){
            setTime(`${Math.trunc(timeRequiredYears)} m.`);
            return;
        }
        if (Math.trunc(timeRequiredYears) === 0 && timeRequiredMonths > 0){
            setTime(`${Math.trunc(timeRequiredMonths)} mėn.`);
        }
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
                    <label>Siekiamas pelnas kas mėnesį: </label>
                    <br/>
                    <input type="number" value={targetIncome}
                           onChange={inputHandler}
                           name={"targetIncome"}/>
                    <br/>
                </div>
            </div>
            <div className={"buttonContainer"}>
                <button className={"calcButton"}
                        disabled={targetIncome < 1
                            || years < 1
                            || interestRate < 1
                            || housePrice < 1
                            || initialDeposit < 1
                            || targetMoney < 1
                            || euribor < 1}
                        onClick={calcHandler}>
                    Skaičiuoti
                </button>
            </div>
                <div className={"resultContainer"}>
                    <div className={"resultContainerMoney"}>
                        <label className={"resultText"}>Nuomos kaina: </label>
                        {monthly && (<h2>{monthly} eur</h2>)}
                    </div>
                    <div className={"resultContainerMoney"}>
                        <label className={"resultText"}>Bankui sumokėti kas mėn.: </label>
                        {monthly && (<h2>{payBank} eur</h2>)}
                    </div>
                    <div className={"resultContainerMoney"}>
                        <label className={"resultText"}>Kiek laiko taupyti: </label>
                            <h2>{time}</h2>
                    </div>
                </div>
        </>
    )
}

export default App
