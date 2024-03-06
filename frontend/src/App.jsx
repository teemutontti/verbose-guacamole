import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Food from "./components/Food";
import colors from "./colorTheme";
import calculatePev from "./utilities";
import AddFood from "./components/AddFood";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function App() {
    const [data, setData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showAddView, setShowAddView] = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = import.meta.env.VITE_API_URL || "";
        const hr = await axios.get(url + "/api/foods");

        hr.data.sort((a, b) => calculatePev(b.calories, b.proteins) - calculatePev(a.calories, a.proteins));
        setData(hr.data);
    };

    return (
        <>
            <div
                className={isDarkMode ? "food-list dark" : "food-list"}
                style={{
                    backgroundColor: isDarkMode
                                        ? colors.dark.secondary.main
                                        : colors.light.secondary.main
                }}
            >
                {data.map((food, index) => (
                    <Food key={index}
                        name={food.name}
                        calories={food.calories}
                        carbs={food.carbohydrates}
                        fats={food.fats}
                        proteins={food.proteins}
                        isDarkMode={isDarkMode}
                    />
                ))}

            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
                Toggle Theme
            </button>
        </>
    )
}

export default App
