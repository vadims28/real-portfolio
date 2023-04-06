class View
{
  // constructor(all_entries, list_card_selector, form_selector, template_selector, callbacks) {
  constructor(selectors, callbacks) {
    this.selected_entry_ids = [];
    this.form = document.querySelector(selectors.form);

    this.note = this.form.querySelector('.note');

    this.callbacks = callbacks;

    const obj = this;

    if (
      selectors.hasOwnProperty('list_card') &&
      selectors.hasOwnProperty('template')
    ) {
      this.list_card = document.querySelector(selectors.list_card);
      this.list_table = this.list_card.querySelector('.list_table');
      this.remove_btn = this.list_card.querySelector('.remove_btn');
      this.table_heading = this.list_table.querySelector('.table_heading');
      this.template = document.querySelector(selectors.template);
  
      this.remove_btn.addEventListener('click', function () {
        obj.handleRemove();
      });
    }

    if (this.form != null) {
      this.form.addEventListener('submit', function (event) {
        event.preventDefault();
        obj.handleSubmit();
      });
    }
  }

  displayAllEntries(all_entries) {
    for (let id in all_entries) displayEntry: {
      this.addEntry(id, all_entries[id]);
    }
  }

  addEntry(id, entry) {
    if (!this.hasOwnProperty('template')) {
      return;
    }
    const obj = this;
    const new_row = this.template.content.cloneNode(true);

    if (this.callbacks.hasOwnProperty('add')) {
      this.callbacks.add(new_row, entry);
    }

    obj.table_heading.after(new_row);
    const new_row_element = obj.table_heading.nextSibling.nextSibling;
  
    new_row_element.dataset.id = id;
    new_row_element.querySelector('[type=checkbox]').addEventListener('change', function () {
      obj.handleCheckboxChange(new_row_element, this);
    });
  }

  handleCheckboxChange (row, checkbox) {
    if (checkbox.checked) add_to_list: {
      this.selected_entry_ids.push(row.dataset.id);
    }
    else remove_from_list: {
      const index = this.selected_entry_ids.indexOf(row.dataset.id);
      if (index != -1) {
        this.selected_entry_ids.splice(index, 1);
      }
    }
  }

  handleRemove() {
    for (let index = 0; index < this.selected_entry_ids.length; index++) {
      const user_id = this.selected_entry_ids[index];
      this.list_table.querySelector('[data-id="' + user_id + '"]').remove();
    }

    if (this.callbacks.hasOwnProperty('delete')) {
      this.callbacks.delete(this.selected_entry_ids);
    }

    this.selected_entry_ids = [];
  }

  handleSubmit() {
    const data = new FormData(this.form);

    const new_entry = {};
  
    for (let key of data.keys()) {
      new_entry[key] = data.get(key);
    }

    if (this.callbacks.hasOwnProperty('store_new')) {
      const obj = this;
      this.callbacks.store_new(this.form.action, data, function (id, entry) {
        obj.addEntry(id, entry);
        obj.note.textContent = "This account was created on " + entry.created_at;
      });
      
    }
    this.form.reset();
  }
}


