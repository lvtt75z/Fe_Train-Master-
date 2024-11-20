import React from "react";

const MealPlanTable = ({ mealPlans, onOpenModal, onReject }) => {
  const groupedMealPlans = mealPlans.reduce((acc, mealPlan) => {
    const mealPlanID = mealPlan[0];
    if (!acc[mealPlanID]) {
      acc[mealPlanID] = {
        mealPlanID,
        day: mealPlan[1],
        session: mealPlan[2],
        foods: [],
      };
    }
    acc[mealPlanID].foods.push(mealPlan); // Add food data to the grouped mealPlan
    return acc;
  }, {});

  const groupedMealPlansArray = Object.values(groupedMealPlans);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Meal Plan ID</th>
          <th>Day</th>
          <th>Session</th>
          <th>Food Name</th>
          <th>Protein</th>
          <th>Fat</th>
          <th>Carb</th>
          <th>Note</th>
          <th>Amount</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {groupedMealPlansArray.map((mealPlanGroup) =>
          mealPlanGroup.foods.map((food, foodIndex) => {
            const isFirstRow = foodIndex === 0;
            return (
              <tr key={`${mealPlanGroup.mealPlanID}-${foodIndex}`}>
                {isFirstRow && (
                  <>
                    <td rowSpan={mealPlanGroup.foods.length}>
                      {mealPlanGroup.mealPlanID}
                    </td>
                    <td rowSpan={mealPlanGroup.foods.length}>
                      {mealPlanGroup.day}
                    </td>
                    <td rowSpan={mealPlanGroup.foods.length}>
                      {mealPlanGroup.session}
                    </td>
                  </>
                )}
                <td>{food[3]}</td> {/* Food Name */}
                <td>{food[4]}</td> {/* Protein */}
                <td>{food[5]}</td> {/* Fat */}
                <td>{food[6]}</td> {/* Carb */}
                <td>{food[7]}</td> {/* Note */}
                <td>{food[8]}</td> {/* Amount */}
                <td>{food[9]}</td> {/* Unit */}
                {isFirstRow && (
                  <td rowSpan={mealPlanGroup.foods.length}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onOpenModal(mealPlanGroup.mealPlanID)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => onReject(mealPlanGroup.mealPlanID)}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default MealPlanTable;
