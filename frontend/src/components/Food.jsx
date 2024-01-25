import PropTypes from "prop-types"
import colors from "../colorTheme"
import "./Food.css";
import { useEffect, useState } from "react";
import calculatePep from "../utilities";

export default function Food({ name,
                                calories,
                                carbs,
                                fats,
                                proteins,
                                isDarkMode
}) {
    const [
        proteinEfficiencyPercentage,
        setProteinEfficiencyPercentage
    ] = useState(0);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        const newProteinEfficiencyPercentage = calculatePep(calories, proteins);
        setProteinEfficiencyPercentage(newProteinEfficiencyPercentage);
    }, [calories, proteins])

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
