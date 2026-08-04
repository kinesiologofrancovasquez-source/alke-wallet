// =========================================================
// ALKE WALLET
// JAVASCRIPT PRINCIPAL
// =========================================================


// =========================================================
// CONFIGURACIÓN
// =========================================================

const STORAGE_SALDO =
    "alkeWalletSaldo";

const STORAGE_TRANSACCIONES =
    "alkeWalletTransacciones";

const STORAGE_CONTACTOS =
    "alkeWalletContactos";

const STORAGE_SESION =
    "alkeWalletSesion";


const SALDO_INICIAL =
    100000;


// =========================================================
// CONTACTOS INICIALES
// =========================================================

const contactosIniciales = [

    {
        nombre: "Juan Pérez",
        cuenta: "juan.perez"
    },

    {
        nombre: "María González",
        cuenta: "maria.gonzalez"
    },

    {
        nombre: "Pedro Soto",
        cuenta: "pedro.soto"
    }

];


// =========================================================
// SALDO
// =========================================================

function obtenerSaldo() {

    const saldoGuardado =
        localStorage.getItem(
            STORAGE_SALDO
        );


    if (saldoGuardado === null) {

        localStorage.setItem(
            STORAGE_SALDO,
            SALDO_INICIAL
        );

        return SALDO_INICIAL;

    }


    return Number(
        saldoGuardado
    );

}


function guardarSaldo(
    saldo
) {

    localStorage.setItem(
        STORAGE_SALDO,
        saldo
    );

}


// =========================================================
// TRANSACCIONES
// =========================================================

function obtenerTransacciones() {

    const datos =
        localStorage.getItem(
            STORAGE_TRANSACCIONES
        );


    if (datos === null) {

        const inicial = [

            {
                tipo: "Depósito",

                descripcion:
                    "Saldo inicial",

                monto:
                    SALDO_INICIAL,

                fecha:
                    obtenerFecha()

            }

        ];


        localStorage.setItem(

            STORAGE_TRANSACCIONES,

            JSON.stringify(
                inicial
            )

        );


        return inicial;

    }


    return JSON.parse(
        datos
    );

}


function guardarTransacciones(
    transacciones
) {

    localStorage.setItem(

        STORAGE_TRANSACCIONES,

        JSON.stringify(
            transacciones
        )

    );

}


// =========================================================
// CONTACTOS
// =========================================================

function obtenerContactos() {

    const datos =
        localStorage.getItem(
            STORAGE_CONTACTOS
        );


    if (datos === null) {

        localStorage.setItem(

            STORAGE_CONTACTOS,

            JSON.stringify(
                contactosIniciales
            )

        );


        return [
            ...contactosIniciales
        ];

    }


    return JSON.parse(
        datos
    );

}


function guardarContactos(
    contactos
) {

    localStorage.setItem(

        STORAGE_CONTACTOS,

        JSON.stringify(
            contactos
        )

    );

}


// =========================================================
// SESIÓN
// =========================================================

function iniciarSesion() {

    localStorage.setItem(
        STORAGE_SESION,
        "true"
    );

}


function cerrarSesion() {

    localStorage.removeItem(
        STORAGE_SESION
    );

    window.location.href =
        "login.html";

}


function sesionActiva() {

    return (
        localStorage.getItem(
            STORAGE_SESION
        ) === "true"
    );

}


// =========================================================
// PROTEGER PÁGINAS
// =========================================================

function protegerPagina() {

    const pagina =
        window.location.pathname
            .split("/")
            .pop();


    const paginasProtegidas = [

        "menu.html",

        "deposit.html",

        "withdraw.html",

        "sendmoney.html",

        "transactions.html"

    ];


    if (

        paginasProtegidas.includes(
            pagina
        )

        &&

        !sesionActiva()

    ) {

        window.location.href =
            "login.html";

    }

}


// =========================================================
// FECHA
// =========================================================

function obtenerFecha() {

    return new Date()
        .toLocaleDateString(
            "es-CL"
        );

}


