console.log("Js connected!")
//issue counter
let ississueCounter = document.getElementById('issueCounter')
ississueCounter.innerText = "0"

//buttons tab
let button = document.getElementsByClassName('button')

// card container
let cardContainer = document.getElementById('card-container')

// loading bar
let loading = document.getElementById('loading')
// console.log(loading.classList)
loading.classList.remove('hidden')

function loadingToggle (status) {
    if(status == true){
        loading.classList.remove('hidden')
        cardContainer.classList.add('hidden')
    }
    else{
        loading.classList.add('hidden')
        cardContainer.classList.remove('hidden')
    }
}



// API
let apiUrlAll = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

function loadAllIssues ()  {
    
fetch(apiUrlAll)
    .then((response) => response.json())
    .then((dataRaw) => {
        //loop!
        for(let i=0; i<dataRaw.data.length; i++){
        //id no
        let cardId = dataRaw.data[i].id

        // title
        let cardTitle = dataRaw.data[i].title       //text

        // description
        let cardDes = dataRaw.data[i].description      //text

        // status
        let cardStatus = dataRaw.data[i].status     //open or close text
        let topColor = ""
        let statusImg = ""
        if(cardStatus == "open"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#00A96E] p-4"
            statusImg = "./assets/Open-Status.png"
        }
        else if (cardStatus == "closed"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#A855F7] p-4"
            statusImg = "./assets/Closed- Status .png"
        }
        // priority
        let cardPriority = dataRaw.data[i].priority     //high or low or medium text
        let priorityClass = ""
        if(cardPriority == "high"){
            priorityClass = "text-[#EF4444] bg-[#FEECEC] px-4 rounded-xl"

        }
        else if(cardPriority == "medium"){
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1] px-4 rounded-xl"
        }
        else if(cardPriority == "low"){
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2] px-4 rounded-xl"
        }

        // !! labels !!array
        let labelText1 = ""
        let labelStyle1 = ""
        let labelArtClass1 = ""
        let labelArtStyle1 = ""

        let labelText2 = ""
        let labelStyle2 = ""
        let labelArtClass2 = ""
        let labelArtStyle2 = ""

        let labelText3 = ""
        let labelStyle3 = ""
        let labelArtClass3 = ""
        let labelArtStyle3 = ""

        let cardLabels = () => {
            for(let label of dataRaw.data[i].labels){
                if(label == "bug"){         //for BUG
                    labelText1 = "BUG"
                    labelStyle1 = "text-[#EF4444] font-semibold bg-[#FEECEC] px-3 rounded-2xl border-2 border-[#FECACA]"
                    labelArtClass1 = "fa-solid fa-bug"
                    labelArtStyle1 = "color: #ef4444;"
                }
                else if(label == "help wanted") {       //for help wanted
                    labelText2 = "HELP WANTED"
                    labelStyle2 = "text-[#D97706] font-semibold bg-[#FFF8DB] px-3 rounded-2xl border-2 border-[#FDE68A]"
                    labelArtClass2 = "fa-solid fa-life-ring"
                    labelArtStyle2 = "color: #d97706;"
                }
                else if (label == "enhancement") {      //for enhancement
                    labelText3 = "ENHANCEMENT"
                    labelStyle3 = "text-[#00A96E] font-semibold bg-[#DEFCE8] px-3 rounded-2xl border-2 border-[#BBF7D0]"
                    labelArtClass3 = "fa-solid fa-wand-sparkles"
                    labelArtStyle3 = "color: #00a96e;"
                } 
            }
        }
        cardLabels() // returns some label

        //author
        let cardAuthor = dataRaw.data[i].author     //text

        //Created at
        let cardDate = dataRaw.data[i].createdAt


        //Card Creation!
        let cardDiv = document.createElement('div')
        //card Editing!
        cardDiv.innerHTML = `
            <div class="${topColor}" onclick="loadWordDetail(${cardId})">
            <div class="flex justify-between">
                <img src="${statusImg}" alt="">
                <p class="${priorityClass}">${cardPriority.toUpperCase()}</p>
            </div>
            <div class="mt-3">
                <h3 class="font-semibold mb-2 text-lg">${cardTitle}</h3>
                <p class="text-[#64748B]">${cardDes}</p>
            </div>
            <div class="flex gap-3 mt-3">
                <p class="${labelStyle1}"><i class="${labelArtClass1}" style="${labelArtStyle1}"></i> ${labelText1}</p>
                <p class="${labelStyle2}"><i class="${labelArtClass2}" style="${labelArtStyle2}"></i> ${labelText2}</p>
                <p class="${labelStyle3}"><i class="${labelArtClass3}" style="${labelArtStyle3}"></i> ${labelText3}</p>
            </div>
            <hr class="mt-4 border-gray-300 border mb-4">
            <div>
                <p class="text-[#64748B]">#${cardId} by ${cardAuthor}</p>
                <p class="text-[#64748B]">${cardDate}</p>
            </div>
        </div>
        `
        //Card Append!!!
        //s-1 select location to add
        // let cardContainer = document.getElementById('card-container')
        //s-2 append!
        cardContainer.appendChild(cardDiv)
        }
    })
    //done loading!
    setTimeout(() => {
        loadingToggle(false)
    }, 100)
}



