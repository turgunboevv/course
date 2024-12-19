import SelectBox from "./SelectBox";
import { useState, useEffect } from "react";
import axios from "axios";


const CurrensyConverter = () => {

    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("")
    const [toCurrency, setToCurrency] = useState("")
    const [ammount, setAmmount] = useState(1)
    const [converterAmmount, setConverterAmmount] = useState(false)
    const [error, setError] = useState("")

    console.log(converterAmmount);


    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/USD`
                )
                setCurrencies(Object.keys(response.data.rates))
                setError("")

            } catch (error) {
                setError("Failed to fetch currencies. Please try again");
            }
        }

        fetchCurrencies()
    }, [])




    const handleConversion = async () => {
        if (fromCurrency && toCurrency) {
            try {
                const response = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
                )
                const rate = response.data.rates[toCurrency]
                setConverterAmmount((ammount * rate).toFixed(2))

            } catch (error) {
                setError("Muammo yuzaga keldi. Iltimos, qayta urinib ko'ring")
            }
        } else {
            setError("Iltimos, ikkala valyutani ham tanlang")
        }
    }


    return (
        <>
            <body className="bg-red-700 rounded-xl text-black max-w-full min-h-80 flex items-center justify-center">
                <div className="app-container text-red-800">
                    <h1 className="text-4xl font-bold text-white pb-5">Valyuta konvertori ilovasi</h1>

                    <div className="converter text-center">
                        <div className="input-group">
                            <label className="text-white">Dan : </label>
                            <div className="mb-4">
                            <SelectBox
                                options={currencies}
                                selectedValues={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="text-white">Ga : </label>

                            <div className="mb-4">
                            <SelectBox
                                options={currencies}
                                selectedValues={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            />
                            </div>
                        </div>
                        <div className="input-group w-20 flex flex-wrap text-center justify-center mx-auto">
                            <label className="text-white">Miqdori : </label>
                            <input className="rounded-lg pl-1 mt-2 mb-2" type="number"
                                value={ammount}
                                onChange={(e) => setAmmount(e.target.value)}
                            />
                        </div>
                        <button onClick={handleConversion} className="text-white bg-black rounded-sm pt-1 pb-1 px-2 mt-2">
                        Konvertatsiya qilish</button>
                    </div>

                    {
                        converterAmmount && (
                            <p className="text-black">
                                {ammount} {fromCurrency} = {converterAmmount} {toCurrency}
                            </p>
                        )
                    }
                    {error && <p className="error text-black">{error}</p>}
                </div>
            </body>
        </>
    )
}

export default CurrensyConverter