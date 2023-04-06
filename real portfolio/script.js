portfolio: {
	let selectors = {
	  form: '.form-container',

	};
  
	let view = new View(selectors, {
	  store_new: function (url, form_data, add_entry) {
		fetch(url, {
		  method: "POST",
		  body: form_data
		}).then(function (response) {
		  return response.json();
		}).then(function (result) {
		  if (result.status == true) {
			/*логика после ответа от сервера*/
		  }
		});
	  },
	});


	
  }