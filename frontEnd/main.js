const stockForm       = document.getElementById('stock-form');
//const stockInputs     = stockForm.querySelectorAll('input[type="number"]');
const mesaInput       = document.getElementById('mesa');
const comensalesInput = document.getElementById('comensales');
const resetBtn        = document.getElementById('reset-comanda');
const ordenarBtns     = document.querySelectorAll('.ordenar-btn');
const listaPlatos     = document.getElementById('platos-seleccionados');
const spanMesa        = document.getElementById('comanda-mesa');
const spanComensales  = document.getElementById('comanda-comensales');

// Objeto para almacenar stock
let stock = {};

// Guardar stock desde el formulario
function guardarStockDesdeForm() {
  stockInputs.forEach(input => {
    stock[input.name] = parseInt(input.value, 10);
  });
  alert('Stock actualizado:\n' + JSON.stringify(stock));
}

// Al enviar stock-form
// stockForm.addEventListener('submit', e => {
//   e.preventDefault();
//   guardarStockDesdeForm();
// });

// Actualizar vista previa de mesa/comensales
function actualizarEncabezado(e) {
  spanMesa.textContent = e.target.value || '—';
  spanComensales.textContent = comensalesInput.value || '—';
}
// Limpiar toda la comanda
resetBtn.addEventListener('click', e => {
  e.preventDefault();
  mesaInput.value = '';
  comensalesInput.value = '';
  listaPlatos.innerHTML = '';
});

// Refrescar encabezado al cambiar inputs
mesaInput.addEventListener('input', (e)=>{
  spanMesa.textContent = e.target.value;

});
comensalesInput.addEventListener('input', actualizarEncabezado);

// Lógica al hacer click en “Ordenar”
ordenarBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Validaciones iniciales
    if (!mesaInput.value || !comensalesInput.value) {
      return alert('Por favor ingresa mesa y comensales antes de ordenar.');
    }

    // Datos del producto
    const key        = btn.closest('.producto').dataset.key;
    const nombre     = btn.closest('.producto').dataset.nombre;
    const disponibles= stock[key] || 0;
    const maxPlatos  = parseInt(comensalesInput.value, 10);
    const actuales   = listaPlatos.querySelectorAll('li').length;

    // Alertas y control de stock
    // if (disponibles <= 0) {
    //   return alert(`Lo siento, ${nombre} está agotado.`);
    // }
    // if (disponibles <= 3) {
    //   alert(`Atención: solo quedan ${disponibles} unidades de ${nombre}.`);
    // }
    // if (actuales >= maxPlatos) {
    //   return alert(`Ya agregaste ${actuales} platos (límite ${maxPlatos}).`);
    // }

    // Disminuir stock y actualizar campo
    // stock[key]--;
    // document.getElementById(`stock-${key}`).value = stock[key];

    // Crear entrada en la comanda
    const li = document.createElement('li');
    li.textContent = nombre;
    const del = document.createElement('button');
    del.textContent = '✕';
    del.className = 'eliminar';
    del.addEventListener('click', () => li.remove());
    li.appendChild(del);
    listaPlatos.appendChild(li);
  });
});



//Botones de platos y productos para cambiar vista de las platos a mostrar

const botones = document.querySelectorAll(".btnMenus");
const producto = document.querySelectorAll(".producto");

botones.forEach(btn =>{
    btn.addEventListener("click", () => {
        const filtro = btn.dataset.filtro;
        producto.forEach(prod =>{
            const cat = prod.dataset.categoria;
            if (filtro === "all" || cat === filtro){
                prod.style.display = "flex";
            } else{
                prod.style.display = "none";
            }
        });
    });
});

// body data 
//mesa
//comensal
//btnDisponibilidad


// Conectar FrontEnd con BackEnd

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const mesaBack = document.getElementById('mesa-comanda').value;
    const comensalesBack = document.getElementById('comanda-comensales').value;
    const listaPlatosBack = document.getElementById('mesa-list').value;

    const bodyData = {
        mesaBack,
        comensalesBack,
        listaPlatosBack,
    };

    console.log("Enviando:", bodyData);

    try {
        const res = await fetch('http://127.0.0.1:3000/api/comanda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });

        const result = await res.json();
        console.log("Respuesta del servidor:", result);
        alert('La comanda se registró con éxito.');
    } catch (error) {
        console.error("Error al registrar el estado:", error);
        alert('Error al registrar la comanda.');
    }
});