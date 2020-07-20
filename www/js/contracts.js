export default class ContractsHelper {

  contactFileds = ["displayName", "name", "phoneNumbers", "emails", "address"];
  options = { filter: "", multiple: true };

  container;

  constructor(container) {
    this.container = container;
  }

  createTable(contacts) {
    const table = document.createElement('table');
    const header = this.createHeader();
    table.appendChild(header);
    const rows = this.createRows(contacts);
    rows.forEach(row => {
      table.appendChild(row);
    });
    return table;
  }

  createHeader() {
    // row
    const row = document.createElement('tr');
    row.classList.add('row');
    row.classList.add('row-header');
    // name
    const colName = document.createElement('th');
    colName.innerText = '名稱';
    // number
    const colNumber = document.createElement('th');
    colNumber.innerText = '號碼';
    // action
    const colAction = document.createElement('th');
    colAction.innerText = '操作';
    // append
    row.appendChild(colName);
    row.appendChild(colNumber);
    row.appendChild(colAction);
    return row;
  }

  createRows(contacts) {
    return (contacts || []).map(contact => {
      // row
      const row = document.createElement('tr');
      row.classList.add('row-content');
      // name
      const colName = document.createElement('td');
      colName.classList.add('col-name');
      colName.innerText = contact.displayName || '未知';
      // number
      const colNumber = document.createElement('td');
      colNumber.classList.add('col-number');
      const num = contact.phoneNumbers && contact.phoneNumbers[0] && contact.phoneNumbers[0].value
        ? contact.phoneNumbers[0].value
        : '';
      colNumber.innerText = num;
      // action  
      const colAction = document.createElement('td');
      colAction.classList.add('col-action');
      if (num) {
        const link = document.createElement('a');
        link.setAttribute('href', `tel:${num}`);
        link.innerText = '撥號';
        colAction.appendChild(link);
      }
      // append
      row.appendChild(colName);
      row.appendChild(colNumber);
      row.appendChild(colAction);
      // map() return
      return row;
    });
  }

  onSuccess(contacts) {
    console.info('contacts = ', contacts);
    this.container.innerHTML = '';
    const table = this.createTable(contacts);
    this.container.appendChild(table);
  }

  onError(err) {
    alert('獲取聯絡人失敗');
  }

  getList() {
    const onSuccess = this.onSuccess.bind(this);
    const onError = this.onError.bind(this);
    navigator.contacts.find(this.contactFileds, onSuccess, onError, this.options);
  }

}
