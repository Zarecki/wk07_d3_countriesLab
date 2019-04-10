const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Country = function () {
  this.data = null;
}

Country.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all');
  requestHelper.get((countryData) => {
    this.data = countryData;
    PubSub.publish('Country:country_loaded', this.data);
  });
};

Country.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (event) => {
    const selectedIndex = event.detail;
    this.publishCountryDetails(selectedIndex);
  });
};

Country.prototype.publishCountryDetails = function (countryIndex) {
  const selectedCountry = this.data[countryIndex];
  PubSub.publish('Country:selected-country-ready', selectedCountry);
};


Country.prototype.borderCountry = function () {
  PubSub.subscribe('CountryView:selected-border', (event) => {
    const selectedBorder = event.detail;
    const selectedBorderObject = this.findByAlpha(selectedBorder);
    PubSub.publish('Country:selected-country-ready', selectedBorderObject);
  });
};

Country.prototype.findByAlpha = function (selectedBorder) {
  // for (const country of this.data) {
  //   if (country.alpha3Code === selectedBorder) {
  //     return country;
  //   };
  // };

  return this.data.find(country => country.alpha3Code === selectedBorder);
}

module.exports = Country;
