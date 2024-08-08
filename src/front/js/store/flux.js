const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			logIn: async (email, password) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/log_in", {
						method: "POST",
						headers: {
							'Content-Type':' application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					
					if (response.status === 200) {
						let data = await response.json();
						sessionStorage.setItem('token', data.token);
						return true; // Login successful
					} else if (response.status === 401) {
						return false; // Unauthorized (login failed)
					} else {
						console.log("Unexpected error occurred during login:", response.status);
						return false;
					}
				} catch (error) {
					console.log("There was an error during login:", error);
					return false;
				}
			},

			signUp: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/sign_up', {
						method: "Post",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					const data = await response.json();
					console.log(data);
					return data; 
				} catch (error) {
					console.log("There was an error at sign up", error);
					throw error; 
				}
			},

			goPrivate: async () => {
				console.log("it's running!")
				if (sessionStorage.getItem('token')){try {
					
					let response = await fetch(process.env.BACKEND_URL + '/api/private', {
				
						headers: {
							Authorization: "Bearer " + sessionStorage.getItem('token')
						}
					})
					if (!response.ok) {
						return false
					} else {
						let data = await response.json()
						console.log(data)
						return true
					}
				} catch (error) {console.log(error)
					return false}}
			}
		}
	};
};


export default getState;