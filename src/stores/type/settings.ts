import ActionMode from "@/types/enum";

export type SettingsState = {
    showFooter: boolean;
    showAddButton: boolean;
    filterCompleted: boolean;
    actionMode: ActionMode;
}