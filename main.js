

const playLink = link => {
    const element = document.getElementById("player");
    element.setAttribute("src",link+"&autoplay=1");
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
    container.appendChild(makeButton(description,link));
})
