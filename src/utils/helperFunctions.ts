import { Currency, Currencies } from "../types/country";

// Return output separates items with comma
const formatCurrencies = (currencyObject: Currencies) => {
  if (!currencyObject) {
    return [];
  }

  const currencies = Object.values(currencyObject);
  if (currencies.length === 0) {
    return [];
  }

  if (currencies.length === 1) {
    return currencies[0].name;
  } else {
    const formattedCurrencies = [];
    for (let i = 0; i < currencies.length; i++) {
      if (i === currencies.length - 1) {
        formattedCurrencies.push(currencies[i].name);
      } else if (i === currencies.length - 2) {
        formattedCurrencies.push(currencies[i].name + " & ");
      } else {
        formattedCurrencies.push(currencies[i].name + ", ");
      }
    }
    return formattedCurrencies;
  }
};

// Return output separates items with comma
const formatLanguages = (languagesObject: { [key: string]: string }) => {
  if (!languagesObject) {
    return [];
  }

  const languages = Object.values(languagesObject);
  if (languages.length === 0) {
    return [];
  }

  const formattedLanguages = [];
  if (languages.length === 1) {
    return languages;
  }
  for (let i = 0; i < languages.length; i++) {
    if (languages.length - 1 === i) {
      formattedLanguages.push(languages[i]);
    } else if (languages.length - 2 === i) {
      formattedLanguages.push(languages[i] + " & ");
    } else {
      formattedLanguages.push(languages[i] + ", ");
    }
  }
  return formattedLanguages;
};

export { formatCurrencies, formatLanguages };