//show if all clicked
        let allBtn = document.getElementById('all-btn')
    allBtn.addEventListener("click",() => {
        button[0].classList.remove("btn-primary")
        button[1].classList.remove("btn-primary")
        button[2].classList.remove("btn-primary")
        cardContainer.innerHTML = " "
        allBtn.classList.add("btn-primary")
        ississueCounter.innerText = "50"
        //add loading
    loadingToggle(true)
        loadAllIssues()
    })


    function allShow () {
        let allBtn = document.getElementById('all-btn')
        allBtn.classList.add("btn-primary")
        ississueCounter.innerText = "50"
        loadAllIssues()
    }

//default:
document.addEventListener("DOMContentLoaded", allShow)




//Open Issues!!!!!!!!!!!!!!!!!!!!!!


function loadOpenIssues ()  {
    
fetch(apiUrlAll)
    .then((response) => response.json())
    .then((dataRaw) => {
        //loop!
        for(let i=0; i<dataRaw.data.length; i++){
            if(dataRaw.data[i].status == "open"){
                console.log("haha")
        //id no
        let cardId = dataRaw.data[i].id

        // title
        let cardTitle = dataRaw.data[i].title       //text

        // description
        let cardDes = dataRaw.data[i].description      //text

        // status
        let cardStatus = dataRaw.data[i].status     //open or close text
        let topColor = ""
        let statusImg = ""
        if(cardStatus == "open"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#00A96E] p-4"
            statusImg = "./assets/Open-Status.png"
        }
        else if (cardStatus == "closed"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#A855F7] p-4"
            statusImg = "./assets/Closed- Status .png"
        }
        // priority
        let cardPriority = dataRaw.data[i].priority     //high or low or medium text
        let priorityClass = ""
        if(cardPriority == "high"){
            priorityClass = "text-[#EF4444] bg-[#FEECEC] px-4 rounded-xl"

        }
        else if(cardPriority == "medium"){
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1] px-4 rounded-xl"
        }
        else if(cardPriority == "low"){
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2] px-4 rounded-xl"
        }

        // !! labels !!array
        let labelText1 = ""
        let labelStyle1 = ""
        let labelArtClass1 = ""
        let labelArtStyle1 = ""

        let labelText2 = ""
        let labelStyle2 = ""
        let labelArtClass2 = ""
        let labelArtStyle2 = ""

        let labelText3 = ""
        let labelStyle3 = ""
        let labelArtClass3 = ""
        let labelArtStyle3 = ""

        let cardLabels = () => {
            for(let label of dataRaw.data[i].labels){
                if(label == "bug"){         //for BUG
                    labelText1 = "BUG"
                    labelStyle1 = "text-[#EF4444] font-semibold bg-[#FEECEC] px-3 rounded-2xl border-2 border-[#FECACA]"
                    labelArtClass1 = "fa-solid fa-bug"
                    labelArtStyle1 = "color: #ef4444;"
                }
                else if(label == "help wanted") {       //for help wanted
                    labelText2 = "HELP WANTED"
                    labelStyle2 = "text-[#D97706] font-semibold bg-[#FFF8DB] px-3 rounded-2xl border-2 border-[#FDE68A]"
                    labelArtClass2 = "fa-solid fa-life-ring"
                    labelArtStyle2 = "color: #d97706;"
                }
                else if (label == "enhancement") {      //for enhancement
                    labelText3 = "ENHANCEMENT"
                    labelStyle3 = "text-[#00A96E] font-semibold bg-[#DEFCE8] px-3 rounded-2xl border-2 border-[#BBF7D0]"
                    labelArtClass3 = "fa-solid fa-wand-sparkles"
                    labelArtStyle3 = "color: #00a96e;"
                } 
            }
        }
        cardLabels() // returns some label

        //author
        let cardAuthor = dataRaw.data[i].author     //text

        //Created at
        let cardDate = dataRaw.data[i].createdAt


        //Card Creation!
        let cardDiv = document.createElement('div')
        //card Editing!
        cardDiv.innerHTML = `
            <div class="${topColor}" onclick="loadWordDetail(${cardId})">
            <div class="flex justify-between">
                <img src="${statusImg}" alt="">
                <p class="${priorityClass}">${cardPriority.toUpperCase()}</p>
            </div>
            <div class="mt-3">
                <h3 class="font-semibold mb-2 text-lg">${cardTitle}</h3>
                <p class="text-[#64748B]">${cardDes}</p>
            </div>
            <div class="flex gap-3 mt-3">
                <p class="${labelStyle1}"><i class="${labelArtClass1}" style="${labelArtStyle1}"></i> ${labelText1}</p>
                <p class="${labelStyle2}"><i class="${labelArtClass2}" style="${labelArtStyle2}"></i> ${labelText2}</p>
                <p class="${labelStyle3}"><i class="${labelArtClass3}" style="${labelArtStyle3}"></i> ${labelText3}</p>
            </div>
            <hr class="mt-4 border-gray-300 border mb-4">
            <div>
                <p class="text-[#64748B]">#${cardId} by ${cardAuthor}</p>
                <p class="text-[#64748B]">${cardDate}</p>
            </div>
        </div>
        `
        //Card Append!!!
        //s-1 select location to add
        // let cardContainer = document.getElementById('card-container')
        //s-2 append!
        cardContainer.appendChild(cardDiv)
    }
        }
    })
    //done loading!
        setTimeout(() => {
        loadingToggle(false)
    }, 100)
}

