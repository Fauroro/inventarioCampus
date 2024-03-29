const URL_API = "http://localhost:3500";
// const URL_API = "http://154.38.171.54";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getTask = async (endpoint) => {
    try {
        const respuesta = await fetch(`${URL_API}/${endpoint}`);
        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            return (datos);
        } else if (respuesta.status === 401) {
            console.log('La url no es correcta');
        } else if (respuesta.status === 404) {
            console.log('no existe la tarea');
        } else {
            console.log('Se presento un error en la peticion consulte al Administrador');
        }
    } catch (error) {
        console.log(error);
    }

}
const postTask = (datos, endpoint) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL_API}/${endpoint}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(datos),      
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res.id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const putTask = (datos, endpoint) => {
    fetch(`${URL_API}/${endpoint}`,
        {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(datos)
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        //idUser=res.id;
    }).catch(err => {
        console.log(err);
    })

}
const delTask = (endpoint) => {
    fetch(`${URL_API}/${endpoint}`,
        {
            method: "DELETE",
            headers: myHeaders,
            // body:JSON.stringify(datos)
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        //idUser=res.id;
    }).catch(err => {
        console.log(err);
    })

}
export {
    getTask as getTasks,
    postTask as postTasks,
    putTask as putTasks,
    delTask as delTasks
};