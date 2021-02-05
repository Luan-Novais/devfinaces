document.querySelector('#novaTransacao').addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector('.modal-overlay').classList.add('active')
});


document.querySelector("#cancelar").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector('.modal-overlay').classList.remove('active')
});