//show if Open clicked
    let openBtn = document.getElementById('open-btn')
    openBtn.addEventListener("click",() => {
        console.log("open clicked!")
        button[0].classList.remove("btn-primary")
        button[1].classList.remove("btn-primary")
        button[2].classList.remove("btn-primary")
        cardContainer.innerHTML = " "
        openBtn.classList.add("btn-primary")
        ississueCounter.innerText = "44"
        //add loading
    loadingToggle(true)
        loadOpenIssues()
    })

// Close Issues!!!!!!!!!!!!!!!!!!!!!!

function loadClosedIssues ()  {
    
fetch(apiUrlAll)
    .then((response) => response.json())
    .then((dataRaw) => {
        //loop!
        for(let i=0; i<dataRaw.data.length; i++){
            if(dataRaw.data[i].status == "closed"){
                console.log("nanaa")
        //id no
        let cardId = dataRaw.data[i].id

        // title
        let cardTitle = dataRaw.data[i].title       //text

        // description
        let cardDes = dataRaw.data[i].description      //text

        // status
        let cardStatus = dataRaw.data[i].status     //open or close text
        let topColor = ""
        let statusImg = ""
        if(cardStatus == "open"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#00A96E] p-4"
            statusImg = "./assets/Open-Status.png"
        }
        else if (cardStatus == "closed"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#A855F7] p-4"
            statusImg = "./assets/Closed- Status .png"
        }
        // priority
        let cardPriority = dataRaw.data[i].priority     //high or low or medium text
        let priorityClass = ""
        if(cardPriority == "high"){
            priorityClass = "text-[#EF4444] bg-[#FEECEC] px-4 rounded-xl"

        }
        else if(cardPriority == "medium"){
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1] px-4 rounded-xl"
        }
        else if(cardPriority == "low"){
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2] px-4 rounded-xl"
        }

        // !! labels !!array
        let labelText1 = ""
        let labelStyle1 = ""
        let labelArtClass1 = ""
        let labelArtStyle1 = ""

        let labelText2 = ""
        let labelStyle2 = ""
        let labelArtClass2 = ""
        let labelArtStyle2 = ""

        let labelText3 = ""
        let labelStyle3 = ""
        let labelArtClass3 = ""
        let labelArtStyle3 = ""

        let cardLabels = () => {
            for(let label of dataRaw.data[i].labels){
                if(label == "bug"){         //for BUG
                    labelText1 = "BUG"
                    labelStyle1 = "text-[#EF4444] font-semibold bg-[#FEECEC] px-3 rounded-2xl border-2 border-[#FECACA]"
                    labelArtClass1 = "fa-solid fa-bug"
                    labelArtStyle1 = "color: #ef4444;"
                }
                else if(label == "help wanted") {       //for help wanted
                    labelText2 = "HELP WANTED"
                    labelStyle2 = "text-[#D97706] font-semibold bg-[#FFF8DB] px-3 rounded-2xl border-2 border-[#FDE68A]"
                    labelArtClass2 = "fa-solid fa-life-ring"
                    labelArtStyle2 = "color: #d97706;"
                }
                else if (label == "enhancement") {      //for enhancement
                    labelText3 = "ENHANCEMENT"
                    labelStyle3 = "text-[#00A96E] font-semibold bg-[#DEFCE8] px-3 rounded-2xl border-2 border-[#BBF7D0]"
                    labelArtClass3 = "fa-solid fa-wand-sparkles"
                    labelArtStyle3 = "color: #00a96e;"
                } 
            }
        }
        cardLabels() // returns some label

        //author
        let cardAuthor = dataRaw.data[i].author     //text

        //Created at
        let cardDate = dataRaw.data[i].createdAt


        //Card Creation!
        let cardDiv = document.createElement('div')
        //card Editing!
        cardDiv.innerHTML = `
            <div class="${topColor}" onclick="loadWordDetail(${cardId})">
            <div class="flex justify-between">
                <img src="${statusImg}" alt="">
                <p class="${priorityClass}">${cardPriority.toUpperCase()}</p>
            </div>
            <div class="mt-3">
                <h3 class="font-semibold mb-2 text-lg">${cardTitle}</h3>
                <p class="text-[#64748B]">${cardDes}</p>
            </div>
            <div class="flex gap-3 mt-3">
                <p class="${labelStyle1}"><i class="${labelArtClass1}" style="${labelArtStyle1}"></i> ${labelText1}</p>
                <p class="${labelStyle2}"><i class="${labelArtClass2}" style="${labelArtStyle2}"></i> ${labelText2}</p>
                <p class="${labelStyle3}"><i class="${labelArtClass3}" style="${labelArtStyle3}"></i> ${labelText3}</p>
            </div>
            <hr class="mt-4 border-gray-300 border mb-4">
            <div>
                <p class="text-[#64748B]">#${cardId} by ${cardAuthor}</p>
                <p class="text-[#64748B]">${cardDate}</p>
            </div>
        </div>
        `
        //Card Append!!!
        //s-1 select location to add
        // let cardContainer = document.getElementById('card-container')
        //s-2 append!
        cardContainer.appendChild(cardDiv)
    }
        }
    })
    //done loading!
        setTimeout(() => {
        loadingToggle(false)
    }, 100)
}

