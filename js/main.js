window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Alacena',
            description: 'BLANCA FRENTE CHOCOLATE MELAMINA',
            medidas: '1.20 x 60 cm',
            precio: 11000,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWpHfMpvI3iPjEL4SBb8EejqFhqP-okvQPeA&usqp=CAU'
        },
        {
            id: 2,
            nombre: 'Placard Ropero',
            description:'Wengue - Blanco - Tabaco - Venezia',
            medidas: ' 115x47x182 cm',
            precio: 15000,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPC0hNKqX5aB511i1YfrqpSQ6z_dL8ph3pNA&usqp=CAU'
        },
        {
            id: 3,
            nombre: 'Bajo-Mesada',
            description:'Melamina Blanca',
            medidas:'1.20 x 80 cm',
            precio: 12500,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_WZqLvKj556nIhsXlFUPbYJpqvN0aZTd_w&usqp=CAU'
        },
        {
            id: 4,
            nombre: 'Vajillero Aparador',
            description:'Negro con frente Blanco',
            medidas:'37 cm x 180 cm x 37 cm',
            precio: 22500,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_825686-MLA41248074155_032020-F.webp'
        },
        {
            id: 5,
            nombre: 'Escritorio Gamer',
            description:'Wengue - Blanco - Tabaco - Venezia',
            medidas: ' 78 cm x 174 cm x 50 cm',
            precio: 15000,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_667266-MLA41416255589_042020-F.webp'
        },
        {
            id: 6,
            nombre: 'Mesa De Luz Modernas',
            description: 'BLANCA FRENTE CHOCOLATE MELAMINA',
            medidas: '45 X 60 cm',
            precio: 6000,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_863060-MLA45106837835_032021-F.webp'
        },
        {
            id: 7,
            nombre: 'Modular Esquinero',
            description: 'BLANCA FRENTE CHOCOLATE MELAMINA',
            medidas: '56.5 cm x 183 cm',
            precio: 37340,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_646256-MLA26555539093_122017-O.webp'
        },
        {
            id: 8,
            nombre: 'Modular Aparador Vajillero',
            description: 'Negro MELAMINA',
            medidas: '37 cm x 140 cm',
            precio: 28290,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_751908-MLA44239200443_122020-O.webp'
        },
        {
            id: 9,
            nombre: 'Alacena',
            description: 'BLANCA FRENTE CHOCOLATE MELAMINA',
            medidas: '25 cm x 26 cm x 150 cm',
            precio: 13340,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_672689-MLA41988903395_052020-O.webp'
        },
    ];
    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            const card = document.createElement('div');
            card.classList.add('card', 'col-sm-4');

            const CardBody = document.createElement('div');
            CardBody.classList.add('card-body');

            const Title = document.createElement('h5');
            Title.classList.add('card-title');
            Title.textContent = info.nombre;

            const descripcion = document.createElement('p');
            descripcion.classList.add('card-text');
            descripcion.textContent = info.description;

            const medidas = document.createElement('p');
            medidas.classList.add('card-text');
            medidas.textContent = info.medidas;

            const imagen = document.createElement('img');
            imagen.classList.add('img-fluid');
            imagen.setAttribute('src', info.imagen);

            const precio = document.createElement('p');
            precio.classList.add('card-text');
            precio.textContent = info.precio + '$';

            const Boton = document.createElement('button');
            Boton.classList.add('btn', 'btn-dark');
            Boton.textContent = 'agregar';
            Boton.setAttribute('marcador', info.id);
            Boton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            CardBody.appendChild(imagen);

            CardBody.appendChild(Title);
            CardBody.appendChild(descripcion);
            CardBody.appendChild(medidas);
            CardBody.appendChild(precio);
            CardBody.appendChild(Boton);
            card.appendChild(CardBody);
            DOMitems.appendChild(card);
        });
    }

    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        calcularTotal();
        renderizarCarrito();

    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const card = document.createElement('li');
            card.classList.add('list-group-item', 'text-right', 'mx-2');
            card.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-dark', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '2rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            card.appendChild(miBoton);
            DOMcarrito.appendChild(card);
        });
    }

    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        calcularTotal();
    }

    function calcularTotal() {
        total = 0;
        carrito.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        DOMtotal.textContent = total.toFixed(2);
    }

    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        calcularTotal();
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    renderizarProductos();
}
const datosDePagos = {
    "items": [
        {
            "title": "Muebles Ropero",
            "description": "",
            "picture_url": "",
            "category_id": "",
            "quantity": 1,
            "currency_id": "ARS",
            "unit_price": 15000
        }]
}



const URLAPI = 'https://api.mercadopago.com/checkout/preferences'

const pagar = (opcion) => {


    let datosDePago = opcion

    $.ajaxSetup({
        headers: {
            'Authorization': 'Bearer TEST-2587747502582996-092320-7e4ee1510b46994b52bc303e145c4dfd-154161277',
            'Content-Type': 'application/json'
        }
    })

    $.post(URLAPI, JSON.stringify(datosDePago), (respuesta, status) => {
        console.log(respuesta);
        urlPago = respuesta.init_point
        console.log(urlPago);
        window.open(`${urlPago}`);
    })

}




$("body").prepend('<h3 class="text-center">Los sauces</h3>');
$("body").prepend('<h3 class="text-center">¡Muebleria!</h3>');
$("h3").fadeOut("slow", function () {
    $("h3").fadeIn(1000);
});
