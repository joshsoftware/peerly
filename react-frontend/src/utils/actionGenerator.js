export const actionGenerator = (entityName) => {
  entityName = entityName.toUpperCase();

  return {
    init: `INITIATE_FETCH_${entityName}`,
    success: `FETCHING_${entityName}_SUCCESSFUL`,
    failure: `FETCHING_${entityName}_FAILED`,
    toggleLoader: `TOGGLE_LOADING_${entityName}`,
    timedOut: `FETCHING_${entityName}_TIMED_OUT`,
  };
};