// =========================================================
// MONEDA
// =========================================================

function formatearMoneda(
    valor
) {

    return valor.toLocaleString(

        "es-CL",

        {

            style:
                "currency",

            currency:
                "CLP",

            maximumFractionDigits:
                0

        }

    );

}


// =========================================================
// ACTUALIZAR SALDO
// =========================================================

function actualizarSaldoElemento(
    id,
    saldo
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            formatearMoneda(
                saldo
            );

    }

}


// =========================================================
// MOSTRAR MENSAJE
// =========================================================

function mostrarMensaje(
    elemento,
    tipo,
    mensaje
) {

    if (!elemento) {

        return;

    }


    elemento.innerHTML = `

        <div class="alert alert-${tipo}">

            ${mensaje}

        </div>

    `;

}


// =========================================================
// LOGIN
// =========================================================

function configurarLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "username"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "password"
                    )
                    .value
                    .trim();


            const message =
                document.getElementById(
                    "loginMessage"
                );


            if (
                username === "" ||
                password === ""
            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Debes completar todos los campos."

                );

                return;

            }


            if (

                username === "admin"

                &&

                password === "1234"

            ) {


                iniciarSesion();


                mostrarMensaje(

                    message,

                    "success",

                    "Inicio de sesión exitoso."

                );


                setTimeout(
                    () => {

                        window.location.href =
                            "menu.html";

                    },
                    700
                );


            } else {


                mostrarMensaje(

                    message,

                    "danger",

                    "Usuario o contraseña incorrectos."

                );

            }

        }
    );

}


// =========================================================
// CERRAR SESIÓN
// =========================================================

function configurarLogout() {

    const buttons =
        document.querySelectorAll(
            "#logoutButton"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                cerrarSesion
            );

        }
    );

}


// =========================================================
// DEPÓSITO
// =========================================================

function configurarDeposito() {

    const form =
        document.getElementById(
            "depositForm"
        );


    if (!form) {

        return;

    }


    let saldo =
        obtenerSaldo();


    actualizarSaldoElemento(

        "depositBalance",

        saldo

    );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "depositAmount"
                );


            const message =
                document.getElementById(
                    "depositMessage"
                );


            const monto =
                Number(
                    input.value
                );


            if (

                !Number.isFinite(
                    monto
                )

                ||

                monto <= 0

            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Ingresa un monto válido mayor a $0."

                );

                return;

            }


            saldo += monto;


            guardarSaldo(
                saldo
            );


            const transacciones =
                obtenerTransacciones();


            transacciones.unshift({

                tipo:
                    "Depósito",

                descripcion:
                    "Depósito realizado",

                monto:
                    monto,

                fecha:
                    obtenerFecha()

            });


            guardarTransacciones(
                transacciones
            );


            actualizarSaldoElemento(

                "depositBalance",

                saldo

            );


            mostrarMensaje(

                message,

                "success",

                `Depósito realizado correctamente.<br>
                 Nuevo saldo:
                 <strong>${formatearMoneda(saldo)}</strong>`

            );


            input.value =
                "";

        }
    );

}


// =========================================================
// RETIRO
// =========================================================

function configurarRetiro() {

    const form =
        document.getElementById(
            "withdrawForm"
        );


    if (!form) {

        return;

    }


    let saldo =
        obtenerSaldo();


    actualizarSaldoElemento(

        "withdrawBalance",

        saldo

    );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "withdrawAmount"
                );


            const message =
                document.getElementById(
                    "withdrawMessage"
                );


            const monto =
                Number(
                    input.value
                );


            if (

                !Number.isFinite(
                    monto
                )

                ||

                monto <= 0

            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Ingresa un monto válido mayor a $0."

                );

                return;

            }


            if (
                monto > saldo
            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    `Saldo insuficiente.<br>
                     Tu saldo disponible es:
                     <strong>${formatearMoneda(saldo)}</strong>`

                );

                return;

            }


            saldo -= monto;


            guardarSaldo(
                saldo
            );


            const transacciones =
                obtenerTransacciones();


            transacciones.unshift({

                tipo:
                    "Retiro",

                descripcion:
                    "Retiro de fondos",

                monto:
                    -monto,

                fecha:
                    obtenerFecha()

            });


            guardarTransacciones(
                transacciones
            );


            actualizarSaldoElemento(

                "withdrawBalance",

                saldo

            );


            mostrarMensaje(

                message,

                "success",

                `Retiro realizado correctamente.<br>
                 Nuevo saldo:
                 <strong>${formatearMoneda(saldo)}</strong>`

            );


            input.value =
                "";

        }
    );

}


