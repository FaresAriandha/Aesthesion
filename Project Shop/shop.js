function myFunction(){
    const container = document.querySelector(".container-card");
    const sectionShop = document.querySelector("section#shop");
    if(container.classList.toggle("show")){
        sectionShop.style.height = "fit-content";
    }else{
        sectionShop.style.height = "100vh";
    }
}