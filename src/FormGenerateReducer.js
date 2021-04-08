import ActionType from "./FormGenerateActionType";
let sectionId = 1;
export default function (state, action) {
  switch (action.type) {
    case ActionType.ADD_SECTION: {
      const section = {
        id: `${Date.now()}${state.length}`,
        name: `section ${sectionId}`,
        fields: [],
      };
      sectionId++;
      return [...state, section];
    }

    case ActionType.UPDATE_SECTION: {
      const { section } = action.payload;
      return state.map((sec) => (section.id == sec.id ? section : sec));
    }

    case ActionType.DELETE_SECTION: {
      const { id } = action.payload;
      return state.filter((el) => el.id != id);
    }
    case ActionType.ADD_FILD: {
      const { sectionId } = action.payload;
      const field = {
        id: `${Date.now()}${state.length}`,
        ...action.payload.field,
        tooTip: false,
      };
      return state.map((section) =>
        section.id == sectionId
          ? {
              ...section,
              fields: [...section.fields, field],
            }
          : section
      );
    }

    case ActionType.DELETE_FIELD: {
      const { fieldId, sectionId } = action.payload;
      return state.map((section) => {
        if (section.id != sectionId) return section;
        section.fields = section.fields.filter((field) => field.id != fieldId);
        return section;
      });
    }

    case ActionType.UPDATE_FIELD: {
      const { field: updatedFild, sectionId } = action.payload;
      return state.map((section) => {
        if (section.id != sectionId) return section;
        section.fields = section.fields.map((field) =>
          field.id == updatedFild.id ? updatedFild : field
        );
        return section;
      });
    }
    default:
      throw new Error();
  }
}
