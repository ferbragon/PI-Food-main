
const CheckDiets = ({ diet, handleChange, recipeData }) =>{

    const capitalizeFirstLetter = (string) =>{
        let devide = string.split(" ");
        let upperCase = devide.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let join = upperCase.join(" ");
        return join;
    };

    console.log(diet);
    return(
        <div className="boxDietsLabels">            
            <label className="label-diets" htmlFor={diet}>{capitalizeFirstLetter(diet)}</label>
            <input className="input-diets" name={diet} type="checkbox" onChange={handleChange} checked={recipeData} />
        </div>
    )
};

export default CheckDiets;