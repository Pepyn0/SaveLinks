const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function loadData() {
  const response = await fetch("http://localhost:3000/")
  .then((data) => data.json())

  console.log(response)
  response.urls.map(url => addElement(url))
  
}
loadData()


function addElement({ name, url }) {
  const li = document.createElement('li')
  const a = document.createElement("a")
  const trash = document.createElement("span")

  a.href = url
  a.innerHTML = name
  a.target = "_blank"
  // console.log(a.innerHTML)
  // console.log(a.href)

  trash.innerHTML = "x"
  trash.onclick = () => removeElement(trash, a.innerHTML, a.href)

  li.append(a)
  li.append(trash)
  ul.append(li)
}
async function saveData({ name, url }) {
  const response = await fetch(`http://localhost:3000/?name=${name}&url=${url}`)
  addElement({ name, url })
}
async function removeData({ name, url }) {
  const response = await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
}

function removeElement(el, name, url) {
  if (confirm('Tem certeza que deseja deletar?'))
    removeData({ name, url })
    el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let { value } = input

  if (!value)
    return alert('Preencha o campo')

  const [name, url] = value.split(",")

  if (!url)
    return alert('Formate o texto da maneira correta')

  if (!/^http/.test(url))
    return alert("Digite a url da maneira correta")

  // addElement({ name, url })
  saveData({ name, url })

  input.value = ""
})
