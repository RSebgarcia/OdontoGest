document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVEGACIÓN DEL MENÚ LATERAL
    // ==========================================
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu li');
    const allPages = document.querySelectorAll('#content main .page-content');

    allSideMenu.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Highlight activo
            allSideMenu.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Cambiar de hoja
            const targetPage = this.getAttribute('data-target');
            allPages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });

    // ==========================================
    // 2. TOGGLE DEL SIDEBAR Y DARK MODE (TEMPLATE)
    // ==========================================
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    const switchMode = document.getElementById('switch-mode');

    menuBar.addEventListener('click', () => sidebar.classList.toggle('hide'));

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) sidebar.classList.add('hide');
        else sidebar.classList.remove('hide');
    });
    if (window.innerWidth < 768) sidebar.classList.add('hide');

    switchMode.addEventListener('change', function () {
        if (this.checked) document.body.classList.add('dark');
        else document.body.classList.remove('dark');
    });

    // ==========================================
    // 3. LÓGICA DEL BOTÓN MÁGICO (INICIO/CARGA)
    // ==========================================
    const btnMagico = document.getElementById('btn-accion-principal');
    const txtBtnMagico = document.getElementById('text-accion-principal');
    const iconoBtnMagico = btnMagico.querySelector('i');
    
    const modalInicio = document.getElementById('modal-inicio-caja');
    const modalCarga = document.getElementById('modal-carga-movimiento');
    const btnConfirmarInicio = document.getElementById('btn-confirmar-inicio');
    const closeButtons = document.querySelectorAll('.close-modal');

    const displayCajaChica = document.getElementById('display-caja-chica');
    const displayProtesis = document.getElementById('display-protesis');
    const inputCajaChica = document.getElementById('input-caja-chica');
    const inputProtesis = document.getElementById('input-protesis');

    let cajaIniciada = false;

    btnMagico.addEventListener('click', () => {
        if (!cajaIniciada) modalInicio.classList.add('active');
        else modalCarga.classList.add('active');
    });

    btnConfirmarInicio.addEventListener('click', () => {
        // Formateo y actualización de KPIs
        const valChica = Number(inputCajaChica.value).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        const valProt = Number(inputProtesis.value).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        displayCajaChica.textContent = valChica;
        displayProtesis.textContent = valProt;

        // Cambiar el botón a "Cargar Movimiento"
        cajaIniciada = true;
        btnMagico.classList.remove('pulse-animation');
        btnMagico.classList.add('mode-cargado');
        txtBtnMagico.textContent = 'Cargar Movimiento';
        iconoBtnMagico.classList.replace('bx-play-circle', 'bx-plus-circle');
        
        modalInicio.classList.remove('active');
    });

    // Cerrar Modales
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('.modal-overlay').classList.remove('active'));
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
    });

    // ==========================================
    // 4. MAGIA DINÁMICA DEL WIZARD (FORMULARIO)
    // ==========================================
    const selectTipoOp = document.getElementById('tipo-operacion');
    const seccionIngreso = document.getElementById('seccion-ingreso');
    const seccionGasto = document.getElementById('seccion-gasto');
    const selectConcepto = document.getElementById('select-concepto');
    
    const checkboxSena = document.getElementById('tiene-sena');
    const selectSena = document.querySelector('.hidden-select');

    // Cambiar Formulario según Ingreso o Gasto
    selectTipoOp.addEventListener('change', (e) => {
        const tipo = e.target.value;
        
        if (tipo === 'gasto' || tipo === 'retiro') {
            // Ocultar Paciente/Doc, Mostrar "Origen de Fondos"
            seccionIngreso.style.display = 'none';
            seccionGasto.style.display = 'block';
            
            // Cambiar las opciones del concepto para que tenga sentido
            selectConcepto.innerHTML = `
                <option>Compra Insumos (Guantes, Anestesia)</option>
                <option>Pago a Laboratorio (Prótesis)</option>
                <option>Sueldo Secretaria</option>
                <option>Extracción Efectivo Socio</option>
            `;
        } else {
            // Es un Ingreso o Seña. Mostrar Paciente/Doc
            seccionIngreso.style.display = 'block';
            seccionGasto.style.display = 'none';
            
            selectConcepto.innerHTML = `
                <option>Blanqueamiento Láser</option>
                <option>Consulta General</option>
                <option>Prótesis Completa</option>
            `;
        }
    });

    // Lógica para mostrar el listado de señas previas
    if(checkboxSena && selectSena) {
        selectSena.style.display = 'none';
        checkboxSena.addEventListener('change', (e) => {
            selectSena.style.display = e.target.checked ? 'block' : 'none';
            selectSena.style.width = '100%';
        });
    }

});