// =========================================================
// ENVÍO DE DINERO
// =========================================================

function configurarEnvio() {

    const form =
        document.getElementById(
            "sendMoneyForm"
        );


    if (!form) {

        return;

    }


    let saldo =
        obtenerSaldo();


    actualizarSaldoElemento(

        "sendBalance",

        saldo

    );


    configurarAutocompletado();


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const selected =
                document.getElementById(
                    "selectedContactName"
                );


            const input =
                document.getElementById(
                    "sendAmount"
                );


            const message =
                document.getElementById(
                    "sendMessage"
                );


            const contacto =
                selected
                    ? selected.textContent.trim()
                    : "";


            const monto =
                Number(
                    input.value
                );


            if (
                contacto === ""
            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Debes seleccionar un contacto."

                );

                return;

            }


            if (

                !Number.isFinite(
                    monto
                )

                ||

                monto <= 0

            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Ingresa un monto válido mayor a $0."

                );

                return;

            }


            if (
                monto > saldo
            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    `Saldo insuficiente.<br>
                     Saldo disponible:
                     <strong>${formatearMoneda(saldo)}</strong>`

                );

                return;

            }


            saldo -= monto;


            guardarSaldo(
                saldo
            );


            const transacciones =
                obtenerTransacciones();


            transacciones.unshift({

                tipo:
                    "Transferencia",

                descripcion:
                    `Envío a ${contacto}`,

                monto:
                    -monto,

                fecha:
                    obtenerFecha()

            });


            guardarTransacciones(
                transacciones
            );


            actualizarSaldoElemento(

                "sendBalance",

                saldo

            );


            mostrarMensaje(

                message,

                "success",

                `Transferencia realizada correctamente.<br>
                 Enviado a:
                 <strong>${contacto}</strong><br>
                 Nuevo saldo:
                 <strong>${formatearMoneda(saldo)}</strong>`

            );


            input.value =
                "";


            $("#selectedContact")
                .fadeOut(
                    200,
                    function () {

                        $(this)
                            .addClass(
                                "d-none"
                            )
                            .show();

                    }
                );


            document.getElementById(
                "contactSearch"
            ).value = "";


            if (
                typeof $ !== "undefined"
            ) {

                $("#sendMessage")
                    .hide()
                    .fadeIn(300);

            }

        }
    );

}


// =========================================================
// AUTOCOMPLETADO JQUERY
// =========================================================

function configurarAutocompletado() {

    const input =
        document.getElementById(
            "contactSearch"
        );


    const suggestions =
        document.getElementById(
            "contactSuggestions"
        );


    if (
        !input ||
        !suggestions
    ) {

        return;

    }


    const contactos =
        obtenerContactos();


    if (
        typeof $ === "undefined"
    ) {

        return;

    }


    $(input).on(
        "input",
        function () {


            const texto =
                $(this)
                    .val()
                    .toLowerCase()
                    .trim();


            suggestions.innerHTML =
                "";


            if (
                texto === ""
            ) {

                return;

            }


            const resultados =
                contactos.filter(

                    contacto =>

                        contacto.nombre
                            .toLowerCase()
                            .includes(
                                texto
                            )

                );


            resultados.forEach(
                contacto => {


                    const item =
                        document.createElement(
                            "button"
                        );


                    item.type =
                        "button";


                    item.className =
                        "list-group-item list-group-item-action";


                    item.innerHTML = `

                        <strong>
                            ${contacto.nombre}
                        </strong>

                        <small class="d-block text-muted">
                            ${contacto.cuenta}
                        </small>

                    `;


                    item.addEventListener(
                        "click",
                        function () {

                            seleccionarContacto(
                                contacto
                            );

                        }
                    );


                    suggestions.appendChild(
                        item
                    );

                }
            );


            if (
                resultados.length === 0
            ) {

                suggestions.innerHTML = `

                    <div class="list-group-item text-muted">

                        No se encontraron contactos.

                    </div>

                `;

            }

        }
    );

}


