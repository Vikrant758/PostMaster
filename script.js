console.log('My Project');

//Utility Function for get DOM Element from String
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initializing the COunt Of PAram
let count = 0;

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if user selects JSon JSON BOX Should Displayy 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('jsonBox').style.display = 'block';

})

//IF User Selects Custom Parameters it should display Param BOX
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('jsonBox').style.display = 'none';

})

//When Click On Param It should Give OPtion To Add New Params

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${count + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${count + 2}" placeholder="Enter Parameter ${count + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${count + 2}" placeholder="Enter Parameter ${count + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam">-</button>
                  </div>`;
    //COnvert element string to DOM node
    let paramElement = getElementFromString(string);
    console.log(paramElement);

    params.appendChild(paramElement);

    //Add Event Listner When we click - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }


    count++;

})

//If User Clicks Submit Button 
let submitId = document.getElementById('submitId');
submitId.addEventListener('click', () => {
    //Show A messsage to Wait in response box to 
    document.getElementById('responsePrism').innerHTML = "Please Wait, Fetching Data Soon...";

    //Fetch all the values user Entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    //If user Selects Param instesd of JSON Collect All the param in an object 
    if (contentType == 'params') {
        data = {};

        for (let i = 0; i < count + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('jsonText').value;
    }



    console.log('url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('Data is', data);

    //If request type is GET then invoek fetch api else POst

    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        }).then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value= text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }else{
        fetch(url, {
            method: 'POST',
            body : data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        }).then(response => response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value    = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })

    }
})



