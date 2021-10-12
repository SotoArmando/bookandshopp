import rapidapi from './env';

const Serverdomain = 'http://127.0.0.1:3000/';
// const Serverdomain = 'https://bookandshoprails.herokuapp.com/';

const Serverdomainurls = {
  'Return all items in db': `${Serverdomain}items`,
  'Return all users in db': `${Serverdomain}users`,
  'Return item picture using id': (id) => `${Serverdomain}res/${id}.png`,
  BookedItemsCrud: `${Serverdomain}bookeditems`,
  CartItemsCrud: `${Serverdomain}cartitems`,
  UsersCrud: `${Serverdomain}users`,
  items_crud: `${Serverdomain}items`,
  sessions_crud: `${Serverdomain}sessions`,
  authenticate: `${Serverdomain}authentication`,
  Appointments: `${Serverdomain}appointments`,
};

const dbkeys = {
  domain: Serverdomain,
  ...Serverdomainurls,
};

const Defaultstate = {
  user: {
    shopcart: [],
    bookcart: [],
    appointment: [],
  },
  session: {
    id: -1,
    user: '',
    nick: '',
    authorization: '',

  },
  appstate: {
    storeitems: [],
  },
};
function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

function fetcher(url, call, authorization) {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': rapidapi,
      'x-rapidapi-host': 'motorcycle-specs-database.p.rapidapi.com',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const d = {
    status: undefined,
    fetch: (u) => {
      fetch(u || url, options)
        .then((res) => res.json())
        .then(call,
          () => {
          });
    },
    fetchAll: () => {
      if (Array.isArray(url)) {
        url.forEach((u) => d.fetch(u));
      }
    },
    fetchandwaitAll: () => {
      if (Array.isArray(url)) {
        Promise.all(url.map((e) => fetch(e, options).then(() => {
        }))).then(call);
      }
    },
    fetchcrudOperation: (operation = 'GET', body, parameters = '') => {
      const fetchurl = url + parameters + ((operation === 'GET') ? `?${body}` : '');

      fetch(fetchurl, {
        ...options,
        headers: {
          Accept: 'application/json',
          Authorization: authorization,
        },
        method: operation,
        body: operation === 'GET' ? undefined : jsonToFormData(body),
      }).then((resp) => {
        d.status = resp.status;
        return resp;
      }).then((resp) => resp.json()).then(call);
    },
  };

  return d;
}

export { dbkeys, fetcher, Defaultstate };
