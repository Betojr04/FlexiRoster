const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			registerError: null,
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
			registerUser: async (userDetails) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(userDetails),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Registration error:", errorData);
                        setStore({ registerError: errorData.message || 'Registration failed. Please try again.' });
                        return; // Exit the function if there's an error
                    }

                    const data = await response.json();
                    console.log("User registered successfully:", data);
                    // Here you might want to update the store with user data, or navigate to a different page, etc.
                } catch (error) {
                    console.error("Error during registration:", error);
                    setStore({ registerError: error.message || 'An error occurred during registration.' });
                }
            },

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
