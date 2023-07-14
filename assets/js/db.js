export function obtenerDatos() {
    return fetch('db.json')
      .then(response => response.json());
  }