//show if Closed clicked
    let closedBtn = document.getElementById('closed-btn')
    closedBtn.addEventListener("click",() => {
        console.log("close clicked!")
        button[0].classList.remove("btn-primary")
        button[1].classList.remove("btn-primary")
        button[2].classList.remove("btn-primary")
        cardContainer.innerHTML = " "
        closedBtn.classList.add("btn-primary")
        ississueCounter.innerText = "6"
        //add loading
    loadingToggle(true)
        loadClosedIssues()
    })



    // --------------Modal Codes-------------//

function loadWordDetail(id){
    console.log(id)
    let singleUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(singleUrl)
        .then((res) => res.json())
        .then((singleData) => {
        // title
        let modalTitle = singleData.data.title       //text
            console.log(modalTitle)
        // description
        let modalDes = singleData.data.description      //text
            console.log(modalDes)
        
        // priority
        let modalPriority = singleData.data.priority     //high or low or medium text
            console.log(modalPriority)
            let priorityClass = ""
        if(modalPriority == "high"){
            priorityClass = "text-[#EF4444] bg-[#FEECEC] px-4 rounded-xl"

        }
        else if(modalPriority == "medium"){
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1] px-4 rounded-xl"
        }
        else if(modalPriority == "low"){
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2] px-4 rounded-xl"
        }
        // !! labels !!array
        let labelText1 = ""
        let labelStyle1 = ""
        let labelArtClass1 = ""
        let labelArtStyle1 = ""

        let labelText2 = ""
        let labelStyle2 = ""
        let labelArtClass2 = ""
        let labelArtStyle2 = ""

        let labelText3 = ""
        let labelStyle3 = ""
        let labelArtClass3 = ""
        let labelArtStyle3 = ""

        let modalLabels = () => {
            for(let label of singleData.data.labels){
                if(label == "bug"){         //for BUG
                    labelText1 = "BUG"
                    labelStyle1 = "text-[#EF4444] font-semibold bg-[#FEECEC] px-3 rounded-2xl border-2 border-[#FECACA]"
                    labelArtClass1 = "fa-solid fa-bug"
                    labelArtStyle1 = "color: #ef4444;"
                }
                else if(label == "help wanted") {       //for help wanted
                    labelText2 = "HELP WANTED"
                    labelStyle2 = "text-[#D97706] font-semibold bg-[#FFF8DB] px-3 rounded-2xl border-2 border-[#FDE68A]"
                    labelArtClass2 = "fa-solid fa-life-ring"
                    labelArtStyle2 = "color: #d97706;"
                }
                else if (label == "enhancement") {      //for enhancement
                    labelText3 = "ENHANCEMENT"
                    labelStyle3 = "text-[#00A96E] font-semibold bg-[#DEFCE8] px-3 rounded-2xl border-2 border-[#BBF7D0]"
                    labelArtClass3 = "fa-solid fa-wand-sparkles"
                    labelArtStyle3 = "color: #00a96e;"
                } 
            }
        }
        modalLabels() // returns some label
        //author
        let modalAuthor = singleData.data.author     //text
            console.log(modalAuthor)
        //assignee
        let modalAssignee = singleData.data.assignee     //text
            console.log(modalAssignee)
        //Created at
        let modalDate = singleData.data.createdAt
            console.log(modalDate)

        //-----------Modal Editing----------
        let modalBox = document.getElementById('modal_box')

        modalBox.innerHTML = `
            <h3 class="text-[24px] font-bold">${modalTitle}</h3>
            <p class="my-2 text-[#64748B]">#${id} ${modalAuthor} : ${modalDate}</p>
            <div class="flex gap-3 mt-3">
                <p class="${labelStyle1}"><i class="${labelArtClass1}" style="${labelArtStyle1}"></i> ${labelText1}</p>
                <p class="${labelStyle2}"><i class="${labelArtClass2}" style="${labelArtStyle2}"></i> ${labelText2}</p>
                <p class="${labelStyle3}"><i class="${labelArtClass3}" style="${labelArtStyle3}"></i> ${labelText3}</p>
            </div>
            <p class="my-2 text-[#64748B]">${modalDes}</p>
            <div class="flex gap-24 bg-[#F8FAFC] p-4 rounded-xl">
                <div>
                    <p class="text-[#64748B]">Assignee:</p>
                    <p class="font-bold">${modalAssignee}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p class="${priorityClass}">${modalPriority.toUpperCase()}</p>
                </div>
            </div>
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
            </form>
            </div>
        `

})
    // click open modal
    let modal = document.getElementById('my_modal_5')
    modal.showModal()
}



