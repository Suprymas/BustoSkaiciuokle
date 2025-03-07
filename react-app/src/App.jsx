import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    return (
        <>
            <div className={"columnContainer"}>
                <div className={"input-container"}>
                    <label>Būsto kaina: </label>
                    <br/>
                    <input type="number" />
                    <br/>

                    <label>Paskolos laikotarpis (metai): </label>
                    <br/>
                    <input type="number" />
                    <br/>

                    <label>Palukanų norma (Euribor procentais): </label>
                    <br/>
                    <input type="number" />
                    <br/>

                </div>
                <div >
                    <label>Pradinis įnašas: </label>
                    <br/>
                    <input type="number" />
                    <br/>
                    <label>Palukanų norma (procentais): </label>
                    <br/>
                    <input type="number" />
                    <br/>
                    <label>Siekiami nuompinigiai: </label>
                    <br/>
                    <input type="number" />
                    <br/>
                </div>
            </div>
            <div className={"buttonContainer"}>
                <button className={"calcButton"}>Skaičiuoti</button>
            </div>
            <div className={"resultContainer"}>
                <label className={"resultText"}>Rezultatas: </label>
                <h1>69 eur</h1>
            </div>
        </>
    )
}

export default App
