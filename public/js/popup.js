function handleModal(modalid, openbtnid) 
{
    var modal = document.getElementById(modalid);
    var btn = document.getElementById(openbtnid);
    var span = modal.getElementsByClassName("closeBtn")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}