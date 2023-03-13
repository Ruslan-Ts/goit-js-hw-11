const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios';

// const KEY = '34365353-78897900aa8d53aff07d0a12e';
const KEY = '31000801-179358ed9db1a9fc0904af43d';

export class ApiPixabay {
  constructor() {
    // this.instancePixabay = axios.create(BASE_URL);
    this.query = '';
    this.page = 1;
    this.per_page = 40;
  }
  async getImages() {
    return axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page,
      },
    });
  }
  get queryForSearch() {
    return this.query;
  }
  set queryForSearch(newQuery) {
    this.query = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
