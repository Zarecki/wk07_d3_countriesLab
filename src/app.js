const Country = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const CountryView = require('./views/country_info_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const selectElement = document.querySelector('select#countries');

  const countriesDropdown = new SelectView(selectElement);
  countriesDropdown.bindEvents();


  const countryContainer = document.querySelector('div#country');

  const countryView = new CountryView(countryContainer);
  countryView.bindEvents();

  const countryModel = new Country();
  countryModel.getData();
  countryModel.bindEvents();
  countryModel.borderCountry();
});
