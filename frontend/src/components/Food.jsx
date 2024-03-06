import PropTypes from "prop-types";
import colors from "../colorTheme";
import "./Food.css";
import axios from "axios";
import { useEffect, useState } from "react";
import calculatePev from "../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCircle, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function Food({ id, name, calories, carbs, fats, proteins, barcode, isDarkMode, data, setData, setEditing }) {
    const [proteinEfficiencyPercentage, setProteinEfficiencyPercentage] = useState(0);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        const newProteinEfficiencyPercentage = calculatePev(calories, proteins);
        setProteinEfficiencyPercentage(newProteinEfficiencyPercentage);
    }, [calories, proteins]);

    const handleDelete = async () => {
        const url = import.meta.env.VITE_API_URL || "";
        const hr = await axios.delete(url + "/api/foods/" + id);

        console.log(hr.data);

        const newData = data.filter((x) => x.id != id);
        setData(newData);
    };

    const handleEdit = () => {
        setEditing({
            name,
            calories,
            carbs,
            fats,
            proteins,
            barcode,
        });
    };

    return (
        <div
            className="food-element"
            style={{
                color: isDarkMode ? "white" : "black",
                backgroundColor: isDarkMode
                    ? colors.dark.primary.dark
                    : colors.light.primary.light
            }}
        >
            <div className="food-header">
                <h2>{name}</h2>
                <button onClick={() => setShowData(!showData)}>
                    <span
                        className="material-symbols-outlined"
                        style={{color: isDarkMode ? "white" : "black"}}
                    >
                        {showData ? "expand_less" : "expand_more"}
                    </span>
                </button>
            </div>
            <section>
                <h4 style={{marginBottom: 0}}>Protein EP:</h4>
                <span style={{
                    fontSize: "40px",
                    fontWeight: 600,
                    color: proteinEfficiencyPercentage > 50
                            ? "green"
                            : proteinEfficiencyPercentage < 25
                                ? "red"
                                : "orange"
                }}>
                    {proteinEfficiencyPercentage}
                </span>
            </section>
            {showData
                ? <ul
                    className="food-table"
                    style={{
                        backgroundColor: isDarkMode
                                            ? colors.dark.primary.main
                                            : colors.light.primary.main
                    }}
                >
                    <li>
                        <span>Calories</span>
                        <span>{calories}</span>
                    </li>
                    <li>
                        <span>Carbs</span>
                        <span>{carbs}</span>
                    </li>
                    <li>
                        <span>Fats</span>
                        <span>{fats}</span>
                    </li>
                    <li>
                        <span>Proteins</span>
                        <span>{proteins}</span>
                    </li>
                </ul>
                : null
            }
        </div>
    )
}

Food.propTypes = {
    name: PropTypes.string,
    calories: PropTypes.number,
    carbs: PropTypes.number,
    fats: PropTypes.number,
    proteins: PropTypes.number,
    isDarkMode: PropTypes.bool
}
