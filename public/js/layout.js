function modal(target) {
    let hidden = document.getElementById(target)
    hidden.classList.remove('hidden')
}
function closeModal(target) {
    let hidden = document.getElementById(target)
    hidden.classList.add('hidden')
}