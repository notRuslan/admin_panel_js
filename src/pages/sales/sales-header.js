const header = [
  {
    id: 'id',
    title: 'ID',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'user',
    title: 'Customer',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'totalCost',
    title: 'Coasts',
    sortable: true,
    sortType: 'number',
    template: data => '$' + data
  },
  {
    id: 'delivery',
    title: 'Status',
    sortable: true,
    sortType: 'number',
    /*template: data => {
      return `<div class="sortable-table__cell">
          ${data > 0 ? 'Active' : 'Inactive'}
        </div>`;
    }*/
  },
];

export default header;
