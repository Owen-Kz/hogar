const alertContainer = document.getElementById("alertContainer")
function WriteError(message) {
    alertContainer.innerHTML = `      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert" id="errorMessage">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true">
										<i class="fa fa-times danger "></i>
									</span>
									<span class="sr-only">Close</span>
								</button>
          <i class="start-icon far fa-times-circle faa-pulse animated"></i>
          <!-- <strong class="font__weight-semibold">Oh snap!</strong> Change a few things up and try submitting again. -->
          ${message}
        </div>
      </div>`
}

function WriteSucess(message){
alertContainer.innerHTML = `<div class="col-sm-12">
        <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" id="sucessMessage">
          <button type="button" class="close font__size-18" data-dismiss="alert">
									<span aria-hidden="true"><a>
                    <i class="fa fa-times greencross"></i>
                    </a></span>
									<span class="sr-only">Close</span> 
								</button>
          <i class="start-icon far fa-check-circle faa-tada animated"></i>
      
          ${message}
        </div>
      </div>`
}


export {
    WriteError,
    WriteSucess
}