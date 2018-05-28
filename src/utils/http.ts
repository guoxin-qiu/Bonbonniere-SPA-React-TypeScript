import fetch from 'cross-fetch';

export function GET<T>(
  url: string,
  start: () => void | null,
  resolve: (data: T) => void,
  reject: () => void | null
) {
  if (start) {
    start();
  }
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.json() as Promise<T>;
    })
    .then(jsondata => resolve(jsondata))
    .catch(error => {
      if (reject) {
        reject();
      }
      console.log(error);
    });
}
