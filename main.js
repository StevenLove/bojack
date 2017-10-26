

const playLink = link => {
    const element = document.getElementById("player");
    element.setAttribute("src",link+"&autoplay=1");
}
const makeIframe = (name,link) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.innerText = name;
    const el = document.createElement("iframe");
    el.setAttribute("width",300);
    el.setAttribute("height",300);
    el.setAttribute("src",link);
    container.appendChild(label);
    container.appendChild(el);
    return container;
}
const makeButton = (name,link) => {
    const el = document.createElement("button");
    el.onclick = ()=>{
        console.log("playing link",link);
        playLink(link)
    };
    el.innerHTML = name;
    return el;
}
const descs = [
    "*nickers* Well that was another one in a series of regrettable life choices.",
    "Yes."
]
const links = [
    "https://www.youtube.com/embed/ZChnW2oMfTY?start=130&end=135",
    // "https://www.youtube.com/v/ZChnW2oMfTY?start=130&end=135",
    "https://www.youtube.com/embed/ZChnW2oMfTY?rel=0&start=61&end=62"
]


links.forEach((link,index)=>{
    const container = document.getElementById("buttons");
    const description = descs[index];
    container.appendChild(makeIframe(description,link));
})