// ----------Search-------------

let searchInput = document.getElementById('searchInput')


searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
    //clear previous!
    cardContainer.innerHTML = " "
    //loading
    loading.classList.remove('hidden')

        let value = searchInput.value.toLowerCase()
        
    // fetch from api!
    let searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`
    fetch(searchUrl)
        .then((result) => result.json())
        .then((sResult) => {
        //loop!
        console.log(sResult)
        //counter reset!
        ississueCounter.innerText = sResult.total
        // console.log(sResult.total)

        for(let i=0; i<sResult.data.length; i++){
        //id no
        let cardId = sResult.data[i].id
            console.log(cardId)
        // title
        let cardTitle = sResult.data[i].title       //text

        // description
        let cardDes = sResult.data[i].description      //text

        // status
        let cardStatus = sResult.data[i].status     //open or close text
        let topColor = ""
        let statusImg = ""
        if(cardStatus == "open"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#00A96E] p-4"
            statusImg = "./assets/Open-Status.png"
        }
        else if (cardStatus == "closed"){
            topColor = "shadow-lg rounded-md border-t-5 border-[#A855F7] p-4"
            statusImg = "./assets/Closed- Status .png"
        }
        // priority
        let cardPriority = sResult.data[i].priority     //high or low or medium text
        let priorityClass = ""
        if(cardPriority == "high"){
            priorityClass = "text-[#EF4444] bg-[#FEECEC] px-4 rounded-xl"

        }
        else if(cardPriority == "medium"){
            priorityClass = "text-[#F59E0B] bg-[#FFF6D1] px-4 rounded-xl"
        }
        else if(cardPriority == "low"){
            priorityClass = "text-[#9CA3AF] bg-[#EEEFF2] px-4 rounded-xl"
        }

        // !! labels !!array
        let labelText1 = ""
        let labelStyle1 = ""
        let labelArtClass1 = ""
        let labelArtStyle1 = ""

        let labelText2 = ""
        let labelStyle2 = ""
        let labelArtClass2 = ""
        let labelArtStyle2 = ""

        let labelText3 = ""
        let labelStyle3 = ""
        let labelArtClass3 = ""
        let labelArtStyle3 = ""

        let cardLabels = () => {
            for(let label of sResult.data[i].labels){
                if(label == "bug"){         //for BUG
                    labelText1 = "BUG"
                    labelStyle1 = "text-[#EF4444] font-semibold bg-[#FEECEC] px-3 rounded-2xl border-2 border-[#FECACA]"
                    labelArtClass1 = "fa-solid fa-bug"
                    labelArtStyle1 = "color: #ef4444;"
                }
                else if(label == "help wanted") {       //for help wanted
                    labelText2 = "HELP WANTED"
                    labelStyle2 = "text-[#D97706] font-semibold bg-[#FFF8DB] px-3 rounded-2xl border-2 border-[#FDE68A]"
                    labelArtClass2 = "fa-solid fa-life-ring"
                    labelArtStyle2 = "color: #d97706;"
                }
                else if (label == "enhancement") {      //for enhancement
                    labelText3 = "ENHANCEMENT"
                    labelStyle3 = "text-[#00A96E] font-semibold bg-[#DEFCE8] px-3 rounded-2xl border-2 border-[#BBF7D0]"
                    labelArtClass3 = "fa-solid fa-wand-sparkles"
                    labelArtStyle3 = "color: #00a96e;"
                } 
            }
        }
        cardLabels() // returns some label

        //author
        let cardAuthor = sResult.data[i].author     //text

        //Created at
        let cardDate = sResult.data[i].createdAt


        //Card Creation!
        let cardDiv = document.createElement('div')
        //card Editing!
        cardDiv.innerHTML = `
            <div class="${topColor}" onclick="loadWordDetail(${cardId})">
            <div class="flex justify-between">
                <img src="${statusImg}" alt="">
                <p class="${priorityClass}">${cardPriority.toUpperCase()}</p>
            </div>
            <div class="mt-3">
                <h3 class="font-semibold mb-2 text-lg">${cardTitle}</h3>
                <p class="text-[#64748B]">${cardDes}</p>
            </div>
            <div class="flex gap-3 mt-3">
                <p class="${labelStyle1}"><i class="${labelArtClass1}" style="${labelArtStyle1}"></i> ${labelText1}</p>
                <p class="${labelStyle2}"><i class="${labelArtClass2}" style="${labelArtStyle2}"></i> ${labelText2}</p>
                <p class="${labelStyle3}"><i class="${labelArtClass3}" style="${labelArtStyle3}"></i> ${labelText3}</p>
            </div>
            <hr class="mt-4 border-gray-300 border mb-4">
            <div>
                <p class="text-[#64748B]">#${cardId} by ${cardAuthor}</p>
                <p class="text-[#64748B]">${cardDate}</p>
            </div>
        </div>
        `
        //Card Append!!!
        //s-1 select location to add
        // let cardContainer = document.getElementById('card-container')
        //s-2 append!
        cardContainer.appendChild(cardDiv)
        }
    })
}
    setTimeout(() => {
        loading.classList.add('hidden')
    }, 500)
})