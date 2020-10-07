import SortableTable from '../../components/sortable-table/index.js';

import header from './sales-header.js';
import fetchJson from '../../utils/fetch-json.js';
import RangePicker from "../../components/range-picker";

export default class Page {
  element;
  subElements = {};
  components = {};

  async updateTableComponent (from, to) {
    const data = await fetchJson(`${process.env.BACKEND_URL}api/rest/orders?_start=1&_end=20&_order=desc&createdAt_gte=${from.toISOString()}&createdAt_lte=${to.toISOString()}`);
    this.components.sortableTable.addRows(data);
    console.log('updateTableComponent');
  }

  async initComponents () {
    const to = new Date();
    const from = new Date(to.getTime() - (30 * 24 * 60 * 60 * 1000));

    const rangePicker = new RangePicker({
      from,
      to
    });

    const sortableTable = new SortableTable(header, {
      url: `api/rest/orders?_start=0&_end=30&_order=desc&createdAt_gte=${from.toISOString()}&createdAt_lte=${to.toISOString()}`,
      isSortLocally: false,
      // step: 20,
      // start: 1,
      // end: 21
    });


    this.components.sortableTable = sortableTable;
    this.components.rangePicker = rangePicker;
  }

  get template(){
    console.log('SSSSSSSSSSSSSS');
    return `
      <div class="sales">
      <div class="content__top-panel">
        <h2 class="page-title">Sales</h2>
        <!-- RangePicker component -->
        <div data-element="rangePicker"></div>
      </div>


<!--      <h3 class="block-title">Best sellers1</h3>-->

      <div data-element="sortableTable">
        <!-- sortable-table component -->
      </div>
    </div>\`

    `;
  }

  async render () {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    await this.initComponents();

    this.renderComponents();
    this.initEventListeners();

    return this.element;
  }

  renderComponents () {
    Object.keys(this.components).forEach(component => {
      const root = this.subElements[component];
      const { element } = this.components[component];

      root.append(element);
    });
  }

  getSubElements ($element) {
    const elements = $element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }


  initEventListeners () {
    this.components.rangePicker.element.addEventListener('date-select', event => {
      const { from, to } = event.detail;
      this.updateTableComponent(from, to);
    });
  }

}
