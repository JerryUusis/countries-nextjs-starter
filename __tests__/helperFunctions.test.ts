import {
  formatCurrencies,
  formatLanguages,
  handleAlert,
} from "../src/utils/helperFunctions";
import { setAlert } from "../src/store/alertSlice";
import { AlertSeverity } from "../src/types/muiComponents";

describe("formatCurrencies & formatLanguages tests", () => {
  describe("formatCurrencies() tests", () => {
    const oneCurrencyObject = {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    };

    const twoCurrenciesObject = {
      GBP: {
        name: "Pound sterling",
        symbol: "£",
      },
      SHP: {
        name: "Saint Helena pound",
        symbol: "£",
      },
    };

    const threeCurrenciesObject = {
      DZD: {
        name: "Algerian dinar",
        symbol: "دج",
      },
      MAD: {
        name: "Moroccan dirham",
        symbol: "DH",
      },
      MRU: {
        name: "Mauritanian ouguiya",
        symbol: "UM",
      },
    };
    const fiveCurrenciesObject = {
      DZD: {
        name: "Algerian dinar",
        symbol: "دج",
      },
      MAD: {
        name: "Moroccan dirham",
        symbol: "DH",
      },
      MRU: {
        name: "Mauritanian ouguiya",
        symbol: "UM",
      },
      GBP: {
        name: "Pound sterling",
        symbol: "£",
      },
      SHP: {
        name: "Saint Helena pound",
        symbol: "£",
      },
    };
    test("Parameter has no value", () => {
      expect(formatCurrencies({})).toEqual([]);
    });
    test("Parameter has one currency", () => {
      const result = ["Euro"];
      expect(formatCurrencies(oneCurrencyObject)).toEqual(result);
      expect(formatCurrencies(oneCurrencyObject).length).toEqual(1);
    });
    test("Parameter has two currencies", () => {
      const result = ["Pound sterling & ", "Saint Helena pound"];
      expect(formatCurrencies(twoCurrenciesObject)).toEqual(result);
      expect(formatCurrencies(twoCurrenciesObject).length).toEqual(2);
    });
    test("Parameter has three currencies", () => {
      const result = [
        "Algerian dinar, ",
        "Moroccan dirham & ",
        "Mauritanian ouguiya",
      ];
      expect(formatCurrencies(threeCurrenciesObject)).toEqual(result);
      expect(formatCurrencies(threeCurrenciesObject).length).toEqual(3);
    });
    test("Parameter has five currencies", () => {
      const result = [
        "Algerian dinar, ",
        "Moroccan dirham, ",
        "Mauritanian ouguiya, ",
        "Pound sterling & ",
        "Saint Helena pound",
      ];
      expect(formatCurrencies(fiveCurrenciesObject)).toEqual(result);
      expect(formatCurrencies(fiveCurrenciesObject).length).toEqual(5);
    });
  });

  describe("formatLanguages() tests", () => {
    const oneLanguageObject = {
      fra: "French",
    };
    const twoLanguagesObject = {
      aze: "Azerbaijani",
      rus: "Russian",
    };
    const threeLanguagesObject = {
      aze: "Azerbaijani",
      rus: "Russian",
      fra: "French",
    };
    const fiveLanguagesObject = {
      aze: "Azerbaijani",
      rus: "Russian",
      fra: "French",
      nld: "Dutch",
      pap: "Papiamento",
    };
    test("Parameter has no value", () => {
      expect(formatLanguages({})).toEqual([]);
    });
    test("Parameter has one language", () => {
      const result = ["French"];
      expect(formatLanguages(oneLanguageObject)).toEqual(result);
      expect(formatLanguages(oneLanguageObject).length).toEqual(1);
    });
    test("Parameter has two languages", () => {
      const result = ["Azerbaijani & ", "Russian"];
      expect(formatLanguages(twoLanguagesObject)).toEqual(result);
      expect(formatLanguages(twoLanguagesObject).length).toEqual(2);
    });
    test("Parameter has three languages", () => {
      const result = ["Azerbaijani, ", "Russian & ", "French"];
      expect(formatLanguages(threeLanguagesObject)).toEqual(result);
      expect(formatLanguages(threeLanguagesObject).length).toEqual(3);
    });
    test("Parameter has five languages", () => {
      const result = [
        "Azerbaijani, ",
        "Russian, ",
        "French, ",
        "Dutch & ",
        "Papiamento",
      ];
      expect(formatLanguages(fiveLanguagesObject)).toEqual(result);
      expect(formatLanguages(fiveLanguagesObject).length).toEqual(5);
    });
  });
});

describe("handleAlert() tests", () => {
  // Create a mock action
  jest.mock("../src/store/alertSlice"),
    () => ({
      setAlert: jest.fn(),
    });

  let dispatch: jest.Mock;

  // Create a fresh mock dispatch function for each test
  beforeEach(() => {
    dispatch = jest.fn();
  });

  test("Should dispatch setAlert action with correct arguments", () => {
    // Create a mock dispatch function
    const message = "Test alert";
    const severity = "error";

    handleAlert(dispatch, message, severity);

    expect(dispatch).toHaveBeenCalledWith(
      setAlert({ isVisible: true, message, severity })
    );
    dispatch.mockClear()
  });

  test("should handle different severity levels", () => {
    const message = "Test Alert";

    const severities: AlertSeverity[] = ["info", "warning", "success"];
    severities.forEach((severity) => {
      handleAlert(dispatch, message, severity);
      expect(dispatch).toHaveBeenCalledWith(
        setAlert({
          isVisible: true,
          message,
          severity,
        })
      );
      dispatch.mockClear(); 
    });
  });
});
