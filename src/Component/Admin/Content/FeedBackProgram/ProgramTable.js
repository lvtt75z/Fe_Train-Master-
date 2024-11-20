import React from "react";

const ProgramTable = ({ programs, onOpenModal, onReject }) => {
  const groupedPrograms = programs.reduce((acc, program) => {
    const programID = program[0];
    if (!acc[programID]) {
      acc[programID] = {
        programID,
        day: program[1],
        week: program[2],
        exercises: [],
      };
    }
    acc[programID].exercises.push(program); // Add exercise data to the grouped program
    return acc;
  }, {});

  const groupedProgramsArray = Object.values(groupedPrograms);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Program ID</th>
          <th>Day</th>
          <th>Week</th>
          <th>Exercise Name</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Tempo</th>
          <th>Load</th>
          <th>RIR/RPE</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {groupedProgramsArray.map((programGroup) =>
          programGroup.exercises.map((exercise, exerciseIndex) => {
            const isFirstRow = exerciseIndex === 0;
            return (
              <tr key={`${programGroup.programID}-${exerciseIndex}`}>
                {isFirstRow && (
                  <>
                    <td rowSpan={programGroup.exercises.length}>
                      {programGroup.programID}
                    </td>
                    <td rowSpan={programGroup.exercises.length}>
                      {programGroup.day}
                    </td>
                    <td rowSpan={programGroup.exercises.length}>
                      {programGroup.week}
                    </td>
                  </>
                )}
                <td>{exercise[4]}</td> {/* Exercise Name */}
                <td>{exercise[5]}</td> {/* Sets */}
                <td>{exercise[6]}</td> {/* Reps */}
                <td>{exercise[7]}</td> {/* Tempo */}
                <td>{exercise[8]}</td> {/* Load */}
                <td>{exercise[9]}</td> {/* RIR/RPE */}
                {isFirstRow && (
                  <td rowSpan={programGroup.exercises.length}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onOpenModal(programGroup.programID)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => onReject(programGroup.programID)}
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

export default ProgramTable;