// =========================================================
// SELECCIONAR CONTACTO
// =========================================================

function seleccionarContacto(
    contacto
) {

    const input =
        document.getElementById(
            "contactSearch"
        );


    const suggestions =
        document.getElementById(
            "contactSuggestions"
        );


    const selected =
        document.getElementById(
            "selectedContact"
        );


    const selectedName =
        document.getElementById(
            "selectedContactName"
        );


    if (input) {

        input.value =
            contacto.nombre;

    }


    if (selectedName) {

        selectedName.textContent =
            contacto.nombre;

    }


    if (selected) {

        selected.classList.remove(
            "d-none"
        );

    }


    if (suggestions) {

        suggestions.innerHTML =
            "";

    }


    if (
        typeof $ !== "undefined"
        &&
        selected
    ) {

        $(selected)
            .hide()
            .fadeIn(250);

    }

}


// =========================================================
// NUEVO CONTACTO
// =========================================================

function configurarNuevoContacto() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameInput =
                document.getElementById(
                    "contactName"
                );


            const accountInput =
                document.getElementById(
                    "contactAccount"
                );


            const message =
                document.getElementById(
                    "contactMessage"
                );


            const nombre =
                nameInput
                    .value
                    .trim();


            const cuenta =
                accountInput
                    .value
                    .trim();


            if (
                nombre === "" ||
                cuenta === ""
            ) {

                mostrarMensaje(

                    message,

                    "danger",

                    "Debes completar todos los campos."

                );

                return;

            }


            const contactos =
                obtenerContactos();


            const existe =
                contactos.some(

                    contacto =>

                        contacto.nombre
                            .toLowerCase()
                            ===
                        nombre.toLowerCase()

                );


            if (existe) {

                mostrarMensaje(

                    message,

                    "warning",

                    "Este contacto ya está registrado."

                );

                return;

            }


            contactos.push({

                nombre:
                    nombre,

                cuenta:
                    cuenta

            });


            guardarContactos(
                contactos
            );


            mostrarMensaje(

                message,

                "success",

                "Contacto agregado correctamente."

            );


            nameInput.value =
                "";

            accountInput.value =
                "";


            setTimeout(
                () => {

                    const modal =
                        bootstrap.Modal
                            .getInstance(
                                document.getElementById(
                                    "contactModal"
                                )
                            );


                    if (modal) {

                        modal.hide();

                    }

                },
                700
            );

        }
    );

}


// =========================================================
// MOSTRAR TRANSACCIONES
// =========================================================

function mostrarTransacciones() {

    const container =
        document.getElementById(
            "transactionsList"
        );


    if (!container) {

        return;

    }


    const transacciones =
        obtenerTransacciones();


    container.innerHTML =
        "";


    if (
        transacciones.length === 0
    ) {

        container.innerHTML = `

            <div class="alert alert-info">

                No existen movimientos registrados.

            </div>

        `;

        return;

    }


    transacciones.forEach(
        transaccion => {


            const ingreso =
                transaccion.monto > 0;


            const clase =
                ingreso
                    ? "transaction-positive"
                    : "transaction-negative";


            const signo =
                ingreso
                    ? "+"
                    : "";


            const item =
                document.createElement(
                    "div"
                );


            item.className = `

                list-group-item
                ${clase}

            `;


            item.innerHTML = `

                <div class="transaction-item">


                    <div class="transaction-description">

                        <strong>
                            ${transaccion.tipo}
                        </strong>

                        <div class="text-muted">

                            ${transaccion.descripcion}

                        </div>

                        <small class="text-muted">

                            ${transaccion.fecha}

                        </small>

                    </div>


                    <div
                        class="transaction-amount
                        ${ingreso
                            ? "text-success"
                            : "text-danger"}"
                    >

                        ${signo}${formatearMoneda(
                            Math.abs(
                                transaccion.monto
                            )
                        )}

                    </div>


                </div>

            `;


            container.appendChild(
                item
            );

        }
    );


    if (
        typeof $ !== "undefined"
    ) {

        $("#transactionsList .list-group-item")
            .hide()
            .each(
                function (index) {

                    $(this).delay(
                        index * 60
                    ).fadeIn(200);

                }
            );

    }

}


