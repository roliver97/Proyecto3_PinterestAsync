import './footer.css'

const templateFooter = () => {
  return `
    <h4>Proyecto 3 - Async Pinterest - Rock the Code</h4>
    `
}

export const printFooter = () => {
  document.querySelector("footer").innerHTML = templateFooter()
}