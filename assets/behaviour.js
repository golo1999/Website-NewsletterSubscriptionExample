const emailInput=document.querySelector("#subscriber-email");
const emailInputCheck=document.querySelector("#subscriber-email-check");
const envelopeBack=document.querySelector(".envelope-back");
const envelopeContainer=document.querySelector(".envelope-container");
const envelopeFrontLeft=document.querySelector(".envelope-front-left");
const envelopeFrontRight=document.querySelector(".envelope-front-right");
const envelopeTop=document.querySelector(".envelope-top");
const form=document.querySelector("form");
const letter=document.querySelector(".letter");
const nameInput=document.querySelector("#subscriber-name");
const nameInputCheck=document.querySelector("#subscriber-name-check");
const subscribeButton=document.querySelector("#letter-submit");

envelopeContainer.onmouseover=()=>{openLetter()};
envelopeContainer.onmouseleave=()=>{closeLetter()};

subscribeButton.onclick=(event)=>
{
    event.preventDefault();
    if(nameInputCheck.style.color=="green" && emailInputCheck.style.color=="green")
        form.submit();
    else alert("Please complete the form first");
};

nameInput.addEventListener('input', (e)=>
{
    let input=e.target.value;
    if(input.length>1)
        nameInputCheck.style.color="green";
    else nameInputCheck.style.color="gray";
});

emailInput.addEventListener('input', (e)=>
{
    let input=e.target.value;
    if(emailValidation(input))
        emailInputCheck.style.color="green";
    else emailInputCheck.style.color="gray";
});

const emailValidation=(email)=>
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const openLetter=()=>
{
    envelopeTop.classList.add("envelope-top-open");
    envelopeTop.style.transition=".33s ease";
    envelopeTop.style.zIndex="-1";
    letter.style.transform="translate(-50%, -100%)";
    letter.style.transition=".5s ease";
    letter.style.transitionDelay=".33s";
    letter.style.zIndex="0";

    if(nameInput.getAttribute("disabled")=="true" && emailInput.getAttribute("disabled")=="true")
    {
        emailInput.removeAttribute("disabled");
        nameInput.removeAttribute("disabled");
    }
}

const closeLetter=()=>
{
    emailInput.setAttribute("disabled", "true");
    envelopeBack.style.zIndex="1";
    envelopeFrontLeft.style.zIndex="2";
    envelopeFrontRight.style.zIndex="3";
    envelopeTop.classList.remove("envelope-top-open");
    envelopeTop.style.transition="1s ease";
    envelopeTop.style.transitionDelay=".33s";
    envelopeTop.style.zIndex="2";
    letter.style.transform="translate(-50%, -50%)";
    letter.style.transition=".5s ease";
    letter.style.zIndex="-1";
    nameInput.setAttribute("disabled", "true");
}