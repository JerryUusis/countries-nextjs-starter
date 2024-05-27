const { formatCurrencies } = require("../src/utils/helperFunctions")

describe("formatCurrencies() tests", () => {
    const oneCurrencyObject = {
        EUR: {
            name: "Euro",
            symbol: "€"
        }
    }

    const twoCurrenciesObject = {
        GBP: {
            name: "Pound sterling",
            symbol: "£"
        },
        SHP: {
            name: "Saint Helena pound",
            symbol: "£"
        }
    }

    const threeCurrenciesObject = {
        DZD: {
            name: "Algerian dinar",
            symbol: "دج"
        },
        MAD: {
            name: "Moroccan dirham",
            symbol: "DH"
        },
        MRU: {
            name: "Mauritanian ouguiya",
            symbol: "UM"
        }
    }
    const fiveCurrenciesObject = {
        DZD: {
            name: "Algerian dinar",
            symbol: "دج"
        },
        MAD: {
            name: "Moroccan dirham",
            symbol: "DH"
        },
        MRU: {
            name: "Mauritanian ouguiya",
            symbol: "UM"
        },
        GBP: {
            name: "Pound sterling",
            symbol: "£"
        },
        SHP: {
            name: "Saint Helena pound",
            symbol: "£"
        }
    }


    test("Is missing parameter", () => {
        expect(formatCurrencies()).toEqual([])
    })
    test("Parameter has no value", () => {
        expect(formatCurrencies({})).toEqual([])
    })
    test("Parameter is undefined", () => {
        expect(formatCurrencies(undefined)).toEqual([])
    })
    test("Parameter is null", () => {
        expect(formatCurrencies(null)).toEqual([])
    })
    test("Parameter is not an object", () => {
        expect(formatCurrencies("test")).toEqual([])
    })
    test("Parameter has one currency", () => {
        const result = "Euro";
        expect(formatCurrencies(oneCurrencyObject)).toEqual(result)
    })
    test("Parameter has two currencies", () => {
        const result = ["Pound sterling & ", "Saint Helena pound"]
        expect(formatCurrencies(twoCurrenciesObject)).toEqual(result)
        expect(result.length).toEqual(2)
    })
    test("Parameter has three currencies", () => {
        const result = ["Algerian dinar, ", "Moroccan dirham & ", "Mauritanian ouguiya"]
        expect(formatCurrencies(threeCurrenciesObject)).toEqual(result)
        expect(result.length).toEqual(3)
    })
    test("Parameter has five currencies", () => {
        const result = ["Algerian dinar, ", "Moroccan dirham, ", "Mauritanian ouguiya, ", "Pound sterling & ", "Saint Helena pound"]
        expect(formatCurrencies(fiveCurrenciesObject)).toEqual(result)
        expect(result.length).toEqual(5)
    })
})