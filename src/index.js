import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Blog } from "./blog";
import "./index.css";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<BrowserRouter>
			<Provider store={store}>
				<Blog message="Функциональный компонент" />
			</Provider>
		</BrowserRouter>
	</>
);