// =========================================================
// ÚLTIMOS MOVIMIENTOS DEL MENÚ
// =========================================================

function mostrarMovimientosRecientes() {

    const container =
        document.getElementById(
            "recentTransactions"
        );


    if (!container) {

        return;

    }


    const transacciones =
        obtenerTransacciones()
            .slice(
                0,
                3
            );


    container.innerHTML =
        "";


    transacciones.forEach(
        transaccion => {


            const ingreso =
                transaccion.monto > 0;


            const signo =
                ingreso
                    ? "+"
                    : "";


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "list-group-item";


            item.innerHTML = `

                <div class="d-flex justify-content-between align-items-center gap-3">

                    <div>

                        <strong>
                            ${transaccion.tipo}
                        </strong>

                        <div class="small text-muted">
                            ${transaccion.descripcion}
                        </div>

                    </div>


                    <strong
                        class="${ingreso
                            ? "text-success"
                            : "text-danger"}"
                    >

                        ${signo}${formatearMoneda(
                            Math.abs(
                                transaccion.monto
                            )
                        )}

                    </strong>

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


// =========================================================
// MENÚ PRINCIPAL
// =========================================================

function configurarMenu() {

    const balance =
        document.getElementById(
            "balance"
        );


    if (!balance) {

        return;

    }


    const saldo =
        obtenerSaldo();


    actualizarSaldoElemento(
        "balance",
        saldo
    );


    mostrarMovimientosRecientes();


    if (
        typeof $ !== "undefined"
    ) {

        $("#welcomeSection")
            .hide()
            .fadeIn(500);

        $(".financial-card")
            .hide()
            .each(
                function (index) {

                    $(this)
                        .delay(
                            index * 100
                        )
                        .fadeIn(300);

                }
            );

    }

}


// =========================================================
// MOVIMIENTOS
// =========================================================

function configurarMovimientos() {

    const balance =
        document.getElementById(
            "transactionBalance"
        );


    if (!balance) {

        return;

    }


    actualizarSaldoElemento(

        "transactionBalance",

        obtenerSaldo()

    );


    mostrarTransacciones();

}


// =========================================================
// INICIALIZACIÓN
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // -----------------------------------------------
        // PROTEGER PÁGINAS
        // -----------------------------------------------

        protegerPagina();


        // -----------------------------------------------
        // LOGIN
        // -----------------------------------------------

        configurarLogin();


        // -----------------------------------------------
        // LOGOUT
        // -----------------------------------------------

        configurarLogout();


        // -----------------------------------------------
        // MENÚ
        // -----------------------------------------------

        configurarMenu();


        // -----------------------------------------------
        // DEPÓSITO
        // -----------------------------------------------

        configurarDeposito();


        // -----------------------------------------------
        // RETIRO
        // -----------------------------------------------

        configurarRetiro();


        // -----------------------------------------------
        // ENVÍO
        // -----------------------------------------------

        configurarEnvio();


        // -----------------------------------------------
        // NUEVO CONTACTO
        // -----------------------------------------------

        configurarNuevoContacto();


        // -----------------------------------------------
        // TRANSACCIONES
        // -----------------------------------------------

        configurarMovimientos();

    }
);
