const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (container) {
  this.container = container;
};

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Country:selected-country-ready', (event) => {
    const countryDetails = event.detail;
    this.render(countryDetails);
  });

  PubSub.subscribe('Country:new-border-country', (event) => {
    const newCountryDetails = event.detail;
    this.createBorderList(newCountryDetails);
  });

};

CountryView.prototype.render = function (country) {
  this.container.innerHTML = '';

  const countryName = this.createElement('h2', country.name);
  this.container.appendChild(countryName);

  const countryFlag = this.createElement('img', country.flag);
  countryFlag.src = country.flag;
  this.container.appendChild(countryFlag);

  const regionTitle = this.createElement('h3', 'Region: ');
  this.container.appendChild(regionTitle);

  const countryRegion = this.createElement('p', country.region);
  this.container.appendChild(countryRegion);

  const languageTitle = this.createElement('h3', 'Languages spoken: ');
  this.container.appendChild(languageTitle);

  const countryLanguages = this.createLanguageList(country.languages);
  this.container.appendChild(countryLanguages);

  const borderTitle = this.createElement('h3', 'Bordering countries: ');
  this.container.appendChild(borderTitle);

  const countryBorders = this.createBorderList(country.borders);
  this.container.appendChild(countryBorders);
};


CountryView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

CountryView.prototype.createLanguageList = function (languages) {
  const list = document.createElement('ul');

  languages.forEach( (language) => {
    const listItem = document.createElement('li');
    listItem.textContent = language.name;
    list.appendChild(listItem);
  });
  return list;
};


CountryView.prototype.createBorderList = function (borders) {
  const list = document.createElement('ul');
  list.classList.add('border');
  
  borders.forEach( (border) => {
    const listItem = document.createElement('li');
    listItem.textContent = border;
    list.appendChild(listItem);
  });

  list.addEventListener('click', (event) => {
    const selectedBorder = event.target.textContent;
    PubSub.publish('CountryView:selected-border', selectedBorder);
  });

  return list;
};


// CountryView.prototype.borderClick = function () {
//   this.border.addEventListener('click', (event) => {
//     const selectedBorder = event.target.value
//   });
// };

module.exports = CountryView;
